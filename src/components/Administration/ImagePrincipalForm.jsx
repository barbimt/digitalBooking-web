import React from 'react'
import "./Styles/imagePrincipalForm.css"
function ImagePrincipalForm({handleImgPrincipal}) {
  return (
    <div>
      <label htmlFor="imagePrincipal" className='text-sm font-medium'>Imagen Principal</label>
      <input type="text" className='input-form-imagePrincipal' placeholder='Insertar https://' onChange={(e) => {handleImgPrincipal(e)}}/>
    </div>
  )
}

export default ImagePrincipalForm
