const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const watchlistRoutes = require('./routes/watchlist');

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://fsd-2-beige.vercel.app"
    ],
    credentials: true
  })
);
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/watchlist', watchlistRoutes);

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/romcom_db';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB 💖');
    app.listen(PORT, () => {
      console.log(`Server romantically running on port ${PORT} 💖`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
