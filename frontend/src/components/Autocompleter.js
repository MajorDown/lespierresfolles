import React, { useState } from "react";
import citiesData from "../cities.json";

const Autocompleter = ({ department, onCitySelect }) => {
  const [selectedCity, setSelectedCity] = useState("");

  const handleCityChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCity(selectedValue);
    const selectedCityData = citiesData.find(
      (city) => city.commune === selectedValue
    );
    if (selectedCityData && selectedCityData.coords) {
      const { lat, lng } = selectedCityData.coords;
      onCitySelect(lat, lng);
    }
  };

  const filteredCities = citiesData
    .filter((city) => {
      if (city && city.cp) {
        const cp = city.cp.toString().padStart(5, "0");
        return cp.startsWith(department.toString());
      }
      return false;
    })
    .sort((a, b) => a.commune.localeCompare(b.commune));

  return (
    <div>
      <select value={selectedCity} onChange={handleCityChange}>
        <option value="">Sélectionner une ville</option>
        {filteredCities.map((city) => (
          <option key={city.commune} value={city.commune}>
            {city.commune} ({city.cp})
          </option>
        ))}
      </select>
    </div>
  );
};

export default Autocompleter;
