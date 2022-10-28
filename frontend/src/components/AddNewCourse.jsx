import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import CourseCard from "./Course/CourseCard";
import According from "./According";
import AddUserToggle from "./AddUserToggle";
import Card from "./UI/Card";
import { TextField } from "@mui/material";
import SecondaryButton from "./SecondaryButton";
import OnlineLearning from "../Assets/Images/Online-learning.svg";
export default function AddNewCourse() {
  const test = {
    image: `https://i0.wp.com/blog.frontiersin.org/wp-content/uploads/2018/06/frontiers-in-ecology-evolution-ape-human-bonobo-muscles.jpg?resize=940%2C529&ssl=1`,
    title: "React Full stack Course (MERN)",
    level: "Advanced",
    //duration: "44 hrs",
    reviews: "5.0",
    subject: "Web Development",
    instructorName: "Omar Moataz",
    price: "599$",
    //text: "Home",
  };

  return (
    // <CourseCard {...test}>

    // </CourseCard>
    <div className="flex justify-center space-x-10">
      <div className="flex flex-col space-y-4 items-center   w-[50%]  p-5 rounded-lg mt-[8%]">
        <According title={"Course Title"} summary={""}>
          <TextField
            id="outlined-basic"
            label="Course Title"
            className=""
          />
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
        <TextField
            id="outlined-basic"
            label="Course Price"
            className=""
          />
          <span className="opacity-70 ml-3 text-lg">$</span>
          </div>
        </According>
        <According title={"Course Subject"} summary={""}>
          
        </According>
        <According title={"Course Requirements"} summary={""}>
          
        </According>
        <According title={"Course Summary"} summary={""}>
          
        </According>
      </div>
      <img
        src={OnlineLearning}
        alt="Add User"
        className="w-[40%] h-[40%] sticky top-16"
      />
    </div>
  );
}
