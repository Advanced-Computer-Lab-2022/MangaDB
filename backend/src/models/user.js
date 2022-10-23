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
        required: true,
        unique: true},
    firstName: {
        type: String,
    } ,
    lastName: {
        type: String,
    },
    gender: {
        type: String,
    },
    role: {
        type: String,
        required: true,
    },
    });
const User=connection.model('User', userSchema);

module.exports=User;
