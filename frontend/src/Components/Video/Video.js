import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Video.css";

const Video = () => {
  const [media, setMedia] = useState([]);
  const [recentVideos, setRecentVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayVideo, setOverlayVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("https://wkwarriors.onrender.com/videos");
        const folders = response.data;

        const allVideos = folders
          .filter((folder) => !folder.folder.includes("thumbnails"))
          .flatMap((folder) =>
            folder.videos.map((video) => ({
              key: video.key,
              url: video.url,
              lastModified: video.lastModified,
              thumbnailUrl: video.thumbnailUrl || video.url.replace(".mp4", "-thumbnail.png"),
            }))
          );

        const sortedVideos = allVideos.sort(
          (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
        );

        setMedia(sortedVideos);

        const limitedRecentVideos = sortedVideos.slice(0, 5);
        setRecentVideos(limitedRecentVideos);

        if (limitedRecentVideos.length > 0) {
          setActiveVideo(limitedRecentVideos[0]);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const openOverlay = (video) => {
    setOverlayVideo(video);
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setOverlayVideo(null);
  };

  return (
    <div className="video-page-container">
      <div className="video-page-container-header">
        <h1>Videos</h1>
      </div>
      <div className="video-content">
        {activeVideo && (
          <div className="video-player">
            <video
              src={activeVideo.url}
              controls
              autoPlay
              className="main-video"
            />
          </div>
        )}
        <div className="video-list">
          {recentVideos.map((video) => (
            <div
              key={video.key}
              className={`video-item ${
                activeVideo?.key === video.key ? "active-video" : ""
              }`}
              onClick={() => setActiveVideo(video)}
            >
              <img
                src={video.thumbnailUrl}
                alt={video.key}
                className="video-thumbnail"
              />
              <p className="video-title">{video.key.replace(".mp4", "")}</p>
            </div>
          ))}
        </div>
      </div>

      {/* All Videos Section */}
      <div className="all-videos-section">
        <h2>More Videos</h2>
        <div className="all-videos-grid">
          {media.map((video) => (
            <div
              key={video.key}
              className="all-videos-item"
              onClick={() => openOverlay(video)}
            >
              <img
                src={video.thumbnailUrl}
                alt={video.key}
                className="all-video-thumbnail"
              />
              <p className="all-video-title">{video.key.replace(".mp4", "")}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for Video Playback */}
      {isOverlayOpen && overlayVideo && (
        <div className="video-overlay" onClick={closeOverlay}>
          <div className="video-overlay-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="overlay-title">{overlayVideo.key.replace(".mp4", "")}</h2>
            <video
              src={overlayVideo.url}
              controls
              autoPlay
              className="overlay-video-player"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
