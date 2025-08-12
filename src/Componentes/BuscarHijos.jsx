// BuscarHijos.jsx
import React, { useState, useEffect } from 'react';
import '../styles/BuscarHijos.css';
import { NGROK_URL } from '../config';

const BuscarHijos = () => {
  const [email, setEmail] = useState('');
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [padres, setPadres] = useState([]);
  const [maestros, setMaestros] = useState([]);
  const [selectedHijo, setSelectedHijo] = useState(null);
  const [formData, setFormData] = useState({
    id_padre: '',
    id_maestro: '',
    nivelDificultad: '',
    accesibilidad: '',
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Obtener token del localStorage
  const token = localStorage.getItem('token');


  useEffect(() => {
    const fetchPadresMaestros = async () => {
      try {
        const response = await fetch(`${NGROK_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          },
        });
        if (!response.ok) throw new Error('Error al obtener usuarios');
        const usuarios = await response.json();
        setPadres(usuarios.filter((u) => u.tipoUsuario === 'Padre'));
        setMaestros(usuarios.filter((u) => u.tipoUsuario === 'Maestro'));
      } catch (err) {
        console.error(err);
      }
    };
    fetchPadresMaestros();
  }, [token]);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setError('');
    setResultados([]);
    setSelectedHijo(null);
    setFormSuccess('');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setResultados([]);
    setSelectedHijo(null);
    setFormSuccess('');
    setLoading(true);

    try {
      const response = await fetch(
        `${NGROK_URL}/api/buscar-hijos?email=${encodeURIComponent(email)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error al buscar hijos');
      }

      const data = await response.json();

      if (data.length === 0) {
        setError('No se encontraron hijos con ese correo.');
      } else {
        setResultados(data);
      }
    } catch (err) {
      setError('Ocurrió un error al realizar la búsqueda. Intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHijo = (hijo) => {
    setSelectedHijo(hijo);
    setFormData({
      id_padre: '',
      id_maestro: '',
      nivelDificultad: '',
      accesibilidad: '',
    });
    setFormError('');
    setFormSuccess('');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError('');
  };

  const handleRelacionesSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!formData.id_padre && !formData.id_maestro && !formData.nivelDificultad && !formData.accesibilidad) {
      setFormError('Debes proporcionar al menos un campo para crear la relación.');
      return;
    }

    try {
      
      const response = await fetch(`${NGROK_URL}/api/relaciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          id_hijo: selectedHijo.id_usuario,
          id_padre: formData.id_padre || null,
          id_maestro: formData.id_maestro || null,
          nivelDificultad: formData.nivelDificultad || null,
          accesibilidad: formData.accesibilidad || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear relaciones');
      }

      setFormSuccess('Relaciones creadas exitosamente.');
      setFormData({
        id_padre: '',
        id_maestro: '',
        nivelDificultad: '',
        accesibilidad: '',
      });
    } catch (err) {
      setFormError(err.message || 'Ocurrió un error al crear las relaciones.');
      console.error(err);
    }
  };

  return (
    <div className="buscar-hijos">
      <h2>Buscar Hijos por Correo</h2>
      <form onSubmit={handleSearch} className="form-busqueda">
        <input
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Ingresa el correo electrónico"
          className="input-correo"
          required
        />
        <button type="submit" className="boton-buscar" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {error && <p className="mensaje-error">{error}</p>}

      {resultados.length > 0 && (
        <div className="resultados">
          <h3>Resultados</h3>
          <ul className="lista-usuarios">
            {resultados.map((hijo) => (
              <li
                key={hijo.id_usuario}
                className={`usuario-item ${selectedHijo?.id_usuario === hijo.id_usuario ? 'selected' : ''}`}
                onClick={() => handleSelectHijo(hijo)}
              >
                <span>{hijo.nombre}</span> - <span>{hijo.correo}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedHijo && (
        <div className="form-relaciones">
          <h3>Crear Relaciones para {selectedHijo.nombre}</h3>
          <form onSubmit={handleRelacionesSubmit}>
            <div className="form-group">
              <label>Padre/Tutor</label>
              <select
                name="id_padre"
                value={formData.id_padre}
                onChange={handleFormChange}
                className="select-input"
              >
                <option value="">Selecciona un padre</option>
                {padres.map((padre) => (
                  <option key={padre.id_usuario} value={padre.id_usuario}>
                    {padre.nombre} ({padre.correo})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Maestro</label>
              <select
                name="id_maestro"
                value={formData.id_maestro}
                onChange={handleFormChange}
                className="select-input"
              >
                <option value="">Selecciona un maestro</option>
                {maestros.map((maestro) => (
                  <option key={maestro.id_usuario} value={maestro.id_usuario}>
                    {maestro.nombre} ({maestro.correo})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Nivel de Dificultad</label>
              <input
                type="text"
                name="nivelDificultad"
                value={formData.nivelDificultad}
                onChange={handleFormChange}
                placeholder="Ej. 1,2,3,4,5"
                className="input-text"
              />
            </div>
            <div className="form-group">
              <label>Accesibilidad</label>
              <input
                type="text"
                name="accesibilidad"
                value={formData.accesibilidad}
                onChange={handleFormChange}
                placeholder="Ej. Visual, Auditiva"
                className="input-text"
              />
            </div>
            {formError && <p className="mensaje-error">{formError}</p>}
            {formSuccess && <p className="mensaje-exito">{formSuccess}</p>}
            <button type="submit" className="boton-crear">
              Crear Relaciones
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BuscarHijos;