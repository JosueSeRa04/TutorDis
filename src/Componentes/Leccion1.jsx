// Leccion1.jsx
import React, { useState, useCallback, useRef } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import axios from 'axios';
import '../styles/Leccion1.css';
import Chatbot from './Chatbot';

const lessonContext = `
Esta lección enseña a ordenar letras para formar la palabra correcta "CONTRAER" usando una interfaz de arrastrar y soltar. Los estudiantes deben reorganizar las letras desordenadas.
`;

const token = localStorage.getItem('token');

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Leccion1 = () => {
  const correctWord = 'CONTRAER';
  const [letters, setLetters] = useState(shuffleArray(correctWord.split('')));
  const [message, setMessage] = useState('');
  const chatbotRef = useRef(null);

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

  const handleSubmit = useCallback(async () => {
    const currentWord = letters.join('');
    const esCorrecto = currentWord === correctWord;
    setMessage(esCorrecto ? '¡Correcto! Muy bien hecho.' : 'Inténtalo de nuevo.');

    // Registrar el intento en la base de datos
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/guardar-intento', {
        id_ejercicio: 1, 
        resultado: esCorrecto ? 'correcto' : 'incorrecto',
        erroresDetectados: esCorrecto ? 0 : 1,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Intento guardado.');
    } catch (error) {
      console.error('Error al guardar intento:', error);
    }

    // Enviar el error al chatbot si es incorrecto
    if (!esCorrecto) {
      const errorData = {
        incorrect_word: currentWord,
        correct_word: correctWord,
      };
      if (chatbotRef.current) {
        chatbotRef.current.handleErrorDetected(errorData);
      }
    }
  }, [letters, correctWord]);


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
      <Chatbot ref={chatbotRef} lessonContext={lessonContext} />
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
