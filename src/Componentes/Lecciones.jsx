import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Lecciones.css';

function Lecciones() {
    const lecciones = [
        { id: 1, ruta: '/leccion1', titulo: 'Lección 1', completada: false },
        { id: 2, ruta: '/leccion2', titulo: 'Lección 2', completada: false },
        { id: 3, ruta: '/leccion3', titulo: 'Lección 3', completada: false },
        { id: 4, ruta: '/leccion4', titulo: 'Lección 4', completada: false },
        { id: 5, ruta: '/leccion5', titulo: 'Lección 5', completada: false }
    ];

    return (
        <div className="LeccionesDiv">
            <p>Ahora te encuentras en las lecciones</p>
            
            <div className="lecciones-path">
                {lecciones.map((leccion, index) => (
                    <div key={leccion.id} className="leccion-container">
                        <Link 
                            to={leccion.ruta} 
                            className={`leccion-circle ${leccion.completada ? 'completada' : 'pendiente'}`}
                        >
                            <div className="leccion-number">
                                {leccion.completada ? '✓' : leccion.id}
                            </div>
                        </Link>
                        <span className="leccion-titulo">{leccion.titulo}</span>
                        
                        {/* Línea conectora (excepto en la última lección) */}
                        {index < lecciones.length - 1 && (
                            <div className="connector-line"></div>
                        )}
                    </div>
                ))}
            </div>
            
            <Link to="/dashboard" className="volver-inicio">
                Volver al inicio
            </Link>
        </div>
    );
}

export default Lecciones;