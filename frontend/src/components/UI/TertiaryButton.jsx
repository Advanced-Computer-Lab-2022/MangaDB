import React from "react";

const TertiaryButton = (props) => {
  var activated;
  if (props.state === props.text) {
    activated =
      "bg-veryLightBlue border-darkBlue ease-in-out";
  }
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={`border-2 px-3 py-2 text-md text-gray-700 font-medium border-primaryBlue rounded-md border-opacity-70  duration-300  ${activated} ${props.className}`}
    >
      {props.text}
    </button>
  );
};

export default TertiaryButton;
