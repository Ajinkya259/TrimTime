const express = require('express');
const router = express.Router();
const db = require('../db/firestore');

router.post('/add-salon', async (req, res) => {
  const { name, location, services } = req.body;

  try {
    const salonRef = await db.collection('salons').add({
      name,
      location,
      services,
    });
    res.status(201).send(`Salon added with ID: ${salonRef.id}`);
  } catch (error) {
    res.status(500).send('Error adding salon: ' + error.message);
  }
});

module.exports = router;
