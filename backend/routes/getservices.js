const express = require('express');
const router = express.Router();
const db = require('../db/firestore');

// Route to get services of a specific salon by salonId
router.get('/:salonId/services', async (req, res) => {
  const salonId = req.params.salonId;

  try {
    const salonDoc = await db.collection('salons').doc(salonId).get();

    if (!salonDoc.exists) {
      return res.status(404).json({ message: 'Salon not found' });
    }

    const salonData = salonDoc.data();
    const services = salonData.services || [];

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
});

module.exports = router;
