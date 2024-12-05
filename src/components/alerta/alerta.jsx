import React from 'react'
import Alert from 'react-bootstrap/Alert'
import './alerta.css'

function Alerta({mensaje}) {
    return (
        <div className='container-alerta'>
            <Alert variant='success'>
                {mensaje ? mensaje : 'Cargando alerta...'}
            </Alert>
        </div>
    )
}

export default Alerta