const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  decade: {
    type: String,
    required: true,
    enum: ['2000s', '2010s', '2020s']
  },
  posterUrl: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
