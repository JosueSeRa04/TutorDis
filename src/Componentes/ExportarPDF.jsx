// ExportarPDF.jsx
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Leccion1 from './Leccion1';
import Leccion2 from './Leccion2';
import Leccion3 from './Leccion3';
import Leccion4 from './Leccion4';
import Leccion5 from './Leccion5';
import '../styles/ExportarPDF.css';

const ExportarPDF = () => {
  const [seleccionadas, setSeleccionadas] = useState([]);
  const contenedorRef = useRef();

  const lecciones = [
    { id: 1, nombre: 'Lección 1', componente: <Leccion1 /> },
    { id: 2, nombre: 'Lección 2', componente: <Leccion2 /> },
    { id: 3, nombre: 'Lección 3', componente: <Leccion3 /> },
    { id: 4, nombre: 'Lección 4', componente: <Leccion4 /> },
    { id: 5, nombre: 'Lección 5', componente: <Leccion5 /> },
  ];

  const toggleSeleccion = (id) => {
    setSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDescarga = async () => {
    if (seleccionadas.length === 0) return alert("Selecciona al menos una lección.");

    const contenedor = contenedorRef.current;
    const pdf = new jsPDF('p', 'mm', 'a4');

    for (let i = 0; i < contenedor.children.length; i++) {
      const node = contenedor.children[i];

      const canvas = await html2canvas(node, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      if (i !== 0) pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save('lecciones_seleccionadas.pdf');
  };

  console.log("Contenedor a capturar:", contenedorRef.current);
console.log("Tiene hijos:", contenedorRef.current?.children.length);


  return (
    <div className="exportar-pdf-container">
      <h2>Selecciona las lecciones que deseas exportar</h2>
      <div className="checkbox-list">
        {lecciones.map((leccion) => (
          <label key={leccion.id} className="checkbox-item">
            <input
              type="checkbox"
              checked={seleccionadas.includes(leccion.id)}
              onChange={() => toggleSeleccion(leccion.id)}
            />
            {leccion.nombre}
          </label>
        ))}
      </div>

      <button onClick={handleDescarga} className="pdf-button">
        Descargar PDF
      </button>

      {/* Render invisible de las lecciones seleccionadas */}
      <div
        ref={contenedorRef}
        style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '1000px',
            opacity: 0,
            zIndex: -1,
            pointerEvents: 'none',
        }}
        >
        {lecciones
          .filter((l) => seleccionadas.includes(l.id))
          .map((l) => (
            <div key={l.id} style={{ marginBottom: '20px' }}>{l.componente}</div>
          ))}
      </div>
    </div>
  );
};

export default ExportarPDF;
