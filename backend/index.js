const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const salonRoutes = require('./routes/salonRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use the salon routes
app.use('/api', salonRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
