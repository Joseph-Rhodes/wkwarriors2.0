require('dotenv').config();
const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');

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

// Endpoint to get list of images from an S3 bucket
app.get('/images', async (req, res) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
    };
    const data = await s3.listObjectsV2(params).promise();
    const images = data.Contents.map((item) => ({
      key: item.Key,
      url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`,
    }));
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching images from S3' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
