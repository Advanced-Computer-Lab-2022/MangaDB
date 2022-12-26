import React from "react";
import { useState,useEffect } from "react";
const Stars = (props) => {
  const [stars, setStars] = useState(1);


  useEffect(()=> {
    if (props.rating >= 1 && props.rating <= 1.4) {
      setStars(1);
    } else if (props.rating >= 1.5 && props.rating <= 2.4) {
      setStars(2);
    } else if (props.rating >= 2.5 && props.rating <= 3.4) {
      setStars(3);
    } else if (props.rating >= 3.5 && props.rating <= 4.4) {
      setStars(4);
    } else {
      setStars(5);
    }
  },[props.rating])

  const yellowStar = (
    <svg
      aria-hidden="true"
      className={`w-${props.size} h-${props.size} text-yellow-400`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  );
  const grayStar = (
    <svg
      aria-hidden="true"
      className={`w-${props.size} h-${props.size}  text-gray-200`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  );

  var counter = 0;
  var displayedStars = [];

  for (var i = 0; i < 5; i++) {
    if (counter < stars) {
      displayedStars.push(yellowStar);
      counter++;
    } else {
      displayedStars.push(grayStar);
    }
  }

  return <div className="flex items-center">{displayedStars}</div>;
};

export default Stars;
