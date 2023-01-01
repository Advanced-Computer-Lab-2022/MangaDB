const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer=require('../helper/mailer');
const course=require('../models/course');
const exam=require('../models/exam');
const blackList=require('../models/token');
const invoice=require('../models/invoice');
const currencyConverter = require("../helper/currencyconverter");
const { jsPDF } = require("jspdf");

const html2canvas= require("html2canvas");



exports.createUser = async (req, res) => {
  if (!req.body.userName || !req.body.password || !req.body.role) {
    return res.status(400).send({
      message: "content can not be empty",
    });
  }
  //validate request
  const foundUser = await user.findOne({ userName: req.body.userName });

  if (foundUser) {
    return res.status(400).send({
      message: "Username already exists",
    });
  }

  const newUser = new user({
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    wallet: req.body.wallet,
    biography: req.body.biography,
  });

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  try {
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await user.findByIdAndRemove(id).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`,
        });
      } else {
        res.send({
          message: "user was deleted successfully!",
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete user with id=" + id,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    await user.find().then((data) => {
      res.send(data);
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving users.",
    });
  }
};

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    await user.findById(id).then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + id });
      else res.send(data);
    });
  } catch (err) {
    res.status(500).send({ message: "Error retrieving user with id=" + id });
  }
};

exports.viewProfile = async (req, res) => {
  const id = req.user.id;
  try {
    await user.findById(id).then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + id });
      else res.send(data);
    });
  } catch (err) {
    res.status(500).send({ message: "Error retrieving user with id=" + id });
  }
};

exports.updateUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.user.id;
  try {
   const foundUser= await user
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true });
    if(!foundUser){
      res.status(404).send({
        message: `Cannot update user with id=${id}. Maybe user was not found!`,
      });
    }
      if((req.body.firstName || req.body.lastName) && req.user.role=="INSTRUCTOR" ){
        
        await course.updateMany({instructor:id},{$set:{instructorName:req.body.firstName+" "+req.body.lastName}});
      }
      res.status(200).send({message:"user updated successfully",data:foundUser});
  } catch (err) {
    res.status(500).send({
      message: "Error updating user with id=" + id,
    });
  }
};

exports.login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    await user.findOne({ userName }).then(async (data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Not found user with userName " + userName });
      } else {
        const validPassword = await bcrypt.compare(password, data.password);
        if (!validPassword) {
          res.status(401).send({ message: "Invalid Password!" });
        } else {
          const token = jwt.sign(
            { id: data._id, userName: data.userName, role: data.role },
            process.env.TOKEN_SECRET
          );
      
          res.status(200).send({ message: "login successfully", token: token ,
        role: data.role });
        }
      }
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error retrieving user with userName=" + userName });
  }
};

exports.getUserByRole = async (req, res) => {
  const role = req.query.role;
  try {
    await user.find({ role }).then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found user with role " + role });
      else res.send(data);
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error retrieving user with role=" + role });
  }
};

exports.changePassword = async (req, res) => {
  const id =  req.user.id;
  const { oldPassword, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);
  try {
    var data = await user.findById(id).then(async (data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found!`,
        });
      } else {
        const validPassword = await bcrypt.compare(oldPassword, data.password);
        if (!validPassword) {
          res.status(401).send({ message: "Invalid Password!" });
        } else {
          await user
            .findByIdAndUpdate(
              id,
              { password: newPassword },
              { useFindAndModify: false, new: true }
            )
            .then((data) => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot update user with id=${id}. Maybe user was not found!`,
                });
              } else
                res.send({ message: "user was updated successfully.", data });
            });
        }
      }
    });
  } catch (err) {
    res.status(500).send({
      message: "Error updating user with id=" + id,
    });
  }
};

    exports.forgetPassword = async (req, res) => {
        const { userName } = req.body;
        try {
            await user.findOne({
                userName
            }).then(async (data) => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot find user with userName=${userName}`,
                    });
                } else {
                  const token = jwt.sign(
                    { id: data._id, userName: data.userName, role: data.role },
                    process.env.TOKEN_SECRET
                  );
                    const mailOptions = {
                        email: data.email,
                        subject: 'Reset Password',
                        html: `<h1>Reset Password</h1>
                        <p>Click on the link to reset your password</p>
                        <a href="http://localhost:3456/resetpassword">Reset Password</a>`,
          };
          
          mailer.sendEmail(mailOptions);
          res.send({ message: "email has been sent"
        , token: token });
        }
      });
      
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving user with userName=" + userName,
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);
  const id = req.user.id;
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(" ")[1];
  const invalidToken=new blackList({token});
  await invalidToken.save();
  // res.clearCookie("token");
  try {
    await user
      .findByIdAndUpdate(
        id,
        { password: newPassword },
        { useFindAndModify: false, new: true }
      )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update user with id=${id}. Maybe user was not found!`,
          });
        } else res.send({ message: "user was updated successfully.", data });
      });
  } catch (err) {
    res.status(500).send({
      message: "Error updating user with id=" + id,
    });
  }
};



    exports.logout = async (req, res) => {
      const authHeader = req.header('Authorization');
      const token = authHeader && authHeader.split(" ")[1];
      try { 
        const invalidToken=new blackList({token});
        await invalidToken.save();
        // res.clearCookie("token");
        res.send({message: "logout successfully"});
      } catch (err) {
        res.status(500).send({
          message: "Error logout",
        });
      }
    };

//get courses this user is registered in
exports.getRegisteredCourses = async (req, res) => {
  const id =  req.user.id;
  const pageSize=req.query.pagesize||10;
  const currentPage=req.query.page||1;
  try {
    const userData = await user.findById(id).populate("courseDetails.course");
    if (!userData) {
      res.status(404).send({
        message: `Cannot update user with id=${id}. Maybe user was not found!`,
      });
    } else {
      const courses = [];
     for(let i=0;i<userData.courseDetails.length;i++){
       if(i>=pageSize*(currentPage-1) && i<pageSize*currentPage){
         courses.push(userData.courseDetails[i]);
     }
    }
    res.status(200).json({
      message: "User data fetched successfully!",
      courses: courses,
      count: userData.courseDetails.length});

  }
  } catch (err) {
    res.status(500).send({
      message: "Error in getting registered courses"
    });
  }
};
// exports.sendCertificate= async(userEmail,userName)=>{
//   const mailOptions = {
//     email: userEmail,
//     subject: 'Certificate',
//     html: `<div> Kindly Find Your Certificate Attached Below</div>`,
// };

// mailer.sendEmail(mailOptions);
// };
exports.openSource = async (req, res) => {
  const courseId = req.params.id;
  const  sourceId  = req.body.sourceId;
  const userId = req.user.id;
  try {
    const userData = await user.findById(userId);
    if (!userData) {
      res.status(404).send({
        message: `User was not found!`,
      });
    } else {
      let courseIndex = -1;
      let courseFound = false;
      for (let i = 0; i < userData.courseDetails.length; i++) {
        if (userData.courseDetails[i].course == courseId) {
          courseIndex = i;
          courseFound = true;
          break;
        }
      }

      if (!courseFound) {
        res.status(400).send({
          message: `User not registered in course`,
        });
      } else {
        for (
          let j = 0;
          j < userData.courseDetails[courseIndex].viewedSources.length;
          j++
        ) {
          if (
            userData.courseDetails[courseIndex].viewedSources[j].sourceId ==
            sourceId
          ) {
            res.status(200).send({
              message: `Source already opened`,
            });
            return;
          }
        }
        const courseData = await course.findById(courseId);

        let sourceDescription="";
        let sourceIndex=-1;
        let subtitleDescription="";
        let subtitleIndex=-1;
        for(let i=0;i<courseData.subtitles.length;i++){
          for(let j=0;j<courseData.subtitles[i].sources.length;j++){
            sourceIndex++;
            if(courseData.subtitles[i].sources[j]._id==sourceId){
              sourceDescription=courseData.subtitles[i].sources[j].description;
              subtitleDescription=courseData.subtitles[i].description;
              subtitleIndex=i;
              break;
            }
          }
        }

        userData.courseDetails[courseIndex].viewedSources.push({
          sourceId: sourceId,
          sourceDescription: sourceDescription,
          subtitleDescription: subtitleDescription,
          subtitleIndex: subtitleIndex,
          sourceIndex: sourceIndex,
        });
        let percentage =userData.courseDetails[courseIndex].percentageCompleted+1;
        userData.courseDetails[courseIndex].percentageCompleted = percentage;
      //   if(percentage=== userData.courseDetails[courseIndex].totalSources){
      //     if(percentage===  userData.courseDetails[courseIndex].totalSources){
      //       let userName=userData.firstName+" "+userData.lastName;
      //       const mailOptions = {
      //         email: userData.email,
      //         subject: 'Certificate',
      //         html:`<div> Kindly Find Your Certificate Attached Below</div>` ,
      // };
      
      // mailer.sendEmail(mailOptions);
        //  };
     //   }
        await userData.save();
        res.status(200).send({ message: "source opened successfully" });
      }
    }
  } catch (err) {
    res.status(500).send({
      message: "Error in opening source",
    });
  }
};
//probably useless
exports.getProgress = async (req, res) => {
  const courseId = req.params.id;
  const  id  = req.user.id;
  try {
    const userData = await user.findById(id);
    if (!userData) {
      res.status(404).send({
        message: `User was not found!`,
      });
    } else {
      let courseIndex = -1;
      let courseFound = false;
      for (let i = 0; i < userData.courseDetails.length; i++) {
        if (userData.courseDetails[i].course == courseId) {
          courseIndex = i;
          courseFound = true;
          break;
        }
      }

      if (!courseFound) {
        res.status(400).send({
          message: `User not registered in course`,
        });
      } else {
        res
          .status(200)
          .send({
            percentage: userData.courseDetails[courseIndex].percentageCompleted,
            certificate:userData.courseDetails[courseIndex].certificate
          });
      }
    }
  } catch (err) {
    res.status(500).send({
      message: "Error in getting progress",
    });
  }
};

exports.addNotes = async (req, res) => {
  const id =  req.user.id;
  const { courseId, sourceId, notes } = req.body;
  try {
    const userData = await user.findById(id);
    if (!userData) {
      res.status(404).send({
        message: `User was not found!`,
      });
    } else {
      let courseIndex = -1;
      let courseFound = false;
      for (let i = 0; i < userData.courseDetails.length; i++) {
        if (userData.courseDetails[i].course == courseId) {
          courseIndex = i;
          courseFound = true;
          break;
        }
      }
      if (!courseFound) {
        res.status(400).send({
          message: `User not registered in course`,
        });
      } else {
        let sourceIndex = -1;
        let sourceFound = false;
        for (
          let j = 0;
          j < userData.courseDetails[courseIndex].viewedSources.length;
          j++
        ) {
          if (
            userData.courseDetails[courseIndex].viewedSources[j].sourceId ==
            sourceId
          ) {
            sourceIndex = j;
            sourceFound = true;
            break;
          }
        }
        if (!sourceFound) {
          res.status(400).send({
            message: `User not opened source`,
          });
        } else {
          userData.courseDetails[courseIndex].viewedSources[sourceIndex].notes =
            notes;
          await userData.save();
          res.status(200).send({ message: "notes added successfully" });
        }
      }
    }
  }  catch (err) {
    res.status(500).send({
      message: "Error in adding notes",
    });
  
 


 
};
};

exports.getCourseNotes = async (req, res) => {
  const id =  req.user.id;
  const  courseId  = req.query.cid;
  try {
    const userData = await user.findById(id);
    if (!userData) {
      res.status(404).send({
        message: `User was not found!`,
      });
    } else {
      let courseIndex = -1;
      let courseFound = false;
      for (let i = 0; i < userData.courseDetails.length; i++) {
        if (userData.courseDetails[i].course == courseId) {
          courseIndex = i;
          courseFound = true;
          break;
        }
      }

      if (!courseFound) {
        res.status(400).send({
          message: `User not registered in course`,
        });
      } else {
        res.status(200).send({
          noteData: userData.courseDetails[courseIndex].viewedSources,
        });
          
      }
    }
  } catch (err) {
    res.status(500).send({
      message: "Error in getting notes",
    });
  }
};

exports.getSubtitleNotes = async (req, res) => {

  const id =  req.user.id;
  const  courseId  = req.query.cid;
  const  subtitleId  = req.query.sid;
  try {
    const userData = await user.findById(id);
    if (!userData) {
      res.status(404).send({
        message: `User was not found!`,
      });
    } else {
      let courseIndex = -1;
      let courseFound = false;
      for (let i = 0; i < userData.courseDetails.length; i++) {
        if (userData.courseDetails[i].course == courseId) {
          courseIndex = i;
          courseFound = true;
          break;
        }
      }

      if (!courseFound) {
        res.status(400).send({
          message: `User not registered in course`,
        });
      } else {
        const courseData=await course.findById(courseId);
        let subtitleIndex=-1;
        for(let i =0;i<courseData.subtitles.length;i++){
          if(courseData.subtitles[i]._id==subtitleId){
            subtitleIndex=i;
            break;
          }
        }
        if(subtitleIndex==-1){
          res.status(400).send({
            message: `Subtitle not found`,
          });
        }
        else{
          const subtitleNotes=[];
          for(let i=0;i<userData.courseDetails[courseIndex].viewedSources.length;i++){
            if(userData.courseDetails[courseIndex].viewedSources[i].subtitleIndex==subtitleIndex){
              subtitleNotes.push(userData.courseDetails[courseIndex].viewedSources[i]);
            }
          }
          res.status(200).send({
            noteData: subtitleNotes,
          });
        }
      }
    }
  } catch (err) {
    res.status(500).send({
      message: "Error in getting notes",
    });
  }
};

exports.getSourceNotes=async (req, res) => {
  const id =  req.user.id;
  const  courseId  = req.query.cid;
  const  sourceId  = req.query.sid;
  try {
    const userData = await user.findById(id);
    if (!userData) {
      res.status(404).send({
        message: `User was not found!`,
      });
    } else {
      let courseIndex = -1;
      let courseFound = false;
      for (let i = 0; i < userData.courseDetails.length; i++) {
        if (userData.courseDetails[i].course == courseId) {
          courseIndex = i;
          courseFound = true;
          break;
        }
      }

      if (!courseFound) {
        res.status(400).send({
          message: `User not registered in course`,
        });
      } else {
        for(let i=0;i<userData.courseDetails[courseIndex].viewedSources.length;i++){
          if(userData.courseDetails[courseIndex].viewedSources[i].sourceId==sourceId){
            res.status(200).send({
              noteData: [userData.courseDetails[courseIndex].viewedSources[i]]
            });
            return;
          }
        }
        res.status(400).send({
          message: `Source not found`,
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      message: "Error in getting notes",
    });
  }
};

exports.deleteNote=async (req, res) => {
  const noteId = req.body.noteId;
  const courseId  = req.body.courseId;
  const sourceId  = req.body.sourceId;
  const userId= req.user.id;
  try{
    const userData=await user.findById(userId);
    if(!userData){
      res.status(404).send({
        message: `User was not found!`,
      });
    }
    else{

      let courseIndex = -1;
      let courseFound = false;
      for (let i = 0; i < userData.courseDetails.length; i++) {
        if (userData.courseDetails[i].course == courseId) {
          courseIndex = i;
          courseFound = true;
          break;
        }
      }

      if (!courseFound) {
        res.status(400).send({
          message: `User not registered in course`,
        });
      } else {
        for(let i=0;i<userData.courseDetails[courseIndex].viewedSources.length;i++){
          if(userData.courseDetails[courseIndex].viewedSources[i].sourceId==sourceId){
            for(let j=0;j<userData.courseDetails[courseIndex].viewedSources[i].notes.length;j++){
              if(userData.courseDetails[courseIndex].viewedSources[i].notes[j]._id==noteId){
                userData.courseDetails[courseIndex].viewedSources[i].notes.splice(j,1);
                await userData.save();
                res.status(200).send({
                  message: `Note deleted`,
                });
                return;
              }
            }
            res.status(400).send({
              message: `Note not found`,
            });
            return;
          }
        }
        res.status(400).send({
          message: `Source not found`,
        });
      }
    }
  }

  catch(err){
    res.status(500).send({
      message: "Error in deleting note",
    });
  }
};



exports.solveExam=async (req, res) => {

  const myUser=await user.findOne({_id: req.user.id});
  const courseId = req.body.courseid;

  try {
  if(!myUser){
    res.status(404).json({message:"User Not Found"});
    return;
  }
  let courseIndex=-1;
  let courseFound=false;
  for(let i=0;i<myUser.courseDetails.length;i++){
    if(myUser.courseDetails[i].course==courseId){
      courseIndex=i;
      courseFound=true;
      break;
    }}
    if(!courseFound){
      res.status(400).send({
        message: `User not registered in course`,
      });
      return;
    }
    const myExam=await exam.findOne({_id:req.body.examid});
    if(!myExam){
      res.status(404).send({
        message: `Exam Not Found`
      });
      return;

    }
    let studentAnswers=[];
    let studentGrade=myExam.totalGrade;
    let reqStudentAnswers=req.body.studentAnswers;
    for(let i=0;i<myExam.exercises.length;i++){
      let correctSolution=myExam.exercises[i].solution;
      let questionNum=i+1;
      let studentAnswer="";
      for(let j=0;j<reqStudentAnswers.length;j++){
        if(questionNum==reqStudentAnswers[j].questionNumber){
          studentAnswer=studentAnswer+reqStudentAnswers[j].choice.choiceId;
          reqStudentAnswers.splice(j,1);

        }
      }
      if(studentAnswer!=correctSolution){
        studentGrade--;
      }
      studentAnswers.push(studentAnswer);
    }
    myUser.courseDetails[courseIndex].exams.push({examId:req.body.examid,score:studentGrade,answers:studentAnswers});
    myUser.courseDetails[courseIndex].percentageCompleted=myUser.courseDetails[courseIndex].percentageCompleted+1;;
//     if(myUser.courseDetails[courseIndex].percentageCompleted===  myUser.courseDetails[courseIndex].totalSources){
//       let userName=myUser.firstName+" "+myUser.lastName;
//       const mailOptions = {
//         email: myUser.email,
//         subject: 'Certificate',
//         html:`<div> Kindly Find Your Certificate Attached Below</div>` ,
// };

// mailer.sendEmail(mailOptions);
//     };

    await myUser.save();
    res.status(200).json({answers:studentAnswers,score:studentGrade});




  }

catch (err) {
  res.status(500).send({
    message: "Error in Solving Exam"
  });
};
};

exports.registerToCourse=async (req, res) => {
  const invoiceId = req.body.invoiceId;
  const foundInvoice=await invoice.findOne({_id:invoiceId}).catch((err) => {
   return res.status(500).send({
      message: "Error in getting invoice",
      });
  });
  if(!foundInvoice){
    return res.status(404).send({
      message: "Invoice not found",
    });
  }
  const courseId =foundInvoice.course;
  const userId= foundInvoice.user;
  const courseData = await course.findById(courseId);
  
  const userData = await user.findById(userId);
  let sourceNumber = 0;
  for (let i = 0; i < courseData.subtitles.length; i++) {
    sourceNumber += courseData.subtitles[i].sources.length;
  }

  userData.courseDetails.push({
    course: courseData._id,
    totalSources: sourceNumber,
    percentageCompleted: 0,
  });
  await userData.save();
  await course.findByIdAndUpdate(courseId, { $inc: { views: 1 } });
  res.status(200).send({
    message: "User registered successfully",
  });
};

exports.setDiscount= async (req, res) => {
  let courses=req.body.courses;
  let allCourses=req.body.allCourses;
  let count=0;
  if(!allCourses){
    count=await course.find( {$and: [{ _id: { $in:courses } },{discount:{$ne:0}}]}).count();
    courses=await course.find({ _id: { $in:courses }});
  }
  else{
    count=await course.find({discount:{$ne:0}}).count();
    courses=await course.find();
  }
  if(count!=0){
    res.status(400).json({message:"cannot set more than discount for same course"});
    return;
  }
  let updatedCourses=[];
  for(let i=0;i<courses.length;i++){
    let currentCourse=courses[i];
   currentCourse.discount=req.body.discount;
   currentCourse.discountStartDate=req.body.discountStartDate;
   currentCourse.discountEndDate=req.body.discountEndDate;
   await currentCourse.save();
   updatedCourses.push(currentCourse._id);
  }
  res.status(200).json({message:"All Discounts Set Successfully"
,Ids:updatedCourses,
discount:req.body.discount,
endDate:req.body.discountEndDate
});
  };

  exports.getWallet=async (req, res) => {
    const userId = req.user.id;
    const countryCode = req.query.CC || "US";
    const countryDetails = await currencyConverter.convertCurrency("US", countryCode);
    let exchangeRate = countryDetails.rate;
    let symbol = countryDetails.symbol;
  
    const userData = await
    user.findById
    (userId);
    if (!userData) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }
    let amount = userData.wallet * exchangeRate;
    amount = amount.toFixed(2);
    res.status(200).json({ wallet: amount,
    symbol:symbol });
  };

  
  exports.sendCertificate=async (req, res) => {
    const userId = req.user.id;
    const url=req.body.url;
    const courseId=req.body.courseId;
    const userData = await
    user.findById
    (userId);

  
  const doc = new jsPDF();
  doc.addImage(url, 'JPEG', 15, 15, 170, 0);
  doc.save('Certificate.pdf');
  const mailOptions = {
            email: userData.email,
            subject: 'Certificate',
            html:`<div> Kindly Find Your Certificate Attached Below</div>` ,
            attachments:[
              {
                  filename: 'Certificate.pdf',
                  path: './Certificate.pdf',
                  contentType: 'application/pdf'
              }]
    };

mailer.sendEmail(mailOptions);
for(let i=0;i<userData.courseDetails.length;i++){
  if(userData.courseDetails[i].course==courseId){
    userData.courseDetails[i].certificate=true;
    break;
  }
}
await userData.save();
res.status(200).json({message:"Email Sent"});
  };
  

exports.getUserProfile = async (req, res) => {
  const { _id } = req.user.id;
  const foundUser=await user.findById(_id);
  res.status(200).json(foundUser);
};