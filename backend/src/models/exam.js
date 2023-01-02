const mongoose = require("mongoose");
const connection = require("../config/database");

const examSchema = new mongoose.Schema({
    exercises: {
        type: [
          {
            question: { type: String },
            solution: { type: String },
            choices:  { type: [{
              choiceId: { type: String },
              description: { type: String },
          }]},
          },
        ],
      },totalGrade:{type:Number}
    }
);

const Exam = connection.model("Exam", examSchema);

module.exports = Exam;