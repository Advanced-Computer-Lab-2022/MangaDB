const course=require('../models/course');
const subtitles=require('../models/subtitle');

exports.getAllCourses = (req, res, next) => { 
    const currentPage = req.query.page || 1;
    const perPage =req.query.pageSize || 10;
    course.find()
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
    .populate('instructor', 'firstName lastName')
    .select({_id:1, courseTitle:1, totalHours:1, price:1,  courseImage:1, rating:1, instructor:1, subject:1})
    .then(courses => {
        res.status(200).json({
            message: 'Courses fetched successfully!',
            courses: courses
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Fetching courses failed!'
        });
    });
}

exports.getCourse = (req, res, next) => {
    course.findById(req.params.id)
    .populate('instructor', 'firstName lastName')
    .then(course => {
        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).json({message: 'Course not found!'});
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'Fetching course failed!'
        });
    });
}

//not final remove values that shouldnt be entered by user
exports.createCourse = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    // const subtitles=new subtitles({
    //     subtitle: req.body.subtitle,
    // });
    const course = new course({
        courseTitle: req.body.courseTitle,
        courseDescription: req.body.courseDescription,
        totalHours: req.body.totalHours,
        coursePrice: req.body.price,
        courseImage: url + '/images/' + req.file.filename,
        rating: req.body.rating,
        instructor: req.body.instructor,
        subject: req.body.subject,
        reviews: req.body.reviews,
        requirements: req.body.requirements,
        views: req.body.views,
        certificate: req.body.certificate,
        summary:   req.body.summary,
        subtitles: req.body.subtitles,

    });
    course.save().then(createdCourse => {
        res.status(201).json({
            message: 'Course added successfully',
            course: {
                ...createdCourse,
                id: createdCourse._id,
            }
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Creating a course failed!'
        });
    });
}


        