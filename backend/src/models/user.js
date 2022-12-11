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
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        viewedSources: {
          
        type:[{ sourceId: {
            type: String,
          },
          notes: {
            type: [
              {
                note: {
                  type: String,
                },
                timestamp: {
                  type: String,
                },
              }
            ]
          }}
    ]},
        totalSources: {
          type: Number,
        },
        percentageCompleted: {
          type: Number,
        },
      
        exams: {type:[
          {
            examId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Exam",
            },
            score: {
              type: Number,
            },
            answers: {
              type: [String],
            },
          }

     ] },
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
        userName: {
          type: String,
        },
        review: {
          type: String,
        },
        rating: {
          type: Number,
        },
        date:{
          type:Date,
          default:Date.now
        }
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
