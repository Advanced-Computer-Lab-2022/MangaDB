const course = require("../models/course");
const user = require("../models/user");
const currencyConverter = require("../helper/currencyconverter");


exports.getAllCourses = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.pageSize || 10;
  const search = req.query.search || "";
  let minPrice = req.query.minPrice || 0;
  let maxPrice = req.query.maxPrice || Number.MAX_VALUE;
  const rating = req.query.rating || 0;
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
      courseDescription: 1,
      coursePrice: 1,
      summary: 1,
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

exports.getCourse = async (req, res, next) => {
  let foundCourse = await course.findById(req.params.id).catch((error) => {
    res.status(500).json({
      message: "Fetching course failed!",
    });
  });
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
    res.status(200).json({
      message: "Course fetched successfully!",
      course: foundCourse,
      symbol: symbol,
    });
  } else {
    res.status(404).json({
      message: "Course not found!",
    });
  }
};

exports.updateCourse = async (req, res, next) => {
  await course
    .findByIdAndUpdate(req.params.id, req.body)
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
  const instructorId = req.params.id;
  const foundInstructor = await user.findById(instructorId);
  if (!foundInstructor.agreedToTerms)
    return res
      .status(400)
      .json({
        message:
          "You have to agree to our terms and policy in order to create a course",
      });
  const instructorName =
    foundInstructor.firstName + " " + foundInstructor.lastName;
  const discount = req.body.discount || 0;
  const newCourse = new course({
    courseTitle: req.body.courseTitle,
    courseDescription: req.body.courseDescription,
    coursePrice: req.body.coursePrice,
    courseImage: req.body.courseImage,
    subject: req.body.subject,
    instructor: instructorId,
    instructorName: instructorName,
    discount: req.body.discount,
    discountedPrice: req.body.coursePrice - req.body.coursePrice * discount,
    rating: req.body.rating,
    reviews: req.body.reviews,
    requirements: req.body.requirements,
    views: req.body.views,
<<<<<<< HEAD
    certificate: req.body.certificate,
    subtitles: req.body.subtitles,
  });
console.log(newCourse);
=======
    summary: req.body.summary,
    certificate: req.body.certificate,
    subtitles: req.body.subtitles,
  });
  let subDuration=0;
  let courseDuration=0;
  for(let i=0;i<newCourse.subtitles.length;i++){
    for(let j=0;j<newCourse.subtitles[i].sources.length;j++){
     subDuration+=newCourse.subtitles[i].sources[j].sourceDuration;
    }
    courseDuration+=subDuration;
    newCourse.subtitles[i].subtitleDuration=subDuration;
  }
  newCourse.totalMins=courseDuration;

>>>>>>> 99ada55042a881372a2461eaf2e4eeddbc03a0c7
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
        { instructor: req.params.id },
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

exports.rateCourse = async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.body.userId;
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
    foundCourse.reviews.push({ user: userId, review: review, rating: rating });
    foundCourse.save();
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
  const userId = req.body.userId;
  const rating = req.body.rating;
  const review = req.body.review;
  let foundCourse = await course.findById(courseId);
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
  const userId = req.body.userId;
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

exports.getMostViewedCourses = async (req, res, next) => {
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
  const userId = req.body.userId;
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

