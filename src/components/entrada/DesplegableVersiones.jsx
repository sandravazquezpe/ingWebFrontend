import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { entradaServices } from "../../services/entrada";
import "../../styles/default.css";

const DesplegableVersiones = ({ idEntrada }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [versiones, setVersiones] = useState([]);

    useEffect(() => {
        const cargarVersiones = async () => {
            if (idEntrada !== undefined) {
                await entradaServices.getVersionesByEntrada(idEntrada, setVersiones);
            }
        };

        cargarVersiones();
    }, [idEntrada]);

    const cambiarVersion = async (num_vers, id_entr) => {
        await entradaServices.updateVersionEntrada(id_entr, num_vers);
        // Aquí actualiza el estado o haz cualquier operación adicional en lugar de recargar la página.
        const actualizadas = await entradaServices.getVersionesByEntrada(idEntrada);
        window.location.reload();
    };

    return (
        <div>
            <button className="custom-button" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                    <>
                        Ocultar versiones <span className="arrow">▲</span>
                    </>
                ) : (
                    <>
                        Mostrar versiones <span className="arrow">▼</span>
                    </>
                )}
            </button>
            {isOpen && (
                <div className="card my-3" style={{ maxWidth: "300px" }}>
                    <div className="card-body">
                        <ul className="lista">
                            {versiones !== undefined && versiones.length > 0 ? (
                                versiones.map((version, index) => (
                                    <div key={index} className="version-item">
                                        <div>
                                            <button
                                                className={version.version_actual ? 'boton-blanco btn-versionactual' : 'boton-blanco'}
                                                onClick={() => cambiarVersion(version.num_version, version.id_entrada)}
                                            >
                                                {version.num_version}
                                            </button>
                                            <hr />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <li>No hay versiones.</li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DesplegableVersiones;