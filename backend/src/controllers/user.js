const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer=require('../helper/mailer');
const course=require('../models/course');
const blackList=require('../models/token');

exports.createUser = async (req, res) => {
  if (!req.body.userName || !req.body.password || !req.body.role) {
    return res.status(400).send({
      message: "content can not be empty",
    });
  }
  //validate request

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
    return res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
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
            { _id: data._id, userName: data.userName, role: data.role },
            process.env.TOKEN_SECRET
          );
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
        const id = req.params.id;
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
      const authHeader = req.header('Authorization');
      const token = authHeader && authHeader.split(" ")[1];
      try { 
        const invalidToken=new blackList({token});
        await invalidToken.save();
        res.send({message: "logout successfully"});
      } catch (err) {
        res.status(500).send({
          message: "Error logout",
        });
      }
    };
