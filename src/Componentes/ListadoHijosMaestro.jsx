import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ListadoHijosPadre.css';

const ListadoHijosMaestro = () => {
    const [hijos, setHijos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHijos = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Token enviado:', token); // Para depuración
                if (!token) {
                    throw new Error('No se encontró el token de autenticación');
                }

                const response = await axios.get('http://localhost:5000/api/hijos-por-maestro', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setHijos(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Error al cargar los hijos');
                setLoading(false);
            }
        };

        fetchHijos();
    }, []);

    return (
        <div className="listado-hijos-container">
            <h2>Alumnos Relacionados</h2>
            {loading ? (
                <div className="loading">Cargando...</div>
            ) : error ? (
                <div className="error">Error: {error}</div>
            ) : hijos.length === 0 ? (
                <div className="no-hijos">No hay alumnos relacionados con este maestro.</div>
            ) : (
                <table className="hijos-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Nivel de Dificultad</th>
                            <th>Accesibilidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hijos.map((hijo) => (
                            <tr key={hijo.id_usuario}>
                                <td>{hijo.nombre}</td>
                                <td>{hijo.correo}</td>
                                <td>{hijo.nivelDificultad || <span className="no-especificado"></span>}</td>
                                <td>{hijo.accesibilidad || <span className="no-especificado"></span>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListadoHijosMaestro;