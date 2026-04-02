import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Heart } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar fade-in">
      <Link to="/" className="navbar-brand">
        <Heart fill="var(--deep-pink)" color="var(--deep-pink)" />
        Romanza
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/watchlist" className="nav-link">My Watchlist 💖</Link>
        {user ? (
          <span className="nav-link" style={{ cursor: 'pointer' }} onClick={handleLogout}>Log Out</span>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
