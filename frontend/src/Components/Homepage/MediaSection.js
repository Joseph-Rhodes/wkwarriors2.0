import React, { useState, useEffect } from 'react';
import './MediaSection.css';

const cards = [
  {
    title: "The Roaring 20sfvdvdvd lvndovidovhfrefweddeewdew",
    time: "13h",
    draft: "2024 draft",
    description: "Description for Jaylon Tyson",
    // imgSrc: "../../Images/teamPhoto.png"
  },
  {
    title: "Prospect Profile: Kyshawn George",
    time: "3d",
    draft: "2024 draft",
    description: "Description for Kyshawn George",
    // imgSrc: "../../Images/teamPhoto.png"
  },
  {
    title: "Prospect Profile: Johnny Furphy",
    time: "6d",
    draft: "2024 draft",
    description: "Description for Johnny Furphy",
    // imgSrc: "../../Images/teamPhoto.png"
  },
  {
    title: "Prospect Profile: Johnny Furphy",
    time: "6d",
    draft: "2024 draft",
    description: "Description for Johnny Furphy",
    // imgSrc: "../../Images/teamPhoto.png"
  },
  {
    title: "Prospect Profile: Johnny Furphy",
    time: "6d",
    draft: "2024 draft",
    description: "Description for Johnny Furphy",
    // imgSrc: "../../Images/teamPhoto.png"
  },
  {
    title: "Prospect Profile: Johnny Furphy",
    time: "6d",
    draft: "2024 draft",
    description: "Description for Johnny Furphy",
    // imgSrc: "../../Images/teamPhoto.png"
  },
  {
    title: "Prospect Profile: Johnny Furphy",
    time: "6d",
    draft: "2024 draft",
    description: "Description for Johnny Furphy",
    // imgSrc: "../../Images/teamPhoto.png"
  },
  // Add more cards as needed
];

const MediaSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  const handleNext = () => {
    if (isMobile) {
      if (currentIndex + 1 < cards.length) {
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      if (currentIndex + 3 < cards.length) {
        setCurrentIndex(currentIndex + 3);
      }
    }
  };

  const handlePrev = () => {
    if (isMobile) {
      if (currentIndex - 1 >= 0) {
        setCurrentIndex(currentIndex - 1);
      }
    } else {
      if (currentIndex - 3 >= 0) {
        setCurrentIndex(currentIndex - 3);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentCards = isMobile ? [cards[currentIndex]] : cards.slice(currentIndex, currentIndex + 3);

  return (
    <div className="media-section">
      <h2 className="section-title">Latest Media</h2>
      <div className="cards-container">
        {currentCards.map((card, index) => (
          <div className="card" key={index}>
            <div className="card-image-container">
              {/* <img src={card.imgSrc} alt={card.title} className="card-img" /> */}
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {currentIndex > 0 && (
        <button className="nav-button prev" onClick={handlePrev}><i className="fa-solid fa-arrow-left"></i></button>
      )}
      {(isMobile ? currentIndex + 1 < cards.length : currentIndex + 3 < cards.length) && (
        <button className="nav-button next" onClick={handleNext}><i className="fa-solid fa-arrow-right"></i></button>
      )}
    </div>
  );
};

export default MediaSection;
