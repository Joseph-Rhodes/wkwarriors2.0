require("dotenv").config();
const express = require("express");
const AWS = require("aws-sdk");
const cors = require("cors");
const processVideo = require("./thumbnailGenerator"); // Import the thumbnail generator
const path = require("path");
const dotenv = require('dotenv');
const pool = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// AWS S3 configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Endpoint to get list of images grouped by folder, with last modified date
app.get("/images", async (req, res) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
    };

    // Fetch all objects from the bucket
    const data = await s3.listObjectsV2(params).promise();

    // Group by folder and track the latest modification date
    const folderMap = {};
    data.Contents.forEach((item) => {
      const folder = item.Key.split("/")[0]; // Extract folder name
      if (!folderMap[folder]) {
        folderMap[folder] = {
          folder,
          lastModified: item.LastModified,
          images: [],
        };
      }

      folderMap[folder].images.push({
        key: item.Key,
        url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`,
        lastModified: item.LastModified,
      });

      // Update folder's lastModified to the most recent date
      if (folderMap[folder].lastModified < item.LastModified) {
        folderMap[folder].lastModified = item.LastModified;
      }
    });

    // Convert folderMap to an array and sort folders by lastModified (desc)
    const sortedFolders = Object.values(folderMap).sort(
      (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
    );

    res.json(sortedFolders); // Send the sorted folder list with images and lastModified
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching images from S3" });
  }
});

// Endpoint to get list of videos grouped by folder, with last modified date
app.get("/videos", async (req, res) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME_VIDEO,
    };

    // Fetch all objects from the bucket
    const data = await s3.listObjectsV2(params).promise();

    // Group by folder and track the latest modification date
    const folderMap = {};
    data.Contents.forEach((item) => {
      const folder = item.Key.split("/")[0]; // Extract folder name
      const isVideo = item.Key.endsWith(".mp4"); // Check if it's a video

      if (!folderMap[folder]) {
        folderMap[folder] = {
          folder,
          lastModified: item.LastModified,
          videos: [],
        };
      }

      const videoUrl = `https://${process.env.AWS_BUCKET_NAME_VIDEO}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`;
      const thumbnailKey = `thumbnails/${path.basename(item.Key, path.extname(item.Key))}-thumbnail.png`;
      const thumbnailUrl = `https://${process.env.AWS_BUCKET_NAME_VIDEO}.s3.${process.env.AWS_REGION}.amazonaws.com/${thumbnailKey}`;

      folderMap[folder].videos.push({
        key: item.Key,
        url: videoUrl,
        lastModified: item.LastModified,
        thumbnailUrl: isVideo ? thumbnailUrl : null,
      });

      // Update folder's lastModified to the most recent date
      if (folderMap[folder].lastModified < item.LastModified) {
        folderMap[folder].lastModified = item.LastModified;
      }
    });

    // Convert folderMap to an array and sort folders by lastModified (desc)
    const sortedFolders = Object.values(folderMap).sort(
      (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
    );

    res.json(sortedFolders); // Send the sorted folder list with videos and thumbnails
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching videos from S3" });
  }
});

// Endpoint to generate thumbnails for all videos
app.get("/videos-with-thumbnails", async (req, res) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME_VIDEO,
    };

    // Fetch all objects from the bucket
    const data = await s3.listObjectsV2(params).promise();

    // Generate thumbnails for each video
    const thumbnailPromises = data.Contents.map(async (item) => {
      if (item.Key.endsWith(".mp4")) {
        // Process only video files
        const result = await processVideo(params.Bucket, item.Key);
        return result;
      }
    });

    const results = await Promise.all(thumbnailPromises);
    res.json(results.filter(Boolean)); // Send results, filtering out null/undefined
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing videos from S3" });
  }
});


app.get('/api/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); // Test query to PostgreSQL
    res.json({ message: 'Database connection successful!', time: result.rows[0].now });
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Players API Routes
const playerRoutes = require('./routes/players');
app.use('/api/players', playerRoutes); // Endpoint for players

const statsRoutes = require('./routes/stats');
app.use('/api/stats', statsRoutes); // Endpoint for stats

const coachesRoutes = require('./routes/coaches');
app.use('/api/coaches', coachesRoutes); // Endpoint for coaches

const teamRecordsRoutes = require('./routes/teamRecords');
app.use('/api/teamRecords', teamRecordsRoutes); // Endpoint for team_records





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
