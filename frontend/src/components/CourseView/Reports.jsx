import React, { Fragment, useState } from "react";
import Review from "../Profile/Reviews/Review";
import SecondaryButton from "../UI/SecondaryButton";
import ReportItem from "./ReportItem";
import ReportTypeSelector from "./ReportTypeSelector";

const Reports = (props) => {
  const [enteredReport, setEnteredReport] = useState("");

  const reportChangeHandler = (event) => {
    setEnteredReport(event.target.value);
  };

  const onClickHandler = () => {
    const reportData = {
      userId: "63a37e9688311fa832f43336",
      courseId: props.courseId,
      type: props.selected.name,
      description: enteredReport,
    };
    props.onSubmit(reportData);
  };

  var index = 0;
  const reports = props.reports.map((report) => {
    index++;
    const formattedDate = report.date.substring(0, 10).split("-");
    const year = formattedDate[0];
    const month =
      formattedDate[1] === "1"
        ? "January"
        : formattedDate[1] === "2"
        ? "February"
        : formattedDate[1] === "3"
        ? "March"
        : formattedDate[1] === "4"
        ? "April"
        : formattedDate[1] === "5"
        ? "May"
        : formattedDate[1] === "6"
        ? "June"
        : formattedDate[1] === "7"
        ? "July"
        : formattedDate[1] === "8"
        ? "August"
        : formattedDate[1] === "9"
        ? "September"
        : formattedDate[1] === "10"
        ? "October"
        : formattedDate[1] === "11"
        ? "November"
        : "December";
    const day = formattedDate[2];
    const fullDate = month + " " + day + ", " + year;
    return (
      <ReportItem
        type={report.type}
        status={report.status}
        index={index}
        date={fullDate}
        description={report.description}
      />
    );
  });

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
        <div className=" font-semibold text-xl">Your Previous Reports:</div>
        {/* <ReportItem status="Resolved" /> */}
        {reports}
      </div>
    </div>
  );
};

export default Reports;
