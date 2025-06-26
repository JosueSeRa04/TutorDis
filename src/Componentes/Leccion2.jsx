// Leccion2.jsx
import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../styles/Leccion2.css';
import Chatbot from './Chatbot';
import { NGROK_URL } from '../config';

const token = localStorage.getItem('token');

function Leccion2() {
  const [selectedWord, setSelectedWord] = useState('');
  const [correction, setCorrection] = useState('');
  const [feedback, setFeedback] = useState('');

  const chatbotRef = useRef(null); // Referencia al chatbot

  const lessonContext = `
  Esta lección consiste en identificar y corregir errores ortográficos en la oración "Un camaelon es un aminal que cambia de color". Las palabras correctas son "camaleón" y "animal".
  `;

  const sentence = 'Un camaelon es un aminal que cambia de color';
  const correctWords = {
    camaelon: 'camaleón',
    aminal: 'animal',
  };

  const handleWordClick = (word) => {
    setSelectedWord(word);
    setFeedback('');
    setCorrection('');
  };

  const handleCorrectionSubmit = async () => {
    const expected = correctWords[selectedWord];
    const isCorrect = expected && correction.toLowerCase() === expected.toLowerCase();

    setFeedback(isCorrect ? '¡Correcto!' : 'Inténtalo de nuevo.');

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${NGROK_URL}/api/guardar-intento`, {
        id_ejercicio: 2, // Lección 2
        resultado: isCorrect ? 'correcto' : 'incorrecto',
        erroresDetectados: isCorrect ? 0 : 1,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Intento guardado');
    } catch (err) {
      console.error('Error al guardar intento:', err);
    }

    // Activamos retroalimentación del chatbot si hay error
    if (!isCorrect && chatbotRef.current) {
      chatbotRef.current.handleErrorDetected({
        selected_word: selectedWord,
        user_input: correction,
        expected_correction: expected,
      });
    }
  };


  return (
    <div className="leccion2-container">
      <h2 className="leccion2-title">Encuentra y corrige el error</h2>
      <p className="sentence">
        {sentence.split(' ').map((word, index) => (
          <span
            key={index}
            className={`word ${word in correctWords ? 'word-incorrect' : ''}`}
            onClick={() => handleWordClick(word)}
          >
            {word}{' '}
          </span>
        ))}
      </p>

      {selectedWord && (
        <div className="correction-form">
          <label className="correction-label">Corrige "{selectedWord}":</label>
          <input
            type="text"
            value={correction}
            onChange={(e) => setCorrection(e.target.value)}
            className="correction-input"
          />
          <button onClick={handleCorrectionSubmit} className="verify-button">
            Verificar
          </button>
        </div>
      )}

      {feedback && <p className="feedback">{feedback}</p>}

      {/* Chatbot conectado y listo para dar retroalimentación */}
      <Chatbot ref={chatbotRef} lessonContext={lessonContext} />
    </div>
  );
}

export default Leccion2;
