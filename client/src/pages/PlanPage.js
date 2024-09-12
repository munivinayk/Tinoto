import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Edit, Heart, Share, ChevronDown } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/PlanPage.css';
import ProfileAvatar from '../components/ProfileAvatar';
import '../styles/ProfileAvatar.css';
import planPagePic from '../Assets/Sydney.jpeg';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const PlanPage = () => {
  const { planId } = useParams();
  const location = useLocation();
  const planData = location.state;
  const userName = "Muni Vinay";

  const [expandedSection, setExpandedSection] = useState('places');
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (planData && planData.destinations && planData.destinations.length > 0) {
      // For simplicity, we're using the coordinates of the first destination as the map center
      const firstDestination = planData.destinations[0];
      if (firstDestination.lat && firstDestination.lng) {
        setMapCenter([firstDestination.lat, firstDestination.lng]);
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

  return (
    <div className="tinoto-plan-page">
      <div className="tinoto-plan-header">
        <img src={[planPagePic]} alt="Trip to Perth and Brisbane" className="tinoto-header-image" />
        <div className="tinoto-header-content">
          <h1 className="tinoto-main-title">Trip to {heading}..!</h1>
          <div className="tinoto-header-details">
            <ProfileAvatar name={userName} />
            <span className="tinoto-user-name">Muni Vinay</span>
            <span className="tinoto-trip-date">Sep 13th, 2024</span>
          </div>
          <div className="tinoto-header-actions">
            <button className="tinoto-action-button"><Edit size={16} /> Edit</button>
            <button className="tinoto-action-button"><Heart size={16} /></button>
            <button className="tinoto-action-button"><Share size={16} /></button>
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

        <div className="tinoto-map-container">
          <MapContainer center={mapCenter} zoom={4} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map((marker, index) => (
              <Marker key={index} position={marker.position}>
                <Popup>{marker.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="tinoto-plan-footer">
        <p>Planning a trip to Perth? Try our free trip planner!</p>
        <p>See your itinerary and your map in one view: no more switching between different apps to keep track of your travel plans.</p>
        <button className="tinoto-start-planning-button">Start planning your trip</button>
        <a href="#" className="tinoto-learn-more-link">Learn more</a>
      </div>
    </div>
  );
};

export default PlanPage;