import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const decadeInfo = {
  '2000s': { emoji: '💌', subtitle: 'The Golden Era of Romcoms', color: '#ff85a1' },
  '2010s': { emoji: '🌹', subtitle: 'Love Redefined', color: '#c2649a' },
  '2020s': { emoji: '✨', subtitle: 'Modern Love Stories', color: '#e07bbf' },
};

const DecadePage = () => {
  const { decade } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState('');

  const info = decadeInfo[decade] || { emoji: '💖', subtitle: '', color: '#ff69b4' };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/movies?decade=${decade}`);
        setMovies(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [decade]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!user) {
        setWishlist([]);
        return;
      }
      try {
        const res = await api.get('/watchlist');
        // Extract movie 'id' (virtual) from the populated movie field
        const ids = res.data.map(item => item.movie?.id || item.movie?._id);
        setWishlist(ids);
      } catch (err) {
        console.error('Failed to fetch wishlist:', err);
      }
    };
    fetchWatchlist();
  }, [user]);

  const toggleWishlist = async (movieId) => {
    if (!user) return navigate('/login');
    
    const isAdded = wishlist.includes(movieId);
    
    // Optimistic UI update: local state first for instant feel!
    setWishlist(prev => 
      isAdded 
        ? prev.filter(id => id !== movieId) 
        : [...prev, movieId]
    );
    
    try {
      if (!isAdded) {
        await api.post('/watchlist', { movieId });
      } else {
        await api.delete(`/watchlist/movie/${movieId}`);
      }
    } catch (err) {
      console.error('Backend toggle sync failed:', err);
      // If it fails with already/missing, we stay synced, otherwise revert
      if (err.response?.status !== 400 && err.response?.status !== 404) {
        setWishlist(prev => 
          isAdded 
            ? [...prev, movieId] 
            : prev.filter(id => id !== movieId)
        );
      }
    }
  };

  const filtered = movies.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="decade-page fade-in">
      {/* Header */}
      <div className="decade-page-header">
        <Link to="/" className="back-link">← Back</Link>
        <span className="decade-page-emoji">{info.emoji}</span>
        <h1 className="decade-page-title">{decade} Romcoms</h1>
        <p className="decade-page-subtitle">{info.subtitle}</p>

        {/* Search */}
        <div className="decade-search-wrap">
          <input
            className="decade-search"
            type="text"
            placeholder="Search a title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Movie List */}
      <div className="movie-list-container">
        {loading ? (
          <p className="list-loading">Loading love stories... 💕</p>
        ) : filtered.length === 0 ? (
          <p className="list-loading">No movies found.</p>
        ) : (
          <ul className="movie-list">
            {filtered.map((movie, i) => (
              <li
                key={movie._id}
                className="movie-list-item fade-in"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="movie-list-left">
                  <span className="movie-list-index">{String(i + 1).padStart(2, '0')}</span>
                  <div className="movie-list-info">
                    <span className="movie-list-title">{movie.title}</span>
                    <span className="movie-list-year">{movie.year}</span>
                  </div>
                </div>
                <button
                  className={`movie-list-heart ${wishlist.includes(movie.id) ? 'added' : ''}`}
                  onClick={() => toggleWishlist(movie.id)}
                  title="Add to Watchlist"
                >
                  <Heart
                    size={20}
                    fill={wishlist.includes(movie.id) ? 'var(--deep-pink)' : 'none'}
                    color={wishlist.includes(movie.id) ? 'var(--deep-pink)' : 'var(--accent-pink)'}
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DecadePage;
