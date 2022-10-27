const mongoose=require('mongoose');
//const ExamSchema = require('./exam');
const subtitleSchema = require('./subtitle');
const connection = require('../config/database');



const courseSchema=new mongoose.Schema({
    courseTitle: {
        type: String,
        required: true,
    },
    courseDescription: {
        type: String,
    },
    totalHours: {
        type: Number,
        required: true,
    },
    courseImage: {
        type: String,
    },
    coursePrice: {
        type: Number,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true,
    },
    instructorName: {
        type: String,
        required: true,
    },
    subject: {  
        type: String,

    },
    rating : {
        type: [Number],
    },
    reviews: {
        type: [String],
    },
    requirements: {
        type: [String]
    },
    views: {
        type: Number,
        default: 0,
    },
    certificate: {
        type: String,
    },
    summary: {
        type: String,
    },
    // exams: {
    //     type: [ExamSchema.schema],
    // },
    subtitles: {
        type: [subtitleSchema.schema],
    },
    });


const Course=connection.model('Course', courseSchema);

module.exports=Course;