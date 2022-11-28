const mongoose = require("mongoose");
const connection = require("../config/database");

const requestSchema = new mongoose.Schema({
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
        enum: ["refund", "access"],
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    reason:{
        type: String,

    }
});

const Request = connection.model("Request", requestSchema);

module.exports = Request;