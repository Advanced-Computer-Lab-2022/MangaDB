const mongoose = require('mongoose');
const connection = require('../config/database');

const instructorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

        required: true,
        unique: true,
    },
    courses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Course',
    },
    biography : {
        type: String,
    },
    rating : {
        type: [Number],
    },
    reviews: {
        type: [String],
    },

});

const Instructor = connection.model('Instructor', instructorSchema);

module.exports = Instructor;