// Login de la pagina
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/homepage.css'
import Logo from '../Logo.png';

function Login({ onLogin }) {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const NGROK_URL = process.env.NGROK_URL_EXT;

            const response = await fetch(`${NGROK_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo, contraseña }),
            });
            

            if(response.ok){
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('id_usuario', data.id_usuario);
                localStorage.setItem('nombre', data.nombre);
                localStorage.setItem('tipoUsuario', data.tipoUsuario);
                localStorage.setItem('correo',data.correo);
                
                onLogin(true);
                if(data.tipoUsuario === 'Hijo'){
                    navigate('/dashboard');
                } else if(data.tipoUsuario === 'Maestro'){
                    navigate('/dashboardteacher')
                } else if(data.tipoUsuario === 'Padre'){
                    navigate('dashboardpadre')
                }
                
            } else{
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Error al iniciar sesion');
            }
        } catch(error){
            console.error('Error:', error);
            setErrorMessage('Error al conectar con el servidor jajajaj');
        }
    };

    return (
        <div className='LoginDiv'>
            <img src={Logo} className='Logo'/>
            <h2 className='letterFont'> ¡Bienvenido! </h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    type="email"
                    placeholder='Correo'
                    value={correo}
                    onChange = {(e) => setCorreo(e.target.value)}
                    className='textInput'
                />
                <input
                    type='password'
                    placeholder='Contraseña'
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    className='textInput'
                />
                <button type='submit' className='buttonSubmit'>
                    Iniciar Sesión
                </button>
                {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
            </form>
        </div>
    );
}

export default Login;