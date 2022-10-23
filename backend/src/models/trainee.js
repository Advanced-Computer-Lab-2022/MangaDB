const mongoose=require('mongoose');
const examResult=require('./examResult').ExamResult;
const connection = require('../config/database');


const traineeSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true},
        courses: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Course',
        },
        examResults: {
            type: [examResult],
        },
        wallet: {
            type: Number,
            default: 0,
        },
        });

const Trainee=connection.model('Trainee', traineeSchema);

module.exports=Trainee;