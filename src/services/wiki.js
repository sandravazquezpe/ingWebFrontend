import axios from "axios";

const URIWikis = 'http://localhost:8080/api/wikis'

const getAllWikis = async (setWikis) => {
  try {
    const res = await axios.get(URIWikis);
    setWikis(res.data)
  } catch (error) {
    console.error("Error al obtener todas las Wikis");
  }
}

const getWikiById = async (id, setWiki) => {
  try {
    const res = await axios.get(URIWikis+'/'+id);
    setWiki(res.data);
  } catch (error) {
    console.error("Error al obtener wiki:", error);
  }
}

const createWiki = async(wiki) =>{
  try {
    await axios.post(URIWikis, wiki);
  } catch (error) {
    console.log("Error al crear wiki")
  }
}

const deleteWiki = async(id) =>{
  try {
    await axios.delete(URIWikis+'/'+id);
  } catch (error) {
    console.log("Error al eliminar wiki")
  }
}

export const wikiServices = { getAllWikis , getWikiById, createWiki, deleteWiki}