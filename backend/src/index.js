const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors = require('cors');
var cookieParser = require('cookie-parser')
const schedule = require('node-schedule');
const courseController = require("./controllers/course");




app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(express.json());

app.use('/instructor', require('./routes/instructor'));
app.use('/course', require('./routes/course'));
app.use('/admin', require('./routes/admin'));
app.use('/user', require('./routes/user'));
app.use('/request', require('./routes/request'));
const rule = new schedule.RecurrenceRule();
rule.second = 0;
const job = schedule.scheduleJob(rule, courseController.updateDiscountedPrice);
app.listen(3000, () => {
    console.log('Server started on port 3000');
});