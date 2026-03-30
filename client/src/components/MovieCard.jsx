import api from '../api';
import { Heart } from 'lucide-react';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import RatingStars from './RatingStars';

const MovieCard = ({ movie, isWatchlist, watchlistItem, onUpdate, onRemove }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const addToWatchlist = async () => {
    if (!user) return navigate('/login');
    try {
      setLoading(true);
      await api.post('/watchlist', { movieId: movie._id });
      alert('Added to your romantic watchlist! 💖');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="movie-card fade-in">
      <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">{movie.year}</p>
        
        {isWatchlist && watchlistItem ? (
          <div className="watchlist-actions">
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center', fontSize: '0.9rem', color: 'var(--rose-gold)'}}>
              <input 
                type="checkbox" 
                checked={watchlistItem.watched}
                onChange={(e) => onUpdate(watchlistItem._id, { watched: e.target.checked })}
              />
              Watched
            </label>
            <RatingStars 
              rating={watchlistItem.rating} 
              onRate={(newRating) => onUpdate(watchlistItem._id, { rating: newRating })} 
            />
            <textarea 
              value={watchlistItem.review || ''}
              onChange={(e) => onUpdate(watchlistItem._id, { review: e.target.value })}
              placeholder="Leave a romantic review..."
              style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--accent-pink)', marginTop: '0.5rem', fontFamily: 'var(--font-body)', resize: 'vertical' }}
              rows={2}
            />
            <button className="btn-remove" onClick={() => onRemove(watchlistItem._id)}>Remove</button>
          </div>
        ) : (
          <div className="card-actions">
             <button className="btn-heart" onClick={addToWatchlist} disabled={loading}>
               <Heart fill="currentColor" />
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
