import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import departments from "../departments.json";
import Autocompleter from "../components/Autocompleter";

const Create = () => {
  const [selectedRadius, setSelectedRadius] = useState(8);
  const [searchOption, setSearchOption] = useState("geolocation");
  const [selectedDepartment, setSelectedDepartment] = useState(85);
  const [mapKey, setMapKey] = useState(Date.now());
  const [selectedMonumentType, setSelectedMonumentType] = useState("");
  const [currentLocation, setCurrentLocation] = useState([0, 0]);
  const [zoomLevel, setZoomLevel] = useState(8);

  const markers = [
    {
      geocode: currentLocation,
      popUp: "Votre position",
    },
  ];
  const leafletIcon = new Icon({
    iconUrl: require("../icons/siteIcon.png"),
    iconSize: [30, 30],
  });

  return (
    <section>
      <h2>Ajouter un Mégalithe</h2>
      <label htmlFor="">Nom / lieu-di du site :</label>
      <br />
      <label htmlFor="">Département :</label>
      <br />
      <label htmlFor="">commmune:</label>
      <br />
      <Autocompleter department={selectedDepartment} />
      <br />
      <label htmlFor="">type de mégalithe :</label>
      <br />
      <label htmlFor="">ajouter une description (max 50 caractère) :</label>
      <br />
      <label htmlFor="">ajoutez vos photos (max 5 fichiers) :</label>
      <br />
      <label htmlFor=""></label>
      <br />
      <label htmlFor=""></label>
      <br />

      <MapContainer key={mapKey} center={currentLocation} zoom={zoomLevel}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreemap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => {
          return (
            <Marker key={index} position={marker.geocode} icon={leafletIcon}>
              <Popup>
                {marker.popUp}
                <br />
                {marker.geocode[0]}, {marker.geocode[1]}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </section>
  );
};

export default Create;
