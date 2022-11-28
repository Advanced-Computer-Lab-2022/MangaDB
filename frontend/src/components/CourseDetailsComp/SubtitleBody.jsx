import React from "react";
import vidImgPath from "../../Assets/videoIcon.png";
import txtImgPath from "../../Assets/textIcon.png";

const SubtitleBody = (props) => {
  // duration
  // description
  // type
  // onClick

  const clickHandler = () =>{
    props.onClick(props.link);
  }
  return (
    <div onClick={clickHandler} className="py-2 flex justify-between cursor-pointer">
      <div className="flex space-x-2">
        {props.type === "Video" && <img className="w-5 h-5" src={vidImgPath} alt=""/>}
        {props.type === "Exam" && <img className="w-5 h-5" src={txtImgPath} alt=""/>}
        <div>{props.description}</div>
      </div>
      <div className="bg-gray-100 shadow-md px-3 rounded-3xl">
        {props.duration} mins
      </div>
    </div>
  );
};

export default SubtitleBody;
