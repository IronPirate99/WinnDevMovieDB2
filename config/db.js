const Mongoose = require('mongoose'); // Install mongoose library so that we can use mongoose methods 

Mongoose.connect('mongodb://localhost:27017/MovieDB2', { useNewUrlParser: true, useUnifiedTopology: true });

"{ useNewUrlParser: true, useUnifiedTopology: true }); --> These are options to avoid deprecation warnings in Mongoose."

module.exports = Mongoose;
// Exporting the Mongoose object to use it in other files
// change connection string to your own database name movieDB2