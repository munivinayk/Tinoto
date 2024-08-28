import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ExplorePage.css';

const ExplorePage = () => {
  const { name } = useParams();

  return (
    <div className="tinoto-explore-page">
      <h1>Explore {name.charAt(0).toUpperCase() + name.slice(1)}</h1>
      {/* Add more content for the explore page here */}
    </div>
  );
};

export default ExplorePage;
