const mongoose = require('mongoose');

require('dotenv').config();

const conn = process.env.DB_STRING;
const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => { console.log(err); });

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register


// Expose the connection
module.exports = connection;