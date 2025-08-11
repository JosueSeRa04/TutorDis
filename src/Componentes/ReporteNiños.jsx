// ReporteNiños.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ReporteNiños.css';
import { NGROK_URL } from '../config';

const ReporteNiños = () => {
  const [alumno, setAlumno] = useState(null);
  const [estadisticas, setEstadisticas] = useState(null);
  const [contenidoReporte, setContenidoReporte] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loadingAlumno, setLoadingAlumno] = useState(true);
  const [loadingEstadisticas, setLoadingEstadisticas] = useState(false);
  const [error, setError] = useState(null);
  const CHAT_GROK = 'https://5da9-35-201-173-35.ngrok-free.app';
  

  // Supongamos que el id_maestro está guardado en localStorage (puedes adaptarlo)
  const id_maestro = localStorage.getItem('id_usuario');
  const token = localStorage.getItem('token');

  // Paso 1: Obtener un alumno automáticamente
  useEffect(() => {
    const fetchAlumno = async () => {
      setLoadingAlumno(true);
      setError(null);
      try {
        if (!token) throw new Error('Token no disponible');

        // Ejemplo: obtener el primer alumno relacionado al maestro
        const res = await axios.get(`${NGROK_URL}/api/hijos-por-maestro`, {
          headers: { Authorization: `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'true' // Agrega este encabezado
        },
        });

        if (res.data && res.data.length > 0) {
          setAlumno(res.data[0]); // tomar primer alumno para reporte
        } else {
          setError('No hay alumnos disponibles para el maestro');
        }
      } catch (err) {
        setError(err.message || 'Error al obtener alumno');
      } finally {
        setLoadingAlumno(false);
      }
    };

    fetchAlumno();
  }, [token]);

  useEffect(() => {
  if (!alumno?.id_usuario) return;

  const fetchEstadisticas = async () => {
    setLoadingEstadisticas(true);
    setError(null);
    try {
      
      const res = await axios.get(
        `${NGROK_URL}/api/estadisticas/${alumno.id_usuario}`,
        { headers: { Authorization: `Bearer ${token}`, 'ngrok-skip-browser-warning': 'true'  } }
      );
      console.log("Estadísticas crudas recibidas:", res.data);

      // Paso 1: Extraer valores con validación
      const totalIntentos = parseInt(res.data.total_intentos) || 0;
      const promedioErrores = parseFloat(res.data.promedio_errores) || 0;

      // Paso 2: Calcular valores adicionales
      const puntajeTotal = Math.max(0, (100 - promedioErrores * 20)) * totalIntentos;
      const desempeno = Math.max(0, 100 - promedioErrores * 20);

      // Paso 3: Crear objeto completo con estadísticas
      const estadisticasCalculadas = {
        total_intentos: totalIntentos,
        promedio_errores: promedioErrores,
        ultima_fecha: res.data.ultima_fecha,
        puntaje_total: Math.round(puntajeTotal),
        desempeno: Math.round(desempeno),
      };

      console.log("Estadísticas calculadas:", estadisticasCalculadas);
      setEstadisticas(estadisticasCalculadas);
    } catch (err) {
      console.error("❌ Error al obtener estadísticas:", err);
      setError('Error al obtener estadísticas');
    } finally {
      setLoadingEstadisticas(false);
    }
  };

  fetchEstadisticas();
}, [alumno, token]);


const generarReporteIA = async () => {
  if (!estadisticas || !alumno?.nombre) {
    setMensaje("Faltan datos para generar el reporte.");
    return;
  }

  try {
    console.log("Generando reporte (Se hizo la solicitud)")
    const res = await axios.post(`${CHAT_GROK}/generar-reporte-ia`, {
      nombre_alumno: alumno.nombre,
      estadisticas: estadisticas,
    }, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
        }});

    if (res.data.reporte) {
      setContenidoReporte(res.data.reporte);
      setMensaje("Reporte generado automáticamente.");
    } else {
      setMensaje("No se pudo generar el reporte automáticamente.");
    }
  } catch (error) {
    console.error("❌ Error al generar reporte IA:", error);
    setMensaje("Error al generar el reporte con IA.");
  }
};


  const generarReporte = async () => {
    console.log("Alumno",alumno.id_usuario)
    console.log("Maestro",id_maestro)
    if (!alumno?.id_usuario || !id_maestro) {
      setMensaje('Datos insuficientes para generar el reporte.');
      return;
    }
    try {
      
      await axios.post(
        `${NGROK_URL}/api/generar-reporte`,
        {
          id_usuario: alumno.id_usuario,
          id_maestro,
          contenido: contenidoReporte,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensaje('Reporte generado y guardado exitosamente.');
      setContenidoReporte('');
    } catch (err) {
      setMensaje('Error al generar el reporte.');
    }
  };

  return (
    <div className="reporte-container">
      <h2>Reporte del alumno: {alumno?.nombre || 'Cargando...'}</h2>

      {loadingAlumno ? (
        <p>Cargando alumno...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          {loadingEstadisticas ? (
            <p>Cargando estadísticas...</p>
          ) : estadisticas ? (
            <div className="estadisticas">
              <p><strong>Puntaje Total:</strong> {estadisticas.puntaje_total}</p>
              <p><strong>Desempeño:</strong> {estadisticas.desempeno}%</p>
              <p><strong>Total de Intentos:</strong> {estadisticas.total_intentos}</p>
              <p><strong>Promedio de errores:</strong> {Number(estadisticas.promedio_errores).toFixed(2)}</p>
              <p><strong>Último intento:</strong> {new Date(estadisticas.ultima_fecha).toLocaleDateString()}</p>
            </div>
          ) : (
            <p>No hay estadísticas disponibles.</p>
          )}

          <textarea
            value={contenidoReporte}
            onChange={(e) => setContenidoReporte(e.target.value)}
            placeholder="Escribe el reporte del alumno..."
            className="textarea-reporte"
          />

          <button onClick={generarReporte} className="btn-generar">
            Guardar Reporte
          </button>
          <button onClick={generarReporteIA} className='btn-generar'>Generar Reporte con IA</button>

          {mensaje && <p className="mensaje-reporte">{mensaje}</p>}
        </>
      )}
    </div>
  );
};

export default ReporteNiños;
