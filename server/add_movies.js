const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/romcom_db';

const newMovies = [
  { title: "The Kissing Booth", year: 2018, decade: "2010s" },
  { title: "After", year: 2019, decade: "2010s" },
  { title: "XO, Kitty Season 2", year: 2025, decade: "2020s" }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Adding specific movies... 💖');
    
    for (const movie of newMovies) {
      // Check if it already exists to avoid duplicates
      const exists = await Movie.findOne({ title: movie.title, year: movie.year });
      if (!exists) {
        // Aesthetic color palettes logic from seedDatabase.js
        const bgColors = ['ffebee', 'fce4ec', 'f3e5f5'];
        const textColors = ['d81b60', 'c2185b', '880e4f'];
        const randIndex = Math.floor(Math.random() * bgColors.length);
        const encodedTitle = encodeURIComponent(movie.title);
        const posterUrl = `https://placehold.co/300x450/${bgColors[randIndex]}/${textColors[randIndex]}?text=${encodedTitle}`;
        
        await Movie.create({ ...movie, posterUrl });
        console.log(`Added: ${movie.title} (${movie.year})`);
      } else {
        console.log(`Already exists: ${movie.title} (${movie.year})`);
      }
    }

    console.log('Successfully completed adding movies! ✨');
    process.exit();
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
