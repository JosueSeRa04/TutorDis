import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import axios from 'axios';
import Chatbot from './Chatbot';
import '../styles/Leccion1.css';

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const Leccion1 = () => {
    const correctWord = 'CONTRAER';
    const [letters, setLetters] = useState(shuffleArray(correctWord.split('')));
    const [message, setMessage] = useState('');
    const [errorData, setErrorData] = useState(null);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = letters.indexOf(active.id);
            const newIndex = letters.indexOf(over.id);
            const newLetters = arrayMove(letters, oldIndex, newIndex);
            setLetters(newLetters);
            setMessage('');
        }
    };

    const handleSubmit = async () => {
        const currentWord = letters.join('');
        if (currentWord === correctWord) {
            setMessage('¡Correcto! Muy bien hecho.');
            setErrorData(null);
            setIsChatbotOpen(false);
        } else {
            setMessage('Inténtalo de nuevo.');
            try {
                console.log(`Enviando error al backend: { text: "${currentWord}", lesson_number: "1" }`);
                const response = await axios.post('http://localhost:5001/check-error', {
                    text: currentWord,
                    lesson_number: '1',
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
        <div className="leccion1-container">
            <h1 className="leccion1-title">Ordena las letras</h1>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={letters} strategy={rectSortingStrategy}>
                    <div className="letters-container">
                        {letters.map((letter, index) => (
                            <LetterBlock key={index} id={letter} letter={letter} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
            <button onClick={handleSubmit} className="verify-button">
                Verificar
            </button>
            {message && <p className="message">{message}</p>}
            <Chatbot
                isOpen={isChatbotOpen}
                setIsOpen={setIsChatbotOpen}
                errorData={errorData}
            />
        </div>
    );
};

const LetterBlock = ({ id, letter }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="letter-block"
        >
            {letter}
        </div>
    );
};

export default Leccion1;