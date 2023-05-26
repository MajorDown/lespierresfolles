import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

const Search = () => {
  const [currentLocation, setCurrentLocation] = useState([
    46.636322, -1.162159,
  ]);

  const markers = [
    {
      geocode: currentLocation,
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

  return (
    <section>
      <MapContainer center={currentLocation} zoom={13}>
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
