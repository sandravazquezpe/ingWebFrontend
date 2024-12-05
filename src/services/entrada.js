import axios from "axios";

const URIEntradas = 'http://localhost:8080/api/entradas'

const getAllEntradasByWiki = async (idWiki, setEntradas) => {
  try {
    const response = await axios.get(URIEntradas + '/wiki/' + idWiki);
    setEntradas(response.data);
  } catch (error) {
    console.error("Error al obtener todas las entradas por wiki");
  }
}

const getEntradaById = async (id, setEntrada) => {
  try {
    const res = await axios.get(URIEntradas + '/' + id);
    setEntrada(res.data);
  } catch (error) {
    console.error("Error al obtener wiki:", error);
  }
}

const createEntrada = async (entrada) => {
  try {
    await axios.post(URIEntradas, entrada, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error) {
    console.error('Error al crear la entrada:', error);
  }
};


const updateEntrada = async (id, editor, entrada) => {
  try {
    await axios.put(URIEntradas + "/" + id + "?editor=" + editor, entrada, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error) {
    console.log("Error al actualizar la entrada")
  }
}

const deleteEntrada = async (idEntrada) => {
  try {
    await axios.delete(URIEntradas + "/" + idEntrada);
  } catch (error) {
    console.log("Error al eliminar la entrada")
  }
}

const valorarEntrada = async (idEntrada, calificacion) => {
  try {
    await axios.put(URIEntradas + "/" + idEntrada + "/valoracion", calificacion);
  } catch (error) {
    console.log("Error al valorar la entrada: ", error);
  }
}

const getVersionesByEntrada = async (idEntrada, setVersiones) => {
  try {
    const response = await axios.get(URIEntradas + "/versiones/" + idEntrada);
    setVersiones(response.data);
  } catch (error) {
    console.log("Error al obtener las versiones de una entrada", error);
  }
}

const updateVersionEntrada = async (idEntrada, version) => {
  try {
    await axios.put(URIEntradas + "/version/" + idEntrada + "?version=" + version);
  } catch (error) {
    console.log("Error al actualizar la version de la entrada", error);
  }
}

const buscarEntradaTexto = async (busquedaTexto) => {
  try {
    const resTexto = await axios.get(URIEntradas + "/texto?palabra=" + busquedaTexto);
    const resAutor = await axios.get(URIEntradas + "/autor?autor=" + busquedaTexto);
    const resEditor = await axios.get(URIEntradas + "/editor?editor=" + busquedaTexto);
    const resCombinados = [
      ...new Map([...resTexto.data, ...resAutor.data, ...resEditor.data]
        .map(entrada => [entrada._id, entrada])
      ).values()
    ];
    return resCombinados;
  } catch (error) {
    console.log("Error al buscar entradas");
  }

}

const buscarEntradaFechas = async (fechaInicio, fechaFin, idWiki) => {
  try {
    const formattedStartDate = new Date(fechaInicio).toISOString();
    const formattedEndDate = new Date(fechaFin).toISOString();
    const res = await axios.get(URIEntradas+"/fechaCreacion?fechaInicio="+formattedStartDate+"&fechaFin="+formattedEndDate+"&idWiki="+idWiki);
    return res.data;
  } catch (error) {
    console.log("Error al buscar entradas por fechas");
  }
}


export const entradaServices = {
  getAllEntradasByWiki, getEntradaById, createEntrada, updateEntrada,
  deleteEntrada, valorarEntrada, getVersionesByEntrada, updateVersionEntrada, buscarEntradaTexto, buscarEntradaFechas
}