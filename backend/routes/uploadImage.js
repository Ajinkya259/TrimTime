const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');  // For generating unique file names
const {db,bucket} = require('../db/firestore');  // Firestore instance
const router = express.Router();

// Set up multer for file handling
const upload = multer({
  storage: multer.memoryStorage(),  // Store the file in memory
  limits: {
    fileSize: 5 * 1024 * 1024  // Limit file size to 5MB
  }
});

// POST route to upload salon images
router.post('/uploadImage', upload.single('image'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  try {
    // Create a unique file name
    const fileName = `${uuidv4()}_${file.originalname}`;

    // Upload the file to Firebase Storage
    const blob = bucket.file(`salon_images/${fileName}`);
    const blobStream = blob.createWriteStream({
      resumable: false
    });
    
    blobStream.on('error', (err) => {
      res.status(500).json({ message: 'Unable to upload image', error: err.message });
    });

    blobStream.on('finish', async () => {
      // Get the public URL of the uploaded image
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      // Store the image URL in Firestore (optional)
      await db.collection('salonImages').add({
        imageUrl: publicUrl,
        uploadedAt: new Date()
      });

      res.status(201).json({ message: 'Image uploaded successfully', imageUrl: publicUrl });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    res.status(500).json({ message: 'Error while uploading image', error: error.message });
  }
});

module.exports = router;
