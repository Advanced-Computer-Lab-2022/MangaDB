import React from "react";
import reactImg from "../../Assets/Images/react.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Stars from "../UI/Stars";

const size = 5;

const CourseCard = (props) => {
  return (
    <button className="hover:scale-105 transition flex content-start relative">
      <div class=" relative max-w-xs bg-white border border-gray-200 shadow-md">
        <img class="" src={reactImg} alt=""></img>
        <div className="bg-white px-2 py-1 text-xs font-semibold rounded-full absolute top-3 left-3">
          <AccessTimeIcon className="-mt-[3px]" fontSize="inherit" />{" "}
          {props.duration} {"hrs"}
        </div>

        <div class="p-5 flex flex-col items-start">
          <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900">
            {props.title}
          </h5>

          <p class=" text-xs font-medium text-gray-500">
            {props.instructorName} . {props.subject}
          </p>
          <div class="text-lightBlue text-sm mt-2 flex">
            <Stars size={size} rating={props.rating} />
            <div className="bg-veryLightBlue text-gray-900 ml-2 text-sm py-[2px] px-2 rounded-lg">
              {props.rating}
            </div>
          </div>
          <div className="flex justify-between py-3 items-center">
            {props.level === "Beginner" && (
              <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-green-400 text-green-500 bg-green-100 rounded-full">
                {props.level}
              </div>
            )}
            {props.level === "Intermediate" && (
              <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-yellow-400 text-yellow-500 bg-yellow-100 rounded-full">
                {props.level}
              </div>
            )}
            {props.level === "Advanced" && (
              <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-red-400 text-red-500 bg-red-100 rounded-full">
                {props.level}
              </div>
            )}
            <h5 class="text-xl font-bold tracking-tight text-gray-900 absolute right-6">
              {props.price === 0 ? "FREE" : props.price}{" "}
              {props.currencySymbol.toString()}
            </h5>
          </div>
        </div>
      </div>
    </button>
  );
};
export default CourseCard;
