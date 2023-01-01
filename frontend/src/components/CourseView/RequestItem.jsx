import { Divider } from "@mui/material";
import React from "react";

const RequestItem = (props) => {
  console.log(props.status);
  return (
    <div className="m-4">
      <div className="md:flex hidden justify-between">
        <div className="font-medium text-lg">Requested on: {props.date}</div>
        {props.status === "accepted" && (
          <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-green-400 text-green-500 bg-green-100 rounded-full">
            {props.status}
          </div>
        )}
        {(props.status === "unseen" ||
          props.status === "rejected" )&& (
            <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-red-400 text-red-500 bg-red-100 rounded-full">
              {props.status}
            </div>
          )}
          {props.status === "pending"  && (
            <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-red-400 text-red-500 bg-red-100 rounded-full">
              {props.status}
            </div>
          )}
      </div>
      <div className="md:hidden space-y-2">
        <div className="font-medium text-lg">Requested on: {props.date}</div>
        {props.status === "accepted" && (
          <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-green-400 text-green-500 bg-green-100 rounded-full">
            {props.status}
          </div>
        )}
        {props.status === "unseen" ||
          (props.status === "rejected" && (
            <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-red-400 text-red-500 bg-red-100 rounded-full">
              {props.status}
            </div>
          ))}
      </div>
      <div className="text-gray-700 font-light text-sm my-1">
        Type: {props.type}
      </div>
      {props.courseName ? (
        <div className="text-gray-700 font-light text-sm my-1">
          Course: {props.courseName}
        </div>
      ) : (
        <></>
      )}
      <div className="mb-2">{props.description}</div>
      <Divider />
    </div>
  );
};

export default RequestItem;
