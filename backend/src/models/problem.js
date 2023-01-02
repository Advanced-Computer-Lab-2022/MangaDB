const mongoose = require("mongoose");
const connection = require("../config/database");

const problemSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["Technical","Financial","Other"],
    },
    status: {
        type: String,
        enum: ["Unseen","Pending", "Resolved"],
        default: "Unseen",
    },
    
    date: {
        type: Date,
        default: Date.now,
    },
    followUpComment: {
        type: String,
    }
    ,
    description:{
        type: String,

    }
});

const Problem = connection.model("Problem", problemSchema);

module.exports = Problem;
