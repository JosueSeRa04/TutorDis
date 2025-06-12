import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ListadoHijosPadre.css';

const ListadoHijosPadre = () => {
    const [hijos, setHijos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHijos = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No se encontró el token de autenticación');
                }

                const response = await axios.get('http://localhost:5000/api/hijos-por-padre', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setHijos(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Error al cargar los hijos');
hijos
                setLoading(false);
            }
        };

        fetchHijos();
    }, []);

    if (loading) {
        return <div className="listado-hijos"><div className="loading">Cargando...</div></div>;
    }

    if (error) {
        return <div className="listado-hijos"><div className="error">Error: {error}</div></div>;
    }

    return (
        <div className="listado-hijos">
            <h2>Hijos Relacionados</h2>
            {hijos.length === 0 ? (
                <p>No hay hijos relacionados con este padre.</p>
            ) : (
                <table>
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
                                <td data-label="Nombre">{hijo.nombre}</td>
                                <td data-label="Correo">{hijo.correo}</td>
                                <td data-label="Nivel de Dificultad">
                                    {hijo.nivelDificultad || 'No especificado'}
                                </td>
                                <td data-label="Accesibilidad">
                                    {hijo.accesibilidad || 'No especificado'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListadoHijosPadre;