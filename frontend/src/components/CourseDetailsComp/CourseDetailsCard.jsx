import React from "react";
import Stars from "../UI/Stars";

const size = 5;

const CourseDetailsCard = (props) => {
  return (
    <div className="w-6/12 shadow-lg flex">
      <div className="w-6 bg-darkBlue"></div>
      <div className="px-4 py-2 space-y-2 bg-white w-full rounded-r-lg">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold truncate mr-4">
            {props.courseTitle}
          </div>
          {props.level === "Beginner" && (
            <div class="inline-flex items-center py-1 px-4 text-sm font-medium text-center border-2 border-green-400 text-green-500 bg-green-100 rounded-full">
              {props.level}
            </div>
          )}
          {props.level === "Intermediate" && (
            <div class="inline-flex items-center py-1 px-4 text-sm font-medium text-center border-2 border-yellow-400 text-yellow-500 bg-yellow-100 rounded-full">
              {props.level}
            </div>
          )}
          {props.level === "Advanced" && (
            <div class="inline-flex items-center py-1 px-4 text-sm font-medium text-center border-2 border-red-400 text-red-500 bg-red-100 rounded-full">
              {props.level}
            </div>
          )}
        </div>
        <div className="font-light text-base text-gray-500">
          {props.instructorName} . {props.subject}
        </div>
        <div className="text-xs font-light line-clamp-2">{props.courseDescription}</div>
        <div className="flex justify-between items-center w-full">
          <div className="flex">
            <Stars size={size} rating={props.rating} />
            <div className="bg-veryLightBlue text-gray-900 ml-2 text-sm py-[2px] px-2 rounded-lg">
              {props.rating}
            </div>
          </div>
          <div class="text-lg font-bold tracking-tight text-gray-900 flex">
            {props.discount > 0 && (
              <div className="line-through decoration-1 text-sm font-thin mr-2 mt-1">
                {props.coursePrice}
                {props.currencySymbol.toString()}
              </div>
            )}
            {props.discountedPrice === 0 && (
              <div className="text-green-600">FREE</div>
            )}
            {props.discountedPrice != 0 && (
              <div>
                {props.discountedPrice}
                {props.currencySymbol.toString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
