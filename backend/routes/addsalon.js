const express = require('express');
const router = express.Router();
const db = require('../db/firestore');

// POST /salon/addsalon
router.post('/addsalon', async (req, res) => {
  const { name, address, services } = req.body;

  // Basic validation for required fields
  if (!name || !address || !services || !Array.isArray(services)) {
    return res.status(400).json({ message: 'Please provide name, address, and services.' });
  }

  try {
    // Add salon details to Firestore
    const salonRef = await db.collection('salons').add({
      name,
      address,
      services
    });

    res.status(201).json({ message: 'Salon added successfully', salonId: salonRef.id });
  } catch (error) {
    res.status(500).json({ message: 'Error adding salon', error: error.message });
  }
});

module.exports = router;
