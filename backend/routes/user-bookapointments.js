const express = require('express');
const router = express.Router();
const db = require('../db/firestore');

// Controller for booking an appointment
router.post('/bookappointments', async (req, res) => {
    const { salonId, userId, appointmentTime } = req.body;

    try {
        // Check if the salon exists
        const salonSnapshot = await db.collection('salons').doc(salonId).get();
        if (!salonSnapshot.exists) {
            return res.status(404).json({ message: 'Salon not found' });
        }

        // Add the appointment to Firestore
        await db.collection('appointments').add({
            salonId,
            userId,
            appointmentTime,
        });

        res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error booking appointment', error: error.message });
    }
});

module.exports = router;
