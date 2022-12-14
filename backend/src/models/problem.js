const mongoose = require("mongoose");
const connection = require("../config/database");

const problemSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        enum: ["technical","financial","other"],
    },
    status: {
        type: String,
        enum: ["pending", "resolved"],
        default: "pending",
    },
    seen: {
        type: Boolean,
        default: false,
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
