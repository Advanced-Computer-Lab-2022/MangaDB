import React, { Fragment, useState } from "react";
import SecondaryButton from "../UI/SecondaryButton";
import ReportItem from "./ReportItem";
import ReportTypeSelector from "./ReportTypeSelector";

const Reports = (props) => {
  const [eneteredReport, setEnteredReport] = useState("");
  //const [displayedReports, setDisplayedReports] = useState([]);

  const reportChangeHandler = (event) => {
    setEnteredReport(event.target.value);
  };

  const onClickHandler = () => {
    const reportData = {
      userId: "638a07cdbc3508481a2d7da9",
      courseId: props.courseId,
      type: props.selected.name,
      description: eneteredReport,
    };
    props.onSubmit(reportData);
  };

  return (
    <div className="m-4">
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold text-xl">Report your Problem:</div>
        <div className="w-[25vw]">
          <ReportTypeSelector
            selected={props.selected}
            selectedChangeHandler={props.selectedChangeHandler}
          />
        </div>
      </div>

      <textarea
        onChange={reportChangeHandler}
        className="w-full bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
      />
      <div className="flex justify-end mb-4">
        <SecondaryButton text="Submit" onClick={onClickHandler} />
      </div>
      <div>
        <div className=" font-semibold text-xl">
          Your Previous Reports:
        </div>
        {/* <ReportItem status="Resolved" /> */}
      </div>
    </div>
  );
};

export default Reports;
