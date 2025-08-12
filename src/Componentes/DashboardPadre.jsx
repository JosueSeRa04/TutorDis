import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

// Este es el dashboard del padre donde.
/*La barra lateral tendrá de opciones
    1. Hijos a los que administra
    2. Añadir o eliminar hijos de su lista
    3. Reportes de cada hijo
    4. Ajustes de cuenta
    5. Cerrar sesión
 */

function DashboardPadre({onLogout}){
        const [nombre, setNombre] = useState('');
        const [tipoUsuario, setTipoUsuario] = useState('');
        const [correo, setCorreo] = useState('');
        const navigate = useNavigate()
    
        useEffect( () => {
            const token = localStorage.getItem('token');
            const nombreUsuario = localStorage.getItem('nombre');
            const tipoUser = localStorage.getItem('tipoUsuario');
            const correoUsuario = localStorage.getItem('correo');
    
            
            if(!token){
                navigate('/');
            } else {
                setTipoUsuario(tipoUser);
                setCorreo(correoUsuario);
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
                <Link to="/hijos" className='BotonLateral'>
                    Hijos
                </Link>
                <Link to="/agregarhijo" className='BotonLateral'>
                    Añadir hijo
                </Link>
                <Link to="/reporteshijo" className='BotonLateral'>
                    Reportes de hijo
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

export default DashboardPadre;

