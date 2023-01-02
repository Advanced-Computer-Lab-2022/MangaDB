import React from "react";

const TableHeader = () => {
  return (
    <tr className="w-full">
      <th
        scope="col"
        className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide"
      >
        Month
      </th>

      <th
        scope="col"
        className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide"
      >
        Year
      </th>
      <th
        scope="col"
        className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide"
      >
        Amount
      </th>
    </tr>
  );
};

export default TableHeader;
