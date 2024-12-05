import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { entradaServices } from '../../services/entrada';

const ActualizarEntrada = () => {
  const { idEntrada } = useParams();
  const navigate = useNavigate();

  const [entrada, setEntrada] = useState({
    idWiki: '',
    titulo: '',
    texto: '',
    autor: '',
    calle: '',
    file: null,
  });

  const [tipo, setTipo] = useState(''); // 'calle' o 'imagen'
  
  //Obtener editor del usuario que tenga la sesion iniciada
  //Por defecto es Emilio
  const editor = "Emilio";

  useEffect(() => {
    entradaServices.getEntradaById(idEntrada, setEntrada);
  }, [idEntrada]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEntrada({ ...entrada, [name]: value });
  };

  const handleFileChange = (e) => {
    setEntrada({ ...entrada, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('idWiki', entrada.idWiki);
    formData.append('titulo', entrada.titulo);
    formData.append('texto', entrada.texto);
    formData.append('autor', entrada.autor);

    if (tipo === 'calle') {
      formData.append('calle', entrada.calle);
    } else if (tipo === 'imagen') {
      formData.append('file', entrada.file);
    }

    try {
      await entradaServices.updateEntrada(entrada._id, editor, formData);
      navigate(`/wiki/${entrada.idWiki}`);
    } catch (error) {
      console.error('Error al actualizar la entrada:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Modificar entrada</h2>
          <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
            <input
              type="text"
              placeholder="Titulo"
              name="titulo"
              value={entrada.titulo}
              onChange={handleInputChange}
              className="form-control mb-3 text-center w-75"
            />
            <input
              type="text"
              placeholder="Texto"
              name="texto"
              value={entrada.texto}
              onChange={handleInputChange}
              className="form-control mb-3 text-center w-75"
            />
            <div className="mb-4">
              <label className="d-block mb-2">
                <input
                  type="radio"
                  name="tipo"
                  value="calle"
                  onChange={() => setTipo('calle')}
                  className="me-2"
                />
                Añadir Calle
              </label>
              <label className="d-block mb-2">
                <input
                  type="radio"
                  name="tipo"
                  value="imagen"
                  onChange={() => setTipo('imagen')}
                  className="me-2"
                />
                Añadir Imagen
              </label>
            </div>
            {tipo === 'calle' && (
              <input
                type="text"
                placeholder="Calle"
                name="calle"
                value={entrada.calle}
                onChange={handleInputChange}
                className="form-control mb-3 text-center w-75"
              />
            )}
            {tipo === 'imagen' && (
              <div className="mb-4 w-75">
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="form-control"
                />
              </div>
            )}
            <div className="d-flex justify-content-between mt-3 w-75">
              <button type="submit" className="btn btn-outline-primary">
                Actualizar Entrada
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActualizarEntrada;
