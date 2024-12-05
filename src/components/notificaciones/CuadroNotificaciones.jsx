import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/CuadroNotificaciones.css";

import { IoMdNotifications } from "react-icons/io";
import { MdNotificationImportant } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";

import Notificacion from "./Notificacion";
import { notificacionServices } from "../../services/notificacion";

function CuadroNotificaciones({ usuario }) {
  const [visible, setVisible] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const [notificacionSeleccionada, setNotificacionSeleccionada] = useState(null);

  useEffect(() => {
    notificacionServices.getAllNotificacionesByUsuario(
      usuario,
      setNotificaciones
    );
  }, [usuario]);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const seleccionarNotificacion = (notificacion) => {
    setNotificacionSeleccionada(notificacion);
  };

  return (
    <div className="position-relative top-0 p-3">
      <div className="btn-notificaciones-elemento">
        <button className="btn btn-warning" onClick={toggleVisibility}>
          <IoMdNotifications size={20} />
        </button>
      </div>
      {visible && (
        <div
          className="toast show notificaciones cuadro-notificaciones-general"
          role="alert"
        >
          <div className="toast-header">
            <strong>Tus notificaciones</strong>
            <button className="borrar-notificaciones-loguito btn btn-danger" >
              <FaTrashCan size={20} onClick={() => notificacionServices.deleteNotificaciones(usuario, setNotificaciones)} />
            </button>
          </div>
          <div className="toast-body">
            <div>
              {notificacionSeleccionada === null ? (
                <>
                  {notificaciones.map((notificacion) => (
                    <div
                      key={notificacion.id}
                      className="notificacion-cuadro border rounded"
                      onClick={() => seleccionarNotificacion(notificacion)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="notificacion-loguito">
                        <MdNotificationImportant size={20} />
                      </div>
                      <div className="notificacion-asunto">
                        Hay una nueva notificación suya en la Wiki{" "}
                        <strong>{notificacion.nombreWiki}</strong>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <Notificacion
                  notificacionSeleccionada={notificacionSeleccionada}
                  setNotificacionSeleccionada={setNotificacionSeleccionada}
                />
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default CuadroNotificaciones;
