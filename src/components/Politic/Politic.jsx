import React from 'react'
import "./politic.css"
function Politic({politica}) {
  return (
<>
  <div className={politica.descripcion == null ? "hidden" : "flex flex-col "} >
        <h2 className={politica.titulo === "" ? "hidden" : "font-bold mt-10  mb-9 text-secondary  politic-title--detail" }>{politica.titulo} </h2>
        {/* <ul className={politica.descripcion === "" ? "hidden" : "text-bold"}>
            {politica.descripcion.map((itemDescripcion) =>{
                return (<li className={itemDescripcion === "" ? "hidden" : "text-bold mb-4 politic-li"}>{itemDescripcion}</li>)
            })}
            <li></li>
        </ul> */}
        <ul className='text-bold'>
          <li className={politica.descripcion == "" ? "hidden": 'politica.titulo === ""text-bold mb-4 politic-li'}>
            {politica.descripcion.split('\n').map(str => <li className='text-bold mb-4 politic-li'>{str}</li>)}
            </li>
        </ul>
      
        </div>
</>
  )
}

export default Politic