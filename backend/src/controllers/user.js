const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer=require('../helper/mailer');
const course=require('../models/course');
const currencyConverter = require("../helper/currencyconverter"); 
const payment=require('../helper/payment');


exports.createUser = async (req, res) => {
  if (!req.body.userName || !req.body.password || !req.body.role) {
    return res.status(400).send({
      message: "content can not be empty",
    });
  }
  //validate request
  const foundUser=await user.findOne({ userName: req.body.userName });

  if(foundUser){  
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

exports.updateUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  try {
    await user
      .findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
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
          res.cookie("token", token, {
            httpOnly: true,
          });
          res.send(token);
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
  const role = req.params.role;
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
  const id = req.params.id;
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
        const { userName, email } = req.body;
        try {
            await user.findOne({
                userName,
                email
            }).then(async (data) => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot find user with userName=${userName} and email=${email}. Maybe user was not found!`,
                    });
                } else {
                  const token = jwt.sign(
                    { id: data._id, userName: data.userName, role: data.role },
                    process.env.TOKEN_SECRET
                  );
                  res.cookie("token", token, {
                    httpOnly: true,
                  });
                    const mailOptions = {
                        email: email,
                        subject: 'Reset Password',
                        html: `<h1>Reset Password</h1>
                        <p>Click on the link to reset your password</p>
                        <a href="http://localhost:3000/user/resetpassword/${data._id}">Reset Password</a>`
                    };
                    mailer.sendEmail(mailOptions);  
                    res.send({ message: "email has been sent" });
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
        res.clearCookie("token");
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
                    } else
                        res.send({ message: "user was updated successfully.", data });
                });
        } catch (err) {
            res.status(500).send({
                message: "Error updating user with id=" + id,
            });
        }
    };        



    exports.logout = async (req, res) => {
      try { 
        res.clearCookie("token");
        res.send({message: "logout successfully"});
      } catch (err) {
        res.status(500).send({
          message: "Error logout",
        });
      }
    };

    //payment gateway

    exports.registerCourse = async (req, res) => {
      const id = req.params.id;
      const { courseId } = req.body;
      const countryCode = req.query.CC || "US";
      let countryDetails = await currencyConverter.convertCurrency(
        "US",
        countryCode
      );
      let exchangeRate = countryDetails.rate;
      let currency = countryDetails.toCountryCurrency;
      try {
        const userData = await user.findById(id);
        if (!userData) {
          res.status(404).send({
            message: `Cannot update user with id=${id}. Maybe user was not found!`,
          });
        } else {
          const courseData = await course.findById(courseId);
          if (!courseData) {
            res.status(404).send({
              message: `Course was not found!`,
            });
          }
          else {
            for(var i=0;i<userData.courseDetails.length;i++){
              if(userData.courseDetails[i].course==courseId){
                res.status(400).send({
                  message: `You have already registered for this course!`,
                });
                return;
              }
            }
            let sourceNumber=0;
            for(let i=0;i<courseData.subtitles.length;i++){
              sourceNumber+=courseData.subtitles[i].sources.length;
            }
            userData.courseDetails.push({course:courseData._id,totalSources:sourceNumber,percentageCompleted:0,amountPaid:(courseData.discountedPrice * exchangeRate)});
            await userData.save();
            await course.findByIdAndUpdate(courseId,{$inc:{views:1}});

            const info={
              currency:currency,
              name:courseData.courseTitle ,
              price:courseData.discountedPrice * exchangeRate,
            }
            await payment.createPaymentIntent(info).then((data)=>{
              if(!data){
                res.status(500).send({
                  message: "Error in payment",
                });
                return;
              }
       
              res.send({message: "user registered for course successfully.",data});
            })

          }
        }
      } catch (err) {
        res.status(500).send({
          message: "Error in registering course",
        });
      }
    };

    //get courses this user is registered in
    exports.getRegisteredCourses = async (req, res) => {
      const id = req.params.id;
      try {
        const userData = await user.findById(id).populate('courseDetails.course');
        if (!userData) {
          res.status(404).send({
            message: `Cannot update user with id=${id}. Maybe user was not found!`,
          });
        } else {
          res.send(userData);
        }
      } catch (err) {
        res.status(500).send({
          message: "Error in getting registered courses",
        });
      }
    };

    exports.openSource = async (req, res) => {
      const courseId = req.params.id;
      const { userId, sourceId } = req.body;
      try {
        const userData =await user.findById(userId);
        if (!userData) {
          res.status(404).send({
            message: `User was not found!`,
          });
        }
        else {
          let courseIndex=-1;
          let courseFound=false;
          for(let i=0;i<userData.courseDetails.length;i++){
            if(userData.courseDetails[i].course==courseId){
              courseIndex=i;
              courseFound=true;
              break;
            }
          }

          if(!courseFound){
            res.status(400).send({
              message: `User not registered in course`,
            });
          }
          else{
            for(let j=0;j<userData.courseDetails[courseIndex].viewedSources.length;j++){
              if(userData.courseDetails[courseIndex].viewedSources[j].sourceId==sourceId){
                res.status(200).send({
                  message: `Source already opened`,
                });
                return;
              }
            }
            userData.courseDetails[courseIndex].viewedSources.push({sourceId:sourceId});
            let percentage=(userData.courseDetails[courseIndex].viewedSources.length/userData.courseDetails[courseIndex].totalSources)
            percentage=percentage.toFixed(2);
            userData.courseDetails[courseIndex].percentageCompleted= percentage;
            await userData.save();
            res.status(200)
            .send({message:"source opened successfully"});
            console.log(`source ${sourceId} opened successfully`)
            }
        }
      
    } catch (err) {
      res.status(500).send({
        message: "Error in opening source",
      });
    }
  };

    exports.getProgress = async (req, res) => {
      const id = req.params.id;
      const { courseId } = req.body;
      try {
        const userData =await user.findById(id);
        if (!userData) {
          res.status(404).send({
            message: `User was not found!`,
          });
        }
        else {
          let courseIndex=-1;
          let courseFound=false;
          for(let i=0;i<userData.courseDetails.length;i++){
            if(userData.courseDetails[i].course==courseId){
              courseIndex=i;
              courseFound=true;
              break;
            }
          }

          if(!courseFound){
            res.status(400).send({
              message: `User not registered in course`,
            });
          }
          else{
            res.status(200)
            .send({percentage:userData.courseDetails[courseIndex].percentageCompleted});
            }
        }
      
    } catch (err) {
      res.status(500).send({
        message: "Error in getting progress",
      });
    }
  };

  exports.addNotes = async (req, res) => {
    const id = req.params.id;
    const { courseId, sourceId, notes } = req.body;
    try {
      const userData =await user.findById(id);
      if (!userData) {
        res.status(404).send({
          message: `User was not found!`,
        });
      }
      else {
        let courseIndex=-1;
        let courseFound=false;
        for(let i=0;i<userData.courseDetails.length;i++){
          if(userData.courseDetails[i].course==courseId){
            courseIndex=i;
            courseFound=true;
            break;
          }
        }

        if(!courseFound){
          res.status(400).send({
            message: `User not registered in course`,
          });
        }
        else{
          let sourceIndex=-1;
          let sourceFound=false;
          for(let j=0;j<userData.courseDetails[courseIndex].viewedSources.length;j++){
            if(userData.courseDetails[courseIndex].viewedSources[j].sourceId==sourceId){
              sourceIndex=j;
              sourceFound=true;
              break;
            }
          }
          if(!sourceFound){
            res.status(400).send({
              message: `User not opened source`,
            });
          }
          else{
            userData.courseDetails[courseIndex].viewedSources[sourceIndex].notes=notes;
            await userData.save();
            res.status(200)
            .send({message:"notes added successfully"});
            }
        }

      }
    } catch (err) {
      res.status(500).send({
        message: "Error in adding notes",
      });
    }
  };


