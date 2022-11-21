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
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },

  subtitles: {
    type: [
      {
        title: {
          type: String,
        },
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
                enum: ["Video", "Exam", "Text"],
              },
              exam: {
                type: {
                  exercises: {
                    type: [
                      {
                        question: { type: String },
                        answer: { type: String },
                        options: { type: [String] },
                      },
                    ],
                  },
                  totalGrade: { type: Number },
                },
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
