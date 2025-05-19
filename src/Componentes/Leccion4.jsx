import React, { useState } from 'react';
import axios from 'axios';
import Chatbot from './Chatbot';
import '../styles/Leccion4.css';

function Leccion4() {
    const words = [
        { incomplete: 'p_rro', complete: 'perro' },
        { incomplete: 'Corr_cto', complete: 'Correcto' },
        { incomplete: '_l_fant_e', complete: 'elefante' },
        { incomplete: '_sp_jo', complete: 'espejo' },
    ];
    const [answers, setAnswers] = useState(words.map(() => ''));
    const [result, setResult] = useState(null);
    const [errorData, setErrorData] = useState(null);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const handleInputChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = async () => {
        const isCorrect = answers.every((answer, index) =>
            answer.toLowerCase() === words[index].complete.toLowerCase()
        );
        if (isCorrect) {
            setResult('¡Correcto!');
            setErrorData(null);
            setIsChatbotOpen(false);
        } else {
            setResult('Incorrecto, revisa tus respuestas.');
            const incorrectAnswers = answers
                .map((answer, index) => ({ answer, correct: words[index].complete }))
                .filter(({ answer, correct }) => answer.toLowerCase() !== correct.toLowerCase());
            const firstIncorrect = incorrectAnswers[0]?.answer || '';
            try {
                console.log(`Enviando error al backend: { text: "${firstIncorrect}", lesson_number: "4" }`);
                const response = await axios.post('http://localhost:5001/check-error', {
                    text: firstIncorrect,
                    lesson_number: '4',
                });
                console.log('Respuesta del backend:', response.data);
                setErrorData(response.data);
                setIsChatbotOpen(true);
            } catch (error) {
                console.error('Error al conectar con el backend:', error);
                setErrorData({
                    message: 'Error al conectar con el backend.',
                    error_detected: false,
                });
            }
        }
    };

    const handleReset = () => {
        setAnswers(words.map(() => ''));
        setResult(null);
        setErrorData(null);
        setIsChatbotOpen(false);
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
                <Chatbot
                    isOpen={isChatbotOpen}
                    setIsOpen={setIsChatbotOpen}
                    errorData={errorData}
                />
            </div>
        </div>
    );
}

export default Leccion4;