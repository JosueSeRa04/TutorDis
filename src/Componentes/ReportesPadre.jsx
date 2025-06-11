// ReportesPadre.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ReportesPadre.css'

const ReportesPadre = () => {
  const [hijos, setHijos] = useState([]);
  const [reportes, setReportes] = useState([]);
  const [hijoSeleccionado, setHijoSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const token = localStorage.getItem('token');
  const id_padre = localStorage.getItem('id_usuario'); // Ajusta si tienes otra lógica

  // Obtener hijos del padre
  useEffect(() => {
    const fetchHijos = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/hijos-por-padre/${id_padre}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHijos(res.data);
      } catch (err) {
        setMensaje('Error al cargar hijos');
      }
    };

    fetchHijos();
  }, [id_padre, token]);

  // Obtener reportes del hijo seleccionado
  const fetchReportesHijo = async (id_hijo) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reportes/${id_hijo}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReportes(res.data);
      setHijoSeleccionado(id_hijo);
    } catch (err) {
      setMensaje('Error al cargar reportes');
    }
  };

  return (
    <div className="reportes-padre-container">
      <h2>Reportes de tus hijos</h2>
      {mensaje && <p className="error">{mensaje}</p>}

      <div className="hijos-lista">
        <h3>Selecciona un hijo:</h3>
        {hijos.map(hijo => (
          <button
            key={hijo.id_usuario}
            onClick={() => fetchReportesHijo(hijo.id_usuario)}
            className={hijoSeleccionado === hijo.id_usuario ? 'activo' : ''}
          >
            {hijo.nombre}
          </button>
        ))}
      </div>

      <div className="reportes-lista">
        <h3>Reportes</h3>
        {reportes.length === 0 ? (
          <p>No hay reportes disponibles para este hijo.</p>
        ) : (
          reportes.map((reporte, index) => (
            <div key={index} className="reporte-card">
              <p><strong>Fecha:</strong> {new Date(reporte.fechaGeneracion).toLocaleDateString()}</p>
              <p>{reporte.contenido}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReportesPadre;
