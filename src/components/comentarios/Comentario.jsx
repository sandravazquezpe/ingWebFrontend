import React from 'react'
import "../../styles/default.css"
import { ImBin } from "react-icons/im";


function Comentario({ comentario, onComentarioEliminado }) {
  const handleDelete = async () => {
    if (onComentarioEliminado) {
      onComentarioEliminado(comentario?._id);
    }
  };

  return (
    <div className="card my-3">
      <div className="card-body">
        <div className="icon-container">
          <ImBin className="icon bin" onClick={handleDelete} />
        </div>
        <p className="autor-text">{comentario?.autor}</p>
        <p className="card-text">{comentario?.texto}</p>
      </div>
    </div>
  );
}


export default Comentario