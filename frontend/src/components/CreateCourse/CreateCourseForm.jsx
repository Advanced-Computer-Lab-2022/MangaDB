import React, { useState } from "react";
import TertiaryButton from "../UI/TertiaryButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SecondaryButton from "../UI/SecondaryButton";
import Backdrop from "@mui/material/Backdrop";
import Contract from "./Contract";
import { useEffect } from "react";
import axios from "axios";

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

function isYoutubeURL(str) {
  var p =
    /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return str.match(p);
}

const CreateCourseForm = (props) => {

  const [openContract, setOpenContract] = useState(false);
  const handleClose = () => {
    setOpenContract(false);
  };
  const [enteredCourseTitle, setEnteredCourseTitle] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("Beginner");
  const [enteredImageURL, setEnteredImageURL] = useState("");
  const [enteredOverviewURL, setEnteredOverviewURL] = useState("");
  const [enteredSubject, setEnteredSubject] = useState("");
  const [enteredCoursePrice, setEnteredCoursePrice] = useState("");
  const [enteredCourseDescription, setEnteredCourseDescription] = useState("");
  const [summaryValue, setSummaryValue] = useState("");
  const [requirementsValue, setRequirementsValue] = useState("");

  const [warning, setWarning] = useState("");
  const [emptyCourseTitle, setEmptyCourseTitle] = useState(false);
  const [emptyCourseSubject, setEmptyCourseSubject] = useState(false);
  const [emptyCoursePrice, setEmptyCoursePrice] = useState(false);
  const [emptyCourseDescription, setEmptyCourseDescription] = useState(false);
  const [emptyOverviewURL, setEmptyOverviewURL] = useState(false);
  const [validOverviewURL, setValidOverviewURL] = useState(true);

  const acceptContract = () => {
    axios.patch("http://localhost:3000/user/updateuser/63acd64846cc70eed673a330", {agreedToTerms: true}).then((response) => {
      console.log(response.data);
      handleClose();
    });
  }

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

  const subjectChangeHandler = (event) => {
    setEnteredSubject(event.target.value);
  };

  const coursePriceChangeHandler = (event) => {
    setEnteredCoursePrice(event.target.value);
  };

  const courseDescriptionChangeHandler = (event) => {
    setEnteredCourseDescription(event.target.value);
  };

  const handleFormValidation = () => {
    var isValidForm = true;
    if (enteredCourseTitle === "") {
      setEmptyCourseTitle(true);
      console.log("empty");
      setWarning("Please fill in all the required fields");
      isValidForm = false;
    } else {
      setEmptyCourseTitle(false);
    }

    if (enteredSubject === "") {
      setEmptyCourseSubject(true);
      setWarning("Please fill in all the required fields");
      isValidForm = false;
    } else {
      setEmptyCourseSubject(false);
    }

    if (enteredCoursePrice === "") {
      setEmptyCoursePrice(true);
      setWarning("Please fill in all the required fields");
      isValidForm = false;
    } else {
      setEmptyCoursePrice(false);
    }

    if (enteredCourseDescription === "") {
      setEmptyCourseDescription(true);
      setWarning("Please fill in all the required fields");
      isValidForm = false;
    } else {
      setEmptyCourseDescription(false);
    }
    if (enteredOverviewURL === "") {
      setEmptyOverviewURL(true);
      setWarning("Please fill in all the required fields");
      isValidForm = false;
    } else {
      setEmptyOverviewURL(false);
    }
    if (!isYoutubeURL(enteredOverviewURL)) {
      setValidOverviewURL(false);
      setWarning("Please enter a valid YouTube video URL");
      isValidForm = false;
    } else {
      setValidOverviewURL(true);
    }

    return isValidForm;
  };

  useEffect(() => {
    //we need to check if this instructor already accepted the contract or not
    //if not, we need to show the contract
    //if yes, we need to show the form
    axios
      .get("http://localhost:3000/admin/getuser/63acd64846cc70eed673a330")
      .then((res) => {
        console.log(res.data);
        if (res.data.agreedToTerms === false) {
          setOpenContract(true);
        } 
      });
  });

  const submitHandler = (event) => {
    event.preventDefault();
    var data = {
      courseTitle: enteredCourseTitle,
      level: selectedLevel,
      courseImage: enteredImageURL,
      courseOverview: enteredOverviewURL,
      subject: enteredSubject,
      coursePrice: enteredCoursePrice,
      courseDescription: enteredCourseDescription,
      summary: summaryValue,
      requirements: requirementsValue,
    };
    if (handleFormValidation()) {
      props.onSave(data);
    } else {
      window.scrollTo(0, 0, "smooth");
    }
  };

  return (
    <div>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openContract}
      >
        <Contract acceptContract={acceptContract}></Contract>
      </Backdrop>
      <div
        class={
          emptyCourseDescription ||
          emptyCoursePrice ||
          emptyCourseSubject ||
          emptyCourseTitle ||
          emptyOverviewURL ||
          !validOverviewURL
            ? "p-4 mt-3 text-red-900 bg-red-50 border rounded-md mx-8"
            : "hidden"
        }
      >
        <div class="flex justify-between flex-wrap">
          <div class="w-0 flex-1 flex">
            <div class="mr-3 pt-1">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M13.6086 3.247l8.1916 15.8c.0999.2.1998.5.1998.8 0 1-.7992 1.8-1.7982 1.8H3.7188c-.2997 0-.4995-.1-.7992-.2-.7992-.5-1.1988-1.5-.6993-2.4 5.3067-10.1184 8.0706-15.385 8.2915-15.8.3314-.6222.8681-.8886 1.4817-.897.6135-.008 1.273.2807 1.6151.897zM12 18.95c.718 0 1.3-.582 1.3-1.3 0-.718-.582-1.3-1.3-1.3-.718 0-1.3.582-1.3 1.3 0 .718.582 1.3 1.3 1.3zm-.8895-10.203v5.4c0 .5.4.9.9.9s.9-.4.9-.9v-5.3c0-.5-.4-.9-.9-.9s-.9.4-.9.8z"></path>
              </svg>
            </div>
            <div>
              <h4 class="text-md mt-[5px] leading-6 font-medium">{warning}</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 mx-8 my-4 rounded-md p-6">
        <form onSubmit={submitHandler}>
          <label className="text-lg font-medium">Basic Information:</label>
          <div className="md:grid grid-cols-2 space-y-4">
            <div className={"flex justify-center items-center border-red-200"}>
              <label className="w-32">
                Course Title <span className="text-red-600"> *</span>
              </label>
              <input
                className={"w-[60vw] md:w-[27vw] px-3 py-1 bg-white border  rounded-md text-sm shadow-sm focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue ".concat(
                  emptyCourseTitle ? "border-red-200" : "border-slate-300"
                )}
                onChange={courseTitleChangeHandler}
                type="text"
              />
            </div>
            <div className="flex justify-center items-center">
              <label className="w-32">Level</label>
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
              />
            </div>
            <div className="flex justify-center items-center">
              <label className="w-32">
                Overview URL <span className="text-red-600"> *</span>
              </label>
              <input
                className={"w-[60vw] md:w-[27vw] px-3 py-1 bg-white border  rounded-md text-sm shadow-sm focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue ".concat(
                  emptyOverviewURL || !validOverviewURL
                    ? "border-red-200"
                    : "border-slate-300"
                )}
                onChange={overviewURLChangeHandler}
                type="text"
              />
            </div>
            <div className="flex justify-center items-center">
              <label className="w-32">
                Subject <span className="text-red-600"> *</span>
              </label>
              <input
                className={"w-[60vw] md:w-[27vw] px-3 py-1 bg-white border rounded-md text-sm shadow-sm focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue ".concat(
                  emptyCourseSubject ? "border-red-200" : "border-slate-300"
                )}
                onChange={subjectChangeHandler}
                type="text"
              />
            </div>
            <div className="flex justify-center items-center">
              <label className="w-32">
                Price <span className="text-red-600"> *</span>
              </label>
              <input
                className={"w-[55vw] md:w-[25vw] px-3 py-1 bg-white border rounded-md text-sm shadow-sm focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue ".concat(
                  emptyCoursePrice ? "border-red-200" : "border-slate-300"
                )}
                onChange={coursePriceChangeHandler}
                type="number"
                min="0"
              />
              <div className="w-[5vw] md:w-[2vw] flex justify-center text-gray-500">
                $
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="text-lg font-medium">
              Course Description: <span className="text-red-600"> *</span>
            </label>
            <div>
              <textarea
                className={"w-full px-3 py-1 mt-2 bg-white border rounded-md text-sm shadow-sm focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue ".concat(
                  emptyCourseDescription ? "border-red-200" : "border-slate-300"
                )}
                onChange={courseDescriptionChangeHandler}
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
    </div>
  );
};

export default CreateCourseForm;
