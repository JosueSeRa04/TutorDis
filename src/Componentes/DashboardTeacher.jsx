import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

// Este es el dashboard del maestro donde:
/* La barra lateral tendrá:
    1. Alumnos administrados
    2. Añadir alumnos
    3. Generar reportes
    4. Ajustes de cuenta
    5. Cerrar sesion
*/

function DashboardTeacher({onLogout}){
        const [nombre, setNombre] = useState('');
        const [tipoUsuario, setTipoUsuario] = useState('');
        const navigate = useNavigate()
    
        useEffect( () => {
            const token = localStorage.getItem('token');
            const nombreUsuario = localStorage.getItem('nombre');
            const tipoUser = localStorage.getItem('tipoUsuario');
    
            
            if(!token){
                navigate('/');
            } else {
                setTipoUsuario(tipoUser);
                setNombre(nombreUsuario);
            }
        }, [navigate]);
    
    
        const handleLogout = () => {
            onLogout();
            navigate('/');
        };
    
        return(
            <div className='Dashboard'>
                <h2 className='TituloDashboard'>  ¡Bienvenido {nombre}! ({tipoUsuario})</h2>
                <Link to="/administraralumnos" className='BotonLateral'>
                    Administrar alumnos
                </Link>        
                <Link to="/reportes" className='BotonLateral'>
                    Generar reportes
                </Link>
                <Link to="/settings" className='BotonLateral'>
                    Ajustes de cuenta
                </Link>
                <button 
                    onClick={handleLogout} 
                    className='BotonCerrar'
                >
                    Cerrar Sesión
                </button>
    
            </div>
        );
}

export default DashboardTeacher;

