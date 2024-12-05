import React, { useState, useEffect } from 'react';
import Comentario from './Comentario';
import 'bootstrap/dist/css/bootstrap.min.css';
import { comentariosServices } from '../../services/comentario';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const Desplegable = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const [textoComentario, setTextoComentario] = useState('');

  const publicarComentario = async (e) => {
    e.preventDefault();

    const nuevoComentario = {
      idEntrada: id,
      texto: textoComentario,
      autor: "Emilio",
    };

    try {
      await comentariosServices.addComentario(nuevoComentario);
      setTextoComentario('');
      setComentarios([...comentarios, nuevoComentario]);
    } catch (error) {
      console.error("Error al publicar comentario:", error);
    }
  };

  const handleEliminarComentario = async (idComentario) => {
    try {
      await comentariosServices.deleteComentario(idComentario);
      setComentarios(comentarios.filter(comentario => comentario._id !== idComentario));
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      comentariosServices
        .getAllComentariosByEntrada(id, setComentarios)
        .catch((error) => console.error("Error al cargar comentarios:", error));
    }
  }, [isOpen, id]);

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Ocultar Comentarios" : "Mostrar Comentarios"}
      </button>
      {isOpen && (
        <div className="card my-3">
          <div className="card-body">
            <ul className="lista">
              {comentarios != null && comentarios.length > 0 ? (
                comentarios.map((comentario) => (
                  <Comentario
                    key={comentario.id}
                    comentario={comentario}
                    onComentarioEliminado={handleEliminarComentario}
                  />
                ))
              ) : (
                <li>No hay comentarios disponibles.</li>
              )}
            </ul>
            <InputGroup className="mb-3" style={{ maxWidth: '400px', margin: '0 auto' }}>
              <FormControl
                placeholder="Comentar"
                value={textoComentario}
                onChange={(e) => setTextoComentario(e.target.value)}
              />
              <Button variant="outline-primary" onClick={publicarComentario}>
                Publicar
              </Button>
            </InputGroup>
          </div>
        </div>
      )}
    </div>
  );
};

export default Desplegable;
