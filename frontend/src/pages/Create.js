import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import departments from "../departments.json";
import Autocompleter from "../components/Autocompleter";

const Create = () => {
  const [siteName, setSiteName] = useState("");
  const [selectedRadius, setSelectedRadius] = useState(8);
  const [searchOption, setSearchOption] = useState("geolocation");
  const [selectedDepartment, setSelectedDepartment] = useState(85);
  const [mapKey, setMapKey] = useState(Date.now());
  const [selectedMonumentType, setSelectedMonumentType] = useState("");
  const [currentLocation, setCurrentLocation] = useState([0, 0]);
  const [zoomLevel, setZoomLevel] = useState(8);
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("none");

  const monumentTypes = ["dolmen", "menhir", "tumulus", "autre"];
  const materials = [
    "inconnu",
    "silex",
    "basalte",
    "marbre",
    "grès",
    "schiste",
    "quartzite",
    "gneiss",
    "calcaire",
    "granite",
    "andesite",
    "diorite",
  ];

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

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleMonumentTypeChange = (event) => {
    setSelectedMonumentType(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value.slice(0, 100));
  };

  const handleSiteNameChange = (event) => {
    setSiteName(event.target.value);
  };

  const handlePhotoUpload = (event, index) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const updatedPhotos = [...photos];
    updatedPhotos[index] = url;
    setPhotos(updatedPhotos);
  };

  const handleMaterialChange = (event) => {
    setSelectedMaterial(event.target.value);
  };

  return (
    <section>
      <h2>Ajouter un Mégalithe</h2>
      <label htmlFor="siteNameInput">Nom / lieu-di du site :</label>
      <br />
      <input
        id="siteNameInput"
        type="text"
        value={siteName}
        onChange={handleSiteNameChange}
      />
      <br />
      <label htmlFor="">Département :</label>
      <br />
      <select value={selectedDepartment} onChange={handleDepartmentChange}>
        {departments.map((department) => (
          <option key={department.code} value={department.code}>
            {department.name} ({department.code})
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="">commmune:</label>
      <br />
      <Autocompleter department={selectedDepartment} />
      <br />
      <label htmlFor="">type du monument :</label>
      <br />
      <select value={selectedMonumentType} onChange={handleMonumentTypeChange}>
        {monumentTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="">ajoutez une description (max 100 caractères) :</label>
      <br />
      <input
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        maxLength={100}
      />
      <br />
      <label htmlFor="photoUploadInput1">Ajouter une première photo :</label>
      <br />
      <input
        id="photoUploadInput1"
        type="file"
        onChange={(e) => handlePhotoUpload(e, 0)}
      />
      {photos[0] && <img src={photos[0]} alt="Photo 1" />}
      <br />
      <label htmlFor="photoUploadInput2">Ajouter une deuxième photo :</label>
      <br />
      <input
        id="photoUploadInput2"
        type="file"
        onChange={(e) => handlePhotoUpload(e, 1)}
      />
      {photos[1] && <img src={photos[1]} alt="Photo 2" />}
      <br />
      <label htmlFor="photoUploadInput3">Ajouter une troisième photo :</label>
      <br />
      <input
        id="photoUploadInput3"
        type="file"
        onChange={(e) => handlePhotoUpload(e, 2)}
      />
      {photos[2] && <img src={photos[2]} alt="Photo 3" />}
      <br />
      <label htmlFor="photoUploadInput4">Ajouter une quatrième photo :</label>
      <br />
      <input
        id="photoUploadInput4"
        type="file"
        onChange={(e) => handlePhotoUpload(e, 3)}
      />
      {photos[3] && <img src={photos[3]} alt="Photo 4" />}
      <br />
      <label htmlFor="photoUploadInput5">Ajouter une cinquième photo :</label>
      <br />
      <input
        id="photoUploadInput5"
        type="file"
        onChange={(e) => handlePhotoUpload(e, 4)}
      />
      {photos[4] && <img src={photos[4]} alt="Photo 5" />}
      <br />
      <label htmlFor="">Matériau utilisé :</label>
      <br />
      <select value={selectedMaterial} onChange={handleMaterialChange}>
        {materials.map((material) => (
          <option key={material} value={material}>
            {material}
          </option>
        ))}
      </select>
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
