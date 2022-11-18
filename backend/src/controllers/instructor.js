const course=require('../models/course');
const user = require('../models/user');

exports.updateUser = (req, res) => {
    const id = req.params.id;
    user.findByIdAndUpdate(id, req.body
    , { useFindAndModify: false ,new: true})
    .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot update user with id=${id}. Maybe user was not found!`,
            });
        } else res.send({ message: "user was updated successfully." });
        })
    .catch(err => {
        res.status(500).send({
        message: "Error updating user with id=" + id,
        });
    });

};

exports.rateInstructor = async (req, res) => {
    const instructorId = req.params.id;
    const userId = req.body.userId;
    const rating = req.body.rating;
    const review = req.body.review;
    try {
        const foundInstructor=await user
        .findById(instructorId)
        
        if(!foundInstructor||foundInstructor.role!=="INSTRUCTOR"){
            res.status(404).send({
                message: `Cannot rate instructor with id=${instructorId}. Maybe instructor was not found!`,
                });
        }else{
        //check if user is enrolled in a course that this instructor teaches
        //check if user already rated this instructor
        //if not, add rating to instructor
        
        
        const reviewCount=foundInstructor.reviews.length ;
        let newRating = ((reviewCount/(reviewCount+1) )* foundInstructor.rating)+ ((1/(reviewCount+1) )*rating);
        newRating=newRating.toFixed(2);
        foundInstructor.rating=newRating;
        foundInstructor.reviews.push({user:userId,rating:rating,review:review});
        foundInstructor.save();1
        res.status(200).send({
            message: "Instructor was rated successfully.",
        });
    }}
    catch (err) {   
        res.status(500).send({
            message: err.message || "Some error occurred while rating instructor.",
        });
    }

};




