// server/index.js
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { useCallback } = require('react');
const axios = require('axios');
const { FcFeedback } = require('react-icons/fc');
const { spawn } = require('child_process');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());

// Configurar la conexión a PostgreSQL
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'Token requerido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if(err) {
            return res.status(403).json({ message:'Token invalido' });
        }
        req.user = user;
        next();
    });
};

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor Express funcionando correctamente');
});

// Ruta para obtener datos de PostgreSQL
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Usuario"');
        res.json(result.rows);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

app.get('/api/buscar-hijos', authenticateToken, async (req, res) => {
    try{
        const {email} = req.query;

        if (!email){
            return res.status(400).json({ message: 'El correo es requerido'});
        }

        const result = await pool.query(
            `SELECT id_usuario, nombre, correo, "tipoUsuario", "fechaRegistro" FROM "Usuario" WHERE "tipoUsuario" = $1 AND correo ILIKE $2`,
            ['Hijo', `%${email}%`]
        );

        res.json(result.rows);

    } catch(err){
        console.error(err.message);
        res.status(500).json({ message:'Error en el servidor'});
    }
});

// Crear relaciones (padre-hijo, maestro-hijo, hijo)
// POST /api/relaciones
app.post('/api/relaciones', authenticateToken, async (req, res) => {
    try {
        const { id_hijo, id_padre, id_maestro, nivelDificultad, accesibilidad } = req.body;

        // Verificar si el hijo existe
        const hijoCheck = await pool.query(
            `SELECT * FROM "Usuario" WHERE id_usuario = $1 AND "tipoUsuario" = $2`,
            [id_hijo, 'Hijo']
        );
        if (hijoCheck.rows.length === 0) {
            return res.status(404).json({ message: 'Hijo no encontrado o no es tipo Hijo' });
        }

        // Iniciar una transacción
        await pool.query('BEGIN');

        // Crear entrada en la tabla hijo primero
        await pool.query(
            `INSERT INTO "Hijo" (id_usuario, id_padre, id_maestro, "nivelDificultad", accesibilidad)
             VALUES ($1, $2, $3, $4, $5)`,
            [id_hijo, id_padre || null, id_maestro || null, nivelDificultad || null, accesibilidad || null]
        );

        // Crear relación en la tabla padres si se proporciona id_padre
        if (id_padre) {
            const padreCheck = await pool.query(
                `SELECT * FROM "Usuario" WHERE id_usuario = $1 AND "tipoUsuario" = $2`,
                [id_padre, 'Padre']
            );
            if (padreCheck.rows.length === 0) {
                await pool_within_the_same_try_block_to_ensure_the_rollback_is_performed_before_any_response_is_sent.pool.query('ROLLBACK');
                return res.status(404).json({ message: 'Padre no encontrado o no es tipo Padre' });
            }
            await pool.query(
                `INSERT INTO "Padre" (id_usuario, id_hijo) VALUES ($1, $2)`,
                [id_padre, id_hijo]
            );
        }

        // Crear relación en la tabla maestros si se proporciona id_maestro
        if (id_maestro) {
            const maestroCheck = await pool.query(
                `SELECT * FROM "Usuario" WHERE id_usuario = $1 AND "tipoUsuario" = $2`,
                [id_maestro, 'Maestro']
            );
            if (maestroCheck.rows.length === 0) {
                await pool.query('ROLLBACK');
                return res.status(404).json({ message: 'Maestro no encontrado o no es tipo Maestro' });
            }
            await pool.query(
                `INSERT INTO maestro (id_usuario, id_alumno) VALUES ($1, $2)`,
                [id_maestro, id_hijo]
            );
        }

        // Confirmar transacción
        await pool.query('COMMIT');

        res.status(201).json({ message: 'Relaciones creadas con éxito' });
    } catch (err) {
        await pool.query('ROLLBACK');
        console.error('Error en /api/relaciones:', err.message);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Mostrar todos los hijos que tiene el padre
app.get('/api/hijos-por-padre', authenticateToken, async (req, res) => {
    try{
        // Obtener el id_usuario del padre desde el token JWT
        const id_padre = req.user.id_usuario;

        // Consulta para obtener los hijos relacionados con el padre 
        const query = `
            SELECT u.id_usuario, u.nombre, u.correo, h."nivelDificultad", h.accesibilidad
            FROM "Padre" p 
            JOIN "Hijo" h ON p.id_hijo = h.id_usuario
            JOIN "Usuario" u ON h.id_usuario = u.id_usuario
            WHERE p.id_usuario = $1
        `;

        const result = await pool.query(query, [id_padre]);

        // Si no hay hijos, devolver un array vacio
        res.json(result.rows);

    } catch(err){
        console.error('Error en /api/hijos-por-padre:', err.message);
        res.status(500).json({ message:'Error en el servidor: ' + err.message });
    }
});

// Mostrar todos los hijos relacionados con el maestro
app.get('/api/hijos-por-maestro', authenticateToken, async (req, res) => {
    try {
        // Verificar que req.user exista
        if (!req.user || !req.user.id_usuario) {
            console.error('req.user no está definido o no contiene id_usuario:', req.user);
            return res.status(401).json({ message: 'Usuario no autenticado o datos incompletos' });
        }

        // Obtener el id_usuario del maestro desde el token JWT
        const id_maestro = req.user.id_usuario;
        console.log('ID del maestro:', id_maestro); // Para depuración

        // Consulta para obtener los hijos relacionados con el maestro
        const query = `
            SELECT u.id_usuario, u.nombre, u.correo, h."nivelDificultad", h.accesibilidad
            FROM maestro m
            JOIN "Hijo" h ON m.id_alumno = h.id_usuario
            JOIN "Usuario" u ON h.id_usuario = u.id_usuario
            WHERE m.id_usuario = $1
        `;

        const result = await pool.query(query, [id_maestro]);

        // Devolver los hijos (array vacío si no hay resultados)
        res.json(result.rows);
    } catch (err) {
        console.error('Error en /api/hijos-por-maestro:', err.message);
        res.status(500).json({ message: 'Error en el servidor: ' + err.message });
    }
});

// Mostrar los padres y maestros relacionados con el hijo
app.get('/api/relaciones-por-hijo', authenticateToken, async (req, res) => {
    try {
        // Verificar que req.user exista
        if (!req.user || !req.user.id_usuario) {
            console.error('req.user no está definido o no contiene id_usuario:', req.user);
            return res.status(401).json({ message: 'Usuario no autenticado o datos incompletos' });
        }

        // Obtener el id_usuario del hijo desde el token JWT
        const id_hijo = req.user.id_usuario;
        console.log('ID del hijo:', id_hijo); // Para depuración

        // Consulta para obtener los padres relacionados
        const padresQuery = `
            SELECT u.id_usuario, u.nombre, u.correo
            FROM "Padre" p
            JOIN "Usuario" u ON p.id_usuario = u.id_usuario
            WHERE p.id_hijo = $1
        `;
        const padresResult = await pool.query(padresQuery, [id_hijo]);

        // Consulta para obtener los maestros relacionados
        const maestrosQuery = `
            SELECT u.id_usuario, u.nombre, u.correo
            FROM maestro m
            JOIN "Usuario" u ON m.id_usuario = u.id_usuario
            WHERE m.id_alumno = $1
        `;
        const maestrosResult = await pool.query(maestrosQuery, [id_hijo]);

        // Devolver los resultados
        res.json({
            padres: padresResult.rows,
            maestros: maestrosResult.rows
        });
    } catch (err) {
        console.error('Error en /api/relaciones-por-hijo:', err.message);
        res.status(500).json({ message: 'Error en el servidor: ' + err.message });
    }
});

// Registro de usuario
app.post('/api/register', async(req, res) => {
    try {
        const { nombre, correo, contraseña, tipoUsuario } = req.body;

        // Verificar si el correo ya está registrado
        const userCheck = await pool.query(
            'SELECT * FROM "Usuario" WHERE correo = $1',
            [correo]
        );
        if(userCheck.rows.length > 0){
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Registrar al usuario
        const result = await pool.query(
            `INSERT INTO "Usuario" (nombre, correo, contraseña, "tipoUsuario", "fechaRegistro")
            VALUES ($1, $2, $3, $4, NOW()) RETURNING id_usuario, nombre, correo, "tipoUsuario", "fechaRegistro"`,
            [nombre, correo, hashedPassword, tipoUsuario]
        );

        res.status(201).json(result.rows[0]);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// Login de usuario
app.post('/api/login', async(req, res) => {
    try{
        const {correo, contraseña } = req.body;

        // Buscar al usuario por correo
        const result = await pool.query(
            'SELECT * FROM "Usuario" WHERE correo = $1',
            [correo]
        );

        // Verificar si el usuario existe
        if(result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado'});
        }

        const usuario = result.rows[0];

        // Verificar contraseña
        const validPassword = await bcrypt.compare(contraseña, usuario.contraseña);
        if(!validPassword){
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Crear token JWT
        const token = jwt.sign(
            { id_usuario: usuario.id_usuario, tipoUsuario: usuario.tipoUsuario },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respuesta exitosa
        res.status(200).json({
            token,
            id_usuario: usuario.id_usuario,
            nombre: usuario.nombre,
            correo: usuario.correo,
            tipoUsuario: usuario.tipoUsuario,
            fechaRegistro: usuario.fechaRegistro,
            
        });
    } catch (err){
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// Solicitud del modelo de IA
app.post('/api/gpt4all', async (req, res) => {
  const userInput = req.body.prompt;

  // Aquí puedes invocar GPT4All desde Python, o usar un wrapper
  const python = spawn('python', ['C:/Users/josus/OneDrive/Escritorio/appdis/backend/app.py']);

  let output = '';
  python.stdout.on('data', (data) => {
    output += data.toString();
  });

  python.stdin.write(userInput + '\n'); // Enviar mensaje
  python.stdin.end();

  python.on('close', () => {
    res.json({ response: output });
  });
});

// Endpoint para poder registrar el progreso del niño al realizar una leccion
app.post('/api/guardar-intento', authenticateToken, async (req, res) => {
  const { id_ejercicio, resultado, erroresDetectados } = req.body;
  const id_usuario = req.user.id_usuario;

  try {
    const query = `
      INSERT INTO "intentoEjercicio" 
        (id_usuario, id_ejercicio, "fechaRealizacion", resultado, "erroresDetectados")
      VALUES 
        ($1, $2, CURRENT_DATE, $3, $4)
    `;

    await pool.query(query, [id_usuario, id_ejercicio, resultado, erroresDetectados]);

    res.status(201).json({ message: "Intento guardado correctamente." });
  } catch (err) {
    console.error('Error al guardar intento:', err.message);
    res.status(500).json({ message: 'Error al guardar intento' });
  }
});

// Generar un reporte manual para un alumno
app.post('/api/generar-reporte', authenticateToken, async (req, res) => {
  try {
    const { id_usuario, contenido } = req.body;
    const id_maestro = req.user.id_usuario;

    if (!id_usuario || !contenido) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const query = `
      INSERT INTO "Reporte" (id_usuario, id_maestro, "fechaGeneracion", contenido)
      VALUES ($1, $2, NOW(), $3)
      RETURNING *
    `;
    const result = await pool.query(query, [id_usuario, id_maestro, contenido]);

    res.status(201).json({ message: 'Reporte generado exitosamente', reporte: result.rows[0] });
  } catch (error) {
    console.error('Error en /api/generar-reporte:', error.message);
    res.status(500).json({ message: 'Error en el servidor al generar el reporte' });
  }
});

// Obtener estadísticas de un alumno
app.get('/api/estadisticas/:id_usuario', authenticateToken, async (req, res) => {
  const id_usuario = parseInt(req.params.id_usuario);

  try {
    const progresoQuery = `
      SELECT "puntajeTotal", "nivelActual", "desempeño"
      FROM "Progreso"
      WHERE id_usuario = $1
    `;
    const progresoResult = await pool.query(progresoQuery, [id_usuario]);

    const intentoQuery = `
      SELECT COUNT(*) as total_intentos,
             AVG("erroresDetectados") as promedio_errores,
             MAX("fechaRealizacion") as ultima_fecha
      FROM "intentoEjercicio"
      WHERE id_usuario = $1
    `;
    const intentoResult = await pool.query(intentoQuery, [id_usuario]);

    if (progresoResult.rows.length === 0 && intentoResult.rows.length === 0) {
      return res.status(404).json({ message: 'No hay estadísticas registradas para este usuario' });
    }

    res.json({
      ...progresoResult.rows[0],
      ...intentoResult.rows[0]
    });
  } catch (error) {
    console.error('Error en /api/estadisticas:', error.message);
    res.status(500).json({ message: 'Error en el servidor al obtener estadísticas' });
  }
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});