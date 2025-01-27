const AWS = require("aws-sdk");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const os = require("os");
const fs = require("fs");

// Initialize S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

/**
 * Downloads a file from S3 to the local file system.
 */
const downloadFromS3 = async (bucket, key) => {
  const filePath = path.join(os.tmpdir(), path.basename(key));
  const params = { Bucket: bucket, Key: key };

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    s3.getObject(params)
      .createReadStream()
      .pipe(file)
      .on("finish", () => resolve(filePath))
      .on("error", reject);
  });
};

/**
 * Generates a thumbnail for a video using FFmpeg.
 */
const generateThumbnail = (videoPath) => {
  const thumbnailPath = path.join(
    os.tmpdir(),
    `${path.basename(videoPath, path.extname(videoPath))}-thumbnail.png`
  );

  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .screenshots({
        timestamps: ["00:00:02"], // Generate at 2-second mark
        filename: path.basename(thumbnailPath),
        folder: os.tmpdir(),
        size: "320x240",
      })
      .on("end", () => resolve(thumbnailPath))
      .on("error", reject);
  });
};

/**
 * Uploads a file to S3.
 */
const uploadToS3 = async (bucket, key, filePath) => {
  const fileContent = fs.readFileSync(filePath);
  const params = {
    Bucket: bucket,
    Key: key,
    Body: fileContent,
    ContentType: "image/png",
  };

  return s3.upload(params).promise();
};

/**
 * Main function to generate a thumbnail for a given video in S3.
 */
const processVideo = async (bucket, videoKey) => {
  try {
    // Step 1: Download the video from S3
    const videoPath = await downloadFromS3(bucket, videoKey);

    // Step 2: Generate a thumbnail
    const thumbnailPath = await generateThumbnail(videoPath);

    // Step 3: Upload the thumbnail back to S3
    const thumbnailKey = `thumbnails/${path.basename(thumbnailPath)}`;
    const thumbnailUrl = await uploadToS3(bucket, thumbnailKey, thumbnailPath);

    // Cleanup local files
    fs.unlinkSync(videoPath);
    fs.unlinkSync(thumbnailPath);

    return {
      videoKey,
      thumbnailKey,
      thumbnailUrl: `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${thumbnailKey}`,
    };
  } catch (error) {
    console.error("Error processing video:", error);
    throw error;
  }
};

module.exports = processVideo;
