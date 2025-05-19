import React, { useState } from 'react';
import axios from 'axios';
import paisaje from '../paisaje.jpg';
import Chatbot from './Chatbot';
import '../styles/Leccion5.css';

// Lista de errores ortográficos comunes y sus correcciones
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
    const [errorData, setErrorData] = useState(null);

    const handleValidate = async () => {
        const words = description
            .toLowerCase()
            .replace(/[.,!?]/g, '')
            .split(/\s+/);

        // Detectar palabras mal escritas basadas en commonMistakes
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
            setErrorData({ message: '¡No se encontraron errores!', error_detected: false });
        } else {
            setResult('Corrige las palabras mal escritas.');
            // Enviar el primer error detectado al backend
            const firstError = incorrectOriginal[0] || '';
            console.log('Enviando error al backend:', { text: firstError, lesson_number: '5' }); // Depuración
            try {
                const response = await axios.post('http://localhost:5001/check-error', {
                    text: firstError,
                    lesson_number: '5',
                });
                console.log('Respuesta del backend:', response.data); // Depuración
                setErrorData(response.data);
            } catch (error) {
                console.error('Error al enviar el error al backend:', error);
                setErrorData({
                    message: 'Error al conectar con el servidor.',
                    error_detected: false,
                });
            }
        }
    };

    const handleCorrectionChange = (index, value) => {
        const newCorrections = [...corrections];
        newCorrections[index] = value;
        setCorrections(newCorrections);
    };

    const handleValidateCorrections = () => {
        const allCorrect = corrections.every(
            (correction, index) =>
                correction.toLowerCase() === commonMistakes[misspelledWords[index]].toLowerCase()
        );
        setResult(allCorrect ? '¡Correcciones correctas!' : 'Algunas correcciones no son válidas.');
    };

    const handleReset = () => {
        setDescription('');
        setMisspelledWords([]);
        setCorrections([]);
        setResult(null);
        setValidationDone(false);
        setErrorData(null);
    };

    return (
        <div className="leccion5-container">
            <div className="leccion5-card">
                <h1 className="leccion5-title">Describe la imagen</h1>
                <img
                    src={paisaje}
                    alt="Paisaje para describir"
                    className="leccion5-image"
                />
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
                                            onChange={(e) =>
                                                handleCorrectionChange(index, e.target.value)
                                            }
                                            placeholder="Corrige aquí"
                                            className={`correction-input ${
                                                result &&
                                                corrections[index] &&
                                                corrections[index].toLowerCase() !==
                                                    commonMistakes[
                                                        misspelledWords[index]
                                                    ].toLowerCase()
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
                            result.includes('correctas')
                                ? 'feedback-success'
                                : 'feedback-error'
                        }`}
                    >
                        {result}
                    </p>
                )}
                <Chatbot lessonNumber="5" errorData={errorData} />
            </div>
        </div>
    );
}

export default Leccion5;