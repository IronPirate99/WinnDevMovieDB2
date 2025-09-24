// set up . express server,  serve static files.
//npm init -y
//npm install express mongoose ejs body-parser method-override

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

// Ensure the database config is loaded
require('./config/db');

const movieRoutes = require('./routes/movies');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/movies', movieRoutes);

app.get('/', (req, res) => {
    res.redirect('/movies');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
