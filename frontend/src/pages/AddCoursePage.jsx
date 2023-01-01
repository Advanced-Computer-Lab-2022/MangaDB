import { Fragment, useState } from "react";
import axios from "axios";
import NavBarSearch from "../components/UI/NavBar/NavBarSearch";
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
    axios
      .post("http://localhost:3000/instructor/addCourse", secondData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <Fragment>
      <NavBarSearch currentTab="Add Course"></NavBarSearch>
      <div className=" mt-[4.5rem]">
        <StepsBar steps={steps}></StepsBar>
      </div>
      {steps[0].status === "current" && (
        <CreateCourseForm onSave={onSaveHandler}></CreateCourseForm>
      )}
      {steps[1].status === "current" && (
        <AddSubtitles onConfirm={secondDataHandler}></AddSubtitles>
      )}
    </Fragment>
  );
};
export default AddCoursePage;
