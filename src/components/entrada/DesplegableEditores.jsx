import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { usuarioServices } from '../../services/usuario';

const DesplegableEditores = ({ editores }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notas, setNotas] = useState({})

  useEffect(() => {
    const cargarNotas = async () => {
      if (editores!=undefined) {
        const nuevasNotas = {};
        for (const editor of editores) {
          try {
            const res = await usuarioServices.getUsuarioByNombre(editor);
            nuevasNotas[editor] = res.data.nota; // Asocia la nota al editor
          } catch (error) {
            console.error(`Error al obtener la nota para ${editor}:`, error);
            nuevasNotas[editor] = "Nota no disponible"; // Manejo de error
          }
        }
        setNotas(nuevasNotas);
      }
    };

    cargarNotas();
  }, [editores]);

  return (
    <div>
      <button
        className="custom-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <>
            Ocultar editores <span className="arrow">▲</span>
          </>
        ) : (
          <>
            Mostrar editores <span className="arrow">▼</span>
          </>
        )}
      </button>
      {isOpen && (
        <div className="card my-3" style={{ maxWidth: '300px' }}>
          <div className="card-body">
            <ul className="lista" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {editores != null && editores.length > 0 ? (
                editores.map((editor, index) => (
                  <div key={index} className="editor-item">
                    <div className="container-desplegables">
                      <span className='me-2'>{editor}</span>
                      <span>Nota: {notas[editor] ?? "Nota no disponible"}</span>
                    </div>
                    {index < editores.length - 1 && <hr />}
                  </div>
                ))
              ) : (
                <li>No hay editores.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesplegableEditores;
