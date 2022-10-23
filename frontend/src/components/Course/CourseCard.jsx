import Card from "../UI/Card";
import SignalCellularAlt1BarIcon from "@mui/icons-material/SignalCellularAlt1Bar";
import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
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
    //     <div className="">
    //       <AccessTimeIcon className="-mt-1" fontSize="small" /> {props.duration}
    //     </div>
    //     <div className="">
    //       <div class="flex items-center text-primaryBlue">
    //         <svg
    //           aria-hidden="true"
    //           class="w-5 h-5 "
    //           fill="currentColor"
    //           viewBox="0 0 20 20"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <title>First star</title>
    //           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    //         </svg>
    //         <svg
    //           aria-hidden="true"
    //           class="w-5 h-5 "
    //           fill="currentColor"
    //           viewBox="0 0 20 20"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <title>Second star</title>
    //           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    //         </svg>
    //         <svg
    //           aria-hidden="true"
    //           class="w-5 h-5 "
    //           fill="currentColor"
    //           viewBox="0 0 20 20"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <title>Third star</title>
    //           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    //         </svg>
    //         <svg
    //           aria-hidden="true"
    //           class="w-5 h-5 "
    //           fill="currentColor"
    //           viewBox="0 0 20 20"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <title>Fourth star</title>
    //           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    //         </svg>
    //         <svg
    //           aria-hidden="true"
    //           class="w-5 h-5 text-gray-300 dark:text-gray-500"
    //           fill="currentColor"
    //           viewBox="0 0 20 20"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <title>Fifth star</title>
    //           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    //         </svg>
    //         <div className="px-2">270 reviewers</div>
    //       </div>
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
    <div class="w-full max-w-sm bg-white rounded-lg shadow-md">
      <a href="#">
        <img
          class="p-8 rounded-t-lg"
          src="/docs/images/products/apple-watch.png"
          alt="product image"
        />
      </a>
      <div class="px-5 pb-5">
        <div >
          <h5 class="text-xl font-semibold tracking-tight text-gray-900">
            {props.title}
          </h5><h5 class="text-xs font-semibold tracking-tight text-gray-600 ">
            {props.description}
          </h5>
          {props.level === "Advanced" && (
            <div className="flex items-center space-x-1">
              <div className="bg-red-600 w-3 h-3 rounded-l-full"></div>
              <div className="bg-red-600 w-3 h-3"></div>
              <div className="bg-red-600 w-3 h-3 rounded-r-full"></div>
              <h5 class="text-xs px-2 font-medium tracking-tight  text-gray-500 ">{props.level}</h5>
            </div>
          )}
          {props.level === "Intermediate" && (
            <div className="flex items-center space-x-1">
              <div className="bg-orange-600 w-3 h-3 rounded-l-full"></div>
              <div className="bg-orange-600 w-3 h-3"></div>
              <div className="bg-gray-300 w-3 h-3 rounded-r-full"></div>
              <h5 class="text-xs px-2 font-medium tracking-tight  text-gray-500 ">{props.level}</h5>
            </div>
          )}
          {props.level === "Beginner" && (
            <div className="flex items-center space-x-1">
              <div className="bg-green-600 w-3 h-3 rounded-l-full"></div>
              <div className="bg-gray-300  w-3 h-3"></div>
              <div className="bg-gray-300  w-3 h-3 rounded-r-full"></div>
              <h5 class="text-xs px-2 font-medium tracking-tight  text-gray-500 ">{props.level}</h5>
            </div>
          )}
        </div>
        <div class="flex items-center mt-2.5 mb-5">
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>First star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Second star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Third star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Fourth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Fifth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span class="bg-blue-100 text-primaryBlue text-xs font-semibold mr-2 px-2.5 py-0.5 rounded  ">
            5.0
          </span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-3xl font-bold text-gray-900 ">
            $599
          </span>
          <a
            href="#"
            class="text-white bg-primaryBlue hover:bg-blue-500 active:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
};
export default CourseCard;
