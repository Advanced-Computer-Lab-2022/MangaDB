import React from "react";
import reactImg from "../../Assets/Images/react.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Stars from "../UI/Stars";
import { useNavigate } from "react-router-dom";

const size = 5;

const CourseCard = (props) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    const instructorId = "6386427487d3f94e4cb7a28d";
    navigate(`/coursedetails/${instructorId}`, { state: {courseId:props.id, userId:props.userId}} );
  };
  const totalHours = Math.round(+props.duration / 60);
  return (
    <button className="hover:scale-105 transition flex content-start relative mb-8 mx-4" onClick={clickHandler}>
      <div class=" relative bg-white border border-gray-200 shadow-md w-80">
        <div className="h-48 w-80">
          <img className="" src={reactImg} alt=""></img>
        </div>
        <div className="bg-white px-2 py-1 text-xs font-semibold rounded-full absolute top-3 left-3">
          <AccessTimeIcon className="-mt-[3px]" fontSize="inherit" />{" "}
          {totalHours} {"hrs"}
        </div>

        <div className="py-5 px-2 flex flex-col items-start">
          <div className="w-full flex justify-start">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 truncate">
              {props.title}
            </h5>
          </div>

          <p className=" text-xs font-medium text-gray-500">
            {props.instructorName} . {props.subject}
          </p>
          <div className="text-lightBlue text-sm mt-2 flex">
            <Stars size={size} rating={props.rating} />
            <div className="bg-veryLightBlue text-gray-900 ml-2 text-sm py-[2px] px-2 rounded-lg">
              {props.rating}
            </div>
          </div>
          <div className="flex justify-between py-3 items-center w-full">
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
                <div className="">
                  {props.discountedPrice}
                  {props.currencySymbol.toString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};
export default CourseCard;
