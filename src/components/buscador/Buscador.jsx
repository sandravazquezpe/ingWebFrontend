import React, { useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { entradaServices } from '../../services/entrada';

function Buscador({ setResultado, idWiki }) {

  const [busquedaTexto, setBusquedaTexto] = useState('');

  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const handleBuscar = async (e) => {
    e.preventDefault();
    if (fechaInicio && fechaFin) {
      const resultado = await entradaServices.buscarEntradaFechas(fechaInicio, fechaFin, idWiki);
      setResultado(resultado);
    } 
    if (busquedaTexto) {
      const resultado = await entradaServices.buscarEntradaTexto(busquedaTexto);
      const resFilterByWiki = resultado.filter(entrada => entrada.idWiki === idWiki);
      setResultado(resFilterByWiki);
    } 
    
  }

  return (
    <InputGroup className="mb-3" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <FormControl
        placeholder="Buscar wikis"
        value={busquedaTexto}
        onChange={(e) => setBusquedaTexto(e.target.value)}
      />
      <FormControl
        type='date'
        value={fechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
        className='ms-1'
      />
      <FormControl
        type='date'
        value={fechaFin}
        onChange={(e) => setFechaFin(e.target.value)}
        className='ms-1 me-1'
      />
      <Button variant="outline-primary" onClick={e => handleBuscar(e)}>
        Buscar
      </Button>
    </InputGroup>
  )
}

export default Buscador
