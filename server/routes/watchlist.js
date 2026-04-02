const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Watchlist = require('../models/Watchlist');

// @route POST /api/watchlist
// @desc Add movie to watchlist
router.post('/', auth, async (req, res) => {
  try {
    const { movieId } = req.body;
    
    // Check if already in watchlist
    let watchlistItem = await Watchlist.findOne({ user: req.user.id, movie: movieId });
    if (watchlistItem) {
      return res.status(400).json({ message: 'Movie already in your watchlist ♥️' });
    }

    watchlistItem = new Watchlist({
      user: req.user.id,
      movie: movieId
    });

    await watchlistItem.save();
    
    // Populate movie details before sending back
    await watchlistItem.populate('movie');
    
    res.json(watchlistItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET /api/watchlist
// @desc Get user's watchlist
router.get('/', auth, async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ user: req.user.id }).populate('movie');
    res.json(watchlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT /api/watchlist/:id
// @desc Update watchlist item (rating, watched status, review)
router.put('/:id', auth, async (req, res) => {
  try {
    const { watched, rating, review } = req.body;
    
    let watchlistItem = await Watchlist.findById(req.params.id);
    if (!watchlistItem) return res.status(404).json({ message: 'Item not found' });
    
    // Ensure user owns this item
    if (watchlistItem.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (watched !== undefined) watchlistItem.watched = watched;
    if (rating !== undefined) watchlistItem.rating = rating;
    if (review !== undefined) watchlistItem.review = review;

    await watchlistItem.save();
    await watchlistItem.populate('movie');
    
    res.json(watchlistItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route DELETE /api/watchlist/:id
// @desc Remove from watchlist
router.delete('/:id', auth, async (req, res) => {
  try {
    const watchlistItem = await Watchlist.findById(req.params.id);
    if (!watchlistItem) return res.status(404).json({ message: 'Item not found' });

    if (watchlistItem.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await watchlistItem.deleteOne();
    res.json({ message: 'Removed from watchlist', id: req.params.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route DELETE /api/watchlist/movie/:movieId
// @desc Remove from watchlist by movieId
router.delete('/movie/:movieId', auth, async (req, res) => {
  try {
    const watchlistItem = await Watchlist.findOne({ user: req.user.id, movie: req.params.movieId });
    if (!watchlistItem) return res.status(404).json({ message: 'Item not found in your watchlist' });

    await watchlistItem.deleteOne();
    res.json({ message: 'Removed from watchlist', movieId: req.params.movieId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
