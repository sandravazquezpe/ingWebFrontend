import React from 'react'
import "../../styles/default.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Wiki({ wiki }) {
  return (
    <Link to={`/wiki/${wiki?._id}`} className="card-link">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">Tema: {wiki?.tema}</h5>
          <p className="card-text">Autor: {wiki?.autor}</p>
        </div>
      </div>
    </Link>
  )
}

export default Wiki