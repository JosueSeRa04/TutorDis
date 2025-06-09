import './styles/homepage.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Login from './Componentes/Login';
import Register from './Componentes/Register';
import Dashboard from './Componentes/Dashboard';
import AccountSettings from './Componentes/AccountSettings';
import ProtectedRoute from './Componentes/ProtectedRoute';
import DashboardTeacher from './Componentes/DashboardTeacher';
import DashboardPadre from './Componentes/DashboardPadre';
import Homepage from './Componentes/homepage';
import Lecciones from './Componentes/Lecciones';
import Leccion1 from './Componentes/Leccion1';
import Leccion2 from './Componentes/Leccion2';
import Leccion3 from './Componentes/Leccion3';
import Leccion4 from './Componentes/Leccion4';
import Leccion5 from './Componentes/Leccion5';
import Buscar from './Componentes/BuscarHijos';
import ListadoHijos from './Componentes/ListadoHijosPadre';
import ListadoAlumnos from './Componentes/ListadoHijosMaestro';
import ListadoRelacionesHijo from './Componentes/ListadoRelacionesHijo';
import Descargas from './Componentes/ExportarPDF';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verificar si el usuario está autenticado al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('token');
    const nombre = localStorage.getItem('nombre');
    setIsLoggedIn(!!token);
  }, []);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        {/*Página de inicio de sesion */}
        <Route 
          path="/" 
          element={  
              <div className="homepage">
                  <Login onLogin={setIsLoggedIn} />                
                  <Register />                
              </div>
            }
        />
        <Route
        path="/dashboard"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Dashboard onLogout={handleLogout}/>
            <Homepage/>
          </ProtectedRoute>
        }
        />
        <Route 
          path="/dashboardteacher"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <DashboardTeacher onLogout={handleLogout}/>
              <Homepage/>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/dashboardpadre"
          element = {
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <DashboardPadre onLogout={handleLogout}/>
              <Homepage/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/settings'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AccountSettings/>
            </ProtectedRoute>
          }
        />

        <Route
          path='/lecciones'
          element={
            <Lecciones/>
          }
        />
        <Route
          path='/descargas'
          element = {
            <Descargas/>
          }
        />
        <Route
          path='/maestrohijo'
        />
        <Route
          path='/padrehijo'
        />
        <Route
          path='/leccion1' 
          element={<Leccion1/>}
        />
        <Route
          path='/leccion2'
          element={<Leccion2/>}
        /> 
        <Route
          path='/leccion3'
          element={<Leccion3/>}
        />
        <Route
          path='/leccion4'
          element={<Leccion4/>}
        />
        <Route
          path='/leccion5'
          element={<Leccion5/>}
        />
        <Route
          path='/agregarhijo'
          element={<Buscar/>}
        />
        <Route
          path='/hijos'
          element={<ListadoHijos/>}
        />
        <Route
          path='/administraralumnos'    
          element={<ListadoAlumnos/>}      
        />
        <Route
          path='/tutores'        
          element={<ListadoRelacionesHijo/>}
        />
      </Routes>

    </Router>
  );
}

export default App;
