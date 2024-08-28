import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const PlanPage = () => {
  const { planId } = useParams();
  const location = useLocation();
  const planData = location.state;

  if (!planData) {
    return <div className="tinoto-container">No plan data available.</div>;
  }

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
    <div className="tinoto-container">
      <h1 className="tinoto-main-title">{heading}</h1>
      <div className="tinoto-section">
        <h2 className="tinoto-subtitle">Plan ID: {planId}</h2>
        <h3 className="tinoto-label">Destinations:</h3>
        <ul className="tinoto-list">
          {planData.destinations.map((dest, index) => (
            <li key={index}>{dest.name}, {dest.region}, {dest.country}</li>
          ))}
        </ul>
        <h3 className="tinoto-label">Dates:</h3>
        <p>Start Date: {planData.startDate || 'Not specified'}</p>
        <p>End Date: {planData.endDate || 'Not specified'}</p>
        <h3 className="tinoto-label">Trip Type:</h3>
        <p>{planData.tripSelection}</p>
      </div>
    </div>
  );
};

export default PlanPage;