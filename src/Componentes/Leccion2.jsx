import React, { useState } from 'react';
import axios from 'axios';
import Chatbot from './Chatbot';
import '../styles/Leccion2.css';

function Leccion2() {
    const [selectedWord, setSelectedWord] = useState('');
    const [correction, setCorrection] = useState('');
    const [feedback, setFeedback] = useState('');
    const [errorData, setErrorData] = useState(null);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const sentence = 'Un camaelon es un aminal que cambia de color';
    const correctWords = {
        camaelon: 'camaleón',
        aminal: 'animal',
    };

    const handleWordClick = (word) => {
        setSelectedWord(word);
        setFeedback('');
        setCorrection('');
        setErrorData(null);
        setIsChatbotOpen(false);
    };

    const handleCorrectionSubmit = async () => {
        if (correctWords[selectedWord] === correction.toLowerCase()) {
            setFeedback('¡Correcto!');
            setErrorData(null);
            setIsChatbotOpen(false);
        } else {
            setFeedback('Inténtalo de nuevo.');
            try {
                console.log(`Enviando error al backend: { text: "${correction}", lesson_number: "2" }`);
                const response = await axios.post('http://localhost:5001/check-error', {
                    text: correction,
                    lesson_number: '2',
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
            <Chatbot
                isOpen={isChatbotOpen}
                setIsOpen={setIsChatbotOpen}
                errorData={errorData}
            />
        </div>
    );
}

export default Leccion2;