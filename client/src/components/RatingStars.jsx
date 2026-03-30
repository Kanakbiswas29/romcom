import { useState } from 'react';

const RatingStars = ({ rating, onRate }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="stars-container">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= (hover || rating) ? 'filled' : ''}`}
          onClick={() => onRate(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
