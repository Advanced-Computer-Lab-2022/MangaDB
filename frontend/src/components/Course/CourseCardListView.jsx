import React from "react";
import reactImg from "../../Assets/Images/react.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Stars from "../UI/Stars";
import SecondaryButton from "../SecondaryButton";

const size = {
  starSize: 5,
};

const CourseCardListView = (props) => {
  return (
    <div class="relative w-4/5 flex items-center bg-white border border-gray-200 shadow-md rounded-md">
      <img class="max-w-xs h-full" src={reactImg} alt=""></img>

      <div className="px-5 py-3 space-y-2">
        <h5 className="flex text-lg items-center font-bold tracking-tight text-gray-900">
          <p className="pr-3">{props.title} </p>
          {props.level === "Beginner" && (
            <div className="inline-flex items-center  px-2 text-xs font-medium text-center border-2 border-green-400 text-green-500 bg-green-100 rounded-full">
              {props.level}
            </div>
          )}
          {props.level === "Intermediate" && (
            <div className="inline-flex items-center px-2 text-xs font-medium text-center border-2 border-yellow-400 text-yellow-500 bg-yellow-100 rounded-full">
              {props.level}
            </div>
          )}
          {props.level === "Advanced" && (
            <div className="inline-flex items-center max-h-[20px] px-2 text-xs font-medium text-center border-2 border-red-400 text-red-500 bg-red-100 rounded-full">
              {props.level}
            </div>
          )}
        </h5>
        <p className=" text-xs font-normal text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        <div class="text-lightBlue flex justify-items-center text-[9px]">
          <Stars {...size}/>
          <div className="bg-veryLightBlue text-gray-900 ml-2 text-sm py-[2px] px-2 rounded-lg">
            4.5
          </div>
        </div>
        <p className=" text-xs font-medium text-gray-500">
          {props.instructorName} . {props.subject}
        </p>
        <div className="bg-white  py-1 text-sm font-semibold rounded-full">
          <AccessTimeIcon className="-mt-[3px]" fontSize="inherit" />{" "}
          {props.duration} {"hrs"}
          <div className="flex justify-end items-center">
            <h5 class="absolute bottom-3 right-32 text-3xl font-bold tracking-tight text-gray-900">
              {props.price} $
            </h5>
            <SecondaryButton text="View" className="absolute right-7 bottom-2 text-lg font-bold" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseCardListView;
