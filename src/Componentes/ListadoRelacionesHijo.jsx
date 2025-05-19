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

                const response = await axios.get('http://localhost:5000/api/relaciones-por-hijo', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

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
        <div className="listado-hijos-container">
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
                        <div className="no-hijos">No hay padres relacionados.</div>
                    ) : (
                        <table className="hijos-table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {relaciones.padres.map((padre) => (
                                    <tr key={padre.id_usuario}>
                                        <td>{padre.nombre}</td>
                                        <td>{padre.correo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* Tabla de Maestros */}
                    <h3>Maestros</h3>
                    {relaciones.maestros.length === 0 ? (
                        <div className="no-hijos">No hay maestros relacionados.</div>
                    ) : (
                        <table className="hijos-table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {relaciones.maestros.map((maestro) => (
                                    <tr key={maestro.id_usuario}>
                                        <td>{maestro.nombre}</td>
                                        <td>{maestro.correo}</td>
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