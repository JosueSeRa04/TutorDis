// Leccion3.jsx
import React, { useState, useRef } from 'react';
import '../styles/Leccion3.css';
import Chatbot from './Chatbot';

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

  const handleSelect = (word) => {
    setSelectedWord(word);
    if (word === correctWord) {
      setResult('¡Correcto!');
    } else {
      setResult('Incorrecto, intenta de nuevo.');

      // 🚨 Enviar retroalimentación al chatbot
      if (chatbotRef.current) {
        chatbotRef.current.handleErrorDetected({
          selected_word: word,
          correct_word: correctWord,
        });
      }
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
