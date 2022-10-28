const express=require('express');
const app=express();
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({ extended : true}));
app.use(express.json());

app.use('/instructor', require('./routes/instructor'));
app.use('/course', require('./routes/course'));
app.use('/admin', require('./routes/admin'));
app.use('/user', require('./routes/user'));

app.listen(5000, () => {
    console.log('Server started on port 5000');
});