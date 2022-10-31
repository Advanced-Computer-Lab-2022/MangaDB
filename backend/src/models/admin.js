const mongoose = require('mongoose');
const connection = require('../config/database');

const adminSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
});

const Admin = connection.model('Admin', adminSchema);

module.exports = Admin;
