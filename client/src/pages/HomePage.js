import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, User, Calendar, Plus, ChevronDown, Users, Globe, Lock } from 'lucide-react';
import '../styles/HomePage.css'
import { ReactComponent as Logo } from './Assets/logo.svg';
import menuConfig from '../Config/MenuConfig.json'

const HomePage = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isPlanning, setIsPlanning] = useState(false);
  const [showFriendsDropdown, setShowFriendsDropdown] = useState(false);
  const [selectedFriendOption, setSelectedFriendOption] = useState(menuConfig.friendsOptions[0]);
  const dropdownRef = useRef(null);

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

  return (
    <div className="Tinoto-home">
      <nav className="nav">
        <div className="nav-left">
                  <div className="logo">
          <Logo className="logo-icon" />
          <span className="logo-text">Tinoto</span>
        </div>
        
         <div className="nav-links">
            {menuConfig.menuItems.map((item, index) => (
              <a 
                key={index}
                href={item.link}
                className={`nav-link ${item.active ? 'active' : ''}`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className="nav-right">
          <div className="search-container">
            <input type="text" placeholder="Enter place or user" className="search-input" />
            <Search className="search-icon" />
          </div>
          <Bell className="nav-icon" />
          <User className="nav-icon" />
        </div>
      </nav>

      <main className="main-content">
        <h1 className="main-title">Plan a new trip</h1>
        
        <form onSubmit={handleStartPlanning} className="trip-form">
          <input
            type="text"
            placeholder="Where to? e.g. Paris, Hawaii, Japan"
            className="destination-input"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          
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
          
          <div className="start-planning-container">
            <button type="submit" className="start-planning-button">
              Start planning
            </button>
          </div>
        </form>
        
        <p className="write-guide-text">Or write a new guide</p>
      </main>
    </div>
  );
};

export default HomePage;
