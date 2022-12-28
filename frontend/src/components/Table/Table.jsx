import React from "react";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";

const Table = (props) => {
  return (
    <div>
      <table className="w-full">
        <thead className="bg-gray-100">
          <TableHeader />
        </thead>
        <tbody className="w-full">
            <TableRows rows={props.rows} />
        </tbody>
      </table>
    </div>
  );
};

export default Table;