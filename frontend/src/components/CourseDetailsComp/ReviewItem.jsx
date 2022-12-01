import React, { Fragment } from "react";
import Stars from "../UI/Stars";
import User from "../../Assets/Images/User.svg";
import Avatar from 'react-avatar';

const size = 4;

const ReviewItem = (props) => {
  return (
    <div className="mt-2">
      <div className="text-lg font-medium flex space-x-4 items-center relative">
        <div className="w-7 h-7 opacity-60">
          <img src={User} />
        </div>
        <div>{props.username}</div>
        <Stars rating={props.rating} size={size} />
        <div className="hidden md:block md:absolute right-3 text-xs font-extralight text-gray-600">{props.date}</div>
      </div>
      <div className="md:hidden text-xs font-extralight ml-10 mb-1 text-gray-500">{props.date}</div>
      <div className="text-gray-700 text-sm font-light mb-6 ml-10">
        {props.review}
      </div>
    </div>
  );
};

export default ReviewItem;
