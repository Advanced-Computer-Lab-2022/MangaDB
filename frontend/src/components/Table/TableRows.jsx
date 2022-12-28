import React, { useState, useEffect, Fragment } from "react";
import DropDown from "../UI/DropDown";
import PrimaryButton from "../UI/PrimaryButton";
import Countdown from "react-countdown";
const TableRows = (props) => {
  const rows = props.rows.map((row, rowIdx) => {
    const totalHours = Math.round(+row.totalMins / 60);
    const items =
      row.mine === false
        ? ["View Course"]
        : row.discount !== 0
        ? ["View Course", "Report a Problem"]
        : ["View Course", "Report a Problem", "Add Promotion"];
    return (
        <tr
          key={row.courseId}
          className={`w-full ${rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
        >
          <td className="text-center my-4 min-h-[47px] h-fit mx-auto max-w-[20rem] truncate px-2 font-medium">
            {row.courseTitle}
          </td>
          <td className="text-center my-4 px-2">{row.instructorName}</td>
          <td className="text-center my-4 px-2 truncate">{row.subject}</td>
          <td className="text-center my-4 px-2 flex justify-around">
            <span className="flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </span>
            <sapn className="bg-veryLightBlue text-gray-900 text-sm py-[2px] px-2 rounded-lg flex items-center justify-center">
              {row.rating}
            </sapn>
          </td>
          <td className="text-center my-4 px-2">
            {row.level === "Beginner" && (
              <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-green-400 text-green-500 bg-green-100 rounded-full">
                {row.level}
              </div>
            )}
            {row.level === "Intermediate" && (
              <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-yellow-400 text-yellow-500 bg-yellow-100 rounded-full">
                {row.level}
              </div>
            )}
            {row.level === "Advanced" && (
              <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-red-400 text-red-500 bg-red-100 rounded-full">
                {row.level}
              </div>
            )}
          </td>
          <td
            className={`text-center my-4 px-2 ${
              row.discount !== 0 ? "line-through decoration-1" : ""
            }`}
          >
            {row.price}$
          </td>
          <td
            className={`text-center my-4 px-2 ${
              row.discount === 1 ? "text-green-600" : ""
            }`}
          >
            <div>
              {row.discount === 0
                ? "_"
                : row.discount === 1
                ? "FREE"
                : row.discountedPrice}
              {""}
              {row.discount === 1 ? "" : "$"}
            </div>
            <div className="text-xs">
              Expires In:{" "}
              <span className=" text-red-600">
                <Countdown date={row.discountEndDate} />
              </span>
            </div>
          </td>
          <td className="text-center my-4 px-2">{totalHours} hrs</td>
          <td className="text-center flex justify-center my-4 px-2">
            <DropDown
              items={items}
              openPromotion={props.openPromotionModal.bind(null,row.courseId,row.courseTitle)}
              closePromotion={props.closePromotionModal}
            />
          </td>
        </tr>
    );
  });
  return rows;
};

export default TableRows;
