const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connection = require('../config/database');


const CorporateSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },firstName: {
        type: String,
    } ,
    lastName: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Male','Female','Other'],
    },
});

const Corporate = connection.model('Corporate', CorporateSchema);

module.exports = Corporate;