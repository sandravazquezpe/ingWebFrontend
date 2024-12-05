import React, { useState } from 'react'

import { wikiServices } from '../../services/wiki'
import { Link } from 'react-router-dom';

const CrearWiki = () => {

  const [wiki, setWiki] = useState({
    tema: "",
    autor: ""
  });

  const {tema, autor} = wiki;

  const handleInputChange = (e) => {
    setWiki({...wiki, [e.target.name]: e.target.value})
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await wikiServices.createWiki(wiki);
    window.location.href = "/";
  };

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className='text-center m-4'>Nueva wiki</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className='mb-3'>
                <input type='text' placeholder='Tema' name='tema' value={tema} onChange={e => handleInputChange(e)} />
              </div>
              
              <div className='mb-3'>
               <input type='text' placeholder='Autor' name='autor' value={autor} onChange={e => handleInputChange(e)} />
              </div>
              
              <button type='submit' className='btn btn-outline-primary'>
                Crear Wiki
              </button>
              <Link className='btn btn-outline-danger mx-2' to='/'>
                Cancelar
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CrearWiki