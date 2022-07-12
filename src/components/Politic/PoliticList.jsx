import React from "react";
import Politic from "./Politic";
import "./politic.css"

function PoliticList({ product: { politica } }) {
  
  return (
    <div className=" mb-14 ">
      <h1 className="font-bold mt-11 ml-[2.688rem] mb-3 text-secondary politic-title">
        Qué tenés que saber
      </h1>
      <div className="w-full bg-[#f0572d] h-0.5 flex "></div>
     {/* <div className="flex  ml-[2.688rem] justify-evenly"> */}
     <div className="  ml-[2.688rem] grid grid-cols-4 gap-6 politic-grid politic-grid">
        {politica.sort((a, b) => a.id - b.id).map((politicaElement, index) =>{
            return (<Politic key={index} politica={politicaElement}/>)
        })}
 </div>
    </div>
  );
}

export default PoliticList;
