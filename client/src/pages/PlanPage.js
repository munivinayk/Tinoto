import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import { Edit, Heart, Share, ChevronDown, Calendar, Users } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/PlanPage.css';
import ProfileAvatar from '../components/ProfileAvatar';
import '../styles/ProfileAvatar.css';
import planPagePic from '../Assets/Sydney.jpeg';
import { useTheme } from '../styles/ThemeContext';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MapUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const PlanPage = () => {
  const { planId } = useParams();
  const location = useLocation();
  const planData = location.state;
  const userName = "Muni Vinay";
  const { darkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [expandedSection, setExpandedSection] = useState('places');
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [mapZoom, setMapZoom] = useState(4);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (planData && planData.destinations && planData.destinations.length > 0) {
      // For simplicity, we're using the coordinates of the first destination as the map center
      const firstDestination = planData.destinations[0];
      if (firstDestination.lat && firstDestination.lng) {
        setMapCenter([firstDestination.clat, firstDestination.clng]);
        console.log(firstDestination.clat, firstDestination.clng);
      }
      
      // Create markers for all destinations
      const newMarkers = planData.destinations
        .filter(dest => dest.lat && dest.lng)
        .map(dest => ({
          position: [dest.lat, dest.lng],
          name: dest.name
        }));
      setMarkers(newMarkers);
    }
  }, [planData]);

  if (!planData) {
    return <div className="tinoto-container">No plan data available.</div>;
  }

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const formatHeading = (destinations) => {
    if (destinations.length === 1) {
      return destinations[0].name;
    } else if (destinations.length === 2) {
      return `${destinations[0].name} and ${destinations[1].name}`;
    } else {
      return `${destinations[0].name}, ${destinations[1].name}, and others`;
    }
  };

  const heading = formatHeading(planData.destinations);

    // Format the dates
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
    };
  
    const startDate = formatDate(planData.startDate);
    const endDate = formatDate(planData.endDate);

    const mapTileLayer = darkMode
    ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';



  return (
    <div className={`tinoto-plan-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="tinoto-plan-header">
        <img src={[planPagePic]} alt="Trip to Perth and Brisbane" className="tinoto-header-image"/>
        <div className="tinoto-trip-info-card">

          <h1 className="tinoto-trip-title">Trip to {heading}..!</h1>
          <div className="tinoto-header-details">
            <ProfileAvatar name={userName} />
            <span className="tinoto-user-name">Muni Vinay</span>
          </div>
          <div className="tinoto-trip-dates">
          <Calendar size={16} />
          <span>{startDate} - {endDate}</span>
          </div>
        </div>
        
      </div>

      <div className="tinoto-plan-content">
        <div className="tinoto-sidebar">
          <div className="tinoto-section">
            <h2 onClick={() => toggleSection('places')} className="tinoto-section-title">
              Places to visit <ChevronDown size={16} className={`tinoto-chevron ${expandedSection === 'places' ? 'rotated' : ''}`} />
            </h2>
            {expandedSection === 'places' && (
              <ul className="tinoto-places-list">
                {planData.destinations.map((dest, index) => (
                  <li key={index} className="tinoto-place-item">
                    <h3>{dest.name}</h3>
                    <p>{dest.description}</p>
                    <button className="tinoto-save-button">Save</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {!isMobile && (
        <div className="tinoto-map-container">
          <MapContainer center={mapCenter} zoom={4} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url={mapTileLayer}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map((marker, index) => (
              <Marker key={index} position={marker.position}>
                <Popup>{marker.name}</Popup>
              </Marker>
            ))}
            <MapUpdater center={mapCenter} zoom={mapZoom} />
          </MapContainer>
        </div>
        )}
      </div>

      <div className="tinoto-plan-footer">
        <p>Planning a {heading}? Try our free trip planner!</p>
        <p>See your itinerary and your map in one view: no more switching between different apps to keep track of your travel plans.</p>
        <button className="tinoto-start-planning-button">Start planning your trip</button>
        <a href="#" className="tinoto-learn-more-link">Learn more</a>
      </div>
    </div>
  );
};

export default PlanPage;