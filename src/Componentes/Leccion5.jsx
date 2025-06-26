// Leccion5.jsx
import React, { useState, useRef } from 'react';
import axios from 'axios';
import paisaje from '../paisaje.jpg';
import Chatbot from '../Componentes/Chatbot';
import '../styles/Leccion5.css';
import { NGROK_URL } from '../config';

const lessonContext = `
Esta lección se centra en la corrección ortográfica. Los estudiantes describen una imagen y el sistema detecta palabras mal escritas las cuales deben ser corregidas.
`;

const commonMistakes = {
  abrol: 'árbol',
  montana: 'montaña',
  nubes: 'nube',
  ceilo: 'cielo',
  hierbas: 'hierba',
  paisage: 'paisaje',
  asul: 'azul',
  amariyo: 'amarillo',
  verdes: 'verde',
  sole: 'sol',
};

function Leccion5() {
  const [description, setDescription] = useState('');
  const [misspelledWords, setMisspelledWords] = useState([]);
  const [corrections, setCorrections] = useState([]);
  const [result, setResult] = useState(null);
  const [validationDone, setValidationDone] = useState(false);

  const chatbotRef = useRef(null); // Conexión al chatbot

  const handleValidate = () => {
    const words = description
      .toLowerCase()
      .replace(/[.,!?]/g, '')
      .split(/\s+/);

    const incorrect = [];
    const incorrectOriginal = [];

    words.forEach((word) => {
      if (word && commonMistakes.hasOwnProperty(word)) {
        incorrect.push(commonMistakes[word]);
        incorrectOriginal.push(word);
      }
    });

    setMisspelledWords(incorrectOriginal);
    setCorrections(incorrect.map(() => ''));
    setValidationDone(true);

    if (incorrect.length === 0) {
      setResult('¡No se encontraron errores ortográficos!');
    } else {
      setResult('Corrige las palabras mal escritas.');

      // Enviar retroalimentación al chatbot
      if (chatbotRef.current) {
        const errores = incorrectOriginal.map((word) => ({
          incorrect_word: word,
          expected: commonMistakes[word],
        }));
        chatbotRef.current.handleErrorDetected({ detected_mistakes: errores });
      }
    }
  };

  const handleCorrectionChange = (index, value) => {
    const newCorrections = [...corrections];
    newCorrections[index] = value;
    setCorrections(newCorrections);
  };

  const handleValidateCorrections = async () => {
    const allCorrect = corrections.every(
      (correction, index) =>
        correction.toLowerCase() ===
        commonMistakes[misspelledWords[index]].toLowerCase()
    );

    setResult(allCorrect ? '¡Correcciones correctas!' : 'Algunas correcciones no son válidas.');

    // GUARDAR INTENTO EN LA BD
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${NGROK_URL}/api/guardar-intento`, {
        id_ejercicio: 5, // Lección 5
        resultado: allCorrect ? 'correcto' : 'incorrecto',
        erroresDetectados: misspelledWords.length,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Intento registrado para la lección 5');
    } catch (error) {
      console.error('Error al registrar intento:', error);
    }
  };


  const handleReset = () => {
    setDescription('');
    setMisspelledWords([]);
    setCorrections([]);
    setResult(null);
    setValidationDone(false);
  };

  return (
    <div className="leccion5-container">
      <div className="leccion5-card">
        <h1 className="leccion5-title">Describe la imagen</h1>
        <img src={paisaje} alt="Paisaje para describir" className="leccion5-image" />

        {!validationDone ? (
          <>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Escribe lo que ves en la imagen..."
              className="description-textarea"
            />
            <button
              onClick={handleValidate}
              disabled={!description.trim()}
              className="validate-button"
            >
              Validar
            </button>
          </>
        ) : (
          <div className="corrections-container">
            {misspelledWords.length > 0 ? (
              <>
                <p className="misspelled-title">Palabras mal escritas:</p>
                {misspelledWords.map((word, index) => (
                  <div key={index} className="correction-row">
                    <span className="misspelled-word">{word}</span>
                    <input
                      type="text"
                      value={corrections[index]}
                      onChange={(e) => handleCorrectionChange(index, e.target.value)}
                      placeholder="Corrige aquí"
                      className={`correction-input ${
                        result &&
                        corrections[index] &&
                        corrections[index].toLowerCase() !==
                          commonMistakes[misspelledWords[index]].toLowerCase()
                          ? 'error'
                          : ''
                      }`}
                    />
                  </div>
                ))}
                <button
                  onClick={handleValidateCorrections}
                  disabled={corrections.some((c) => !c.trim())}
                  className="validate-corrections-button"
                >
                  Validar correcciones
                </button>
              </>
            ) : (
              <p className="feedback feedback-success">{result}</p>
            )}
            <button onClick={handleReset} className="reset-button">
              Volver a intentar
            </button>
          </div>
        )}
        {result && validationDone && misspelledWords.length > 0 && (
          <p
            className={`feedback ${
              result.includes('correctas') ? 'feedback-success' : 'feedback-error'
            }`}
          >
            {result}
          </p>
        )}
      </div>

      {/* Chatbot sincronizado */}
      <Chatbot ref={chatbotRef} lessonContext={lessonContext} />
    </div>
  );
}

export default Leccion5;
