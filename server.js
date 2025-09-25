const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

// Ensure the database connection is established
require('./config/db');

// The movie model for database interactions
const Movie = require('./routes/movies');

const app = express();
const PORT = process.env.PORT || 3000;

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files & middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Homepage route to fetch and display the three panels
app.get('/', async (req, res) => {
  try {
    const featured = await Movie.find().limit(5);
    const latest = await Movie.find().sort({ year: -1 }).limit(5);
    const classics = await Movie.find({ year: { $lt: 2000 } }).limit(5);

    // Render the homepage template with the three movie arrays
    res.render('index', { featured, latest, classics });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Use the separate movie routes for other movie-related pages
const movieRoutes = require('./routes/movies');
app.use('/movies', movieRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
