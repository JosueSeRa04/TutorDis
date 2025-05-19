import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Chatbot.css';

const Chatbot = ({ lessonNumber, errorData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    // Abrir el chatbot automáticamente si se detecta un error
    useEffect(() => {
        if(errorData && errorData.error_detected){
            setIsOpen(true);
            setMessages([{sender: 'bot', text: errorData.message }])
        }
    }, [errorData]);

    // Enviar mensaje del usuario al backend
    const sendMessage = async () => {
        if(!userInput.trim()) return;

        const newMessages = [...messages, { sender: 'user', text: userInput}];
        setMessages(newMessages);
        setUserInput('');

        try {
            const response = await axios.post('http://localhost:5001/check-error', {
                text: userInput,
                lesson_number: lessonNumber,
            });
            const botMessage = response.data.message;
            setMessages([...newMessages, { sender: 'bot', text: botMessage }]);
        } catch(error){
            setMessages([...newMessages, { sender: 'bot', text: 'Error al conectar con el servidor. '}]);
        }
    };

    // Manejar la tecla Enter
    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            sendMessage();
        }
    };
    
    return (
        <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          🗨️
        </button>
      )}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>Asistente de Aprendizaje</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
            />
            <button onClick={sendMessage}>Enviar</button>
          </div>
        </div>
      )}
    </div>
    );
};

export default Chatbot;