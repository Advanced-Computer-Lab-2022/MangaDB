import React, { Fragment, useState } from "react";
import SecondaryButton from "../UI/SecondaryButton";

const Reports = (props) => {
  const [eneteredReport, setEnteredReport] = useState("");

  const reportChangeHandler = (event) => {
    setEnteredReport(event.target.value);
  };

  const onClickHandler = () => {
    const reportData = {
      userId: "638a07cdbc3508481a2d7da9",
      report: eneteredReport,
    };
    props.onSubmit(reportData);
  };

  return (
    <div className="m-4">
      <div className="font-semibold text-lg mb-2">Report your Problem:</div>
      <textarea
        onChange={reportChangeHandler}
        className="w-full bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
      />
      <div className="flex justify-end">
        <SecondaryButton text="Submit" onClick={onClickHandler} />
      </div>
    </div>
  );
};

export default Reports;
