import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import "../../styles/Notificacion.css";


function Notificacion({notificacionSeleccionada, setNotificacionSeleccionada}) {
    return (
        <div className="cuadro-notificacion-seleccionada">
            <div className="boton-volver-atras-notificacion">
                <IoIosArrowBack className="loguito-volver-atras" size={30} onClick={() => setNotificacionSeleccionada(null)}/>
            </div>
            <h5><strong>Nombre Wiki</strong></h5>
            <p>{notificacionSeleccionada.nombreWiki}</p>
            <h5><strong>Mensaje</strong></h5>
            <p>{notificacionSeleccionada.texto}</p>
        </div>
    );
}

export default Notificacion;