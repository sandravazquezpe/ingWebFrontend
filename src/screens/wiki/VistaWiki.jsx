import React, { useEffect, useState } from 'react'

import { wikiServices } from '../../services/wiki'
import { useNavigate, useParams } from 'react-router-dom';
import Buscador from '../../components/buscador/Buscador';
import Entrada from '../../components/entrada/Entrada';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ImBin } from "react-icons/im";
import { RiAddCircleFill } from "react-icons/ri";
import { entradaServices } from '../../services/entrada';


const VistaWiki = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [wiki, setWiki] = useState({
    tema: "",
    entradas: [],
    autor: ""
  });

  const [entradas, setEntradas] = useState([{
    _id: "",
    idWiki: "",
    id_entrada: "",
    titulo: "",
    texto: "",
    comentarios: [],
    autor: "",
    editores: [],
    num_version: null,
    version_actual: false,
    fecha_creacion: "",
    nota: null,
    lat: null,
    lon: null,
    calle: "",
    url: ""
  }]);

  useEffect(() => {
    wikiServices.getWikiById(id, setWiki)
    entradaServices.getAllEntradasByWiki(id, setEntradas);
  }, [id])

  const handleDelete = async (e) => {
    e.preventDefault();
    await wikiServices.deleteWiki(id);
    navigate("/");
  }

  return (
    <>
      <div className="container my-3">
        {/* Botón de navegación */}
        <div className="d-flex justify-content-start mb-3">
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Volver al inicio
          </button>
        </div>
        <Buscador setResultado={setEntradas} idWiki={id} />
        <div className="card my-3">
          <div className="card-body">
            <div className="icon-container">
              <RiAddCircleFill style={{ fontSize: '35px', paddingTop: '2px' }} onClick={() => navigate(`/createEntrada/${id}`)} />
              <ImBin className="icon bin" onClick={e => handleDelete(e)} style={{ fontSize: '24px', margin: '5px' }} />
            </div>
            <div className="contenido-card-wiki">
              <h1 className="card-title" dangerouslySetInnerHTML={{ __html: wiki?.tema }}></h1>
              <p className="autor-text">{wiki.autor}</p>
              <ul className='lista'>
                {entradas?.filter(entrada => entrada.version_actual === true).map(entrada =>
                  <li key={entrada._id}>
                    <Entrada entrada={entrada.id_entrada} />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VistaWiki