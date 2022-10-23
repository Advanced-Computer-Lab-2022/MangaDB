const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const course=require('./models/course');

app.use(bodyParser.urlencoded({ extended : true}));
app.use(express.json());

// const course1= new course({
//     courseTitle: "Node.js",
//     courseDescription: "Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.",
//     totalHours: 10,
//     coursePrice: 10,
    
//     rating: [4,5,3,4,5],
//     instructor: "6355a1a72f787fd37ec19335",
//     subject: "Programming",
//     reviews: ["Good course","Very good course"],
//     requirements: ["Basic knowledge of JavaScript","Basic knowledge of HTML and CSS"],
//     views: 0,
//     certificate: "Certificate of completion",
//     summary: "Learn Node.js from scratch and become a Node.js developer",
//     subtitles: [
//         {
//             subtitle: "Introduction to Node.js",
//             introductionVideo: "https://www.youtube.com/watch?v=U8XF6AFGqlc",
//             description : "In this video we will learn about Node.js and its features",
//             sources: [
//                 {
//                     sourceType: "Video",
//                     link: "https://www.youtube.com/watch?v=U8XF6AFGqlc",
//                     description: "Introduction to Node.js",
//                 },
//             ]},
//         {
//             subtitle: "What is Node.js",
//             introductionVideo: "https://www.youtube.com/watch?v=U8XF6AFGqlc",
//             description: "Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.",
//             sources: [
//                 {
//                     subtitle: "What is Node.js",
//                     introductionVideo: "https://www.youtube.com/watch?v=U8XF6AFGqlc",
//                     description: "Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.",
//                     source:[
//                         {
//                             sourceType: "Video",
//                             link: "https://www.youtube.com/watch?v=U8XF6AFGqlc",
//                             description: "Introduction to Node.js",},
//                     ]}]}]});
// course1.save();

app.use('/course', require('./routes/course'));
app.use('/admin', require('./routes/admin'));
app.use('/user', require('./routes/user'));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});