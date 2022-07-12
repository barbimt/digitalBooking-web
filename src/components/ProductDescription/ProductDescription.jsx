import React from "react";
import "./productDescription.css";

function ProductDescription({ product: { descripciones, ciudad } }) {
  return (
    <div className="mt-10 ml-[2.688rem] mr-10 text-secondary container-description-mobile container-description-tablet">
      <h1 className="font-bold mb-9 title-description-mobile title-description-tablet">
        Alójate en el corazón de {ciudad.nombre}
      </h1>
      {
      descripciones.sort((a, b) => a.id - b.id).map((item, index) => {
        return (<p className=" mb-5" key={index.id}>{item.descripcion}<br /></p>);
      })}
      {/* <p>
        Está situado a solo unas calles de la avenida Alvear, de la avenida
        Quintana, del parque San Martín y del distrito de Recoleta. En las
        inmediaciones también hay varios lugares de interés, como la calle
        Florida, el centro comercial Galerías Pacífico, la zona de Puerto
        Madero, la plaza de Mayo y el palacio Municipal.
      </p>
      <br />
      <p>
        Nuestros clientes dicen que esta parte de Buenos Aires es su favorita,
        según los comentarios independientes.
      </p>
      <br />
      <p>
        El Hotel es un hotel sofisticado de 4 estrellas que goza de una
        ubicación tranquila, a poca distancia de prestigiosas galerías de arte,
        teatros, museos y zonas comerciales. Además, hay WiFi gratuita.
      </p>
      <br />
      <p> El establecimiento sirve un desayuno variado de 07:00 a 10:30.</p> */}
    </div>
  );
}

export default ProductDescription;
