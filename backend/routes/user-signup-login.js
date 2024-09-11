const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db/firestore');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY; // Access the secret key from .env

// Controller for user signup
router.post('/signup', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await db.collection('users').where('email', '==', email).get();
        if (!existingUser.empty) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Add user to Firestore
        const userRef = await db.collection('users').add({
            name,
            email,
            password: hashedPassword,
        });

        // Create JWT token
        const token = jwt.sign({ userId: userRef.id, email }, secretKey, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered', token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

// Controller for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const userSnapshot = await db.collection('users').where('email', '==', email).get();

        if (userSnapshot.empty) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = userSnapshot.docs[0].data();

        // Compare the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Create JWT token
        const token = jwt.sign({ userId: userSnapshot.docs[0].id, email }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'User logged in', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

module.exports = router;
