const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    examResults: req.body.examResults,
    wallet: req.body.wallet,
    biography: req.body.biography
  });

  const salt = await bcrypt.genSalt(10);
  newUser.password =  bcrypt.hash(newUser.password, salt);
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


exports.getAllUsers= async (req, res) => {
    try {
        await user.find().then((data) => {
        res.send(data);
        });
    } catch (err) {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving users.",
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
  
    }

exports.updateUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
        message: "Data to update can not be empty!",
        });
    }
    const id = req.params.id;
    try {
        await user.findByIdAndUpdate(id, req.body, { useFindAndModify: false ,new: true})
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
  
    }

exports.login = async (req, res) => {
  //use passport to authenticate
    const { userName, password } = req.body;
    try {
        await user.findOne({ userName }).then(async (data) => {
        if (!data) {
            res.status(404).send({ message: "Not found user with userName " + userName });
        } else {
            const validPassword = await bcrypt.compare(password, data.password);
            if (!validPassword) {
            res.status(401).send({ message: "Invalid Password!" });
            } else {
            //create jwt token
            const token = jwt.sign(
                { _id: data._id, userName: data.userName, role: data.role },
                process.env.TOKEN_SECRET
            );
            res.send(token);

          }
        }
        });
    } catch (err) {
        res.status(500).send({ message: "Error retrieving user with userName=" + userName });
    }
  
    }

exports.getUserByRole = async (req, res) => {
    const role = req.params.role;
    try {
        await user.find({ role }).then((data) => {
        if (!data)
            res.status(404).send({ message: "Not found user with role " + role });
        else res.send(data);
        });
    } catch (err) {
        res.status(500).send({ message: "Error retrieving user with role=" + role });
    }
  
    }

