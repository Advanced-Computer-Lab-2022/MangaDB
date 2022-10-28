import * as React from "react";
import According from "./According";
import { TextField } from "@mui/material";
import OnlineLearning from "../Assets/Images/Online-learning.svg";
import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import SecondaryButton from "./SecondaryButton";
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
      <div className="flex flex-col space-y-4 items-center   w-[50%]  p-5 rounded-lg mt-[8%]">
        <According title={"Course Title"} summary={""}>
          <TextField id="outlined-basic" label="Course Title" className="" />
        </According>
        <According title={"Course Description"} summary={""}>
          <TextField
            id="outlined-multiline-flexible"
            label="Course Description"
            multiline
            maxRows={4}
            className="w-[100%]"
          />
        </According>
        <According title={"Course Image"} summary={""}>
          <input
            type="file"
            className=" file:text-white file:bg-primaryBlue file:rounded-lg file:border-transparent file:cursor-pointer file:text-md file:py-2 file:pr-4 file:pl-3 file:hover:bg-darkBlue file:hover:ease-in-out file:duration-300 "
          ></input>
        </According>
        <According title={"Course Price"} summary={""}>
          <div className="flex items-center">
            <TextField id="outlined-basic" label="Course Price" className="" />
            <span className="opacity-70 ml-3 text-lg">$</span>
          </div>
        </According>
        <According title={"Course Subject"} summary={""}></According>
        <According title={"Course Requirements"} summary={""}>
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
        </According>
        <According title={"Course Summary"} summary={""}></According>
        <According title={"Course Sections"} summary={""}></According>
      </div>
      <img
        src={OnlineLearning}
        alt="Add User"
        className="w-[40%] h-[40%] sticky top-16"
      />
    </div>
  );
}
