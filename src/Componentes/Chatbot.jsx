// Chatbot.jsx
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import axios from 'axios';
import '../styles/Chatbot.css';

const Chatbot = forwardRef(({ lessonContext }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const CHAT_GROK = 'https://fbbb-34-142-250-56.ngrok-free.app';

  useImperativeHandle(ref, () => ({
    handleErrorDetected
  }));

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    console.log("Hola entreeee");

    try {
      const response = await axios.post(`${CHAT_GROK}/chat`, {
        prompt: input,
        lesson_context: lessonContext,
        error_data: null,
      }, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
        }});
      
      const botMessage = { role: 'bot', content: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'bot',
        content: `Error: ${error.response?.data?.error || 'No se pudo conectar con el chatbot.'}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error('Error en la solicitud:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleErrorDetected = async (errorData) => {
    if (!errorData) return;
    setIsLoading(true);
    try {
      const response = await axios.post(`${CHAT_GROK}/chat`, {
        prompt: "Proporciona retroalimentación sobre el error cometido.",
        lesson_context: lessonContext,
        error_data: errorData,
      }, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
        }});
      const botMessage = { role: 'bot', content: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'bot',
        content: `Error: ${error.response?.data?.error || 'No se pudo conectar con el chatbot.'}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error('Error en la solicitud:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Cerrar Chat' : 'Abrir Chat'}
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <span>{msg.content}</span>
              </div>
            ))}
            {isLoading && <div className="message bot">Cargando...</div>}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Escribe tu pregunta..."
            />
            <button onClick={sendMessage} disabled={isLoading}>
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default Chatbot;
