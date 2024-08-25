import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useTheme } from '../styles/ThemeContext';
import citiesData from '../Data/CitiesData.json';

const WriteTravelGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filteredCities = citiesData.cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.country.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filteredCities);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleAddCity = (city) => {
    if (selectedCities.length < 10 && !selectedCities.some(c => c.name === city.name)) {
      setSelectedCities([...selectedCities, city]);
      setSearchTerm('');
      setSuggestions([]);
    }
  };

  const handleRemoveCity = (cityToRemove) => {
    setSelectedCities(selectedCities.filter(city => city.name !== cityToRemove.name));
  };

  return (
    <div className={`tinoto-page ${darkMode ? 'dark-mode' : ''}`}>
      <main className="tinoto-main">
        <h1 className="tinoto-main-title">Write a travel guide</h1>
        <p className="tinoto-subtitle">Help fellow travelers by writing up your tips or a past itinerary.</p>

        <div className="tinoto-search-section">
          <input
            type="text"
            placeholder="For where? e.g. Paris, Hawaii, Japan"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="tinoto-search-input"
          />
          {suggestions.length > 0 && (
            <ul className="tinoto-suggestions-list">
              {suggestions.map((city, index) => (
                <li key={index} onClick={() => handleAddCity(city)} className="tinoto-suggestion-item">
                  {city.name}, {city.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="tinoto-selected-items">
          {selectedCities.map((city, index) => (
            <div key={index} className="tinoto-item-tag">
              <span>{city.name}</span>
              <X
                className="tinoto-remove-icon"
                onClick={() => handleRemoveCity(city)}
              />
            </div>
          ))}
        </div>

        <div className="tinoto-action-section">
          <button className="tinoto-primary-button">Start writing</button>
          <p className="tinoto-alternative-action">
            Or <Link to="/" className="tinoto-link">start planning a trip</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default WriteTravelGuide;