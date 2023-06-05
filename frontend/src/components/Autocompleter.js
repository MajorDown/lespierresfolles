import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import citiesData from "../cities.json";

const Autocompleter = ({ department }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [visibleSuggestionsCount, setVisibleSuggestionsCount] = useState(10);

  useEffect(() => {
    const fetchSuggestions = () => {
      const filteredCommunes = citiesData.filter((commune) => {
        if (commune && commune.cp) {
          const cp = commune.cp.toString().padStart(5, "0");
          return cp.startsWith(department.toString());
        }
        return false;
      });

      const filteredSuggestions = filteredCommunes.filter(
        (commune) =>
          commune.commune &&
          commune.commune.toLowerCase().includes(inputValue.toLowerCase())
      );

      setVisibleSuggestionsCount(Math.min(filteredSuggestions.length, 10));
      setSuggestions(filteredSuggestions.slice(0, visibleSuggestionsCount));
    };

    const debouncedFetch = debounce(fetchSuggestions, 300);

    if (inputValue.length > 0) {
      debouncedFetch();
    } else {
      setSuggestions([]);
    }

    return () => {
      debouncedFetch.cancel();
    };
  }, [inputValue, department, visibleSuggestionsCount]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.commune);
  };

  return (
    <>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <ul className="completerList">
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion.commune} ({suggestion.cp})
          </li>
        ))}
      </ul>
    </>
  );
};

export default Autocompleter;
