const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/user-signup-login');
const addsalon = require('./routes/addsalon');
const getsalons = require('./routes/getsalons');
const getservices = require('./routes/getservices');
const getappointments = require('./routes/salon-getallappointments');
const bookAppointment = require('./routes/user-bookapointments');
const authenticateToken = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/salon', authRoutes); // Using the auth routes
app.use('/salon/add', addsalon); // Route for adding salons
app.use('/salon/get', getsalons); // Route for getting salons
app.use('/salon/services', getservices); // Route for getting services
app.use('/salon/user/', authenticateToken, bookAppointment); // Route for booking appointments
app.use('/salon/appointments', getappointments); // Route for getting appointments

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
