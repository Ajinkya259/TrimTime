const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');


const serviceAccount = require('./serviceAccountKey.json'); // path to your downloaded JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'trimtime-fad68', // Replace with your Firebase project ID
});


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Add salon endpoint
app.post('/add-salon', async (req, res) => {
  const { name, location, services } = req.body;

  try {
    const salonRef = await admin.firestore().collection('salons').add({
      name,
      location,
      services,
    });
    res.status(201).send(`Salon added with ID: ${salonRef.id}`);
  } catch (error) {
    res.status(500).send('Error adding salon: ' + error.message);
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
