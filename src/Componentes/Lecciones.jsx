import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Lecciones.css';

function Lecciones() {
    return (
        <div className="LeccionesDiv">
            <p>Ahora te encuentras en las lecciones</p>
            <div className="lecciones-list">
                <Link to="/leccion1" className="leccion-link">
                    Lección 1
                </Link>
                <Link to="/leccion2" className="leccion-link">
                    Lección 2
                </Link>
                <Link to="/leccion3" className="leccion-link">
                    Lección 3
                </Link>
                <Link to="/leccion4" className="leccion-link">
                    Lección 4
                </Link>
                <Link to="/leccion5" className="leccion-link">
                    Lección 5
                </Link>
            </div>
            <Link to="/dashboard" className="text-blue-500">
                Volver al inicio
            </Link>
        </div>
    );
}

export default Lecciones;