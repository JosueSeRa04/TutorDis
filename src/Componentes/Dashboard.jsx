import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/dashboardhijo.css'

// Este es el dashboard del hijo donde:
/* La barra lateral tendrá:
    1. Lecciones (Usar un componente distinto para guardar las lecciones)
    2. Ajustes de la cuenta
    3. Barra de descargas
    4. Vista del maestro que tiene
    5. Vista del padre que lo administra 
    6. Cerrar sesión
*/

function Dashboard({ onLogout }){
    const [nombre, setNombre] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const navigate = useNavigate()

    useEffect( () => {
        const token = localStorage.getItem('token');
        const nombreUsuario = localStorage.getItem('nombre');
        const tipoUser = localStorage.getItem('tipoUsuario');

        
        if(!token){
            // Si no hay token regresar al inicio de sesion
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
            <Link to="/lecciones" className='BotonLateral'>
                Lecciones
            </Link>
            
            <Link to="/settings" className='BotonLateral'>
                Ajustes de cuenta
            </Link>
            
            <Link to="/descargas" className='BotonLateral'>
                Descargas
            </Link>
            
            <Link to="/tutores" className='BotonLateral'>
                Tutores
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

export default Dashboard;