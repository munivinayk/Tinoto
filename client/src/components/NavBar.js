import React, {useState, useEffect, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, Bell, User, Calendar, Plus, ChevronDown, Users, Globe, Lock , Moon, Sun } from 'lucide-react';
import { useTheme } from '../styles/ThemeContext';
import '../styles/NavBar.css';
import { ReactComponent as Logo } from '../Assets/logo.svg';
import menuConfig from '../Config/MenuConfig.json';
import citiesData from '../Data/CitiesData.json'


const NavBar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const desktopSearchRef = useRef(null);


  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
    setSearchTerm('');
    setSuggestions([]);
  };

  const handleSearchFocus = () => {
    setDesktopSearchOpen(true);
  };

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filteredCities = citiesData.cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.country.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filteredCities);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopSearchRef.current && !desktopSearchRef.current.contains(event.target)) {
        setDesktopSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [desktopSearchRef]);

  const handleSuggestionClick = (city) => {
    navigate(`/explore/${encodeURIComponent(city.name.toLowerCase())}`);
    setMobileSearchOpen(false);
    setDesktopSearchOpen(false);
    setSearchTerm('');
  };

  return (
    <>
    <div className="Tinoto-home" >
    <nav className={`tinoto-nav ${mobileSearchOpen ? 'mobile-search-open' : ''}`}>
       <div className="tinoto-nav-left">
        
        <div className="logo">
        <Link to="/">
          <Logo className="logo-icon" />
         </Link>
         <span className="logo-text">Tinoto</span>
       </div>
       
        <div className="nav-links desktop-only">
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
       <div className="tinoto-nav-right">
          <div className="tinoto-search-container desktop-only" ref={desktopSearchRef}>
            <input
              type="text"
              placeholder="Explore by destination"
              className="tinoto-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleSearchFocus}
            />
            {desktopSearchOpen && suggestions.length > 0 && (
              <ul className="tinoto-desktop-suggestions-list">
                {suggestions.map((city, index) => (
                  <li 
                    key={index} 
                    className="tinoto-desktop-suggestion-item"
                    onClick={() => handleSuggestionClick(city)}
                  >
                    <div className="tinoto-desktop-suggestion-name">{city.name}</div>
                    <div className="tinoto-desktop-suggestion-region">{city.region}, {city.country}</div>
                    <div className="tinoto-desktop-suggestion-type">{city.type}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <X className="tinoto-search-close mobile-only" onClick={toggleMobileSearch} />
        </div>
        <Search className="tinoto-mobile-search-icon mobile-only" onClick={toggleMobileSearch} />
         <Bell className="nav-icon" />
         <User className="nav-icon" />
         <button className="tinoto-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
       
       </div>
     </nav>
    </div>
    {mobileSearchOpen && (
        <div className="tinoto-mobile-search-overlay">
          <div className="tinoto-mobile-search-header">
            <input
              type="text"
              placeholder="Explore by destination"
              className="tinoto-mobile-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <X className="tinoto-mobile-search-close" onClick={toggleMobileSearch} />
          </div>
          {suggestions.length > 0 && (
            <ul className="tinoto-mobile-suggestions-list">
              {suggestions.map((city, index) => (
                <li 
                  key={index} 
                  className="tinoto-mobile-suggestion-item"
                  onClick={() => handleSuggestionClick(city)}
                >
                  <div className="tinoto-mobile-suggestion-name">{city.name}</div>
                  <div className="tinoto-mobile-suggestion-region">{city.region}, {city.country}</div>
                  <div className="tinoto-mobile-suggestion-type">City</div>
                </li>
              ))}
            </ul>
          )}
      </div>
    )}
    </>
  );
};

export default NavBar;
