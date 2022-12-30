

import { Divider } from "@mui/material";
import React from "react";
import SecondaryButton from "../UI/SecondaryButton";
const ReportItem = (props) => {
  return (
    <div className="m-4">
      <div className="md:flex hidden justify-between">
        <div className="font-medium text-lg">
        {props.index?props.index+".":null} {props.isReport ? "Reported " : "Requested "}  on: {props.date}
        </div>
        {(props.status === "resolved" || props.status==="accepted") && (
          <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-green-400 text-green-500 bg-green-100 rounded-full">
            {props.status}
          </div>
        )}
        {props.status === "pending" && (
          <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-yellow-400 text-yellow-500 bg-yellow-100 rounded-full">
            {props.status}
          </div>
        )}
        {(props.status === "unseen" || props.status==="rejected")&& (
          <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-red-400 text-red-500 bg-red-100 rounded-full">
            {props.status}
          </div>
        )}
      </div>
      <div className="md:hidden space-y-2">
        <div className="font-medium text-lg">{props.index?props.index+".":null} {props.isReport ? "Reported " : "Requested "}  on: {props.date}</div>
        {(props.status === "resolved" || props.status==="accepted")&& (
          <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-green-400 text-green-500 bg-green-100 rounded-full">
            {props.status}
          </div>
        )}
        {props.status === "pending" && (
          <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-yellow-400 text-yellow-500 bg-yellow-100 rounded-full">
            {props.status}
          </div>
        )}
        {(props.status === "unseen" || props.status==="rejected")&& (
          <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-red-400 text-red-500 bg-red-100 rounded-full">
            {props.status}
          </div>
        )}
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
      <div className="lg:flex lg:justify-between items-center mb-2">
        <div className="mb-2 md:mb-0truncate">{props.description}</div>
        {props.isReport ? (
          <div>
            <SecondaryButton text="Follow Up" />
          </div>
        ) : (
          <></>
        )}
      </div>
      <Divider />
    </div>
  );
};
export default ReportItem;
