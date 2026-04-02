import { Link } from 'react-router-dom';

const decades = [
  {
    id: '2000s',
    label: '2000s',
    subtitle: 'The Golden Era of Romcoms',
    emoji: '💌',
    gradient: 'linear-gradient(135deg, #ffd6e0 0%, #ffb3c6 40%, #ff85a1 100%)',
    count: 39,
  },
  {
    id: '2010s',
    label: '2010s',
    subtitle: 'Love Redefined',
    emoji: '🌹',
    gradient: 'linear-gradient(135deg, #f8bbda 0%, #e991c0 40%, #c2649a 100%)',
    count: 22,
  },
  {
    id: '2020s',
    label: '2020s',
    subtitle: 'Modern Love Stories',
    emoji: '✨',
    gradient: 'linear-gradient(135deg, #fde2f3 0%, #f5b8e0 40%, #e07bbf 100%)',
    count: 27,
  },
];

const Home = () => {
  return (
    <div className="home-page fade-in">
      <div className="home-hero">
        <p className="home-tagline">✦ Every love story begins somewhere ✦</p>
        <h1 className="home-title">The RomCom Library</h1>
        <p className="home-subtitle">
          A curated collection of the most beautiful love stories ever told,
          <br />organised by the decade they captured our hearts.
        </p>
      </div>

      <div className="decade-portal-grid">
        {decades.map((d, i) => (
          <Link
            key={d.id}
            to={`/movies/${d.id}`}
            className="decade-portal fade-in"
            style={{ animationDelay: `${i * 0.15}s`, background: d.gradient }}
          >
            <span className="portal-emoji">{d.emoji}</span>
            <h2 className="portal-decade">{d.label}</h2>
            <p className="portal-subtitle">{d.subtitle}</p>
            <p className="portal-count">{d.count} films</p>
            <span className="portal-arrow">Explore →</span>
          </Link>
        ))}
      </div>

      <div className="home-quote">
        <p>"The best love stories are the ones that make you believe in love."</p>
      </div>
    </div>
  );
};

export default Home;
