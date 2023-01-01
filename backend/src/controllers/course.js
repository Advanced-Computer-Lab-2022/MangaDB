const course = require("../models/course");
const user = require("../models/user");
const currencyConverter = require("../helper/currencyconverter");
const examController = require("./exam");
const exam = require("../models/exam");
const question = require("../models/question");

getCourseQuestions = async (courseID, userID) => {
  let questions = await question.find(
    { courseId: courseID, userId: userID },
    { courseName: 0, instructorId: 0, courseName: 0, userName: 0, userId: 0 }
  );
  if (!questions) {
    return [];
  }

  return questions;
};

exports.getAllCourses = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.pageSize || 10;
  const search = req.query.search || "";
  let minPrice = req.query.minPrice || 0;
  let maxPrice = req.query.maxPrice || Number.MAX_VALUE;
  const rating = req.query.rating || 0;
  const subjects = req.query.subject;
  const iId = req.user? req.user.id:undefined;
  let query = {};
  if (subjects) {
    query = { subject: { $in: subjects } };
  }
  const countryCode = req.query.CC || "US";
  let countryDetails = await currencyConverter.convertCurrency(
    countryCode,
    "US"
  );
  let exchangeRate = countryDetails.rate;
  let symbol = countryDetails.symbol;

  minPrice = minPrice * exchangeRate;
  maxPrice = maxPrice * exchangeRate;
  let allCourses = await course
    .find({
      $and: [
        query,
        { discountedPrice: { $gte: minPrice } },
        { discountedPrice: { $lte: maxPrice } },
        { rating: { $gte: rating } },
        {
          $or: [
            { courseTitle: { $regex: search, $options: "i" } },
            { subject: { $regex: search, $options: "i" } },
            { instructorName: { $regex: search, $options: "i" } },
          ],
        },
      ],
    })
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
    .select({
      _id: 1,
      courseTitle: 1,
      courseImage: 1,
      totalMins: 1,
      level: 1,
      courseDescription: 1,
      coursePrice: 1,
      summary: 1,
      discountedPrice: 1,
      discount: 1,
      discountStartDate: 1,
      discountEndDate: 1,
      courseImage: 1,
      rating: 1,
      instructor: 1,
      instructorName: 1,
      subject: 1,
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching courses failed!",
      });
    });
  let courseCount = await course
    .find()
    .count()
    .catch((error) => {
      res.status(500).json({
        message: "Counting Courses Failed",
      });
    });
  countryDetails = await currencyConverter.convertCurrency("US", countryCode);
  exchangeRate = countryDetails.rate;
  allCourses.forEach((course) => {
    course.coursePrice = (course.coursePrice * exchangeRate).toFixed(2);
    course.discountedPrice = (course.discountedPrice * exchangeRate).toFixed(2);
  });
  let instructorCourses = [];
  if (iId && (req.user.role == "INSTRUCTOR" || req.user.role == "ADMIN")) {
    for (let i = 0; i < allCourses.length; i++) {
      if (allCourses[i].instructor == iId) {
        allCourses[i].mine = true;
        instructorCourses.push({ course: allCourses[i], mine: true });
      } else {
        allCourses[i].mine = false;
        instructorCourses.push({ course: allCourses[i], mine: false });
      }
    }
    return res.status(200).json({
      message: "Courses fetched successfully!",
      courses: instructorCourses,
      symbol: symbol,
      count: courseCount,
    });
  }
  res.status(200).json({
    message: "Courses fetched successfully!",
    courses: allCourses,
    symbol: symbol,
    count: courseCount,
  });
};

exports.getCourse = async (req, res) => {
  const courseId = req.params.id;
  const userId = req.user?req.user.id:undefined;
  let foundCourse = await course.findById(courseId).catch((error) => {
    res.status(500).json({
      message: "Fetching course failed!",
    });
  });
  if (!foundCourse)
    return res.status(404).json({
      message: "Course not found!",
    });

  foundCourse = await foundCourse.populate("subtitles.sources.quiz");

  let userCourseData = null;
  if (userId) {
    const foundUser = await user.findOne({ _id: userId }).catch((error) => {
      res.status(500).json({
        message: "Fetching user failed!",
      });
    });

    // to  be changed to false and uncomment for loop when token added

    for (let i = 0; i < foundUser.courseDetails.length; i++) {
      if (foundUser.courseDetails[i].course == courseId) {
        userCourseData = foundUser.courseDetails[i];
        break;
      }
    }
  }
  const countryCode = req.query.CC || "US";
  let countryDetails = await currencyConverter.convertCurrency(
    "US",
    countryCode
  );
  let exchangeRate = countryDetails.rate;
  let symbol = countryDetails.symbol;
  if (foundCourse) {
    foundCourse.coursePrice = (foundCourse.coursePrice * exchangeRate).toFixed(
      2
    );
    foundCourse.discountedPrice = (
      course.discountedPrice * exchangeRate
    ).toFixed(2);
    let questions = null;
    if (userId) questions = await getCourseQuestions(courseId, userId);

    res.status(200).json({
      message: "Course fetched successfully!",
      course: foundCourse,
      userData: userCourseData,
      symbol: symbol,
      QA: questions,
    });
  } else {
    res.status(404).json({
      message: "Course not found!",
    });
  }
};

//check if course is in instructor's course list

exports.updateCourse = async (req, res, next) => {
  const courseId = req.params.id;
  await course
    .findByIdAndUpdate(courseId, req.body)
    .then((course) => {
      if (course) {
        res.status(200).json({ message: "Course updated successfully!" });
      } else {
        res.status(404).json({ message: "Course not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Could not update course!",
      });
    });
};

exports.addSubtitle = async (req, res, next) => {
  const subtitle = req.body.subtitle;
  const courseId = req.params.id;
  try {
    const foundCourse = await course.findById(courseId);
    let subDuration = 0;
    for (let j = 0; j < subtitle.sources.length; j++) {
      if (subtitle.sources[j].sourceType === "Quiz") {
        const myExam = subtitle.sources[j].exam;
        const examId = await examController.createExam(myExam);
        subtitle.sources[j].quiz = examId;
      }
      subDuration += subtitle.sources[j].sourceDuration;
    }
    foundCourse.totalMins += subDuration;
    foundCourse.subtitles.push(subtitle);
    await foundCourse.save();
    res.status(200).json({
      message: "Subtitle added successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Subtitle adding failed!",
    });
  }
};

exports.deleteCourse = async (req, res, next) => {
  await course
    .findByIdAndDelete(req.params.id)
    .then((course) => {
      if (course) {
        res.status(200).json({ message: "Course deleted successfully!" });
      } else {
        res.status(404).json({ message: "Course not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Could not delete course!",
      });
    });
};

exports.createCourse = async (req, res, next) => {
  const instructorId = req.user.id;
  const foundInstructor = await user.findById(instructorId);
  if (!foundInstructor.agreedToTerms)
    return res.status(400).json({
      message:
        "You have to agree to our terms and policy in order to create a course",
    });
  const instructorName =
    foundInstructor.firstName + " " + foundInstructor.lastName;
  const discount = req.body.discount || 0;
  const subtitles = req.body.subtitles;
  const newCourse = new course({
    courseTitle: req.body.courseTitle,
    courseDescription: req.body.courseDescription,
    courseOverview: req.body.courseOverview,
    coursePrice: req.body.coursePrice,
    level: req.body.level,
    courseImage: req.body.courseImage,
    subject: req.body.subject,
    instructor: instructorId,
    instructorName: instructorName,
    discount: discount,
    discountedPrice: req.body.coursePrice - req.body.coursePrice * discount,
    requirements: req.body.requirements,
    summary: req.body.summary,
  });
  let subDuration = 0;
  let courseDuration = 0;
  for (let i = 0; i < subtitles.length; i++) {
    for (let j = 0; j < subtitles[i].sources.length; j++) {
      if (subtitles[i].sources[j].sourceType === "Quiz") {
        const myExam = subtitles[i].sources[j].exam;
        const examId = await examController.createExam(myExam);
        subtitles[i].sources[j].quiz = examId;
      }
      subDuration += subtitles[i].sources[j].sourceDuration;
    }

    courseDuration += subDuration;
    subtitles[i].subtitleDuration = subDuration;
    subDuration = 0;
  }
  newCourse.subtitles = subtitles;
  newCourse.totalMins = courseDuration;
  await newCourse
    .save()
    .then((createdCourse) => {
      res.status(201).json({
        message: "Course added successfully",
        course: {
          id: createdCourse._id,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Creating a course failed!",
        error: error,
      });
    });

  foundInstructor.courseDetails.push({ course: newCourse.id });
  await foundInstructor.save();
};

exports.searchCoursesByInstructor = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.pageSize || 10;
  const search = req.query.search || "";
  let minPrice = req.query.minPrice || 0;
  let maxPrice = req.query.maxPrice || Number.MAX_VALUE;
  const subjects = req.query.subject;
  const iId = req.user.id;
  let query = {};
  if (subjects) {
    query = { subject: { $in: subjects } };
  }
  const countryCode = req.query.CC || "US";
  let countryDetails = await currencyConverter.convertCurrency(
    countryCode,
    "US"
  );
  let exchangeRate = countryDetails.rate;
  let symbol = countryDetails.symbol;

  minPrice = minPrice * exchangeRate;
  maxPrice = maxPrice * exchangeRate;

  let allCourses = await course
    .find({
      $and: [
        query,
        { instructor: req.user.id },
        { discountedPrice: { $gte: minPrice } },
        { discountedPrice: { $lte: maxPrice } },
        {
          $or: [
            { courseTitle: { $regex: search, $options: "i" } },
            { subject: { $regex: search, $options: "i" } },
            { instructorName: { $regex: search, $options: "i" } },
          ],
        },
      ],
    })
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
    .select({
      _id: 1,
      courseTitle: 1,
      courseImage: 1,
      totalMins: 1,
      level: 1,
      courseDescription: 1,
      summary: 1,
      coursePrice: 1,
      discountedPrice: 1,
      discount: 1,
      discountStartDate: 1,
      discountEndDate: 1,
      courseImage: 1,
      rating: 1,
      instructor: 1,
      instructorName: 1,
      subject: 1
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching courses failed!",
      });
    });
  countryDetails = await currencyConverter.convertCurrency("US", countryCode);
  exchangeRate = countryDetails.rate;
  allCourses.forEach((course) => {
    course.coursePrice = (course.coursePrice * exchangeRate).toFixed(2);
    course.discountedPrice = (course.discountedPrice * exchangeRate).toFixed(2);
  });
  let instructorCourses = [];
  for (let i = 0; i < allCourses.length; i++) {
    if (allCourses[i].instructor == iId) {
      allCourses[i].mine = true;
      instructorCourses.push({ course: allCourses[i], mine: true });
    } else {
      allCourses[i].mine = false;
      instructorCourses.push({ course: allCourses[i], mine: false });
    }
  }
  res.status(200).json({
    message: "Courses fetched successfully!",
    courses: instructorCourses,
    symbol: symbol,
  });
};

exports.rateCourse = async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.user.id;
  const rating = req.body.rating;
  const review = req.body.review;
  const foundUser = await user.findById(userId);
  if (foundUser.courseDetails.find((courses) => courses.course == courseId)) {
    const foundCourse = await course.findById(courseId);

    const isRated = foundCourse.reviews.find((review) => review.user == userId);
    if (isRated) {
      return res
        .status(400)
        .json({ message: "You have already rated this course" });
    }
    const reviewCount = foundCourse.reviews.length;
    let newRating =
      (reviewCount / (reviewCount + 1)) * foundCourse.rating +
      (1 / (reviewCount + 1)) * rating;
    newRating = newRating.toFixed(2);
    foundCourse.rating = newRating;
    foundCourse.reviews.push({
      user: userId,
      userName: foundUser.firstName + " " + foundUser.lastName,
      review: review,
      rating: rating,
    });
    await foundCourse.save();
    res.status(200).json({
      message: "Course rated successfully!",
    });
  } else {
    res.status(404).json({
      message: "User not enrolled in this course!",
    });
  }
};

exports.editRating = async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.user.id;
  const rating = req.body.rating;
  const review = req.body.review;
  let myCourse = await course.findById(courseId);
  let oldRating = 0;
  foundCourse.reviews.forEach((element) => {
    oldRating = element.rating;
    if (element.user == userId) {
      element.rating = rating || element.rating;
      element.review = review || element.review;
    }
  });
  if (rating) {
    let newRating = 0;
    let reviewCount = foundCourse.reviews.length;
    newRating =
      (reviewCount / reviewCount) * foundCourse.rating -
      (1 / reviewCount) * oldRating +
      (1 / reviewCount) * rating;
    newRating = newRating.toFixed(2);
    foundCourse.rating = newRating;
  }
  foundCourse.save();
  res.status(200).json({
    message: "Course rating edited successfully!",
  });
};
exports.deleteRating = async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.user.id;
  let foundCourse = await course.findById(courseId);
  let oldRating = 0;
  foundCourse.reviews.forEach((element) => {
    if (element.user == userId) {
      oldRating = element.rating;
      element.remove();
    }
  });
  let newRating = 0;
  let reviewCount = foundCourse.reviews.length;
  newRating = foundCourse.rating - (1 / (reviewCount + 1)) * oldRating;
  newRating = newRating.toFixed(2);
  foundCourse.rating = newRating;
  foundCourse.save();
  res.status(200).json({
    message: "Course rating deleted successfully!",
  });
};

exports.getMostViewedCourses = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.pageSize || 10;
  const search = req.query.search || "";
  let minPrice = req.query.minPrice || 0;
  let maxPrice = req.query.maxPrice || Number.MAX_VALUE;
  const subjects = req.query.subject;
  let query = {};
  if (subjects) {
    query = { subject: { $in: subjects } };
  }
  const countryCode = req.query.CC || "US";
  let countryDetails = await currencyConverter.convertCurrency(
    countryCode,
    "US"
  );
  let exchangeRate = countryDetails.rate;
  let symbol = countryDetails.symbol;

  minPrice = minPrice * exchangeRate;
  maxPrice = maxPrice * exchangeRate;

  let allCourses = await course
    .find({
      $and: [
        query,
        { discountedPrice: { $gte: minPrice } },
        { discountedPrice: { $lte: maxPrice } },
        {
          $or: [
            { courseTitle: { $regex: search, $options: "i" } },
            { subject: { $regex: search, $options: "i" } },
            { instructorName: { $regex: search, $options: "i" } },
          ],
        },
      ],
    })
    .sort({ views: -1 })
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
    .select({
      _id: 1,
      courseTitle: 1,
      courseImage: 1,
      totalMins: 1,
      level: 1,
      courseDescription: 1,
      summary: 1,
      coursePrice: 1,
      discountedPrice: 1,
      discount: 1,
      courseImage: 1,
      rating: 1,
      instructor: 1,
      instructorName: 1,
      subject: 1,
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching courses failed!",
      });
    });
  countryDetails = await currencyConverter.convertCurrency("US", countryCode);
  exchangeRate = countryDetails.rate;
  allCourses.forEach((course) => {
    course.coursePrice = (course.coursePrice * exchangeRate).toFixed(2);
    course.discountedPrice = (course.discountedPrice * exchangeRate).toFixed(2);
  });
  res.status(200).json({
    message: "Courses fetched successfully!",
    courses: allCourses,
    symbol: symbol,
  });
};

exports.getMostRatedCourses = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.pageSize || 10;
  const search = req.query.search || "";
  let minPrice = req.query.minPrice || 0;
  let maxPrice = req.query.maxPrice || Number.MAX_VALUE;
  const subjects = req.query.subject;
  let query = {};
  if (subjects) {
    query = { subject: { $in: subjects } };
  }
  const countryCode = req.query.CC || "US";
  let countryDetails = await currencyConverter.convertCurrency(
    countryCode,
    "US"
  );
  let exchangeRate = countryDetails.rate;
  let symbol = countryDetails.symbol;

  minPrice = minPrice * exchangeRate;
  maxPrice = maxPrice * exchangeRate;

  let allCourses = await course
    .find({
      $and: [
        query,
        { discountedPrice: { $gte: minPrice } },
        { discountedPrice: { $lte: maxPrice } },
        {
          $or: [
            { courseTitle: { $regex: search, $options: "i" } },
            { subject: { $regex: search, $options: "i" } },
            { instructorName: { $regex: search, $options: "i" } },
          ],
        },
      ],
    })
    .sort({ rating: -1 })
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
    .select({
      _id: 1,
      courseTitle: 1,
      courseImage: 1,
      totalMins: 1,
      level: 1,
      courseDescription: 1,
      summary: 1,
      coursePrice: 1,
      discountedPrice: 1,
      discount: 1,
      courseImage: 1,
      rating: 1,
      instructor: 1,
      instructorName: 1,
      subject: 1,
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching courses failed!",
      });
    });
  countryDetails = await currencyConverter.convertCurrency("US", countryCode);
  exchangeRate = countryDetails.rate;
  allCourses.forEach((course) => {
    course.coursePrice = (course.coursePrice * exchangeRate).toFixed(2);
    course.discountedPrice = (course.discountedPrice * exchangeRate).toFixed(2);
  });
  res.status(200).json({
    message: "Courses fetched successfully!",
    courses: allCourses,
    symbol: symbol,
  });
};

exports.openCourse = async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.user.id;
  const foundUser = await user.findById(userId).catch((error) => {
    res.status(500).json({
      message: "Fetching user failed!",
    });
  });

  for (let i = 0; i < foundUser.courseDetails.length; i++) {
    if (foundUser.courseDetails[i].course == courseId) {
      return res.status(200).json({
        message: "Course opened successfully!",
      });
    }
  }
  return res.status(400).json({
    message: "You do not have access to this course!",
  });
};

exports.getCourseRating = async (req, res) => {
  const courseId = req.params.id;
  try {
    const foundCourse = await course.findById(courseId);
    let rating1 = 0;
    let rating2 = 0;
    let rating3 = 0;
    let rating4 = 0;
    let rating5 = 0;
    for (let i = 0; i < foundCourse.reviews.length; i++) {
      if (foundCourse.reviews[i].rating == 1) {
        rating1++;
      }
      if (foundCourse.reviews[i].rating == 2) {
        rating2++;
      }
      if (foundCourse.reviews[i].rating == 3) {
        rating3++;
      }
      if (foundCourse.reviews[i].rating == 4) {
        rating4++;
      }
      if (foundCourse.reviews[i].rating == 5) {
        rating5++;
      }
    }
    let count = [
      { rating: 1, count: rating1 },
      { rating: 2, count: rating2 },
      { rating: 3, count: rating3 },
      { rating: 4, count: rating4 },
      { rating: 5, count: rating5 },
    ];
    return res.status(200).json({
      message: "Rating fetched successfully!",
      review: foundCourse.reviews,
      count: count,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Fetching course failed!",
    });
  }
};

exports.getRating = async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.user.id;
  const foundCourse = await course.findById(courseId).catch((error) => {
    res.status(500).json({
      message: "Fetching course failed!",
    });
  });
  let found = false;
  for (let i = 0; i < foundCourse.reviews.length; i++) {
    if (foundCourse.reviews[i].user == userId) {
      found = true;
      return res.status(200).json({
        message: "Rating fetched successfully!",
        rating: foundCourse.reviews[i],
      });
    }
  }
  if (!found) {
    return res.status(200).json({
      message: "user has not rated this course!",
      rating: null,
    });
  }
};

exports.addSource = async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.user.id;
  const source = req.body.source;
  const subtitleId = req.body.subtitleId;
  const foundCourse = await course.findById(courseId).catch((error) => {
    res.status(500).json({
      message: "Fetching course failed!",
    });
  });
  if (source.sourceType === "Quiz") {
    const myExam = source.exam;
    const examId = await examController.createExam(myExam);
    source.quiz = examId;
  }

  for (let i = 0; i < foundCourse.subtitles.length; i++) {
    if (foundCourse.subtitles[i]._id == subtitleId) {
      foundCourse.subtitles[i].sources.push(source);
      foundCourse.subtitles[i].subtitleDuration += source.duration;
      foundCourse.totalMins += source.duration;
      break;
    }
  }
  foundCourse.save().catch((error) => {
    res.status(500).json({
      message: "Adding source failed!",
    });
  });
  res.status(200).json({
    message: "Source added successfully!",
  });
};

exports.updateDiscountedPrice = async () => {
  const courses = await course.find();
  const currentDate = new Date(Date.now());
  for (let i = 0; i < courses.length; i++) {
    let course = courses[i];
    let startDate = course.discountStartDate;
    let endDate = courses[i].discountEndDate;
    if (startDate && startDate <= currentDate && endDate > currentDate) {
      course.discountedPrice =
        course.coursePrice - course.coursePrice * course.discount;
      await course.save();
    }
    if (endDate && endDate <= currentDate) {
      course.discountStartDate = null;
      course.discountEndDate = null;
      course.discount = 0;
      course.discountedPrice = course.coursePrice;
      await course.save();
    }
  }
};
exports.askQuestion = async (req, res, next) => {
  let cId = req.params.id;
  let uId = req.user.id;
  let currentCourse = await course.findById(cId);
  let currentUser = await user.findById(uId);
  let currentQuestion = req.body.question;
  let courseName = currentCourse.courseTitle;
  let userName = currentUser.firstName + " " + currentUser.lastName;
  let courseInstuctorId = currentCourse.instructor;
  let questionDate = req.body.date;
  if (!question || question === "") {
    res.status(400).json({ message: "Please Enter Question" });
    return;
  }
  let newQuestion = new question({
    question: currentQuestion,
    courseId: cId,
    courseName: courseName,
    userId: uId,
    userName: userName,
    instructorId: courseInstuctorId,
    date: questionDate,
  });
  await newQuestion
    .save()
    .then((createdQuestion) => {
      res.status(200).json({
        message: "Question added successfully",
        question: createdQuestion,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Asking Question Failed!",
        error: error.message,
      });
    });
};

exports.answerQuestion = async (req, res, next) => {
  let qId = req.body.questionId;
  let answer = req.body.answer;
  let currentQuestion = await question.findById(qId);
  currentQuestion.answer = answer;
  await currentQuestion
    .save()
    .then((answeredQuestion) => {
      res.status(200).json({
        message: "Answer added successfully",
        question: answeredQuestion,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error in answering question",
        error: error.message,
      });
    });
};
exports.getInstructorQuestions = async (req, res, next) => {
  let questions = await question.find(
    { instructorId: req.user.id, answer: { $exists: false } },
    { courseName: 0, instructorId: 0, userId: 0 }
  );
  if (!questions) {
    res.status(400).json({ message: "Please Enter Valid Instructor ID" });
    return;
  }
  res.status(200).send(questions);
};

exports.getDiscountedCourses = async (req, res, next) => {
  let courses = await course.find({ discount: { $gt: 0 } }).limit(9);

  res.status(200).send(courses);
};
