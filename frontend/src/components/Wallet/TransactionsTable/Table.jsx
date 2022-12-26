import React from "react";
import NewTableHeader from "./TableHeader";
import NewTableRows from "./TableRows";


const Table = (props) => {
  return (
    <div className="w-full">
      <table className="w-[100%]">
        <thead className="bg-gray-100">
          <NewTableHeader />
        </thead>
        <tbody className="w-[100%]">
            <NewTableRows rows={props.rows} />
        </tbody>
      </table>
    </div>
  );
};

export default Table;