// Leccion4.jsx
import React, { useState, useRef } from 'react';
import '../styles/Leccion4.css';
import Chatbot from './Chatbot';

function Leccion4() {
  const words = [
    { incomplete: 'p_rro', complete: 'perro' },
    { incomplete: 'Corr_cto', complete: 'Correcto' },
    { incomplete: '_l_fant_e', complete: 'elefante' },
    { incomplete: '_sp_jo', complete: 'espejo' },
  ];
  const [answers, setAnswers] = useState(words.map(() => ''));
  const [result, setResult] = useState(null);

  const chatbotRef = useRef(null);

  const lessonContext = `
  Esta lección requiere completar palabras incompletas con la letra "e". Ejemplos: "p_rro" se completa como "perro", "_l_fant_e" como "elefante".
  `;

  const handleInputChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const isCorrect = answers.every((answer, index) =>
      answer.toLowerCase() === words[index].complete.toLowerCase()
    );

    if (isCorrect) {
      setResult('¡Correcto!');
    } else {
      setResult('Incorrecto, revisa tus respuestas.');

      // 🚨 Detectar los errores y enviar al chatbot
      const incorrectAnswers = answers
        .map((answer, index) => ({
          user_answer: answer,
          correct_answer: words[index].complete,
          word_index: index,
          original_incomplete: words[index].incomplete,
        }))
        .filter(({ user_answer, correct_answer }) =>
          user_answer.toLowerCase() !== correct_answer.toLowerCase()
        );

      if (chatbotRef.current && incorrectAnswers.length > 0) {
        chatbotRef.current.handleErrorDetected({
          incorrect_answers: incorrectAnswers,
        });
      }
    }
  };

  const handleReset = () => {
    setAnswers(words.map(() => ''));
    setResult(null);
  };

  return (
    <div className="leccion4-container">
      <div className="leccion4-card">
        <h1 className="leccion4-title">Completa las palabras con la letra "e"</h1>
        <div className="words-container">
          {words.map((word, index) => (
            <div key={index} className="word-row">
              <span className="word-incomplete">{word.incomplete}</span>
              <input
                type="text"
                value={answers[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                disabled={result !== null}
                className={`word-input ${
                  result !== null &&
                  answers[index].toLowerCase() !== word.complete.toLowerCase()
                    ? 'error'
                    : ''
                }`}
                placeholder="Escribe aquí"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={result !== null || answers.some((answer) => answer === '')}
          className="validate-button"
        >
          Validar
        </button>
        {result && (
          <div>
            <p
              className={`feedback ${
                result === '¡Correcto!' ? 'feedback-success' : 'feedback-error'
              }`}
            >
              {result}
            </p>
            {result !== '¡Correcto!' && (
              <p className="correct-answers">
                Respuestas correctas: {words.map((w) => w.complete).join(', ')}
              </p>
            )}
            <button onClick={handleReset} className="reset-button">
              Volver a intentar
            </button>
          </div>
        )}
      </div>
      <Chatbot ref={chatbotRef} lessonContext={lessonContext} />
    </div>
  );
}

export default Leccion4;
