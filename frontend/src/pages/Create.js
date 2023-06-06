import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import departments from "../departments.json";
import Autocompleter from "../components/Autocompleter";

const Create = () => {
  const [siteName, setSiteName] = useState("");
  const [mapKey, setMapKey] = useState(Date.now());
  const [selectedMonumentType, setSelectedMonumentType] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("inconnu");
  const [selectedState, setSelectedState] = useState("");
  const [size, setSize] = useState(null);
  const [weight, setWeight] = useState(null);
  const [publicAccess, setPublicAccess] = useState(true);
  const [currentLocation, setCurrentLocation] = useState([48.8566, 2.3522]);
  const [selectedDepartment, setSelectedDepartment] = useState(85);
  const [megalithMarkerPosition, setMegalithMarkerPosition] = useState([
    48.8566, 2.3522,
  ]);

  useEffect(() => {
    setMapKey(Date.now());
  }, [currentLocation]);

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
  const states = ["bon état", "état moyen", "mauvais état", "détruit"];

  const leafletIcon = new Icon({
    iconUrl: require("../icons/siteIcon.png"),
    iconSize: [30, 30],
  });

  const handleDepartmentChange = (event) => {
    const selectedCode = event.target.value;
    const selectedDepartment = departments.find(
      (department) => department.code === selectedCode
    );

    if (selectedDepartment) {
      const [lat, lng] = selectedDepartment.coords;
      setCurrentLocation([lat, lng]);
      setMegalithMarkerPosition([lat, lng]);
    }

    setSelectedDepartment(selectedCode);
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

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleSizeChange = (event) => {
    const newSize = event.target.value ? parseFloat(event.target.value) : null;
    setSize(newSize);
  };

  const handleWeightChange = (event) => {
    const newWeight = event.target.value
      ? parseFloat(event.target.value)
      : null;
    setWeight(newWeight);
  };

  const handlePublicAccessChange = (event) => {
    setPublicAccess(event.target.checked);
  };

  const handleCitySelect = (lat, lng) => {
    setCurrentLocation([lat, lng]);
    setMegalithMarkerPosition([lat, lng]);
  };

  const handleMarkerDrag = (e) => {
    const { lat, lng } = e.target.getLatLng();
    setMegalithMarkerPosition([lat, lng]);
  };

  const handleGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
        setMegalithMarkerPosition([latitude, longitude]);
      },
      (error) => {
        console.error("Erreur de géolocalisation :", error);
      }
    );
  };

  const handleSubmit = () => {
    if (window.confirm("Êtes-vous sûr de vouloir soumettre le formulaire ?")) {
      console.log("Données du formulaire :", {
        siteName,
        selectedDepartment,
        selectedMonumentType,
        description,
        photos,
        selectedState,
        publicAccess,
        selectedMaterial,
        size,
        weight,
        currentLocation,
        megalithMarkerPosition,
      });
    }
  };

  return (
    <section>
      <h2>Ajouter un Mégalithe</h2>
      <label htmlFor="siteNameInput">Nom / lieu-dit du site :</label>
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
      <label htmlFor="">Commune :</label>
      <br />
      <Autocompleter
        department={selectedDepartment}
        onCitySelect={handleCitySelect}
      />
      <br />
      <label htmlFor="">Type du monument :</label>
      <br />
      <select value={selectedMonumentType} onChange={handleMonumentTypeChange}>
        {monumentTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="">Ajoutez une description (max 100 caractères) :</label>
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
      <label htmlFor="">Décrivez l'état de conservation du site :</label>
      <br />
      <select value={selectedState} onChange={handleStateChange}>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="">Accessible au public : </label>
      <input
        type="checkbox"
        checked={publicAccess}
        onChange={handlePublicAccessChange}
      />{" "}
      Oui
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
      <label htmlFor="">Hauteur approximative :</label>
      <input
        type="number"
        value={size !== null ? size : ""}
        onChange={handleSizeChange}
      />{" "}
      mètres
      <br />
      <label htmlFor="">Poids approximatif :</label>
      <input
        type="number"
        step="any"
        value={weight !== null ? weight : ""}
        onChange={handleWeightChange}
      />{" "}
      tonnes
      <br />
      <p>
        Positionnez le site sur la carte. Attention à la précision !<br />
        <button onClick={handleGeolocation}>Utiliser votre position</button>
        <br />
        coordonnées :<br />
        {megalithMarkerPosition[0]}, <br />
        {megalithMarkerPosition[1]}
      </p>
      <MapContainer key={mapKey} center={currentLocation} zoom={9}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreemap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={megalithMarkerPosition}
          icon={leafletIcon}
          draggable={true}
          eventHandlers={{
            dragend: (event) => {
              handleMarkerDrag(event);
            },
          }}
        >
          <Popup>{siteName !== "" ? siteName : "nouveau site"}</Popup>
        </Marker>
      </MapContainer>
      <button onClick={handleSubmit}>
        Valider la création du nouveau site
      </button>
    </section>
  );
};

export default Create;
