import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, Bell, User, Calendar, Plus, ChevronDown, Users, Globe, Lock } from 'lucide-react';
import { useTheme } from '../styles/ThemeContext';
import menuConfig from '../Config/MenuConfig.json';
import SearchInput from '../components/SearchInput';
import citiesData from '../Data/CitiesData.json'

const HomePage = () => {
  const [destination, setDestination] = useState('');
  const [isPlanning, setIsPlanning] = useState(false);
  const [showFriendsDropdown, setShowFriendsDropdown] = useState(false);
  const [selectedFriendOption, setSelectedFriendOption] = useState(menuConfig.friendsOptions[0]);
  const dropdownRef = useRef(null);

 
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tripType, setTripType] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const iconComponents = {
    Users: Users,
    Globe: Globe,
    Lock: Lock
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFriendsDropdown(false);
      }
    };
      

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleStartPlanning = (e) => {
    e.preventDefault();
    if (selectedCities.length===0) {
      setError('Choose atleast one destination to start planning');
      return;
    }
    setIsPlanning(true);

    const planId = generatePlanId();
    const planData = {
      destinations: selectedCities,
      startDate,
      endDate,
      tripSelection: selectedFriendOption.name
    };
    console.log(planData)
    navigate(`/plan/${planId}`, { state: planData });
  };

  const handleResetPlanning = () => {
    setDestination('');
    setStartDate('');
    setEndDate('');
    setIsPlanning(false);
    setSelectedCities([]);
    setTripType('')
  };

  const handleAddDestination = () => {
    if (destination && !selectedDestinations.includes(destination)) {
      setSelectedDestinations([...selectedDestinations, destination]);
      setDestination('');
    }
  };

  const handleRemoveDestination = (dest) => {
    setSelectedDestinations(selectedDestinations.filter(d => d !== dest));
  };

  const handleAddCity = (city) => {
    if (selectedCities.length < 10 && !selectedCities.some(c => c.name === city.name)) {
      setSelectedCities([...selectedCities, city]);
      setSearchTerm('');
      setSuggestions([]);
      setError('');
    }
  };

  const handleRemoveCity = (cityToRemove) => {
    setSelectedCities(selectedCities.filter(city => city.name !== cityToRemove.name));
  };

  const generatePlanId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const handleDestinationSelect = (city) => {
    if (selectedDestinations.length < 5 && !selectedDestinations.some(d => d.name === city.name)) {
      setSelectedDestinations([...selectedDestinations, destination]);
      setError('');
    }
  };

  return (
    <div className={`tinoto-page ${darkMode ? 'dark-mode' : ''}`}>
      <main className="tinoto-main">
      <form  onSubmit={handleStartPlanning} className="trip-form">
        <h1 className="tinoto-main-title">Plan a new trip</h1>
        <p className="tinoto-subtitle">Start your journey with Tinoto</p>
        
        <div className="tinoto-search-section">
          <input
            type="text"
            placeholder="Where to? e.g. Paris, Hawaii, Japan"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="tinoto-search-input"
          />
          {suggestions.length > 0 && (
            <ul className="tinoto-suggestions-list">
          {suggestions.map((city, index) => (
            <li 
              key={index} 
              className="tinoto-suggestion-item"
              onClick={() => handleAddCity(city)}
            >
              <div className="tinoto-suggestion-name">{city.name}</div>
              <div className="tinoto-suggestion-region">{city.region}, {city.country}</div>
              <div className="tinoto-suggestion-type">{city.type}</div>
            </li>
          ))}
        </ul>
          )}
        </div>
        {error && <p className="tinoto-error">{error}</p>}
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
        <div className="dates-container">
            <p className="dates-label">Dates (optional)</p>
            <div className="dates-inputs">
              <div className="date-input">
                <Calendar className="date-icon" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="date-input-field"
                />
              </div>
              <div className="date-input">
                <Calendar className="date-icon" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="date-input-field"
                />
              </div>
            </div>
          </div>
          
          <div className="trip-options">
          <button type="button" className="invite-button">
            <Plus className="invite-icon" />
            Invite tripmates
          </button>
          <div className="friends-dropdown-container" ref={dropdownRef}>
            <button
              type="button"
              className="friends-button"
              onClick={() => setShowFriendsDropdown(!showFriendsDropdown)}
              onChange={(e) => setTripType(e.target.value)}
              required
            >
              {React.createElement(iconComponents[selectedFriendOption.icon], { className: "friends-icon" })}
              {selectedFriendOption.name}
              <ChevronDown className="chevron-icon" />
            </button>
            {showFriendsDropdown && (
              <ul className="friends-dropdown">
                {menuConfig.friendsOptions.map((option, index) => {
                  const IconComponent = iconComponents[option.icon];
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectedFriendOption(option);
                        setShowFriendsDropdown(false);
                      }}
                      className={option.name === selectedFriendOption.name ? 'selected' : ''}
                    >
                      <IconComponent className="option-icon" />
                      {option.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="tinoto-selected-items">
          {selectedDestinations.map((dest, index) => (
            <div key={index} className="tinoto-item-tag">
              <span>{dest}</span>
              <X
                className="tinoto-remove-icon"
                onClick={() => handleRemoveDestination(dest)}
              />
            </div>
          ))}
        </div>
        
        <div className="tinoto-action-section">
          <button className="tinoto-primary-button" type="submit">Start planning</button>
          <p className="tinoto-alternative-action">
            Or <Link to="/guide" className="tinoto-link">write a new guide</Link>
          </p>
        </div>
      </form>
      </main>
    </div>
  );
};

export default HomePage;