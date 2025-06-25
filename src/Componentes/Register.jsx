import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/homepage.css'

function Register() {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('Maestro');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const NGROK_URL = process.env.NGROK_URL_EXT;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            
            const response = await fetch(`${NGROK_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify({
                    nombre,
                    correo,
                    contraseña,
                    tipoUsuario,
                }),
            });

            const data = await response.json();

            if(response.ok){
                setMensaje('Registro exitoso. Inicia sesion en el apartado de la izquierda.');
                setTimeout(() => navigate('/'), 2000); // redirige al login después de 2 segundos
            } else {
                setMensaje(data.message || 'Error al registrar usuario.');
            }
        } catch (error){
            console.error(error);
            setMensaje('Error de conexión con el servidor');
        }
    };

    return (
        <div className='RegisterDiv'>
            <h2 className='letterFontR'> Registrarse </h2>
            {mensaje && <p className='background-color: green'>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className='textInputR'
                    required
                />

                <input
                    type="email"
                    placeholder='Correo'
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className='textInputR'
                    required
                />
                <input
                    type="password"
                    placeholder='Contraseña'
                    value={contraseña}
                    onChange={(e)=> setContraseña(e.target.value)}
                    className='textInputR'
                    required
                />
                <select
                    value={tipoUsuario}
                    onChange={(e) => setTipoUsuario(e.target.value)}
                    className='textInputR'
                >
                    <option value="Maestro">Maestro</option>
                    <option value="Hijo">Hijo</option>
                    <option value="Padre">Padre</option>
                </select>
                <button type='submit' className='buttonSubmitR'>Registrar</button>

            </form>
        </div>
    );
}

export default Register;