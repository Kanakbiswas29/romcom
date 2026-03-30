import { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const WatchlistPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const fetchWatchlist = async () => {
      try {
        const res = await api.get('/watchlist');
        setWatchlist(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWatchlist();
  }, [user, navigate]);

  const handleUpdate = async (id, data) => {
    try {
      const res = await api.put(`/watchlist/${id}`, data);
      setWatchlist(watchlist.map(item => item._id === id ? res.data : item));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await api.delete(`/watchlist/${id}`);
      setWatchlist(watchlist.filter(item => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>
        Your Love Stories 💖
      </h1>
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)'}}>
            <p style={{ color: 'var(--rose-gold)', fontWeight: 600 }}>Total Saved: {watchlist.length}</p>
          </div>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)'}}>
            <p style={{ color: 'var(--deep-pink)', fontWeight: 600 }}>Watched: {watchlist.filter(w => w.watched).length}</p>
          </div>
      </div>

      {watchlist.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: 'var(--text-light)', marginTop: '4rem' }}>
          Your romantic journey hasn't started yet! Go add some movies. ✨
        </p>
      ) : (
        <div className="movie-grid">
          {watchlist.map(item => (
            <MovieCard 
              key={item._id} 
              movie={item.movie} 
              isWatchlist={true}
              watchlistItem={item}
              onUpdate={handleUpdate}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
