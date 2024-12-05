import axios from "axios";

const URIComentarios = 'http://localhost:8080/api/comentarios'

const getAllComentariosByEntrada = async (idEntrada, setComentarios) => {
  try {
    const response = await axios.get(URIComentarios+'/entrada?idEntrada=' + idEntrada);
    setComentarios(response.data);
    //return response.data;
  } catch (error) {
    console.error("Error al obtener todos los comentarios por entrada");
  }
}

const addComentario = async(comentario) => {
  try {
    await axios.post(URIComentarios, comentario);
  } catch (error) {
    console.log("Error al crear comentario")
  }
}

const deleteComentario = async(id) =>
{
  try{
    await axios.delete(URIComentarios + "/" + id);
  }catch(error){
    console.log("Error al eliminar el comentario")
  }
}
export const comentariosServices = { getAllComentariosByEntrada, addComentario, deleteComentario}