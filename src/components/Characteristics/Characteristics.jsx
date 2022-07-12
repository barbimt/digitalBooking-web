import React, { useEffect, useState } from "react";
import Characteristic from "./Characteristic";
import "./characteristics.css"

function Characteristics({ product: { caracteristicas } }) {

  return (
    <>
      <div>
        <h1 className="title-characteristic-mobile  title-characteristic-tablet font-bold mt-11 ml-[2.688rem] mb-3 text-secondary">¿Qué ofrece este lugar?</h1>
        <div className="w-full bg-[#f0572d] h-0.5"></div>
        <div className=" grid-caracteristic">

        { caracteristicas.map((characteristic, index) => (
          <Characteristic key={index.id} characteristic={characteristic} />
        )) }
      
        </div>
      </div>
    </>
  );
}

export default Characteristics;
