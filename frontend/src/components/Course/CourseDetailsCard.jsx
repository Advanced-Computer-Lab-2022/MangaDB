import Card from "../UI/Card";
import SignalCellularAlt1BarIcon from "@mui/icons-material/SignalCellularAlt1Bar";
import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import CourseImage from "../../Assets/Images/ReactJS.jpg";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SecondaryButton from "../SecondaryButton";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import Stars from "../UI/Stars";

const size = 6;

const CourseCard = (props) => {
  var level;
  if (props.level === "Advanced") {
    level = (
      <SignalCellularAltIcon
        className="-mt-1"
        fontSize="small"
      ></SignalCellularAltIcon>
    );
  } else if (props.level === "Intermediate") {
    level = (
      <SignalCellularAlt2BarIcon
        className="-mt-1"
        fontSize="small"
      ></SignalCellularAlt2BarIcon>
    );
  } else {
    level = (
      <SignalCellularAlt1BarIcon
        className="-mt-1"
        fontSize="small"
      ></SignalCellularAlt1BarIcon>
    );
  }

  return (
    // <div className="drop-shadow-lg h-[425px] space-y-2 max-w-sm rounded-md bg-white">
    //   <div className="w-full">
    //     <img src={props.image} alt="" />
    //   </div>
    //   <div className="font-normal text-base">{props.title}</div>
    //   <div className="flex items-center bg-lightGrey font-semibold text-[10px] h-8 text-center space-x-4">
    //     <div className="">
    //       {level} {props.level}
    //     </div>
    // <div className="">
    //   <AccessTimeIcon className="-mt-1" fontSize="small" /> {props.duration}
    // </div>
    //     <div className="">

    //     </div>
    //   </div>
    //   <div className="font-semibold">{props.subject}</div>
    //   <div>{props.instructorName}</div>
    //   <div
    //     className="absolute font-semibold text-2xl text-black rounded-md max-w-[20%] text-center
    //    bottom-5 right-5"
    //   >
    //     {props.price}
    //   </div>
    // </div>
    // <div class="w-full max-w-sm bg-white rounded-lg shadow-md">
    //   <div className="max-h-40 mb-4">
    //     <img className="w-100 h-100" src={CourseImage} alt="product image" />
    //   </div>

    //   <div class="px-5 pb-5">
    //     <div>
    //       <h5 class="text-[22px] font-semibold tracking-tight text-gray-900 pt-3">
    //         {props.title}
    //       </h5>
    //       <h5 class="text-base font-semibold tracking-tight text-gray-700">
    //         {props.subject}
    //       </h5>
    //       <div className="flex justify-between">
    //         {props.level === "Advanced" && (
    //           <div className="flex items-center space-x-1">
    //             <div className="bg-red-600 w-3 h-3 rounded-l-full"></div>
    //             <div className="bg-red-600 w-3 h-3"></div>
    //             <div className="bg-red-600 w-3 h-3 rounded-r-full"></div>
    //             <h5 class="text-sm px-2 font-medium tracking-tight  text-gray-500 ">
    //               {props.level}
    //             </h5>
    //           </div>
    //         )}
    //         {props.level === "Intermediate" && (
    //           <div className="flex items-center space-x-1">
    //             <div className="bg-yellow-300 w-3 h-3 rounded-l-full"></div>
    //             <div className="bg-yellow-300 w-3 h-3"></div>
    //             <div className="bg-gray-300 w-3 h-3 rounded-r-full"></div>
    //             <h5 class="text-sm px-2 font-medium tracking-tight  text-gray-500 ">
    //               {props.level}
    //             </h5>
    //           </div>
    //         )}
    //         {props.level === "Beginner" && (
    //           <div className="flex items-center space-x-1">
    //             <div className="bg-green-600 w-3 h-3 rounded-l-full"></div>
    //             <div className="bg-gray-300  w-3 h-3"></div>
    //             <div className="bg-gray-300  w-3 h-3 rounded-r-full"></div>
    //             <h5 class="text-sm px-2 font-medium tracking-tight  text-gray-500 ">
    //               {props.level}
    //             </h5>
    //           </div>
    //         )}

    //         <div class="flex items-center my-2">
    //           <svg
    //             aria-hidden="true"
    //             class="w-5 h-5 text-yellow-300"
    //             fill="currentColor"
    //             viewBox="0 0 20 20"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <title>First star</title>
    //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    //           </svg>
    //           <svg
    //             aria-hidden="true"
    //             class="w-5 h-5 text-yellow-300"
    //             fill="currentColor"
    //             viewBox="0 0 20 20"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <title>Second star</title>
    //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    //           </svg>
    //           <svg
    //             aria-hidden="true"
    //             class="w-5 h-5 text-yellow-300"
    //             fill="currentColor"
    //             viewBox="0 0 20 20"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <title>Third star</title>
    //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    //           </svg>
    //           <svg
    //             aria-hidden="true"
    //             class="w-5 h-5 text-yellow-300"
    //             fill="currentColor"
    //             viewBox="0 0 20 20"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <title>Fourth star</title>
    //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    //           </svg>
    //           <svg
    //             aria-hidden="true"
    //             class="w-5 h-5 text-yellow-300"
    //             fill="currentColor"
    //             viewBox="0 0 20 20"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <title>Fifth star</title>
    //             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    //           </svg>
    //           <span class="bg-lightBlue text-primaryBlue text-xs font-semibold ml-3 px-2.5 py-0.5 rounded  ">
    //             {props.reviews}
    //           </span>
    //         </div>
    //       </div>
    //       <div className="text-sm font-normal text-gray-700">
    //         By: {props.instructorName}
    //       </div>
    //     </div>
    //     <div class="flex justify-between items-center">
    //       <span class="text-[2.0625rem] font-bold text-gray-900 ">
    //         {props.price}
    //       </span>
    //       <span className="opacity-90 absolute items-center gap-x-1 text-sm p-1 rounded-full top-3 left-3 bg-white flex">
    //         <ScheduleRoundedIcon fontSize="inherit" />
    //         {props.duration}
    //       </span>
    //       <SecondaryButton text="View" />
    //     </div>
    //   </div>
    // </div>

    <div class=" flex  w-[820px] max-w-[1000px] rounded-lg bg-white shadow-md overflow-hidden">
      <div class="p-4 bg-darkBlue  w-56">
        <div class="text-lightBlue uppercase tracking-wider text-sm">
          course
        </div>
        <div class="text-white text-2xl">{props.courseTitle}</div>
        <div class="text-lightBlue mt-12 text-sm flex space-x-6 items-center">
          <div>
            <Stars size={size} rating={props.rating} />
          </div>
          <div className="bg-veryLightBlue text-gray-900 px-2 rounded-md">{props.rating}</div>
        </div>
      </div>
      <div class="p-4 ">
        <div class="flex justify-between">
          <div class="text-primaryBlue uppercase whitespace-nowrap tracking-wider text-sm">
            {props.instructorName}
          </div>
          <div className="flex"></div>
          <div class="pt-1 pl-60">
            <div class="bg-lightBlue rounded-full h-2 w-48 overflow-hidden">
              <div
                class={`h-2 bg-darkBlue ${
                  props.level === "Advanced"
                    ? "w-64"
                    : props.level === "Intermediate"
                    ? "w-24"
                    : "w-16"
                }`}
              ></div>
            </div>
            <div class="text-xs text-primaryBlue text-right uppercase">
              {props.level}
            </div>
          </div>
        </div>
        <div class="text-3xl text-darkBlue">{props.subject}</div>
        <div class="flex justify-end pt-12 gap-5 items-center ">
          <div className="text-3xl font-semibold text-darkBlue mr-4">
            {props.discountedPrice}$
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseCard;
