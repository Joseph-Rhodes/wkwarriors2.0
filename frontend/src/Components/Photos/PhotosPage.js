import React, { useEffect, useState } from 'react';
import './PhotosPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PhotosPage = () => {
  const [media, setMedia] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5); // Start with 5 items visible for mobile
  const [isMobileView, setIsMobileView] = useState(false); // Detect mobile view

  useEffect(() => {
    // Fetch media data
    axios
      .get("https://wkwarriors.onrender.com/images") // Replace with your backend URL
      .then((response) => {
        const sortedMedia = response.data.sort(
          (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
        );
        setMedia(sortedMedia);
      })
      .catch((error) => console.error("Error fetching media:", error));

    // Check if the view is mobile
    const checkMobileView = () => {
      const isMobile = window.innerWidth <= 768; // Adjust width as needed
      setIsMobileView(isMobile);

      // If not mobile, show all items
      if (!isMobile) {
        setVisibleCount(Number.MAX_SAFE_INTEGER); // Show all folders
      }
    };

    checkMobileView(); // Initial check
    window.addEventListener('resize', checkMobileView); // Recheck on resize

    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 5); // Show 5 more items
  };

  return (
    <div className="photos-page-container">
      <div className="photos-page-container-header">
        <h1>Galleries (Waiting on more images)</h1>
      </div>
      <div className="photos-cards-container">
        {media.slice(0, visibleCount).map((item, index) => (
          <Link
              to={`/photos/${item.folder}`} 
              key={index}
              className="photos-card"
            >
            <img
              src={item.images?.[1]?.url} 
              alt={item.folder || 'Gallery'}
              className="photos-title-image"
            />
            <div className="photos-title">{item.folder}</div>
            </Link>
        ))}
      </div>
      {isMobileView && visibleCount < media.length && (
        <button className="see-more-button" onClick={handleSeeMore}>
          See More
        </button>
      )}
    </div>
  );
};

export default PhotosPage;
