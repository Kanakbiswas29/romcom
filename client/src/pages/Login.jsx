import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className="auth-container fade-in">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Welcome Back 💖</h2>
        {error && <p style={{ color: 'var(--soft-red)', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn-primary">Login to your Love Story</button>
        <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          Don't have an account? <Link to="/signup" style={{ color: 'var(--deep-pink)', textDecoration: 'underline' }}>Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
