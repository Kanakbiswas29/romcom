const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/romcom_db';

const movies2000s = [
  { title: "How to Lose a Guy in 10 Days", year: 2003 }, { title: "The Princess Diaries", year: 2001 }, { title: "The Princess Diaries 2: Royal Engagement", year: 2004 }, { title: "13 Going on 30", year: 2004 }, { title: "The Proposal", year: 2009 }, { title: "Sweet Home Alabama", year: 2002 }, { title: "The Wedding Planner", year: 2001 }, { title: "Maid in Manhattan", year: 2002 }, { title: "Two Weeks Notice", year: 2002 }, { title: "Just Like Heaven", year: 2005 }, { title: "27 Dresses", year: 2008 }, { title: "Made of Honor", year: 2008 }, { title: "What Happens in Vegas", year: 2008 }, { title: "Confessions of a Shopaholic", year: 2009 }, { title: "The Devil Wears Prada", year: 2006 }, { title: "Love Actually", year: 2003 }, { title: "Bridget Jones’s Diary", year: 2001 }, { title: "Bridget Jones: The Edge of Reason", year: 2004 }, { title: "The Holiday", year: 2006 }, { title: "Serendipity", year: 2001 }, { title: "Something’s Gotta Give", year: 2003 }, { title: "Music and Lyrics", year: 2007 }, { title: "Definitely, Maybe", year: 2008 }, { title: "Penelope", year: 2008 }, { title: "She’s the Man", year: 2006 }, { title: "A Cinderella Story", year: 2004 }, { title: "Sydney White", year: 2007 }, { title: "Ella Enchanted", year: 2004 }, { title: "Enchanted", year: 2007 }, { title: "The Prince and Me", year: 2004 }, { title: "Hitch", year: 2005 }, { title: "Failure to Launch", year: 2006 }, { title: "The Break-Up", year: 2006 }, { title: "Knocked Up", year: 2007 }, { title: "Nick and Norah’s Infinite Playlist", year: 2008 }, { title: "Ghosts of Girlfriends Past", year: 2009 }, { title: "Along Came Polly", year: 2004 }, { title: "50 First Dates", year: 2004 }, { title: "Raising Helen", year: 2004 }
].map(m => ({ ...m, decade: '2000s' }));

const movies2010s = [
  { title: "Crazy, Stupid, Love", year: 2011 }, { title: "Friends with Benefits", year: 2011 }, { title: "No Strings Attached", year: 2011 }, { title: "The Vow", year: 2012 }, { title: "Silver Linings Playbook", year: 2012 }, { title: "About Time", year: 2013 }, { title: "Her", year: 2013 }, { title: "Love, Rosie", year: 2014 }, { title: "The Fault in Our Stars", year: 2014 }, { title: "The Intern", year: 2015 }, { title: "Me Before You", year: 2016 }, { title: "La La Land", year: 2016 }, { title: "The Big Sick", year: 2017 }, { title: "To All the Boys I’ve Loved Before", year: 2018 }, { title: "Set It Up", year: 2018 }, { title: "Crazy Rich Asians", year: 2018 }, { title: "The Kissing Booth", year: 2018 }, { title: "Always Be My Maybe", year: 2019 }, { title: "Isn’t It Romantic", year: 2019 }, { title: "Long Shot", year: 2019 }, { title: "Last Christmas", year: 2019 }, { title: "After", year: 2019 }
].map(m => ({ ...m, decade: '2010s' }));

const movies2020s = [
  { title: "To All the Boys: P.S. I Still Love You", year: 2020 }, { title: "The Kissing Booth 2", year: 2020 }, { title: "After We Collided", year: 2020 }, { title: "Love Hard", year: 2020 }, { title: "The Kissing Booth 3", year: 2021 }, { title: "To All the Boys: Always and Forever", year: 2021 }, { title: "After We Fell", year: 2021 }, { title: "Marry Me", year: 2022 }, { title: "After Ever Happy", year: 2022 }, { title: "Ticket to Paradise", year: 2022 }, { title: "Redeeming Love", year: 2022 }, { title: "Love & Gelato", year: 2022 }, { title: "Anyone But You", year: 2023 }, { title: "XO Kitty", year: 2023 }, { title: "Your Place or Mine", year: 2023 }, { title: "After Everything", year: 2023 }, { title: "The Idea of You", year: 2024 }, { title: "Love at First Sight", year: 2023 }, { title: "Shotgun Wedding", year: 2023 }, { title: "Love in Taipei", year: 2023 }, { title: "Your Christmas or Mine?", year: 2023 }, { title: "Love Again", year: 2023 }, { title: "A Tourist’s Guide to Love", year: 2023 }, { title: "The Notebook 2", year: 2025 }, { title: "You’re So Cupid!", year: 2025 }, { title: "XO, Kitty Season 2", year: 2025 }, { title: "Love & Other Disasters 2", year: 2026 }
].map(m => ({ ...m, decade: '2020s' }));

const allMovies = [...movies2000s, ...movies2010s, ...movies2020s];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Seeding database... 💖');
    
    // Clear existing movies
    await Movie.deleteMany({});
    
    // Generate placeholder posters and insert
    const moviesWithPosters = allMovies.map(movie => {
        // Aesthetic color palettes
        const bgColors = ['ffebee', 'fce4ec', 'f3e5f5'];
        const textColors = ['d81b60', 'c2185b', '880e4f'];
        const randIndex = Math.floor(Math.random() * bgColors.length);
        const encodedTitle = encodeURIComponent(movie.title);
        const posterUrl = `https://placehold.co/300x450/${bgColors[randIndex]}/${textColors[randIndex]}?text=${encodedTitle}`;
        return { ...movie, posterUrl };
    });

    await Movie.insertMany(moviesWithPosters);
    console.log('Successfully seeded database with beautiful placeholder posters! ✨');
    process.exit();
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
