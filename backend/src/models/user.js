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
     firstName: {
        type: String,
    } ,
    lastName: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Male','Female','Other'],
    },
    // examResults: {
    //     type: [examResult],
    // },
    wallet: {
        type: Number,
        default: 0,
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
    role: {
        type: String,
        enum: ['TRAINEE', 'ADMIN', 'INSTRUCTOR', 'CORPORATE'],
        default: 'TRAINEE'
      },
    });
const User=connection.model('User', userSchema);

module.exports=User;
