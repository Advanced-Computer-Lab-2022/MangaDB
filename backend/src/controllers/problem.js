const problem = require("../models/problem");
const course = require("../models/course");

exports.createProblem = async (req, res) => {
  const courseId = req.body.courseId;
  const user = req.body.userId;
  const type = req.body.type;
  const description = req.body.description;

  const foundCourse = await course.findById(courseId);
  if (!foundCourse) {
    return res.status(404).send({ message: "Course not found" });
  }

  const newProblem = new problem({
    course: courseId,
    user: user,
    type: type,
    description: description,
  });
  try {
    await newProblem.save();
    res.status(201).send("Problem created successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProblems = async (req, res) => {
  try {
    const problems = await problem.find().sort({ date: -1 });
    res.send(problems);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProblem = async (req, res) => {
  const _id = req.params.id;
  try {
    const foundProblem = await problem.findById(_id);
    if (!foundProblem) {
      return res.status(404).send();
    }
     if (foundProblem.seen === false) {
      //if(req.user.role === "ADMIN"){
     //  foundProblem.seen = true;
      await foundProblem.save();
      //}
    }
    res.send(foundProblem);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteProblem = async (req, res) => {
  const _id = req.params.id;
  try {
    const foundProblem = await problem.findByIdAndDelete(_id);
    if (!foundProblem) {
      return res.status(404).send();
    }
    res.status(200).send({ message: "Problem deleted successfully", foundProblem });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateProblem = async (req, res) => {
  const status = req.body.status;
  const seen = req.body.seen;
  const _id = req.params.id;
  try {
    const foundProblem = await problem.findByIdAndUpdate(
      _id,
      {
        status,
        seen,
      },
      { new: true }
    );
    if (!foundProblem) {
      return res.status(404).send();
    }
    res.status(200).send({ message: "Problem updated successfully", foundProblem });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.followUpProblem = async (req, res) => {
  const followUpComment = req.body.followUpComment;
  const userId=req.body.userId;
  const _id = req.params.id;
  try {
    const foundProblem = await problem.findOne({ _id, user: userId });
    if (!foundProblem) {
      return res.status(400).send("Problem doesn't belong to user");
    }
    if (foundProblem.status == "resolved") {
      return res.status(400).send({ message: "Problem already resolved" });
    }
    foundProblem.followUpComment = followUpComment;
    await foundProblem.save();
    res.status(200).send("Follow up comment added successfully");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

exports.getUserProblems = async (req, res) => {
    const _id = req.params.id;
    try {
        const problems = await problem.find({ user: _id }).sort({ date: -1 });
        res.send(problems);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
};

exports.getCourseProblems = async (req, res) => {
    const _id = req.params.id;
    try {
        const problems = await problem.find({ course: _id }).sort({ date: -1 });
        res.send(problems);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
};


