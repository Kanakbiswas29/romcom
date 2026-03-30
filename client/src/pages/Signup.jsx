import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(username, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed!');
    }
  };

  return (
    <div className="auth-container fade-in">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Start Your Journey ✨</h2>
        {error && <p style={{ color: 'var(--soft-red)', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn-primary">Create Account</button>
        <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          Already believe in romance? <Link to="/login" style={{ color: 'var(--deep-pink)', textDecoration: 'underline' }}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
