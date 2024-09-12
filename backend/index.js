const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/user-signup-login'); // Import the auth routes
const addsalon = require('./routes/addsalon');
const getsalons = require('./routes/getsalons');
const getservices = require('./routes/getservices');
const getappointments = require('./routes/salon-getallappointments'); // Import the get appointments route
const bookAppointment = require('./routes/user-bookapointments'); // Import the route for booking appointments
const uploadImage = require('./routes/uploadImage');  // Add image upload route

const authenticateToken = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use the routes
app.use('/salon', authRoutes); // Using the auth routes for user signup and login
app.use('/salon', addsalon); // Route for adding salons
app.use('/salon', getsalons); // Route for getting salons
app.use('/salon', getservices); // Route for getting services
app.use('/salon/user/', authenticateToken, bookAppointment); // Route for booking appointments
app.use('/salon', getappointments); // Route for getting appointments
app.use('/salon', uploadImage);  // Include the image upload route


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
