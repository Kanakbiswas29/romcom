const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// @route GET /api/movies
// desc Get all movies or filter by decade
router.get('/', async (req, res) => {
  try {
    const { decade } = req.query;
    let query = {};
    if (decade) {
      query.decade = decade;
    }
    const movies = await Movie.find(query).sort({ year: 1 });
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
