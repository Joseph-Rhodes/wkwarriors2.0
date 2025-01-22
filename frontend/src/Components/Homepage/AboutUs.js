import React from 'react';
import './AboutUs.css';
import FoundationImage from '../../Images/Screenshot 2024-06-28 at 17.41.01.png'; 
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="image-overlay-container">
        <img src={FoundationImage} alt="USA Basketball Foundation" className="foundation-image" />
        <div className="image-overlay"></div>
      </div>
      <div className="about-us-content">
        <h1>West Kirby Warriors</h1>
        <p>
          The West Kirby Warriors, founded in 2001 in Hoylake, Liverpool, UK, have emerged as a promising club on the rise. 
          With recent efforts focused on rebuilding and revitalization, they are gaining recognition for their dedication to 
          fostering talent and community engagement in the local sports scene.
        </p>
        <div className="button-container2">
          <Link to="/roster" style={{ textDecoration: 'none' }} className="meet-the-team-button">Meet the Team</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
