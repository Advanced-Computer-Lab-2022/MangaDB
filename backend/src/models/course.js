const mongoose = require("mongoose");
const connection = require("../config/database");

const courseSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
  },
  courseOverview: {
    type: String,
  },
  totalMins: {
    type: Number,
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
    ref: "User",
    required: true,
  },
  instructorName: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
  },
  rating: {
    type: Number,
    default: 5,
  },
  finalExam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required:false,
  }
  ,
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
  requirements: {
    type: [String],
  },
  views: {
    type: Number,
    default: 0,
  },
  certificate: {
    type: String,
  },

  discount: {
    type: Number,
    default: 0,
  },
  discountedPrice: {
    type: Number,
  },
  discountStartDate: {
    type: Date,
  },
  discountEndDate: {
    type: Date,
  },
  summary: {
    type: String,
  }
  ,
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },

  subtitles: {
    type: [
      {
       
        subtitleDuration: {
          type: Number,
        },
        introductionVideo: {
          type: String,
        },
        introductionVideoDescription: {
          type: String,
        },
        description: {
          type: String,
        },

        sources: {
          type: [
            {
              sourceType: {
                type: String,
                enum: ["Video", "Quiz"],
              },
              sourceDuration: {
                type: Number,
              },

              quiz: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Exam",
              },
              link: {
                type: String,
              },
              description: {
                type: String,
              },
            },
          ],
        },
      },
    ],
  },
});

const Course = connection.model("Course", courseSchema);

module.exports = Course;
