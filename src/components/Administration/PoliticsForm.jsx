import React from 'react'
import { useState } from 'react'
import "./Styles/politicsForm.css"

function PoliticsForm({onCancelacion, onCasa, onSeguridad}) {
  const [cancelacion, setCancelacion] = useState({
    titulo: "Política de cancelación",
    descripcion: "",
    tipo_politica: "cancelacion",
    producto_id: -1
  })
  const [seguridad, setSeguridad] = useState({
    titulo: "Salud y seguridad",
    descripcion: "",
    tipo_politica: "seguridad",
    producto_id: -1
  })
  const [casa, setCasa] = useState({
    titulo: "Normas de la casa",
    descripcion: "",
    tipo_politica: "casa",
    producto_id: -1
  })

  const handleCancelacionInput=(e) => {
    setCancelacion({...cancelacion, descripcion: e.target.value});
    onCancelacion(cancelacion)
  }
  const handleCasaInput=(e) => {
    setCasa({...casa, descripcion: e.target.value});
    onCasa(casa)
 
  }
  const handleSeguridadInput=(e) => {
    setSeguridad({...seguridad, descripcion: e.target.value});
    onSeguridad(seguridad)
 
  }

  return (
    <div className='container-politicsForm grid grid-cols-3 gap-6'>
        <div>
            <h3 className='h3-politicsForm'>Normas de la casa</h3>
            <p>Descripción</p>
            <textarea onChange={(e)  => handleCasaInput(e)}name="casa" id="" cols="30" rows="10" className='politicsForm-textarea' placeholder='Escribe aquí...'></textarea>
        </div>

        <div>
            <h3 className='h3-politicsForm'>Salud y seguridad</h3>
            <p>Descripción</p>
            <textarea  onChange={(e)  => handleSeguridadInput(e)} name="seguridad" id="seguridad" cols="30" rows="10"  className='politicsForm-textarea' placeholder='Escribe aquí...'></textarea>
        </div>

        <div>
            <h3 className='h3-politicsForm'>Política de cancelación</h3>
            <p>Descripción</p>
            <textarea  onChange={(e)  => handleCancelacionInput(e)} name="cancelacion" id="cancelacion" cols="30" rows="10"  className='politicsForm-textarea' placeholder='Escribe aquí...'></textarea>
        </div>
    </div>
  )
}

export default PoliticsForm