import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaStar } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import S3ImageViewer from "../../images/S3ImageViewer";
import { entradaServices } from "../../services/entrada";
import "../../styles/default.css";
import Desplegable from "../comentarios/Desplegable";
import Mapa from "../mapa/mapa";
import DesplegableEditores from "./DesplegableEditores";
import DesplegableVersiones from "./DesplegableVersiones";
import Alerta from "../alerta/alerta";

function Entrada(idEntrada) {
    const id = Object.values(idEntrada)[0];

    const [entrada, setEntrada] = useState([]);
    const [calificacion, setCalificacion] = useState({
        nota: 0,
    }); // Estado para la calificación seleccionada
    const [hoverCalificacion, setHoverCalificacion] = useState(0); // Estado para la calificación al pasar el ratón
    const [mostrarAlerta, setMostrarAlerta] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        entradaServices.getEntradaById(id, setEntrada);
    }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        await entradaServices.deleteEntrada(id);
        window.location.reload();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await entradaServices.valorarEntrada(entrada._id, calificacion);
        setMostrarAlerta(true);
        setTimeout(() => {
            window.location.reload();
            setMostrarAlerta(false);
        }, 2500);
    };

    return (

        <div className={mostrarAlerta ? "card my-3 cursor-spinner" :"card my-3"} style={{ position: "relative" }}>
            <div className="card-body">
                <div className="icon-container">
                    <FaPencilAlt className="icon pencil" onClick={() => navigate(`/updateEntrada/${id}`)} />
                    <ImBin className="icon bin" onClick={(e) => handleDelete(e)} />
                </div>
                <div className="contenido-card-entrada" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="card-izquierda" style={{ marginBottom: '16px' }}>
                        <p className="autor-text">{entrada?.autor}</p>
                        <h5 className="card-title" dangerouslySetInnerHTML={{ __html: entrada?.titulo }} />
                        <p className="card-text" dangerouslySetInnerHTML={{ __html: entrada?.texto }}></p>
                    </div>
                    
                    {entrada?.lat !== 0 && entrada?.lon !== 0 && entrada?.calle &&
                        <div className="card-derecha-optional" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign:'center' }}>
                            <Mapa lat={entrada.lat} lon={entrada.lon} />
                            <p>{entrada.calle}</p>
                        </div>
                    }
                    {entrada?.url !== null &&
                        <div style={{ marginTop: '16px' }}>
                            <S3ImageViewer filePath={entrada.url} />
                        </div>
                    }
                </div>
            </div>


            {/* Calificación con estrellas */}
            <div className="calificacion-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
                {/* Desplegable */}
                <Desplegable id={id} />
                <br />

            
            <div className="stars-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign:'center' }}>
                <form onSubmit={(e) => handleSubmit(e)} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems:'center' }}>
                    <h6 style={{ marginBottom: '8px' }}>Calificación:</h6>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {[...Array(5)].map((_, index) => (
                            <FaStar
                                key={index}
                                className={`star ${index < (hoverCalificacion || calificacion.nota) ? "selected" : ""}`}
                                onClick={() => setCalificacion((prevState) => ({ ...prevState, nota: index + 1 }))} // Selección de la calificación
                                onMouseEnter={() => setHoverCalificacion(index + 1)} // Hover temporal
                                onMouseLeave={() => setHoverCalificacion(0)} // Resetear hover al salir
                                style={{
                                    cursor: "pointer",
                                    color: index < (hoverCalificacion || calificacion.nota) ? "gold" : "gray",
                                }}
                            />
                        ))}
                        
                    </div>
                    <button className="btn btn-warning" disabled={mostrarAlerta}>Guardar Calificacion</button>
                </form>
            </div>
            </div>

            

            {/* Botón desplegable con los editores */}
            <div className="container-desplegables">
                <DesplegableEditores editores={entrada?.editores} />
                <DesplegableVersiones idEntrada={entrada?.id_entrada} />
            </div>
            {mostrarAlerta && <Alerta mensaje="Guardando valoración..." tipo="success" />}
        </div>

    );
}

export default Entrada;
