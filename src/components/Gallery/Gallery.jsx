import React from "react";
import "./gallery.css"
function Gallery({ product: { imagenesSecundarias }, showModal }) {

  return (
    <section className=" pl-10 pr-10 ">
      <div className="grid gap-4 grid-cols-2">
        <div className="flex">
          <img className="rounded-lg" src={imagenesSecundarias[0].urlImagen} alt="Hotel" />
        </div>
        <div className="grid gap-4 grid-cols-2 items-stretch relative">
          <img
            className="rounded-lg object-cover"
            src={imagenesSecundarias[1].urlImagen}
            alt="Hotel"
          />
          
          <img
            className="rounded-lg object-cover"
            src={imagenesSecundarias[2].urlImagen}
            alt="Hotel"
          />
          <img
            className="rounded-lg object-cover"
            src={imagenesSecundarias[3].urlImagen}
            alt="Hotel"
          />
          <img
            className="rounded-lg object-cover"
            src={imagenesSecundarias[4].urlImagen}
            alt="Hotel"
          />

          <div className="absolute bottom-0 right-0 text-xl text-white font-bold mr-5 mb-4 cursor-pointer underline text-vermas container-vermas-gallery">
          <p
            onClick={showModal}
            
          >
            Ver más
          </p>
          </div>

        </div>
      </div>

    </section>
  );
}

export default Gallery;
