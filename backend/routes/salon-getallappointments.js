const express = require('express');
const router = express.Router();
const db = require('../db/firestore');

// GET /salon/:salonId/appointments?date=YYYY-MM-DD
router.get('/:salonId/appointments', async (req, res) => {
  const { salonId } = req.params;
  const { date } = req.query; // Use query parameter for the date

  if (!date) {
    return res.status(400).json({ message: 'Date query parameter is required' });
  }

  try {
    // Define the start and end of the day based on the input date
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day

    // Fetch appointments from Firestore using the date range
    const appointmentsRef = db.collection('appointments');
    const snapshot = await appointmentsRef
      .where('salonId', '==', salonId)
      .where('appointmentTime', '>=', startOfDay.toISOString())
      .where('appointmentTime', '<=', endOfDay.toISOString())
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No appointments found for the given salon and date' });
    }

    // Prepare an array to hold the appointment details
    const appointments = [];

    // Loop through each appointment document
    snapshot.docs.forEach(doc => {
      const appointmentData = doc.data();
      const { userId, appointmentTime } = appointmentData;

      // Combine appointment details
      appointments.push({
        appointmentId: doc.id,
        appointmentTime,
        bookedBy: userId // Only returning the userId (who booked the appointment)
      });
    });

    // Send the appointments array in the response
    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
});

module.exports = router;
