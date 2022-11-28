const mongoose = require("mongoose");
const connection = require("../config/database");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },

  wallet: {
    type: Number,
    default: 0,
  },
  courseDetails: {
    type: [
      {
        course: {
          type: [mongoose.Schema.Types.ObjectId],
          ref: "Course",
        },
        viewedSources: {
          
        type:[{ sourceId: {
            type: String,
          },
          notes: {
            type: String,
          }}
    ]},
        totalSources: {
          type: Number,
        },
        percentageCompleted: {
          type: Number,
        },
        amountPaid: {
          type: Number,
        },
        exams: {
          type: [ mongoose.Schema.Types.ObjectId],
          ref: "Exam",
        },
      },
    ],
  },
  biography: {
    type: String,
  }, rating: {
    type: Number,
    default: 5,
  },
  reviews: {
    type: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        review: {
          type: String,
        },
        rating: {
          type: Number,
        },
      },
    ],
  },
  agreedToTerms: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["TRAINEE", "ADMIN", "INSTRUCTOR", "CORPORATE"],
    default: "TRAINEE",
  },
});
const User = connection.model("User", userSchema);

module.exports = User;
