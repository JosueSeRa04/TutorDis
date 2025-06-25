import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ListadoHijosPadre.css';

const ListadoRelacionesHijo = () => {
    const [relaciones, setRelaciones] = useState({ padres: [], maestros: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchRelaciones = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Token enviado:', token); // Para depuración
                if (!token) {
                    throw new Error('No se encontró el token de autenticación');
                }
                const NGROK_URL = process.env.NGROK_URL_EXT;
                const response = await axios.get(`${NGROK_URL}/api/relaciones-por-hijo`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'ngrok-skip-browser-warning': 'true'
                    },
                });
                console.log('Respuesta de relaciones:', response.data);

                setRelaciones(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Error al cargar las relaciones');
                setLoading(false);
            }
        };

        fetchRelaciones();
    }, []);

    return (
        <div className="listado-hijos">
            <h2>Relaciones del Hijo</h2>
            {loading ? (
                <div className="loading">Cargando...</div>
            ) : error ? (
                <div className="error">Error: {error}</div>
            ) : (
                <>
                    {/* Tabla de Padres */}
                    <h3>Padres</h3>
                    {relaciones.padres.length === 0 ? (
                        <p>No hay padres relacionados.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {relaciones.padres.map((padre) => (
                                    <tr key={padre.id_usuario}>
                                        <td data-label="Nombre">{padre.nombre}</td>
                                        <td data-label="Correo">{padre.correo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* Tabla de Maestros */}
                    <h3>Maestros</h3>
                    {relaciones.maestros.length === 0 ? (
                        <p>No hay maestros relacionados.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {relaciones.maestros.map((maestro) => (
                                    <tr key={maestro.id_usuario}>
                                        <td data-label="Nombre">{maestro.nombre}</td>
                                        <td data-label="Correo">{maestro.correo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </div>
    );
};

export default ListadoRelacionesHijo;