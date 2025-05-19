import React, { useState } from 'react';
import axios from 'axios';
import Chatbot from './Chatbot';
import '../styles/Leccion3.css';

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
    const [errorData, setErrorData] = useState(null);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const handleSelect = async (word) => {
        setSelectedWord(word);
        if (word === correctWord) {
            setResult('¡Correcto!');
            setErrorData(null);
            setIsChatbotOpen(false);
        } else {
            setResult('Incorrecto, intenta de nuevo.');
            try {
                console.log(`Enviando error al backend: { text: "${word}", lesson_number: "3" }`);
                const response = await axios.post('http://localhost:5001/check-error', {
                    text: word,
                    lesson_number: '3',
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
        setSelectedWord(null);
        setResult(null);
        setErrorData(null);
        setIsChatbotOpen(false);
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
                    <div>
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
                    </div>
                )}
                {result && (
                    <button onClick={handleReset} className="reset-button">
                        Volver a intentar
                    </button>
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

export default Leccion3;