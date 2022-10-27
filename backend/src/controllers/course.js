const course=require('../models/course');
const subtitles=require('../models/subtitle');
const instructor=require('../models/instructor');

exports.getAllCourses = async (req, res, next) => { 
    const currentPage = req.query.page || 1;
    const perPage =req.query.pageSize || 10;
    const search= req.query.search || "";
    await course.find({$or:[{courseTitle: {$regex : search, $options: "i"}}, 
    {subject: {$regex : search, $options: "i"}}, 
    {instructorName: {$regex : search, $options: "i"}}]})
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
    .select({_id:1, courseTitle:1, totalHours:1, price:1,  courseImage:1, rating:1, instructor:1, instructorName:1, subject:1})
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

exports.getCourse =async (req, res, next) => {
    await course.findById(req.params.id)
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
exports.createCourse = async(req, res, next) => {
    const instructorId=req.params.id;
    const foundInstructor =await instructor.findById(instructorId);
    const instructorName=foundInstructor.firstName+" "+foundInstructor.lastName;
    const newCourse = new course({
        courseTitle: req.body.courseTitle,
        courseDescription: req.body.courseDescription,
        totalHours: req.body.totalHours,
        coursePrice: req.body.coursePrice,
        courseImage: req.body.courseImage,
        instructor: instructorId,
        instructorName: instructorName,
        rating: req.body.rating,
        subject: req.body.subject,
        reviews: req.body.reviews,
        requirements: req.body.requirements,
        views: req.body.views,
        certificate: req.body.certificate,
        summary:   req.body.summary,
        subtitles: req.body.subtitles,

    });
   
    await newCourse.save().then(createdCourse => {
        res.status(201).json({
            message: 'Course added successfully',
            course: {
                id: createdCourse._id,
            }
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Creating a course failed!',
            error: error
        });
    });

    foundInstructor.courses.push(newCourse.id);
    await foundInstructor.save()
}




        