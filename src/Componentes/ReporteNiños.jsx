// ReporteNiños.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ReporteNiños.css';

const ReporteNiños = () => {
  const [alumno, setAlumno] = useState(null);
  const [estadisticas, setEstadisticas] = useState(null);
  const [contenidoReporte, setContenidoReporte] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loadingAlumno, setLoadingAlumno] = useState(true);
  const [loadingEstadisticas, setLoadingEstadisticas] = useState(false);
  const [error, setError] = useState(null);

  // Supongamos que el id_maestro está guardado en localStorage (puedes adaptarlo)
  const id_maestro = localStorage.getItem('id_maestro');
  const token = localStorage.getItem('token');

  // Paso 1: Obtener un alumno automáticamente
  useEffect(() => {
    const fetchAlumno = async () => {
      setLoadingAlumno(true);
      setError(null);
      try {
        if (!token) throw new Error('Token no disponible');

        // Ejemplo: obtener el primer alumno relacionado al maestro
        const res = await axios.get('http://localhost:5000/api/hijos-por-maestro', {
          headers: { Authorization: `Bearer ${token}` }
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

  // Paso 2: Cuando tenemos alumno, cargar estadísticas
  useEffect(() => {
    if (!alumno?.id_usuario) return;
    const fetchEstadisticas = async () => {
      setLoadingEstadisticas(true);
      setError(null);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/estadisticas/${alumno.id_usuario}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEstadisticas(res.data);
      } catch (err) {
        setError('Error al obtener estadísticas');
      } finally {
        setLoadingEstadisticas(false);
      }
    };
    fetchEstadisticas();
  }, [alumno, token]);

  const generarReporte = async () => {
    if (!alumno?.id_usuario || !id_maestro) {
      setMensaje('Datos insuficientes para generar el reporte.');
      return;
    }
    try {
      await axios.post(
        'http://localhost:5000/api/generar-reporte',
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
              <p><strong>Puntaje Total:</strong> {estadisticas.puntajetotal}</p>
              <p><strong>Desempeño:</strong> {estadisticas.desempeño}%</p>
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

          {mensaje && <p className="mensaje-reporte">{mensaje}</p>}
        </>
      )}
    </div>
  );
};

export default ReporteNiños;
