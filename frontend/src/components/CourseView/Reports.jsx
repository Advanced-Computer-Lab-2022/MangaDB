import {  useState } from "react";
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
      formattedDate[1] === "01"
        ? "January"
        : formattedDate[1] === "02"
        ? "February"
        : formattedDate[1] === "03"
        ? "March"
        : formattedDate[1] === "04"
        ? "April"
        : formattedDate[1] === "05"
        ? "May"
        : formattedDate[1] === "06"
        ? "June"
        : formattedDate[1] === "07"
        ? "July"
        : formattedDate[1] === "08"
        ? "August"
        : formattedDate[1] === "09"
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
        id={report._id}
        type={report.type}
        status={report.status}
        index={index}
        date={fullDate}
        description={report.description}
        followUp={report.followUpComment}
        followUpDescriptionChangeHandler={
          props.followUpDescriptionChangeHandler
        }
        followUpSubmitHandler={props.followUpSubmitHandler}
        followUpDescription={props.followUpDescription}
        followUpId={props.followUpId}
        followUpProblem={props.followUpProblem}
        showFollowUpModal={props.showFollowUpModal}
        openFollowUpModal={props.openFollowUpModal}
        closeFollowUpModal={props.closeFollowUpModal}
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
        {reports}
      </div>
    </div>
  );
};

export default Reports;
