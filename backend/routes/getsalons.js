const express = require('express');
const router = express.Router();
const db = require('../db/firestore');

// Route to get all salons
router.get('/getsalons', async (req, res) => {
  try {
    const salonsSnapshot = await db.collection('salons').get();

    if (salonsSnapshot.empty) {
      return res.status(404).json({ message: 'No salons found' });
    }

    // Collecting all salon documents
    let salons = [];
    salonsSnapshot.forEach(doc => {
      salons.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(salons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching salons', error: error.message });
  }
});

module.exports = router;
