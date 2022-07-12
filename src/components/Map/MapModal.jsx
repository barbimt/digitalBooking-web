import React from 'react'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    ZoomControl,
  } from "react-leaflet";
  import iconMap from "./../../img/localizadorOrange.svg";
  import "leaflet/dist/leaflet.css";
  import "./map.css";
  import L from "leaflet";
  import x from "./../../img/Xorange.svg";

function MapModal({ product: { ubicacion: { latitud, longitud, direccion} , ciudad: {nombre, pais}}, closeModalMap} ) {
    const leafIcon = new L.Icon({
        iconUrl: iconMap,
        iconSize: [50, 50],
      });
  return (
    <div className=" bg-opacity-95  justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-1 outline-none focus:outline-none bg-secondary" onClick={closeModalMap}>
    <div className="relative w-1/2 my-6 mx-auto bg-pimary div-map-mobile">   
    <img className="absolute top-0 left-0 z-10 ml-2 mt-3 cursor-pointer" src={x} onClick={closeModalMap} />
      {/* <div className="rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none"> */}
    <div className="mapContainerModal ">
    <MapContainer
      attributionControl={false}
      key={JSON.stringify([latitud, longitud])}
      center={[latitud, longitud]}
      zoom={15}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <ZoomControl position="topright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitud, longitud]} icon={leafIcon}>
        <Popup>
          {direccion} <br /> {nombre}, {pais}
        </Popup> 
      </Marker>
    </MapContainer>
  </div>
  </div>
  </div>
//   </div>
  )
}

export default MapModal
