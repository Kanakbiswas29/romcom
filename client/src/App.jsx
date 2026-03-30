import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WatchlistPage from './pages/WatchlistPage';
import DecadePage from './pages/DecadePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:decade" element={<DecadePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
