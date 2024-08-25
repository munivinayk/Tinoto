import React from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Bell, User, Calendar, Plus, ChevronDown, Users, Globe, Lock , Moon, Sun } from 'lucide-react';
import { useTheme } from '../styles/ThemeContext';
import '../styles/NavBar.css';
import { ReactComponent as Logo } from '../Assets/logo.svg';
import menuConfig from '../Config/MenuConfig.json';


const NavBar = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="Tinoto-home">
    <nav className="nav">
       <div className="nav-left">
        
        <div className="logo">
        <Link to="/">
          <Logo className="logo-icon" />
         </Link>
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
         <button className="tinoto-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
       </div>
     </nav>
    </div>
  );
};

export default NavBar;
