const course=require('../models/course');
const user = require('../models/user');
const invoice = require('../models/invoice');

exports.updateUser = (req, res) => {
    const id = req.user.id;;
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
    const userId = req.user.id;;
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
        const foundUser=await user
        .findById
        (userId)
        if(!foundUser){
            res.status(404).send({
                message: `Cannot rate instructor with id=${userId}. Maybe user was not found!`,
                });
        }else{
            const userCourses=foundUser.courseDetails;
            const instructorCourses=foundInstructor.courseDetails;
            let found=false;
            for(let i=0;i<userCourses.length;i++){
                const courseDetails=userCourses[i].course;
             for(let j=0;j<instructorCourses.length;j++){
                 const instructorCourseDetails=instructorCourses[j].course;
                 if(courseDetails.toString()===instructorCourseDetails.toString()){
                     found=true;
                     break;
                 }
             }
            }
            if(!found){
                res.status(400).send({
                    message: `Cannot rate instructor with id=${instructorId}. User is not enrolled in any course taught by this instructor!`,
                    });
            }else{
                //check if user has already rated this instructor
                const instructorReviews=foundInstructor.reviews;
                let foundReview=false;
                for(let i=0;i<instructorReviews.length;i++){
                    const reviewDetails=instructorReviews[i];
                    if(reviewDetails.user.toString()===userId){
                        foundReview=true;
                        break;
                    }
                }
                if(foundReview){
                    res.status(400).send({
                        message: `Cannot rate instructor with id=${instructorId}. User has already rated this instructor!`,
                        });
                }else{

        
        
        const reviewCount=foundInstructor.reviews.length ;
        let newRating = ((reviewCount/(reviewCount+1) )* foundInstructor.rating)+ ((1/(reviewCount+1) )*rating);
        newRating=newRating.toFixed(2);
        foundInstructor.rating=newRating;
        foundInstructor.reviews.push({user:userId,userName: foundUser.firstName + " "+foundUser.lastName,rating:rating,review:review});
        foundInstructor.save();
        res.status(200).send({
            message: "Instructor was rated successfully.",
        });
    }}}
    }}
    catch (err) {   
        res.status(500).send({
            message: err.message || "Some error occurred while rating instructor.",
        });
    }

};

exports.editRating = async (req, res) => {
    const instructorId = req.params.id;
    const userId = req.user.id;
    const rating = req.body.rating;
    const review = req.body.review;
    try {
        let foundInstructor=await user
        .findById(instructorId)
        
        if(!foundInstructor||foundInstructor.role!=="INSTRUCTOR"){
            res.status(404).send({
                message: `Cannot edit rating of instructor with id=${instructorId}. Maybe instructor was not found!`,
                });
        }else{
            let oldRating=0;
            foundInstructor.reviews.forEach((element) => {
                oldRating=element.rating;
                if (element.user == userId) {
                  element.rating = rating||element.rating;
                  element.review = review||element.review;
          
                }
              });
                if(rating){
                const reviewCount=foundInstructor.reviews.length ;
                let newRating = ((reviewCount/(reviewCount) )* foundInstructor.rating)- ((1/(reviewCount) )*oldRating)+ ((1/(reviewCount) )*rating);
                newRating=newRating.toFixed(2);
                foundInstructor.rating=newRating;
                foundInstructor.save();
                res.status(200).send({
                    message: "Instructor rating was edited successfully.",
                });

                }
            }
        }
    catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while editing instructor rating.",
        });
    }

};

exports.deleteRating = async (req, res) => {
    const instructorId = req.params.id;
    const userId = req.user.id;
    try {
        let foundInstructor=await user
        .findById(instructorId)
        
        if(!foundInstructor||foundInstructor.role!=="INSTRUCTOR"){
            res.status(404).send({
                message: `Cannot delete rating of instructor with id=${instructorId}. Maybe instructor was not found!`,
                });
        }else{
            let oldRating=0;
            foundInstructor.reviews.forEach((element) => {
                if (element.user == userId) {
                  oldRating=element.rating;
                  element.remove();
                }
              });
                const reviewCount=foundInstructor.reviews.length ;
                let newRating = ((reviewCount/(reviewCount+1) )* foundInstructor.rating)- ((1/(reviewCount+1) )*oldRating);
                newRating=newRating.toFixed(2);
                foundInstructor.rating=newRating;
                foundInstructor.save();
                res.status(200).send({
                    message: "Instructor rating was deleted successfully.",
                });
            }
        }
    catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting instructor rating.",
        });
    }

}

exports.getRating = async (req, res) => {
    const instructorId = req.params.id;
    const userId = req.user.id;
    try {
        let foundInstructor=await user
        .findById(instructorId)
        
        if(!foundInstructor||foundInstructor.role!=="INSTRUCTOR"){
            res.status(404).send({
                message: `Cannot get rating of instructor with id=${instructorId}. Maybe instructor was not found!`,
                });
        }else{
            let found=false;
            foundInstructor.reviews.forEach((element) => {
                if (element.user == userId) {
                  found=true;
                  res.status(200).send({
                    message: "Instructor rating was found successfully.",
                    review : element
                });
                }
              });
              if(!found){
                res.status(404).send({
                    message: `Cannot get rating of instructor with id=${instructorId}. User has not rated this instructor!`,
                    review : null
                    });
              }
            }
        }
    catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while getting instructor rating.",
        });
    }

};
exports.setDiscount= async (req, res) => {
    let currentCourse=await course.findById(req.params.id);
    if(currentCourse.discount!=0){
        res.status(400).json({message:"Cannot set more than one discount for same course"});
        return;
    }
    const {discount,discountStartDate,discountEndDate}=req.body;
    currentCourse.discount=discount;
    currentCourse.discountStartDate=discountStartDate;
    currentCourse.discountEndDate=discountEndDate;
    await currentCourse.save();
    res.status(200).json(currentCourse);
    };


exports.getMoneyOwed = async (req, res) => {
    const instructorId=req.user.id;
    let date=new Date(Date.now());
    let startOfMonth=new Date(date.getFullYear(),date.getMonth(),1);
    date=date.toISOString();
    startOfMonth=startOfMonth.toISOString();
    try {
        const invoiceData=await invoice.find({$and: [{instructor:instructorId},{invoiceDate:{$gte:startOfMonth}},{invoiceDate:{$lte:date}}]});
        let total=0;
        invoiceData.forEach((element) => {
            total+=element.totalAmount*0.8;
        }
        );
        res.status(200).send({
            message: "Instructor money owed was found successfully.",
            moneyOwed : total
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while getting instructor money owed.",
        });
    }
};


