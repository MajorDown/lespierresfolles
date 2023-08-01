import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import departments from "../departments.json";
const BACKEND_URL = "http://51.77.159.211:11007";

const Search = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("75");
  const [mapLocation, setMapLocation] = useState(departments[73].coords);
  const [mapKey, setMapKey] = useState(Date.now());
  const [selectedMonumentType, setSelectedMonumentType] = useState("tous");
  const [currentLocation, setCurrentLocation] = useState([0, 0]);
  const [markers, setMarkers] = useState([]);

  const createMarkers = (data) => {
    return data.map((site) => ({
      geocode: [site.coords.lat, site.coords.lon],
      popUp: site.name,
      id: site._id,
    }));
  };

  const userPosition = {
    geocode: currentLocation,
    popUp: "votre position",
  };

  const monumentIcon = new Icon({
    iconUrl: require("../icons/monument.png"),
    iconSize: [15, 30],
  });

  const userPositionIcon = new Icon({
    iconUrl: require("../icons/userPosition.png"),
    iconSize: [20, 30],
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
        setMapKey(Date.now());
      });
    } else {
      console.log(
        "La géolocalisation n'est pas prise en charge par ce navigateur."
      );
    }
  };

  const handleMonumentTypeChange = (event) => {
    setSelectedMonumentType(event.target.value);
  };

  const handleMapPositionChange = (event) => {
    const selectedCode = event.target.value;
    setSelectedDepartment(selectedCode);
    const chosenDepartment = departments.find(
      (department) => department.code === selectedCode
    );
    if (chosenDepartment) {
      setMapLocation(chosenDepartment.coords);
    } else console.log("pas de chosenDepartment");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let filters = {};
    if (selectedDepartment && selectedMonumentType) {
      filters.departement = parseInt(selectedDepartment);
      filters.type = selectedMonumentType;
      console.log(filters.departement);
    }
    fetch(`${BACKEND_URL}/api/sites/?${new URLSearchParams(filters)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("sites trouvés :", data);
        const newMarkers = createMarkers(data);
        setMarkers(newMarkers);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des sites :", error);
        // Traitez l'erreur, affichez un message d'erreur à l'utilisateur, etc.
      });
  };

  useEffect(() => {
    setMapKey(Date.now());
  }, [mapLocation]);

  return (
    <section>
      <h2>Recherchez des Mégalithes</h2>
      <div id="searchSection">
        <form id="searchForm" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="departmentNumber">Choisissez le département :</label>
          <br />
          <select
            value={selectedDepartment}
            onChange={(event) => handleMapPositionChange(event)}
          >
            <option value="">choix du département</option>
            {departments.map((department) => (
              <option key={department.code} value={department.code}>
                {department.name} ({department.code})
              </option>
            ))}
          </select>{" "}
          <br />
          <label htmlFor="monumentType">Indiquez le type du monument : </label>
          <select
            value={selectedMonumentType}
            onChange={handleMonumentTypeChange}
          >
            <option value="">Tous</option>
            <option value="menhir">Menhir</option>
            <option value="dolmen">Dolmen</option>
            <option value="tumulus">Tumulus</option>
            <option value="autre">Autre</option>
          </select>
          <br />
          <div className="btn-search">
            <button type="submit">Lancer la recherche</button>
          </div>
        </form>
        <p>Besoin de retrouver votre position ?</p>
        <button type="button" onClick={getLocation}>
          Autoriser la géolocalisation
        </button>
      </div>

      <MapContainer key={mapKey} center={mapLocation} zoom={8}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreemap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => {
          return (
            <Marker key={index} position={marker.geocode} icon={monumentIcon}>
              <Popup>
                <Link to={`/sites/${marker.id}`}>{marker.popUp}</Link>
              </Popup>
            </Marker>
          );
        })}
        {currentLocation !== [0, 0] && (
          <Marker
            key={1}
            position={userPosition.geocode}
            icon={userPositionIcon}
          >
            <Popup>
              {userPosition.popUp}
              <br />
              {userPosition.geocode[0]}, {userPosition.geocode[1]}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </section>
  );
};

export default Search;
