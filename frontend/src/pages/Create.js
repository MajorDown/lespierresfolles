import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import departments from "../departments.json";
import cities from "../cities.json";
import monumentTypes from "../monumentTypes.json";
import materials from "../materials.json";
import states from "../states.json";
import SvgMaker from "../components/SvgMaker";

const Create = () => {
  // HOOKS / PROPS
  const [mapKey, setMapKey] = useState(Date.now());
  const [siteName, setSiteName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(85);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMonumentType, setSelectedMonumentType] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("inconnu");
  const [selectedState, setSelectedState] = useState("");
  const [size, setSize] = useState(null);
  const [weight, setWeight] = useState(null);
  const [publicAccess, setPublicAccess] = useState(true);
  const [currentLocation, setCurrentLocation] = useState([48.8566, 2.3522]);
  const [megalithMarkerPosition, setMegalithMarkerPosition] = useState([
    48.8566, 2.3522,
  ]);

  useEffect(() => {
    setMapKey(Date.now());
  }, [currentLocation]);

  const filteredCities = cities
    .filter((city) => {
      if (city && city.cp) {
        const cp = city.cp.toString().padStart(5, "0");
        return cp.startsWith(selectedDepartment.toString());
      }
      return false;
    })
    .sort((a, b) => a.commune.localeCompare(b.commune));

  const leafletIcon = new Icon({
    iconUrl: require("../icons/siteIcon.png"),
    iconSize: [30, 30],
  });

  // HANDLERS
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

  const handleCityChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCity(selectedValue);
    const selectedCityData = cities.find(
      (city) => city.commune === selectedValue
    );
    if (selectedCityData && selectedCityData.coords) {
      const [lat, lng] = selectedCityData.coords.split(",");
      handleCitySelect(parseFloat(lat), parseFloat(lng));
    }
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
    let newSize = event.target.value ? parseFloat(event.target.value) : null;
    if (newSize < 0) newSize = Math.abs(newSize);
    setSize(newSize);
  };

  const handleWeightChange = (event) => {
    let newWeight = event.target.value ? parseFloat(event.target.value) : null;
    if (newWeight < 0) newWeight = Math.abs(newWeight);
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

  const handleGeolocation = (event) => {
    event.preventDefault();
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (window.confirm("Êtes-vous sûr de vouloir soumettre le formulaire ?")) {
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, "0");
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const year = currentDate.getFullYear().toString().padStart(4, "0");
      const hours = currentDate.getHours().toString().padStart(2, "0");
      const minutes = currentDate.getMinutes().toString().padStart(2, "0");
      const formattedDate = `${day}.${month}.${year}-${hours}.${minutes}`;
      const formData = {
        name: siteName,
        department: selectedDepartment,
        place: selectedCity,
        type: selectedMonumentType,
        description: description,
        images: photos,
        state: selectedState,
        publicAccess: publicAccess,
        material: selectedMaterial,
        size: size,
        weight: weight,
        coords: {
          lat: megalithMarkerPosition[0],
          lon: megalithMarkerPosition[1],
        },
        date: formattedDate,
        userId: localStorage.userId,
      };
      console.log(formData);
      fetch("url_de_votre_backend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Réponse du serveur :", data);
          // Faites quelque chose avec la réponse du serveur, par exemple, redirigez l'utilisateur vers une autre page
        })
        .catch((error) => {
          console.error("Erreur lors de l'envoi de la requête :", error);
          // Traitez l'erreur, affichez un message d'erreur à l'utilisateur, etc.
        });
    }
  };

  // RENDER
  return (
    <section id="createSection">
      <h2>Ajouter un Mégalithe</h2>
      <form action="POST">
        <label htmlFor="input-name">
          Nom / lieu-dit du site<span>*</span> :
        </label>
        <br />
        <input
          required
          id="input-name"
          type="text"
          value={siteName}
          onChange={handleSiteNameChange}
        />
        <br />
        <label htmlFor="input-department">
          Département<span>*</span> :
        </label>
        <br />
        <select
          id="input-department"
          required
          value={selectedDepartment}
          onChange={handleDepartmentChange}
        >
          {departments.map((department) => (
            <option key={department.code} value={department.code}>
              {department.name} ({department.code})
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="input-city">
          Commune<span>*</span> :
        </label>
        <br />
        <select
          id="input-city"
          value={selectedCity}
          onChange={(event) => handleCityChange(event)}
        >
          <option value="">Sélectionner une ville</option>
          {filteredCities.map((city) => (
            <option key={city.commune} value={city.commune}>
              {city.commune} ({city.cp})
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="input-type">
          Type du monument<span>*</span> :
        </label>
        <br />
        <select
          id="input-type"
          required
          value={selectedMonumentType}
          onChange={handleMonumentTypeChange}
        >
          {monumentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="input-description">
          Ajoutez une description (max 100 caractères) :
        </label>
        <br />
        <textarea
          id="input-description"
          rows="3"
          maxLength="100"
          placeholder="Entrez votre description ici..."
          onChange={(event) => handleDescriptionChange(event)}
          value={description}
        ></textarea>
        <br />
        <label htmlFor="input-file1">
          Ajouter une première photo<span>*</span> :
        </label>
        <br />
        <input
          required
          id="input-file1"
          type="file"
          accept="image/*"
          onChange={(e) => handlePhotoUpload(e, 0)}
        />
        <br />
        {photos[0] != null ? (
          <>
            <label htmlFor="input-file2">Ajouter une deuxième photo :</label>
            <br />
            <input
              id="input-file2"
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e, 1)}
            />
            <br />
          </>
        ) : (
          ""
        )}
        {photos[1] != null ? (
          <>
            <label htmlFor="input-file3">Ajouter une troisième photo :</label>
            <br />
            <input
              id="input-file3"
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e, 2)}
            />
            <br />
          </>
        ) : (
          ""
        )}
        {photos[2] != null ? (
          <>
            <label htmlFor="input-file4">Ajouter une quatrième photo :</label>
            <br />
            <input
              id="input-file4"
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e, 3)}
            />
            <br />
          </>
        ) : (
          ""
        )}
        {photos[3] != null ? (
          <>
            <label htmlFor="input-file5">Ajouter une cinquième photo :</label>
            <br />
            <input
              id="input-file5"
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e, 4)}
            />
            <br />
          </>
        ) : (
          ""
        )}
        {photos.length >= 1 && (
          <div id="photoPreview">
            <div>{photos[0] && <img src={photos[0]} alt="Photo 1" />}</div>
            <div>{photos[1] && <img src={photos[1]} alt="Photo 2" />}</div>
            <div>{photos[2] && <img src={photos[2]} alt="Photo 3" />}</div>
            <div>{photos[3] && <img src={photos[3]} alt="Photo 4" />}</div>
            <div>{photos[4] && <img src={photos[4]} alt="Photo 5" />}</div>
          </div>
        )}
        <label htmlFor="input-state">
          Décrivez l'état de conservation du site :
        </label>
        <br />
        <select
          id="input-state"
          value={selectedState}
          onChange={handleStateChange}
        >
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="input-access">Accessible au public : </label>
        <input
          id="input-access"
          type="checkbox"
          checked={publicAccess}
          onChange={handlePublicAccessChange}
        />{" "}
        Oui
        <br />
        <label htmlFor="input-material">Matériau utilisé :</label>
        <br />
        <select
          id="input-material"
          value={selectedMaterial}
          onChange={handleMaterialChange}
        >
          {materials.map((material) => (
            <option key={material} value={material}>
              {material}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="input-size">Hauteur approximative :</label>
        <input
          id="input-size"
          type="number"
          value={size !== null ? size : ""}
          min="0"
          onChange={handleSizeChange}
        />{" "}
        mètres
        <br />
        <label htmlFor="input-weight">Poids approximatif :</label>
        <input
          id="input-weight"
          type="number"
          step="any"
          value={weight !== null ? weight : ""}
          min="0"
          onChange={handleWeightChange}
        />{" "}
        tonnes
        <br />
        <div id="mapForm">
          Positionnez le site sur la carte. Attention à la précision !<br />
          <button onClick={(e) => handleGeolocation(e)}>
            Utiliser votre position
          </button>
          <p>
            coordonnées<span>*</span> :
          </p>
          <p>
            <label htmlFor="input-lat">lat = </label>
            <input
              required
              type="number"
              name="input-lat"
              id="input-lat"
              value={megalithMarkerPosition[0]}
              readOnly
            />
          </p>
          <p>
            <label htmlFor="input-lon">lon = </label>
            <input
              required
              type="number"
              name="input-Lon"
              id="input-lon"
              value={megalithMarkerPosition[1]}
              readOnly
            />
          </p>
        </div>
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
        <button onClick={(event) => handleSubmit(event)}>
          Valider la création du nouveau site
        </button>
        <p>
          <span>*</span>champs obligatoire
        </p>
      </form>
    </section>
  );
};

export default Create;
