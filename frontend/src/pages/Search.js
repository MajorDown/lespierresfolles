import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import departmentsData from "../departments.json";

const Search = () => {
  const [searchOption, setSearchOption] = useState("geolocation");
  const [departments, setDepartments] = useState(departmentsData);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [mapKey, setMapKey] = useState(Date.now());
  const [currentLocation, setCurrentLocation] = useState([
    46.636322, -1.162159,
  ]);

  const markers = [
    {
      geocode: [46.636322, -1.162159],
      popUp: "chez nous",
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

  useEffect(() => {
    getLocation();
  }, []);

  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  useEffect(() => {
    const selectedDept = departments.find(
      (department) => department.code === selectedDepartment
    );

    if (selectedDept && selectedDept.coords) {
      setCurrentLocation(selectedDept.coords);
      setMapKey(Date.now());
    }
  }, [selectedDepartment, departments]);

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
        <form id="searchForm">formulaire geolocation</form>
      )}

      {searchOption === "department" && (
        <form id="searchForm">
          formulaire department
          <label htmlFor="departmentNumber">Choisissez le département :</label>
          <select
            value={selectedDepartment}
            onChange={(event) => setSelectedDepartment(event.target.value)}
          >
            {departments.map((department) => (
              <option key={department.code} value={department.code}>
                {department.name} ({department.code})
              </option>
            ))}
          </select>
        </form>
      )}

      <MapContainer key={mapKey} center={currentLocation} zoom={8}>
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
