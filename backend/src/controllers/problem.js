const problem = require("../models/problem");

exports.createProblem = async (req, res) => {
  const course = req.body.courseId;
  const user = req.body.userId;
  const type = req.body.type;
  const description = req.body.description;
  const newProblem = new problem({
    course: course,
    user: user,
    type: type,
    description: description,
  });
  try {
    await newProblem.save();
    res.status(201).send(problem);
  } catch (error) {
    res.status(400).send(error);
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
    const problem = await problem.findById(_id);
    if (!problem) {
      return res.status(404).send();
    }
    if (problem.seen === false) {
      problem.seen = true;
      await problem.save();
    }
    res.send(problem);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteProblem = async (req, res) => {
  const _id = req.params.id;
  try {
    const problem = await problem.findByIdAndDelete(_id);
    if (!problem) {
      return res.status(404).send();
    }
    res.status(200).send({ message: "Problem deleted successfully", problem });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateProblem = async (req, res) => {
  const status = req.body.status;
  const seen = req.body.seen;
  const _id = req.params.id;
  try {
    const problem = await problem.findByIdAndUpdate(
      _id,
      {
        status,
        seen,
      },
      { new: true }
    );
    if (!problem) {
      return res.status(404).send();
    }
    res.send(problem);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.followUpProblem = async (req, res) => {
  const followUpComment = req.body.followUpComment;
  const _id = req.params.id;
  try {
    const problem = await problem.findOne({ _id });
    if (!problem) {
      return res.status(404).send();
    }
    if (problem.status === "resolved") {
      return res.status(400).send({ message: "Problem already resolved" });
    }
    problem.followUpComment = followUpComment;
    await problem.save();
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


