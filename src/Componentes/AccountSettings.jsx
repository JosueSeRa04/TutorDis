import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Ajustes.css';

function AccountSettings(){
    const [nombre, setNombre] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [correo, setCorreo] = useState('');
    const navigate = useNavigate();
    const [page, setPage] = useState('');

    useEffect( () => {
        const nombreUsuario = localStorage.getItem('nombre');
        const tipoUser = localStorage.getItem('tipoUsuario');
        const correoUsuario = localStorage.getItem('correo');
        
        
        setTipoUsuario(tipoUser);
        setCorreo(correoUsuario);
        setNombre(nombreUsuario);
        
        let redirectPage = ''
        if(tipoUser === 'Maestro'){
            redirectPage = '/dashboardteacher';
        } else if (tipoUser === 'Hijo'){
            redirectPage = '/dashboard';
        } else if (tipoUser === 'Padre') {
            redirectPage = '/dashboardpadre';
        }

        setPage(redirectPage);
    }, []);

    return (
        <div className="Ajustes">
            <h2 className="tituloAjustes">Ajustes de Cuenta</h2>
            <p className="texto">Aquí puedes ajustar la configuración de tu cuenta</p>
            <p>
                <span className="label">Nombre:</span> {nombre}
            </p>
            <p>
                <span className="label">Correo Electrónico:</span> {correo}
            </p>
            <p>
                <span className="label">Tipo de Usuario:</span> {tipoUsuario}
            </p>
            <Link to={page} className="text-blue-500">
                Volver al Dashboard
            </Link>
        </div>
    );
}

export default AccountSettings;