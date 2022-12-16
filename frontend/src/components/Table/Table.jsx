import React from "react";
import NewTableHeader from "./TableHeader";
import NewTableRows from "./TableRows";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";

const Table = (props) => {
    console.log(props.rows);
  return (
    <div>
      <table className="w-full">
        <thead className="bg-gray-100">
          <NewTableHeader />
        </thead>
        <tbody className="w-full">
            <NewTableRows rows={props.rows} />
        </tbody>
      </table>
    </div>
  );
};

export default Table;