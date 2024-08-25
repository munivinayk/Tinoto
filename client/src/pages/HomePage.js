import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Bell, User, Calendar, Plus, ChevronDown, Users, Globe, Lock } from 'lucide-react';
import { useTheme } from '../styles/ThemeContext';
import menuConfig from '../Config/MenuConfig.json';

const HomePage = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isPlanning, setIsPlanning] = useState(false);
  const [showFriendsDropdown, setShowFriendsDropdown] = useState(false);
  const [selectedFriendOption, setSelectedFriendOption] = useState(menuConfig.friendsOptions[0]);
  const dropdownRef = useRef(null);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
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

  const handleStartPlanning = (e) => {
    e.preventDefault();
    setIsPlanning(true);
  };

  const handleResetPlanning = () => {
    setDestination('');
    setStartDate('');
    setEndDate('');
    setIsPlanning(false);
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
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="tinoto-search-input"
            onKeyPress={(e) => e.key === 'Enter' && handleAddDestination()}
          />
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
          <button className="tinoto-primary-button">Start planning</button>
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