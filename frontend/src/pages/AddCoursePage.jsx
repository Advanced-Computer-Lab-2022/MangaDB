import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import CreateCourseForm from "../components/CreateCourse/CreateCourseForm";
import StepsBar from "../components/CreateCourse/StepsBar";
import AddSubtitles from "../components/AddSubtitles/AddSubtitles";

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
      id:3,
      status: "",
      description : "Create a course Exam"
    }
  ]);
  const [data, setData] = useState({});
  const onSaveHandler = (data) => {
    setData({...data,totalHours:10,coursePrice:10});
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
      }
    }
    setSteps(newSteps);
  };
  const onSubmitHandler = (secondStepData) => {
    var sentData = { ...data, subtitles: secondStepData };
    console.log(sentData);
    axios
      .post(
        "http://localhost:3000/instructor/addcourse/635bf48c56673b3f80ac2dff",
        sentData,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {});
  };
  return (
    <Fragment>
      <NavBar></NavBar>
      <StepsBar steps={steps}></StepsBar>
      {steps[0].status === "current" && (
        <CreateCourseForm onSave={onSaveHandler}></CreateCourseForm>
      )}
      {steps[1].status === "current" && (
        <AddSubtitles onConfirm={onSubmitHandler}></AddSubtitles>
      )}
    </Fragment>
  );
};
export default AddCoursePage;
