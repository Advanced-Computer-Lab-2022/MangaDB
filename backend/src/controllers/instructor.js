const course=require('../models/course');
const instructor=require('../models/instructor');

exports.getInstructorCourseTitles = async (req, res, next) => {
    await instructor.find({_id: req.params.id})
    .populate('courses', 'courseTitle')
    .select('courses')
    .then(instructors => {
        if (instructors) {
            res.status(200).json(instructors);
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

exports.searchCourses = async (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage =req.query.pageSize || 10;
    const search= req.query.search || "";
    const minPrice= req.query.minPrice || 0;
    const maxPrice= req.query.maxPrice || 100000;
    await course.find({$and: [{instructor: req.params.id},  {coursePrice: {$gte: minPrice}},
        {coursePrice: {$lte: maxPrice}} ,{$or:[{courseTitle: {$regex : search, $options: "i"}}, 
    {subject: {$regex : search, $options: "i"}}, 
    {instructorName: {$regex : search, $options: "i"}}]}]})
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
    .select({_id:1, courseTitle:1, totalHours:1, price:1,coursePrice:1,  courseImage:1, rating:1, instructor:1, instructorName:1, subject:1})
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


