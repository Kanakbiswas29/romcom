const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  watched: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  review: {
    type: String,
    default: ''
  }
}, { timestamps: true });

// A user should only have a movie once in their watchlist
watchlistSchema.index({ user: 1, movie: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', watchlistSchema);
