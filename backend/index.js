const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const addsalon = require('./routes/addsalon');
const getsalons = require('./routes/getsalons');
const getservices = require('./routes/getservices'); // Import the get services route

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use the salon routes
app.use('/salon', addsalon);
app.use('/salon', getsalons);
app.use('/salon',getservices)


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
