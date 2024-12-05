import axios from "axios";

const URINotificaciones = 'http://localhost:8080/api/notificaciones/'

const getAllNotificacionesByUsuario = async (id, setNotificaciones) => {
    try {
        const res = await axios.get(URINotificaciones+id);
        setNotificaciones(res.data)
    } catch (error) {
        console.error("Error al obtener todas las notificaciones");
    }
}

const deleteNotificaciones = async (id, setNotificaciones) => {
    try {
        await axios.delete(URINotificaciones+id);
        setNotificaciones([])
    } catch (error) {
        console.error("Error al eliminar notificacion");
    }
}

export const notificacionServices = { getAllNotificacionesByUsuario, deleteNotificaciones };
