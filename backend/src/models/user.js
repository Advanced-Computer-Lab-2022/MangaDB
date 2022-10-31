const mongoose=require('mongoose');
const connection = require('../config/database');

const userSchema=new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true},
    password: {
        type: String,
        required: true},
    email: {
        type: String,
        // required: true,
    },
    role: {
        type: String,
        enum: ['TRAINEE', 'ADMIN', 'INSTRUCTOR', 'CORPORATE'],
        default: 'TRAINEE'
      },
    });
const User=connection.model('User', userSchema);

module.exports=User;
