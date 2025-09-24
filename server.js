// set up . express server,  serve static files.
//npm init -y
//npm install express mongoose ejs body-parser method-override


const express = require('express'); // Importing Express framework
const bodyParser = require('body-parser'); // To parse incoming request bodies
const methodOverride = require('method-override'); // To support PUT and DELETE methods in HTML forms
const path = require('path'); // To handle file paths  
const db = require('./config/db'); // Importing the database configuration
const movieRoutes = require('./routes/movies'); // Importing movie routes

const app = express(); // Creating an Express application
const PORT = process.env.PORT || 3000; // Setting the port

app.set('view engine', 'ejs'); // Setting EJS as the templating engine

app.set('views', path.join(__dirname, 'views')); // Setting the views directory

app.use(express.static(path.join(__dirname, 'public'))); // Serving static files from the 'public' directory

app.use(bodyParser.urlencoded({ extended: true })); // Parsing URL-encoded bodies

app.use(methodOverride('_method')); // Using method-override to support PUT and DELETE methods

app.use('/movies', movieRoutes); // Using movie routes for '/movies' path

app.get('/', (req, res) => {
    res.redirect('/movies'); // Redirecting root to '/movies'
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Starting the server
});
