import React from "react";

const TableRows = (props) => {
  const rows = props.rows.map((row, rowIdx) => {
    return (
      <tr
        key={row.courseId}
        className={`w-full  ${rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
      >
        <td className="text-center my-4 min-h-[47px] h-fit mx-auto max-w-[20rem] truncate px-2 font-medium">
          {row.month}
        </td>
        <td className="text-center my-4 px-2">{row.year}</td>
        <td className="text-center my-4 px-2 truncate">{row.amount}</td>
      </tr>
    );
  });
  return rows;
};

export default TableRows;
