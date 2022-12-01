import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import CreateCourseForm from "../components/CreateCourse/CreateCourseForm";
import StepsBar from "../components/CreateCourse/StepsBar";
import AddSubtitles from "../components/AddSubtitles/AddSubtitles";
import CreateExam from "../components/Exam/CreateExam/CreateExam";
const AddCoursePage = (props) => {
  const [steps, setSteps] = useState([
    {
      name: "Course Details",
      id: 1,
      status: "current",
      description: "fill the course info",
    },
    {
      name: "Course Content",
      id: 2,
      status: "",
      description: "fill the course content",
    },
    {
      name: "Course Exam",
      id: 3,
      status: "",
      description: "Create a Final Exam",
    },
  ]);
  const [data, setData] = useState({});
  const onSaveHandler = (data) => {
    setData({ ...data }); //remove the totalHours and the price
    var newSteps = [];
    var flag = false;
    for (var i = 0; i < steps.length; i++) {
      if ((steps[i].status === "") & !flag) {
        newSteps.push(steps[i]);
      } else if (steps[i].status === "current") {
        newSteps.push({ ...steps[i], status: "complete" });
        flag = true;
      } else if (flag) {
        newSteps.push({ ...steps[i], status: "current" });
        flag = false;
      }
    }
    setSteps(newSteps);
  };
  const secondDataHandler = (secondStepData) => {
    var secondData = { ...data, subtitles: secondStepData };
    setData(secondData);
    var newSteps = [];
    var flag = false;
    for (var i = 0; i < steps.length; i++) {
      if ((steps[i].status === "") & !flag) {
        newSteps.push(steps[i]);
      } else if (steps[i].status === "current") {
        newSteps.push({ ...steps[i], status: "complete" });
        flag = true;
      } else if (flag) {
        newSteps.push({ ...steps[i], status: "current" });
        flag = false;
      } else if (steps[i].status === "complete") {
        newSteps.push({ ...steps[i] });
      }
    }
    setSteps(newSteps);
  };

  const submiHandler = (thirdData) => {
    var submitData = { ...data, courseFinalExam: thirdData };
    console.log(submitData);
    axios
      .post(
        "http://localhost:3000/instructor/addcourse/6386427487d3f94e4cb7a28d",
        submitData
      )
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <Fragment>
      <NavBar></NavBar>
      <StepsBar steps={steps}></StepsBar>
      {steps[0].status === "current" && (
        <CreateCourseForm onSave={onSaveHandler}></CreateCourseForm>
      )}
      {steps[1].status === "current" && (
        <AddSubtitles onConfirm={secondDataHandler}></AddSubtitles>
      )}
      {steps[2].status === "current" && (
        <CreateExam onSubmit={submiHandler}></CreateExam>
      )}
    </Fragment>
  );
};
export default AddCoursePage;
