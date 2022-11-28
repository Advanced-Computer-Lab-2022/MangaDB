const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors = require('cors');
var cookieParser = require('cookie-parser')


app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(express.json());

app.use('/instructor', require('./routes/instructor'));
app.use('/course', require('./routes/course'));
app.use('/admin', require('./routes/admin'));
app.use('/user', require('./routes/user'));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});