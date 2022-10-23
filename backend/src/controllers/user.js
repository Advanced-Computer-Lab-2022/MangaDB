const user=require('../models/user');
const bcrypt=require('bcrypt');
const instructor = require('../models/instructor');
const corporate = require('../models/corporate');
const admin = require('../models/admin');
const trainee=require('../models/trainee');

exports.createUser = async (req, res) => {
    if(!req.body.userName || !req.body.password || !req.body.role){
        return res.status(400).send({
            message: "content can not be empty"
        });
    }
    //validate request
    
    const newUser=new user({
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,

        role: req.body.role
    });
    
    const salt=await bcrypt.genSalt(10);
    newUser.password=await bcrypt.hash(newUser.password, salt);
    try
    {await newUser.save();
        res.send(newUser);
    }
    catch(err){
        return res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    }


    if (req.body.role==='INSTRUCTOR') {
        const newInstructor=new instructor({
            user: newUser._id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
        });
        await newInstructor.save()
        .catch(err => {res.status(500).send({ message: err.message || "Some error occurred while creating the instructor." });});

    } else if (req.body.role==='CORPORATE') {
        const newCorporate=new corporate({
            user: newUser._id,      
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
        });
        await newCorporate.save()
        .catch(err => {res.status(500).send({ message: err.message || "Some error occurred while creating the corporate trainee." });});
    } else if (req.body.role==='ADMIN') {
        const newAdmin=new admin({
            user: newUser._id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
        });
        await newAdmin.save()
        .catch(err => {res.status(500).send({ message: err.message || "Some error occurred while creating the admin." });});;
    }else if (req.body.role==='TRAINEE') {
        const newTrainee=new trainee({
            user: newUser._id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
        });
        await newTrainee.save()
        .catch(err => {res.status(500).send({ message: err.message || "Some error occurred while creating the trainee." });});;
    }
    
    }