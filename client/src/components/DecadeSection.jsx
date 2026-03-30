import { useEffect, useState } from 'react';
import api from '../api';
import MovieCard from '../components/MovieCard';

const DecadeSection = ({ decade }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get(`/movies?decade=${decade}`);
        setMovies(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, [decade]);

  return (
    <div className="decade-section fade-in">
      <h2 className="section-title">💖 {decade} RomComs 💖</h2>
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default DecadeSection;
