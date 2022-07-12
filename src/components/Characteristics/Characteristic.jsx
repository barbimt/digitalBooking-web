import React from "react";


function Characteristic({ characteristic}) {
  return (
      
    <div className={ characteristic.nombre === "" ? "hidden" : "flex ml-[2.688rem] mt-[2.625rem] characteristic-container-mobile" }>
      <img className="mr-[11px]" src={characteristic.urlIcono} alt={characteristic.nombre} />
      <p>{characteristic.nombre}</p>
    </div>
  );
}

export default Characteristic;
