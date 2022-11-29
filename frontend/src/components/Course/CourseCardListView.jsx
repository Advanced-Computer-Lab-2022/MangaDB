import React from "react";
import reactImg from "../../Assets/Images/react.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Stars from "../UI/Stars";
import SecondaryButton from "../SecondaryButton";

const size = 5;

const CourseCardListView = (props) => {
  return (
    <div class="relative w-4/5 flex items-center bg-white border border-gray-200 shadow-md rounded-md">
      <img class="max-w-xs h-full" src={reactImg} alt=""></img>

      <div className="px-5 py-3 space-y-2 w-full">
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
        <div className=" text-xs font-normal text-gray-500 w-full">
          {props.description}
        </div>

        <div class="text-lightBlue flex justify-items-center text-[9px]">
          <Stars size={size} rating={props.rating} />
          <div className="bg-veryLightBlue text-gray-900 ml-2 text-sm py-[2px] px-2 rounded-lg">
            {props.rating}
          </div>
        </div>
        <p className=" text-xs font-medium text-gray-500">
          {props.instructorName} . {props.subject}
        </p>
        <div className="bg-white  py-1 text-sm font-semibold rounded-full">
          <AccessTimeIcon className="-mt-[3px]" fontSize="inherit" />{" "}
          {props.duration} {"hrs"}
          <div className="flex justify-end items-center">
            {props.discount > 0 && (
              <div className="line-through decoration-1 text-lg font-thin mr-4">
                {props.coursePrice}$
              </div>
            )}
            <h5 class="text-2xl font-bold tracking-tight text-gray-900">
              {props.discountedPrice === 0 && (
                <div className="text-green-600 mr-6">FREE</div>
              )}
              {props.discountedPrice != 0 && (
                <div className="mr-6">{props.discountedPrice}$</div>
              )}
            </h5>
            <SecondaryButton text="View" className="text-md font-bold" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseCardListView;
