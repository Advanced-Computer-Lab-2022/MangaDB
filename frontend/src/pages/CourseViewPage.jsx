import { useState, useEffect, Fragment } from "react";
import Video from "../components/Video/Video";
import CourseContent from "../components/CourseDetailsComp/CourseContent";
import NavBar from "../components/UI/NavBar/NavBar";
import ExamManager from "../components/Exam/ExamManager";
import axios from "axios";
import { useLocation } from "react-router-dom";

//stub for the studentAnswers
const studentAnswers = ["4", "3", "2", "1"];

//stub for the Exam/Quiz
const exam = [
  {
    question: "How do you write react components",
    solution: "1",
    choices: [
      {
        choiceId: "1",
        description: "This is the First choice for this question",
      },
      {
        choiceId: "2",
        description: "This is the Second choice for this question",
      },
      {
        choiceId: "3",
        description: "This is the Third choice for this question",
      },
      {
        choiceId: "4",
        description: "This is the Fourth choice for this question",
      },
    ],
  },
  {
    question: "this is the second question ",
    solution: "2",
    choices: [
      {
        choiceId: "1",
        description: "This is the First choice for this question",
      },
      {
        choiceId: "2",
        description: "This is the Second choice for this question",
      },
      {
        choiceId: "3",
        description: "This is the Third choice for this question",
      },
      {
        choiceId: "4",
        description: "This is the Fourth choice for this question",
      },
    ],
  },
  {
    question: "How do you write react components 2",
    solution: "3",
    choices: [
      {
        choiceId: "1",
        description: "This is the First choice for this question",
      },
      {
        choiceId: "2",
        description: "This is the Second choice for this question",
      },
      {
        choiceId: "3",
        description: "This is the Third choice for this question",
      },
      {
        choiceId: "4",
        description: "This is the Fourth choice for this question",
      },
    ],
  },
  {
    question: "this is the second question 3 ",
    solution: "4",
    choices: [
      {
        choiceId: "1",
        description: "This is the First choice for this question",
      },
      {
        choiceId: "2",
        description: "This is the Second choice for this question",
      },
      {
        choiceId: "3",
        description: "This is the Third choice for this question",
      },
      {
        choiceId: "4",
        description: "This is the Fourth choice for this question",
      },
    ],
  },
];

const CourseViewPage = () => {
  //will give the backend the id of the clicked course , then will fetch all the details about that course
  //to fill the subtitle accordion and create an onClick function to change the link of the video playing.
  //at the buttom of the video frame will have a notes trigger which will create a text box at the buttom
  //at the top below the navbar will have a div with the progress and view notes  and some extra controls..

  //this page will handle the viewed sources and solving exams and notes areas..
  const location = useLocation();
  const [receivedData, setReceivedData] = useState({});
  const [currentSource, setCurrentSource] = useState('');
  const [receivedExam, setReceivedExam] = useState(exam);
  const [receivedStudentSolution, setReceivedStudentSolution] = useState([]);
  const [receivedGrade, setReceivedGrade] = useState(7);

  //useEffect at the start to receive the data
  useEffect(() => {
    const courseId = location.state;
    //shouldnt we send the userId ??
    axios.get(`http://localhost:3000/course/${courseId}`).then((res) => {
      setReceivedData(res.data.course);
      setCurrentSource(res.data.course.subtitles[0].sources[0])

    });
  }, [location.state]);


  const onSourceChangeHandler = (source) => {
    setCurrentSource(source);
  };

  console.log(receivedData)
  const onSolveExamHandler = (receivedSolution) => {
    //should mark this as visited in the back and store the data
    //send the sourceId , examId ,userid and courseId
    var endPoint = "asdasdasdsadasdsadasdasdasd";
    console.log(receivedSolution);
    axios
      .post(endPoint, receivedSolution, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {});
  };

  const onWatchHandler = () => {
    //will need the userID , sourceId, courseId
    //the userID and courseid are given from the navigation
    var endPoint = "asdasdasdsadasdsadasdasdasd";
    const submittedData = {
      userId: 1,
      courseId: 1,
      sourceId: currentSource._id,
    };
    axios
      .post(endPoint, submittedData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {});
  };

  //useEffect to handle the quiz trigger
  useEffect(() => {
    //give the exam id using source.quiz , courseId,userId
    var endPoint = "asdasdasdsadasdsadasdasdasd";
    if (currentSource.sourceType === "Quiz") {
      axios.get(endPoint).then((res) => {
        setReceivedExam(res.data.exam);
        setReceivedStudentSolution(res.data.studentSolution);
        setReceivedGrade(res.data.grade);
      });
    }
  }, [currentSource]);

  //we will have an array of viewed sources
  var displayedSource;
  if (currentSource.sourceType === "Video") {
    displayedSource = (
      <Video
        isVisible={true}
        link={currentSource.link}
        onWatch={onWatchHandler}
      ></Video>
    );
  } else {
    displayedSource = (
      <ExamManager
        exam={receivedExam}
        studentAnswers={receivedStudentSolution}
        grade={receivedGrade}
        onSolveExamHandler={onSolveExamHandler}
      ></ExamManager>
    );
  }

  return (
    <Fragment>
      <NavBar></NavBar>
      <div className="md:flex">
        <div className="video/exam md:w-7/12 w-full mb-4 md:mb-0">
          {displayedSource}
        </div>
        <CourseContent
          courseDuration="35"
          content={receivedData.subtitles}
          onClick={onSourceChangeHandler}
        />
      </div>
    </Fragment>
  );
};
export default CourseViewPage;
