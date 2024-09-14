const express = require('express');
const multer = require('multer');
const { db, bucket } = require('../db/firestore'); // Adjust the path as needed
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/add-salon', upload.single('salonImage'), async (req, res) => {
  try {
      const { salonName, ownerName, mobileNumber, services, address } = req.body;

      if (!salonName || !ownerName || !mobileNumber || !services || !address) {
          return res.status(400).json({ error: 'All fields are required.' });
      }

      let parsedServices;
      try {
          parsedServices = JSON.parse(services);
      } catch (error) {
          return res.status(400).json({ error: 'Invalid services format. It should be JSON.' });
      }

      let salonImageUrl;
      if (req.file) {
          const blob = bucket.file(req.file.originalname);
          const blobStream = blob.createWriteStream({
              metadata: {
                  contentType: req.file.mimetype,
              },
          });

          blobStream.on('error', (err) => {
              console.error(err);
              return res.status(500).json({ error: 'Failed to upload image.' });
          });

          blobStream.on('finish', async () => {
              salonImageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
              await db.collection('salons').add({
                  salonName,
                  ownerName,
                  mobileNumber,
                  services: parsedServices,
                  address,
                  salonImage: salonImageUrl,
              });
              return res.status(201).json({ message: 'Salon registered successfully.' });
          });

          blobStream.end(req.file.buffer);
      } else {
          await db.collection('salons').add({
              salonName,
              ownerName,
              mobileNumber,
              services: parsedServices,
              address,
          });
          return res.status(201).json({ message: 'Salon registered successfully.' });
      }
  } catch (error) {
      console.error('Error saving salon:', error);
      res.status(500).json({ error: 'Failed to register salon.' });
  }
});


module.exports = router;
