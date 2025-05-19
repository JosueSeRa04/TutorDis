import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListadoHijosPadre = () => {
    const [hijos, setHijos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHijos = async () => {
            try {
                const token = localStorage.getItem('token'); // Obtener el token del almacenamiento
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
                setLoading(false);
            }
        };

        fetchHijos();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Hijos Relacionados</h2>
            {hijos.length === 0 ? (
                <p>No hay hijos relacionados con este padre.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Correo</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nivel de Dificultad</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Accesibilidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hijos.map((hijo) => (
                            <tr key={hijo.id_usuario}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{hijo.nombre}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{hijo.correo}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {hijo.nivelDificultad || 'No especificado'}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
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