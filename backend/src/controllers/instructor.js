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




