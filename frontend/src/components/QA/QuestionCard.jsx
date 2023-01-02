import { Divider } from "@mui/material";
import React from "react";

const QuestionCard = (props) => {
  return (
    <div className="m-4">
      <div className="md:flex hidden justify-between">
        <div className="font-medium text-lg">
           Asked on: {props.date}
        </div>
        {props.status === "Answered" && (
          <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-green-400 text-green-500 bg-green-100 rounded-full">
            {props.status}
          </div>
        )}
        {props.status === "Pending" && (
          <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-yellow-400 text-yellow-500 bg-yellow-100 rounded-full">
            {props.status}
          </div>
        )}
      </div>
      <div className="md:hidden space-y-2">
        <div className="font-medium text-lg"> Asked on: {props.date}</div>
        {props.status === "Answered" && (
          <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-green-400 text-green-500 bg-green-100 rounded-full">
            {props.status}
          </div>
        )}
        {props.status === "Pending" && (
          <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-yellow-400 text-yellow-500 bg-yellow-100 rounded-full">
            {props.status}
          </div>
        )}
      </div>
      <div className="mb-2">{props.question}</div>
      {props.answer && (
        <div>
          <div className="font-semibold"> Instructor's Answer :</div>
          <div className="mb-2">{props.answer}</div>
        </div>
      )}
      <Divider />
    </div>
  );
};

export default QuestionCard;
