import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MediaSection.css"; // Import the CSS file

const MediaSection = () => {
  const [media, setMedia] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3); // Default: 3 images

  useEffect(() => {
    // Fetch media data
    axios
      .get("http://localhost:3000/images") // Replace with your backend URL
      .then((response) => {
        // Sort folders by lastModified (most recent first)
        const sortedMedia = response.data
          .sort(
            (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
          )
          .slice(0, 6); // Take only the 6 most recent galleries
        setMedia(sortedMedia);
      })
      .catch((error) => console.error("Error fetching media:", error));
  }, []);

  useEffect(() => {
    // Update the visible image count based on screen size
    const updateVisibleCount = () => {
      if (window.innerWidth <= 600) {
        setVisibleCount(1); // 1 image for small screens
      } else if (window.innerWidth <= 1024) {
        setVisibleCount(2); // 2 images for medium screens
      } else {
        setVisibleCount(3); // 3 images for larger screens
      }
    };

    updateVisibleCount(); // Run on mount
    window.addEventListener("resize", updateVisibleCount); // Update on resize

    return () => window.removeEventListener("resize", updateVisibleCount); // Cleanup
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleCount >= media.length ? 0 : prevIndex + visibleCount
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - visibleCount < 0
        ? media.length - visibleCount
        : prevIndex - visibleCount
    );
  };

  return (
    <div className="latest-media-container">
      <h2 className="latest-media-title">LATEST MEDIA</h2>
      <div className="media-gallery">
        {media.slice(currentIndex, currentIndex + visibleCount).map((item, index) => (
          <div key={index} className="media-card">
            <img
              src={item.images[1].url} // First image of the folder
              alt={item.folder}
              className="media-image"
            />
            <div className="hover-title">{item.folder}</div>
          </div>
        ))}
      </div>
      <div className="media-navigation">
        {/* Conditionally render the Previous button */}
        {currentIndex > 0 && (
          <button onClick={handlePrev} className="nav-button">
            <span style={{ fontSize: "24px" }}>{"←"}</span> {/* Left Arrow */}
          </button>
        )}
        {/* Conditionally render the Next button */}
        {currentIndex + visibleCount < media.length && (
          <button onClick={handleNext} className="nav-button">
            <span style={{ fontSize: "24px" }}>{"→"}</span> {/* Right Arrow */}
          </button>
        )}
      </div>
    </div>
  );
};

export default MediaSection;
