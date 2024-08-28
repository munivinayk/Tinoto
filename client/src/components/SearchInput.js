import React, { useState, useEffect, useRef } from 'react';
import citiesData from '../Data/CitiesData.json';

const SearchInput = ({ id, placeholder, onSelect, value }) => {
  const [searchTerm, setSearchTerm] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setSearchTerm(value || '');
  }, [value]);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filteredCities = citiesData.cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.country.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 7);
      setSuggestions(filteredCities);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef]);

  const handleSuggestionClick = (city) => {
    setSearchTerm(city.name);
    setSuggestions([]);
    setIsFocused(false);
    if (onSelect) {
      onSelect(city);
    }
  };

  return (
    <div className="tinoto-search-section" ref={inputRef}>
      <input
        id={id}
        type="text"
        className="tinoto-search-input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
      />
      {isFocused && suggestions.length > 0 && (
        <ul className="tinoto-suggestions-list">
          {suggestions.map((city, index) => (
            <li 
              key={index} 
              className="tinoto-suggestion-item"
              onClick={() => handleSuggestionClick(city)}
            >
              <div className="tinoto-suggestion-name">{city.name}</div>
              <div className="tinoto-suggestion-region">{city.region}, {city.country}</div>
              <div className="tinoto-suggestion-type">{city.type}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
