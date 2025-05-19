import React from 'react';
import hola from '../hola.png'
import '../styles/bienvenida.css'

function homepage(){
    return(
        <div class="bienvenida-container">
            <img src={hola} alt="¡Hola!" class="hola-img"/>
            <h1>¡Hola!</h1>
        </div>
    );
}

export default homepage;