const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connection = require('../config/database');


const CorporateSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
});

const Corporate = connection.model('Corporate', CorporateSchema);

module.exports = Corporate;