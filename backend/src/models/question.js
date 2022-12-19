const mongoose = require("mongoose");
const connection = require("../config/database");

const  questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    userName:{
        type:String
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId
    }
    ,
    courseName:{
        type:String
    },
    instructorId:{
        type:mongoose.Schema.Types.ObjectId
    }



});

const Question = connection.model("Question", questionSchema);

module.exports = Question;