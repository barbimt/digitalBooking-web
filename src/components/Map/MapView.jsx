import React from "react";
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

function MapView({ product: { ubicacion: { latitud, longitud, direccion}, ciudad }}) {
  const leafIcon = new L.Icon({
    iconUrl: iconMap,
    iconSize: [50, 50],
  });

  return (
    <>
      <div>
        <h1 className="font-bold mt-11 ml-[2.688rem] mb-3 text-secondary map-title">
          ¿Dónde vas a estar?
        </h1>
        <div className="w-full bg-[#f0572d] h-0.5"></div>
  
          <p className=" mb-6 mt-6 font-bold ml-[2.688rem] text-base map-title--location map-title--location-mobile">
            {ciudad.nombre}, {ciudad.pais}
          </p>
        
      </div>
      <div className="mapContainer ">
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
              {direccion} <br /> {ciudad.nombre}, {ciudad.pais}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
}

export default MapView;
