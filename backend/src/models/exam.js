const mongoose = require("mongoose");
const connection = require("../config/database");

const examSchema = new mongoose.Schema({
    exercises: {
        type: [
          {
            question: { type: String },
            solution: { type: {
                solutionId: { type: Number },
                name: { type: String },
            } },
            choices:  { type: [{
                choiceId: { type: Number },
                name: { type: String },
          }]},
          },
        ],
      }
    },
);

const Exam = connection.model("Exam", examSchema);

module.exports = Exam;