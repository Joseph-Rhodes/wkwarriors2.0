import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./GalleryPage.css";

const GalleryPage = () => {
  const { folderName } = useParams();
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isScreenLarge, setIsScreenLarge] = useState(false);

  useEffect(() => {
    // Fetch images based on folderName
    axios
      .get("https://wkwarriors.onrender.com/images")
      .then((response) => {
        const galleryData = response.data.find(
          (item) => item.folder === folderName
        );
        const galleryImages = galleryData
          ? galleryData.images.filter((img) => img.url !== galleryData.folder)
          : [];
        const updatedImages = galleryImages.slice(1);
        setImages(updatedImages);
      })
      .catch((error) => {
        console.error("Error fetching gallery images:", error);
        setImages([]);
      });
  }, [folderName]);

  // Check screen size on initial render and window resize
  useEffect(() => {
    const handleResize = () => {
      setIsScreenLarge(window.innerWidth > 768); // Set your breakpoint (e.g., 768px)
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openOverlay = () => {
    if (isScreenLarge) {
      setIsOverlayOpen(true);
    }
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return <p>Loading...</p>;

  return (
    <div className="gallery-page-container">
      <h1 className="gallery-page-title">{folderName}</h1>
      <div className="gallery-image-container">
        <button className="gallery-nav-button" onClick={handlePrev}>
          <span style={{ fontSize: "24px" }}>{"←"}</span>
        </button>
        <img
          className="gallery-image"
          src={images[currentIndex]?.url || "placeholder.png"}
          alt={`${folderName}-${currentIndex}`}
          onClick={openOverlay} // Open overlay on click
        />
        <button className="gallery-nav-button" onClick={handleNext}>
          <span style={{ fontSize: "24px" }}>{"→"}</span>
        </button>
      </div>
      <p className="gallery-counter">
        {currentIndex + 1} / {images.length}
      </p>
      <Link to="/photos" className="gallery-back-link">
        Back to Galleries
      </Link>

      {isOverlayOpen && isScreenLarge && ( // Render overlay only for large screens
        <div className="overlay" onClick={closeOverlay}>
          <img
            className="overlay-image"
            src={images[currentIndex]?.url || "placeholder.png"}
            alt="Enlarged view"
            onClick={closeOverlay} // Close overlay when clicking the image
          />
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
