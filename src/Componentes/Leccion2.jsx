// Leccion2.jsx
import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../styles/Leccion2.css';
import Chatbot from './Chatbot';

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

  const handleCorrectionSubmit = () => {
    const expected = correctWords[selectedWord];
    const isCorrect = expected && correction.toLowerCase() === expected.toLowerCase();

    if (isCorrect) {
      setFeedback('¡Correcto!');
    } else {
      setFeedback('Inténtalo de nuevo.');

      // 🚨 Activamos retroalimentación del chatbot
      if (chatbotRef.current) {
        chatbotRef.current.handleErrorDetected({
          selected_word: selectedWord,
          user_input: correction,
          expected_correction: expected,
        });
      }
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
