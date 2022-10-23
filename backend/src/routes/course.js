const router = require('express').Router();
const courseController = require('../controllers/course');

router.get('/', courseController.getAllCourses);

router.get('/:id', courseController.getCourse);

router.post('/addcourse', courseController.createCourse);

module.exports = router;