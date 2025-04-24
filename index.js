const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');
app.use(cors());

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: '🩺 Server is healthy!' });
});

app.use('/', userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

