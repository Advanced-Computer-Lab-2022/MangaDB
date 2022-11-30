import React, { useState } from "react";
import TertiaryButton from "../TertiaryButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SecondaryButton from "../SecondaryButton";

var toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
];

const CreateCourseForm = (props) => {
  const [enteredCourseTitle, setEnteredCourseTitle] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("Beginner");
  const [enteredImageURL, setEnteredImageURL] = useState("");
  const [enteredOverviewURL, setEnteredOverviewURL] = useState("");
  const [enteredCoursePrice, setEnteredCoursePrice] = useState("");
  const [enteredCourseDescription, setEnteredCourseDescription] = useState("");
  const [summaryValue, setSummaryValue] = useState("");
  const [requirementsValue, setRequirementsValue] = useState("");

  const courseTitleChangeHandler = (event) => {
    setEnteredCourseTitle(event.target.value);
  };

  const beginnerClickHandler = (event) => {
    setSelectedLevel(event.target.innerHTML);
  };

  const intermediateClickHandler = (event) => {
    setSelectedLevel(event.target.innerHTML);
  };

  const advancedClickHandler = (event) => {
    setSelectedLevel(event.target.innerHTML);
  };

  const imageURLChangeHandler = (event) => {
    setEnteredImageURL(event.target.value);
  };

  const overviewURLChangeHandler = (event) => {
    setEnteredOverviewURL(event.target.value);
  };

  const coursePriceChangeHandler = (event) => {
    setEnteredCoursePrice(event.target.value);
  };

  const courseDescriptionChangeHandler = (event) => {
    setEnteredCourseDescription(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    var data = {
      courseTitle: enteredCourseTitle,
      level: selectedLevel,
      courseImage: enteredImageURL,
      courseOverview : enteredOverviewURL,
      coursePrice: enteredCoursePrice,
      courseDescription: enteredCourseDescription,
      courseSummary: summaryValue,
      requirements: requirementsValue,
    };
    props.onSave(data);
  };

  return (
    <div className="bg-gray-100 mx-8 my-4 rounded-md p-6">
      <form onSubmit={submitHandler}>
        <label className="text-lg font-medium">Basic Information:</label>
        <div className="md:grid grid-cols-2 space-y-4">
          <div className="flex justify-center items-center">
            <label className="w-32">Course Title</label>
            <input
              className="w-[60vw] md:w-[27vw] px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
              onChange={courseTitleChangeHandler}
              type="text"
              required
            />
          </div>
          <div className="flex justify-center items-center">
            <label className="w-32">level</label>
            <div className="w-[60vw] md:w-[27vw] flex justify-between">
              <TertiaryButton
                type="button"
                state={selectedLevel}
                onClick={beginnerClickHandler}
                text="Beginner"
                className="md:w-[8.8vw] w-[19vw] text-xs px-1"
              />
              <TertiaryButton
                type="button"
                state={selectedLevel}
                onClick={intermediateClickHandler}
                text="Intermediate"
                className="md:w-[8.8vw] w-[19vw] text-xs px-1"
              />
              <TertiaryButton
                type="button"
                state={selectedLevel}
                onClick={advancedClickHandler}
                text="Advanced"
                className="md:w-[8.8vw] w-[19vw] text-xs px-1"
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <label className="w-32">Image URL</label>
            <input
              className="w-[60vw] md:w-[27vw] px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
              onChange={imageURLChangeHandler}
              type="text"
              required
            />
          </div>
          <div className="flex justify-center items-center">
            <label className="w-32">Overview URL</label>
            <input
              className="w-[60vw] md:w-[27vw] px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
              onChange={overviewURLChangeHandler}
              type="text"
              required
            />
          </div>
          <div className="flex justify-center items-center">
            <label className="w-32">price</label>
            <input
              className="w-[55vw] md:w-[25vw] px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
              onChange={coursePriceChangeHandler}
              type="number"
              required
              min="0"
            />
            <div className="w-[5vw] md:w-[2vw] flex justify-center text-gray-500">
              $
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-lg font-medium">Course Description:</label>
          <div>
            <textarea
              className="w-full px-3 py-1 mt-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
              onChange={courseDescriptionChangeHandler}
              required
            ></textarea>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-lg font-medium">Course Summary:</label>
          <div className="mt-1">
            <ReactQuill
              modules={{ toolbar: toolbarOptions }}
              className="bg-white rounded-md"
              value={summaryValue}
              onChange={setSummaryValue}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="text-lg font-medium">Course Requirements:</label>
          <div className="mt-1">
            <ReactQuill
              modules={{ toolbar: toolbarOptions }}
              className="bg-white rounded-md"
              value={requirementsValue}
              onChange={setRequirementsValue}
            />
          </div>
        </div>
        <div className="w-full flex justify-end mt-2">
          <SecondaryButton className="w-20" type="submit" text="Next" />
        </div>
      </form>
    </div>
  );
};

export default CreateCourseForm;