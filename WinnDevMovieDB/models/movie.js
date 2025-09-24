//how a movie is stored in the database

const Mongoose = require('mongoose'); // Importing Mongoose library

const movieSchema = new Mongoose.Schema({ 
    title: String,
    year: Number,
    genre: String,
    director: String,
    actors: [String],
    plot: String,
    posterUrl: String
});

module.exports = Mongoose.model("Movie", movieSchema);
// Exporting the Movie model to use it in other files   