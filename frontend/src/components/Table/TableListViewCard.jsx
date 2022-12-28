import PrimaryButton from "../UI/PrimaryButton";
import Stars from "../UI/Stars";
import Countdown from "react-countdown";

const TableListViewCard = (props) => {
  return (
    <div className=" w-[30rem] shadow-lg rounded-2xl mx-4 my-2">
      <div className="flex justify-end mt-4 ml-[27rem] bg-primaryBlue rounded-full w-fit p-1">
        <PrimaryButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            class="bi bi-three-dots"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        </PrimaryButton>
      </div>
      <div className="flex justify-center text-center line-clamp-1 font-semibold text-lg px-4">
        {props.title}
      </div>
      <div className="flex justify-center font-light text-lg">
        {props.instructor}
      </div>
      <div className="bg-gray-50 flex px-4 py-2 mt-4">
        <div className="w-1/2">
          <div className="font-medium">Subject</div>
          <div className="truncate pr-4">{props.subject}</div>
        </div>
        <div className="w-1/2">
          <div className="font-medium">Total Hours</div>
          <div>{props.totalHours} hrs</div>
        </div>
      </div>
      <div className="flex px-4 py-2 mt-4">
        <div className="w-1/2">
          <div className="font-medium mb-1">Rating</div>
          <div className="flex items-center space-x-5">
            <span>
              <Stars rating={props.rating} size="5" />
            </span>
            <sapn className="bg-veryLightBlue text-gray-900 text-sm py-[2px] px-2 rounded-lg flex items-center justify-center">
              {props.rating}
            </sapn>
          </div>
        </div>
        <div className="w-1/2">
          <div className="font-medium mb-1">Level</div>
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
        </div>
      </div>
      <div className="bg-gray-50 flex px-4 py-2 mt-4">
        <div className="w-1/2">
          <div className="font-medium">Price</div>
          <div
            className={`${
              props.discount !== 0 ? "line-through decoration-1" : ""
            }`}
          >
            {props.price}$
          </div>
        </div>
        <div className="w-1/2">
          <div className="font-medium">Discounted Price</div>
          <div
            className={`${
              props.discount === 1 ? "text-green-600 font-medium" : ""
            }`}
          >
            {props.discount === 0
              ? "_"
              : props.discount === 1
              ? "FREE"
              : props.discountedPrice}{" "}
            {props.discount === 1 ? "" : "$"}
            <span className="ml-2">
              Expires In:{" "}
              <span className=" text-red-600">
                {" "}
                <Countdown date={props.discountEndDate} />{" "}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TableListViewCard;
