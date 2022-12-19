import React, { Fragment } from "react";
import Stars from "../UI/Stars";
import User from "../../Assets/Images/User.svg";
import Avatar from "react-avatar";
import { Divider } from "@mui/material";

const size = 4;

const ReviewItem = (props) => {
  return (
    <div className="mt-2">
      {/* <div className="text-lg font-medium flex space-x-4 items-center relative">
        <div className="w-7 h-7 rounded-full">
          <Avatar
            round={true}
            size={30}
            textSizeRatio={2}
            name={props.username}
          />
        </div>
        <div className="">{props.username}</div>
        <Stars rating={props.rating} size={size} />
        <div className="hidden md:block md:absolute right-3 text-xs font-extralight text-gray-600">
          {props.date}
        </div>
      </div>
      <div className="md:hidden text-xs font-extralight ml-10 mb-1 text-gray-500">
        {props.date}
      </div> */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <div className="w-7 h-7 rounded-full">
            <Avatar
              round={true}
              size={30}
              textSizeRatio={2}
              name={props.username}
            />
          </div>
          <div className="text-lg font-medium">{props.username}</div>
          <div className="hidden xl:block">
            <Stars rating={props.rating} size={size} />
          </div>
        </div>
        <div className="text-xs font-extralight text-gray-600">
          {props.date}
        </div>
      </div>
      <div className="xl:hidden ml-11">
        <Stars rating={props.rating} size={size} />
      </div>
      <div className="text-gray-800 text-sm font-normal mb-6 ml-11">
        {props.review}
      </div>
      <div className="mb-3">
        <Divider />
      </div>
    </div>
  );
};

export default ReviewItem;
