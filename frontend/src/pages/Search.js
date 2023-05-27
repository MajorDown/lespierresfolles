import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import departmentsData from "../departments.json";

const Search = () => {
  const [selectedRadius, setSelectedRadius] = useState(8);
  const [searchOption, setSearchOption] = useState("geolocation");
  const [departments, setDepartments] = useState(departmentsData);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [mapKey, setMapKey] = useState(Date.now());
  const [selectedMonumentType, setSelectedMonumentType] = useState("");
  const [currentLocation, setCurrentLocation] = useState([
    46.636322, -1.162159,
  ]);
  const [zoomLevel, setZoomLevel] = useState(8);

  const markers = [
    {
      geocode: [46.636322, -1.162159],
      popUp: "Votre position",
    },
  ];
  const leafletIcon = new Icon({
    iconUrl: require("../icons/siteIcon.png"),
    iconSize: [30, 30],
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

  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handleMonumentTypeChange = (event) => {
    setSelectedMonumentType(event.target.value);
  };

  const calculateZoomFromRadius = (radius, searchOption) => {
    if (searchOption === "geolocation") {
      if (radius <= 5) {
        return 12; // Niveau de zoom pour un rayon de 5 km ou moins
      } else if (radius <= 10) {
        return 11; // Niveau de zoom pour un rayon de 10 km ou moins
      } else if (radius <= 20) {
        return 10; // Niveau de zoom pour un rayon de 20 km ou moins
      } else {
        return 9; // Niveau de zoom par défaut pour un rayon supérieur à 20 km
      }
    } else {
      return 8; // Niveau de zoom par défaut pour le mode "department"
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (searchOption === "geolocation") {
      getLocation();
    } else {
      const selectedDept = departments.find(
        (department) => department.code === selectedDepartment
      );

      if (selectedDept && selectedDept.coords) {
        setCurrentLocation(selectedDept.coords);
        setMapKey(Date.now());
      }
    }

    // Mettre à jour le niveau de zoom lorsque le mode de recherche change
    const zoomLevel =
      searchOption === "department"
        ? 8
        : calculateZoomFromRadius(selectedRadius, searchOption);
    setZoomLevel(zoomLevel);
  }, [searchOption, selectedDepartment, departments, selectedRadius]);

  return (
    <section>
      <h2>Recherchez des Mégalithes</h2>
      <div id="searchSection">
        <p>Vous souhaitez effectuer votre recherche par :</p>
        <label htmlFor="searchByGeolocation">géolocalisation</label>
        <input
          type="radio"
          name="searchBy"
          id="searchByGeolocation"
          value="geolocation"
          checked={searchOption === "geolocation"}
          onChange={handleSearchOptionChange}
        />
        <label htmlFor="searchByDepartment">département</label>
        <input
          type="radio"
          name="searchBy"
          id="searchByDepartment"
          value="department"
          checked={searchOption === "department"}
          onChange={handleSearchOptionChange}
        />
      </div>

      {searchOption === "geolocation" && (
        <form id="searchForm">
          <label htmlFor="radius">Choisissez le rayon :</label>
          <br />
          <select
            value={selectedRadius}
            onChange={(event) => setSelectedRadius(event.target.value)}
          >
            <option value="5">5 km</option>
            <option value="10">10 km</option>
            <option value="20">20 km</option>
            {/* Ajoutez d'autres options de rayon selon vos besoins */}
          </select>
          <br />
          <label htmlFor="monumentType">Choisissez le type de monument :</label>
          <br />
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
        </form>
      )}

      {searchOption === "department" && (
        <form id="searchForm">
          <label htmlFor="departmentNumber">Choisissez le département :</label>
          <br />
          <select
            value={selectedDepartment}
            onChange={(event) => setSelectedDepartment(event.target.value)}
          >
            <option value="">choix du département</option>
            {departments.map((department) => (
              <option key={department.code} value={department.code}>
                {department.name} ({department.code})
              </option>
            ))}
          </select>{" "}
          <br />
          <label htmlFor="monumentType">Choisissez le type de monument :</label>
          <br />
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
        </form>
      )}

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

export default Search;
