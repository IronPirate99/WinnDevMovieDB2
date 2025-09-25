const express = require('express'); // Importing Express framework
const router = express.Router(); // Creating a router object
const Movie = require('../models/movie'); // Importing the Movie model

require('../config/db');
// Route to display all movies
router.get('/', async (req, res) => {
try {
const movies = await Movie.find(); // Fetching all movies from the database
res.render('movies/list', { movies }); // Rendering the movies list view with the fetched movies
} catch (error) {
console.error('Error fetching movies:', error);
res.status(500).send('Internal Server Error');
}
});


// Route to show the form to add a new movie
router.get('/new', (req, res) => {
res.render('movies/new'); // Rendering the new movie form view
});

// Route to create a new movie
router.post("/", async (req, res) => {
const { title, year, genre, director } = req.body;
await Movie.create({ title, year, genre, director });
res.redirect("/movies");
});

// Route to show details of a specific movie
router.get('/:id', async (req, res) => {
try {
const movie = await Movie.findById(req.params.id); // Fetching the movie by ID
if (!movie) {
return res.status(404).send('Movie not found');
}
res.render('movies/show', { movie }); // Rendering the movie details view
} catch (error) {
console.error('Error fetching movie details:', error);
res.status(500).send('Internal Server Error');
}
});

// Route to show the form to edit a movie
router.get('/:id/edit', async (req, res) => {
try {
const movie = await Movie.findById(req.params.id); // Fetching the movie by ID
if (!movie) {
return res.status(404).send('Movie not found');
}
res.render('movies/edit', { movie }); // Rendering the movie edit form view
} catch (error) {
console.error('Error fetching movie for edit:', error);
res.status(500).send('Internal Server Error');
}
});

// Route to update a movie
router.put('/:id', async (req, res) => {
try {
const { title, year, genre, director } = req.body;
const movie = await Movie.findByIdAndUpdate(req.params.id, { title, year, genre, director }, { new: true });
if (!movie) {
return res.status(404).send('Movie not found');
}
res.redirect(`/movies/${movie._id}`);
} catch (error) {
console.error('Error updating movie:', error);
res.status(500).send('Internal Server Error');
}
});

// Route to delete a movie
router.delete('/:id', async (req, res) => {
try {
const movie = await Movie.findByIdAndDelete(req.params.id);
if (!movie) {
return res.status(404).send('Movie not found');
}
res.redirect('/movies');
} catch (error) {
console.error('Error deleting movie:', error);
res.status(500).send('Internal Server Error');
}
});

module.exports = router; // Exporting the router to use it in other files
