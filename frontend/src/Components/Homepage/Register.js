import React from 'react';
import "./Register.css";
import whatsappLogo from '../../Images/whatsapp.png'; // Adjust the path as necessary
import spondLogo from '../../Images/spond.png'; // Adjust the path as necessary

const RegisterSection = () => {
  return (
    <div className="register-container">
      <h2 className="register-title">Join the Club</h2>
      <div className="register-section">
        {/* Left Container - WhatsApp Group */}
        <div className="register-left">
          <h3>Join Our WhatsApp Group</h3>
          <img src={whatsappLogo} alt="WhatsApp Logo" className="logo" />
          <p>Stay updated with club news and events.</p>
          <a href="https://chat.whatsapp.com/FrqPNIku9bwDpcoU1M2DWB" target="_blank" rel="noopener noreferrer">
            <button className="register-button">Join WhatsApp</button>
          </a>
        </div>

        {/* Right Container - Spond Group */}
        <div className="register-right">
          <h3>Join Us on Spond</h3>
          <img src={spondLogo} alt="Spond Logo" className="logo" />
          <p>View the clubs events and schedule.</p>
          <a href="https://spond.com/landing/group/PEKQM" target="_blank" rel="noopener noreferrer">
            <button className="register-button">Join Spond</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterSection;
