import React from 'react'
import { useState } from 'react'
import moreIcon from "./../../img/moreIcon.svg"
import closeIcon from "./../../img/closeCharacteristics.svg";
import "./Styles/imagesForm.css"
import { useEffect } from "react";
import swal from 'sweetalert';

function ImagesForm({addImage, removeImage, index = 0, image}) {

const [imageCreated, setImageCreated] = useState(false)
const [imageUrl, setImageUrl] = useState("")

useEffect(() => {
  if (image) {
    setImageUrl(image.urlImagen);
    setImageCreated(true);
  }
});

const showModalImagesEmpty = () => {
  swal("Tienes que agregar información", {
    icon: "error",
    buttons: false,
    timer: 3000,
  });
};

const handleOnClickImages = () => {
  if (imageUrl == "") {
    showModalImagesEmpty()
  } else {
     if (imageCreated) {
    removeImage({
      titulo: "image",
      urlImagen: imageUrl,
      producto_id: -1,
      index: index
    });
  } else {
    addImage({
      titulo: "image",
      urlImagen: imageUrl,
      producto_id: -1,
      index:index
    });
  }
  setImageUrl("");
  }
 
};



  return (
    <div className='container-img-form'>
          <input disabled={imageCreated} value={imageUrl} type="text" className='img-input-form' placeholder='Insertar https://'  onChange={(e)=> setImageUrl(e.target.value)}/>
          <div className="btn-add-images"  onClick={handleOnClickImages}>
          <img src={imageCreated ? closeIcon : moreIcon} alt="" />
        </div>
    </div>
  )
}

export default ImagesForm
