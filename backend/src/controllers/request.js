const course = require("../models/course");
const user = require("../models/user");
const request = require("../models/request");
const invoice=require("../models/invoice");


exports.requestRefund = async (req, res) => {

    const courseId = req.body.courseId;
    const userId = req.user.id;
    const reason = req.body.reason;

    const foundRequest=await request.findOne({course:courseId,user:userId,type:"refund"})
  
        if(foundRequest){
            return res.status(400).json({message:`You have already requested a refund for this course: ${foundRequest.status}`}); 
        }
      

    const foundCourse = await course.findById(courseId);
    const foundUser = await user.findById
    (userId);
    if (!foundCourse) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    if (!foundUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    let courseIndex=-1;
    let courseFound=false;
    for(let i=0;i<foundUser.courseDetails.length;i++){
      if(foundUser.courseDetails[i].course==courseId){
        courseIndex=i;
        courseFound=true;
        break;
      }
    }

    if(!courseFound){
     return res.status(400).send({
        message: `User not registered in course`,
      });
    }
    if(foundUser.courseDetails[courseIndex].percentageCompleted/foundUser.courseDetails[courseIndex].totalSources>0.5){
      return res.status(400).send({
        message: `Cannot request refund after 50% completion`,
      });
    }

    const newRefundRequest = new request({
      course: courseId,
      courseName:foundCourse.courseTitle,
      userName:foundUser.firstName+" "+foundUser.lastName,
      user: userId,
      reason: reason,
      type:"refund",
    });
    await newRefundRequest.save();
    res.status(201).json({
      message: "Refund request sent successfully!",
    });
  };

  exports.requestCourseAccess = async (req, res) => {
      
      const courseId = req.body.courseId;
      const userId =req.user.id;
      const reason = req.body.reason;
      const foundRequest=await request.findOne({course:courseId,user:userId,type:"access"})
  
        if(foundRequest){
            return res.status(400).json({message:`You have already requested a access for this course: ${foundRequest.status}`}); 
        }
      const foundCourse = await course.findById(courseId);
      const foundUser = await user.findById
      (userId);
      if (!foundCourse) {
        return res.status(404).json({
          message: "Course not found!",
        });
      }
      if (!foundUser) {
        return res.status(404).json({
          message: "User not found!",
        });
      }

      let courseIndex=-1;
      let courseFound=false;
      for(let i=0;i<foundUser.courseDetails.length;i++){
        if(foundUser.courseDetails[i].course==courseId){
          courseIndex=i;
          courseFound=true;
          break;
        }
      }

      if(courseFound){
        return res.status(400).send({
            message: `User already registered in course`,
          });
        }

      const newAccessRequest = new request({
        course: courseId,
        user: userId,
        reason: reason,
        type:"access",
      });
      await newAccessRequest.save();
      res.status(201).json({
        message: "Access request sent successfully!",
      });
    };

    exports.getRequests = async (req, res) => {
        const type=req.query.type||"";
        const status=req.query.status||"";
        try{
            const requests = await request.find(
                { $and:
        [ {type:{ $regex: type, $options: "i" } }
                ,{status:{ $regex: status, $options: "i" }}]}
            ).sort({date:-1});
            res.status(200).json(requests);
        }
        catch(err){
            res.status(500).json({
                message: "Error fetching requests",
            });
        }
    };

    exports.declineRequest = async (req, res) => {
        try{
            const requestId = req.params.id;
            const foundRequest = await request.findById
            (requestId);
            if (!foundRequest) {
                return res.status(404).json({
                    message: "Request not found!",
                });
                }
            foundRequest.status="rejected";
            await foundRequest.save();
            res.status(200).json({
                message: "Request rejected successfully!",
            });
        }
        catch(err){
            res.status(500).json({
                message: "Error rejecting request",
            });
        }
    };

    exports.approveRefund = async (req, res) => {
        try{
            const requestId = req.params.id;
            const foundRequest = await request.findById
            (requestId);
            if (!foundRequest) {
                return res.status(404).json({
                    message: "Request not found!",
                });
                }
                if(foundRequest.status=="accepted"){
                  return res.status(400).json({message: "Request already accepted!"});
              }
            const foundUser = await user.findById(foundRequest.user);
            let courseIndex=-1;
            let courseFound=false;
            for(let i=0;i<foundUser.courseDetails.length;i++){
                if(foundUser.courseDetails[i].course.toString()==foundRequest.course.toString()){
                    courseIndex=i;
                    courseFound=true;
                    break;
                }
            }
            if(!courseFound){
                return res.status(404).json({
                    message: "Course not found!",
                });
            }

            const refundAmount = await invoice.findOne({course:foundRequest.course,user:foundRequest.user}).then((invoice)=>{
                return invoice.totalAmount;
            }).catch((err)=>{
                console.log(err);
            });

            foundUser.courseDetails.splice(courseIndex,1);
            foundUser.wallet+=refundAmount;
            
            await foundUser.save();
            foundRequest.status="accepted";
            await foundRequest.save();
            res.status(200).json({
                message: "Refund accepted successfully!",
            });
        }
        catch(err){
            res.status(500).json({
                message: "Error accepting refund",
            });
        }
    }

    exports.grantAccess = async (req, res) => {
        try{
            const requestId = req.params.id;
            const foundRequest = await request.findById
            (requestId);
            if (!foundRequest) {
                return res.status(404).json({
                    message: "Request not found!",
                });
                }
            if(foundRequest.status=="accepted"){
                return res.status(400).json({message: "Request already accepted!"});
            }
            const foundUser = await user.findById(foundRequest.user);
        
            const foundCourse = await course.findById(foundRequest.course);
            let sourceNumber=0;
 
            for(let i=0;i<foundCourse.subtitles.length;i++){
              sourceNumber+=foundCourse.subtitles[i].sources.length;
            }
          
            foundUser.courseDetails.push({course:foundCourse._id,totalSources:sourceNumber,percentageCompleted:0});
        
            await foundUser.save();
         
            foundRequest.status="accepted";
            await foundRequest.save();
            res.status(200).json({
                message: "Access granted successfully!",
            });
        }
        catch(err){
            res.status(500).json({
                message: "Error granting access",
            });
        }
    }

    exports.deleteRequest = async (req, res) => {
      const requestId = req.params.id;
      try {
        await request.findByIdAndDelete(requestId);
        res.status(200).json({
          message: "Request deleted successfully!",
        });
      } catch (err) {
        res.status(500).json({
          message: "Error deleting request",
        });
      }
    };
    

    exports.getRequest= async (req, res) => {
      const requestId = req.params.id;
      try {
       const foundRequest= await request.findById(requestId);
       if(foundRequest)
       res.status(200).json({
        message: "Request found successfully!",
        request: foundRequest
      });
      else{
        res.status(404).json({
          message: "Request not found",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Error getting request",
      });
    }
  };