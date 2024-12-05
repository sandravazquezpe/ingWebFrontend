import axios from "axios";

const URIUsuarios = 'http://localhost:8080/api/usuarios'

const getUsuarioByNombre = async (nombre, setNombre) => {
    try{
        const res = await axios.get(URIUsuarios + "/nombre?nombre=" + nombre);
        return res;
    }catch(error){
        console.error("Error al obteener el usuario: ", error);
    }
}


export const usuarioServices = {getUsuarioByNombre}