import React from "react";

const TableHeader = () => {
  return (
    <tr className="w-full">
      <th scope="col" className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
        Course Title
      </th>
      <th scope="col" className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
        Instructor
      </th>
      <th scope="col" className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
        Subject
      </th>
      <th scope="col" className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
        Rating
      </th>
      <th scope="col" className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
        Level
      </th>
      <th scope="col" className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
        Price
      </th>
      <th scope="col" className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
        Discounted Price
      </th>
      <th scope="col" className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
        Total Hours
      </th>
      <th scope="col" className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
        Actions
      </th>
    </tr>
  );
};

export default TableHeader;
