import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { resizeImage } from "../utils/resizeImage";
import departments from "../departments.json";
import cities from "../cities.json";
import monumentTypes from "../monumentTypes.json";
import materials from "../materials.json";
import states from "../states.json";
import SvgMaker from "../components/SvgMaker";
import ProgressBar from "../components/ProgressBar";
const BACKEND_URL = "http://51.77.159.211:11007";

const Create = () => {
  // HOOKS / PROPS
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [mapKey, setMapKey] = useState(Date.now());
  const [siteName, setSiteName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(75);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMonumentType, setSelectedMonumentType] = useState("dolmen");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("inconnu");
  const [selectedState, setSelectedState] = useState("état moyen");
  const [size, setSize] = useState(null);
  const [weight, setWeight] = useState(null);
  const [publicAccess, setPublicAccess] = useState(true);
  const [currentLocation, setCurrentLocation] = useState([48.8566, 2.3522]);
  const [megalithMarkerPosition, setMegalithMarkerPosition] = useState([
    48.8566, 2.3522,
  ]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSending, setisSending] = useState(false);
  const [hadError, setHadError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("lpf_userId");
    if (user) setIsConnected(true);
    else setIsConnected(false);
  }, []);

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
    iconUrl: require("../icons/monument.png"),
    iconSize: [15, 30],
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
    const citiesInSelectedDepartment = cities.filter(
      (city) => city.departmentCode === parseInt(selectedDepartment)
    );
    const selectedCityData = citiesInSelectedDepartment.find(
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
    setDescription(event.target.value.slice(0, 200));
  };

  const handleSiteNameChange = (event) => {
    setSiteName(event.target.value);
  };

  const resizeAndSetPhoto = async (file, index) => {
    const resizedImage = await resizeImage(file, 1000, 1000);
    const updatedPhotos = [...photos];
    updatedPhotos[index] = URL.createObjectURL(resizedImage);
    setPhotos(updatedPhotos);
  };

  const handlePhotoUpload = (event, index) => {
    const file = event.target.files[0];
    if (!file) return; // Si aucun fichier n'a été sélectionné, ne rien faire
    resizeAndSetPhoto(file, index);
  };

  const handleSuppressPhoto = (inputId, index) => {
    const input = document.getElementById(inputId);
    input.type = "text";
    input.type = "file";
    let updatedPhotos = [...photos];
    // updatedPhotos[index] = null;
    updatedPhotos.splice(index, 1);
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

  const handleProgress = (event) => {
    if (event.lengthComputable) {
      const percentComplete = (event.loaded / event.total) * 100;
      setUploadProgress(percentComplete);
    }
  };

  const handleErrorMessage = (message) => {
    setHadError(true);
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
      setHadError(false);
    }, 15000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      window.confirm(
        "Vous êtes sur le point de répertorier un nouveau site mégalithique. Avez-vous bien verifié l'exactitude des informations rentrées ?"
      )
    ) {
      setisSending(true);
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, "0");
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const year = currentDate.getFullYear().toString().padStart(4, "0");
      const hours = currentDate.getHours().toString().padStart(2, "0");
      const minutes = currentDate.getMinutes().toString().padStart(2, "0");
      const formattedDate = `${day}.${month}.${year}-${hours}.${minutes}`;

      const formData = new FormData();
      formData.append("name", siteName);
      formData.append("department", selectedDepartment);
      formData.append("place", selectedCity);
      formData.append("type", selectedMonumentType);
      formData.append("description", description);
      formData.append("image1", photos[0]);
      const inputFiles = document.querySelectorAll('input[type="file"]');
      inputFiles.forEach((fileInput, index) => {
        const files = fileInput.files;
        if (files.length > 0) {
          formData.append(`image${index + 1}`, files[0]);
        }
      });
      formData.append("state", selectedState);
      formData.append("publicAccess", publicAccess);
      formData.append("material", selectedMaterial);
      formData.append("size", size);
      formData.append("weight", weight);
      formData.append("lat", megalithMarkerPosition[0]);
      formData.append("lon", megalithMarkerPosition[1]);
      formData.append("date", formattedDate);
      formData.append("userId", localStorage.lpf_userId);
      console.log(formData);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${BACKEND_URL}/api/sites/`, true);
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("lpf_token")}`
      );
      xhr.upload.addEventListener("progress", (event) => {
        handleProgress(event); // Appel correct de handleProgress avec l'objet event
      });
      xhr.onload = () => {
        if (xhr.status === 200) {
          setisSending(false);
          const response = JSON.parse(xhr.responseText);
          console.log("Site créé :", response.site);

          navigate(`/sites/${response.site._id}`);
        } else {
          setisSending(false);
          console.error("Erreur lors de la création du site :", xhr.statusText);
          handleErrorMessage(
            "La création du site à échoué. Veuillez vous reconnecter"
          );
          // Traitez l'erreur, affichez un message d'erreur à l'utilisateur, etc.
        }
      };
      xhr.onerror = () => {
        setisSending(false);
        console.error("Erreur réseau lors de la création du site.");
        handleErrorMessage(
          "La création du site à échoué, veuillez recommencer plus tard. Pensez à sauvegarder les photos du site ;-)"
        );
        // Traitez l'erreur, affichez un message d'erreur à l'utilisateur, etc.
      };
      xhr.send(formData);
    }
  };

  // RENDER
  return (
    <section id="createSection">
      {isConnected ? (
        <>
          <h2>Ajouter un Mégalithe</h2>
          <form action="POST" onSubmit={(event) => handleSubmit(event)}>
            <div className="input-container">
              <label htmlFor="input-name">
                Nom / lieu-dit du site<span>*</span> :
              </label>
              <input
                required
                id="input-name"
                type="text"
                value={siteName}
                onChange={handleSiteNameChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="input-department">
                Département<span>*</span> :
              </label>
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
            </div>
            <div className="input-container">
              <label htmlFor="input-city">
                Commune<span>*</span> :
              </label>
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
            </div>
            <div className="input-container">
              <label htmlFor="input-type">
                Type du monument<span>*</span> :
              </label>
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
            </div>
            <div className="input-container">
              <label htmlFor="input-description">
                Ajoutez une description (max 200 caractères) :
              </label>
              <textarea
                id="input-description"
                rows="4"
                maxLength="200"
                placeholder="Entrez votre description ici..."
                onChange={(event) => handleDescriptionChange(event)}
                value={description}
              ></textarea>
            </div>
            <div className="input-container">
              <label htmlFor="input-file1">
                Ajouter une première photo<span>*</span> :
              </label>
              <input
                required
                id="input-file1"
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoUpload(e, 0)}
              />
              <div className="photoPreview">
                {photos[0] && <img src={photos[0]} alt="Photo 1" />}
              </div>
              {photos[0] && (
                <button
                  className="btn-trash"
                  onClick={() => handleSuppressPhoto("input-file1", 0)}
                >
                  <SvgMaker item="trash" />
                </button>
              )}
            </div>
            <div className="input-container">
              {photos[0] && (
                <>
                  <label htmlFor="input-file2">
                    Ajouter une deuxième photo :
                  </label>

                  <input
                    id="input-file2"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, 1)}
                  />
                  <div className="photoPreview">
                    {photos[1] && <img src={photos[1]} alt="Photo 2" />}
                  </div>
                  {photos[1] && (
                    <button
                      className="btn-trash"
                      onClick={() => handleSuppressPhoto("input-file2", 1)}
                    >
                      <SvgMaker item="trash" />
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="input-container">
              {photos[1] && (
                <>
                  <label htmlFor="input-file3">
                    Ajouter une troisième photo :
                  </label>

                  <input
                    id="input-file3"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, 2)}
                  />
                  <div className="photoPreview">
                    {photos[2] && <img src={photos[2]} alt="Photo 3" />}
                  </div>
                  {photos[2] && (
                    <button
                      className="btn-trash"
                      onClick={() => handleSuppressPhoto("input-file3", 2)}
                    >
                      <SvgMaker item="trash" />
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="input-container">
              {photos[2] && (
                <>
                  <label htmlFor="input-file4">
                    Ajouter une quatrième photo :
                  </label>

                  <input
                    id="input-file4"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, 3)}
                  />
                  <div className="photoPreview">
                    {photos[3] && <img src={photos[3]} alt="Photo 4" />}
                  </div>
                  {photos[3] && (
                    <button
                      className="btn-trash"
                      onClick={() => handleSuppressPhoto("input-file4", 3)}
                    >
                      <SvgMaker item="trash" />
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="input-container">
              {photos[3] && (
                <>
                  <label htmlFor="input-file5">
                    Ajouter une cinquième photo :
                  </label>

                  <input
                    id="input-file5"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, 4)}
                  />
                  <div className="photoPreview">
                    {photos[4] && <img src={photos[4]} alt="Photo 5" />}
                  </div>
                  {photos[4] && (
                    <button
                      className="btn-trash"
                      onClick={() => handleSuppressPhoto("input-file5", 4)}
                    >
                      <SvgMaker item="trash" />
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="input-container">
              <label id="label-state" htmlFor="input-state">
                Décrivez l'état de conservation du site :
              </label>
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
            </div>
            <div className="input-container">
              <label htmlFor="input-access">Accessible au public : </label>
              <input
                id="input-access"
                type="checkbox"
                checked={publicAccess}
                onChange={handlePublicAccessChange}
              />{" "}
              Oui
            </div>
            <div className="input-container">
              <label id="label-material" htmlFor="input-material">
                Matériau utilisé :
              </label>
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
            </div>
            <div className="input-container">
              <label htmlFor="input-size">Hauteur approximative :</label>
              <input
                id="input-size"
                type="number"
                value={size !== null ? size : ""}
                min="0"
                onChange={handleSizeChange}
              />{" "}
              mètres
            </div>
            <div className="input-container">
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
            </div>

            <div id="mapForm">
              <p>
                Positionnez le site sur la carte. <br /> Attention à la
                précision !
              </p>
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
            <button type="submit">Valider la création du nouveau site</button>
            {isSending && <ProgressBar progressValue={uploadProgress} />}
          </form>
          {hadError && <p>{ErrorMessage}</p>}
          <p id="ps">
            <span>*</span>champs obligatoire
          </p>
        </>
      ) : (
        <>
          <p className="ifNotConnected">
            Vous devez être connecté pour pouvoir contribuer à la base de donnée
            !
          </p>
          <p className="linkToConnect">
            <button>
              <Link to={"/connection"}>Se connecter</Link>
            </button>
          </p>
        </>
      )}
    </section>
  );
};

export default Create;
