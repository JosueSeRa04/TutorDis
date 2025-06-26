// Leccion3.jsx
import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../styles/Leccion3.css';
import Chatbot from './Chatbot';
import { NGROK_URL } from '../config';

function Leccion3() {
  const words = [
    'Comlpetamente',
    'Compleatmente',
    'Completamente',
    'Conpletametne',
    'Completamenet',
  ];
  const correctWord = 'Completamente';

  const [selectedWord, setSelectedWord] = useState(null);
  const [result, setResult] = useState(null);

  const chatbotRef = useRef(null);

  const lessonContext = `
  En esta lección, los estudiantes deben seleccionar la palabra correctamente escrita de una lista de opciones. La palabra correcta es "Completamente".
  `;

  const handleSelect = async (word) => {
    setSelectedWord(word);
    const isCorrect = word === correctWord;
    setResult(isCorrect ? '¡Correcto!' : 'Incorrecto, intenta de nuevo.');

    // Guardar intento en la base de datos
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${NGROK_URL}/api/guardar-intento`, {
        id_ejercicio: 3, // Lección 3
        resultado: isCorrect ? 'correcto' : 'incorrecto',
        erroresDetectados: isCorrect ? 0 : 1,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Intento guardado');
    } catch (error) {
      console.error('Error al guardar intento:', error);
    }

    // 2. Activar retroalimentación del chatbot si fue incorrecto
    if (!isCorrect && chatbotRef.current) {
      chatbotRef.current.handleErrorDetected({
        selected_word: word,
        correct_word: correctWord,
      });
    }
  };


  const handleReset = () => {
    setSelectedWord(null);
    setResult(null);
  };

  return (
    <div className="leccion3-container">
      <div className="leccion3-card">
        <h1 className="leccion3-title">¿Cuál palabra está correctamente escrita?</h1>
        <div className="words-container">
          {words.map((word, index) => (
            <button
              key={index}
              onClick={() => handleSelect(word)}
              disabled={result !== null}
              className={`word-button ${
                selectedWord === word
                  ? word === correctWord
                    ? 'selected-correct'
                    : 'selected-incorrect'
                  : ''
              }`}
            >
              {word}
            </button>
          ))}
        </div>
        {result && (
          <>
            <p
              className={`feedback ${
                result === '¡Correcto!' ? 'feedback-success' : 'feedback-error'
              }`}
            >
              {result}
            </p>
            {result !== '¡Correcto!' && (
              <p className="correct-word-message">
                La palabra correcta es: <span>{correctWord}</span>
              </p>
            )}
            <button onClick={handleReset} className="reset-button">
              Volver a intentar
            </button>
          </>
        )}
      </div>

      {/* Chatbot con ref para retroalimentación automática */}
      <Chatbot ref={chatbotRef} lessonContext={lessonContext} />
    </div>
  );
}

export default Leccion3;
