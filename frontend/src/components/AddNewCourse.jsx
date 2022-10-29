import * as React from "react";
import Accordion from "./AddSubtitles/Accordion";
import { TextField } from "@mui/material";
import OnlineLearning from "../Assets/Images/Online-learning.svg";
import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
export default function AddNewCourse() {
  const [requirements, setRequirements] = useState([]);

  const setRequirementsHandler = () => {
    setRequirements([
      ...requirements,
      "requirement ".concat(requirements.length),
    ]);
  };

  return (
    // <CourseCard {...test}>

    // </CourseCard>
    <div className="flex justify-center space-x-10">
      <div className="flex flex-col space-y-4 items-center w-[50%] p-5 rounded-lg mt-[8%]">
        <Accordion title={"Course Title"} summary={""}>
          <TextField id="outlined-basic" label="Course Title" className="" />
        </Accordion>
        <Accordion title={"Course Description"} summary={""}>
          <TextField
            id="outlined-multiline-flexible"
            label="Course Description"
            multiline
            maxRows={4}
            className="w-[100%]"
          />
        </Accordion>
        <Accordion title={"Course Image"} summary={""}>
          <input
            type="file"
            className=" file:text-white file:bg-primaryBlue file:rounded-lg file:border-transparent file:cursor-pointer file:text-md file:py-2 file:pr-4 file:pl-3 file:hover:bg-darkBlue file:hover:ease-in-out file:duration-300 "
          ></input>
        </Accordion>
        <Accordion title={"Course Price"} summary={""}>
          <div className="flex items-center">
            <TextField id="outlined-basic" label="Course Price" className="" />
            <span className="opacity-70 ml-3 text-lg">$</span>
          </div>
        </Accordion>
        <Accordion title={"Course Subject"} summary={""}></Accordion>
        <Accordion title={"Course Requirements"} summary={""}>
          <div className="flex flex-col space-y-3">
            {requirements.map((req) => (
              <TextField name={req} id="outlined-basic" label={req} />
            ))}
          </div>
          <div className="flex justify-end">
            <button
              className="rounded-full h-12 fle"
              onClick={setRequirementsHandler}
            >
              <AddIcon />
            </button>
          </div>
        </Accordion>
        <Accordion title={"Course Summary"} summary={""}></Accordion>
        <Accordion title={"Course Sections"} summary={""}></Accordion>
      </div>
      <img
        src={OnlineLearning}
        alt="Add User"
        className="w-[40%] h-[40%] sticky top-16"
      />
    </div>
  );
}
