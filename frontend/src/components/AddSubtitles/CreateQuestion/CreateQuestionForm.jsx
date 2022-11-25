import { useState, Fragment } from "react";
import SecondaryButton from "../../SecondaryButton";
import PrimaryButton from "../../PrimaryButton";
import Divider from "@mui/material/Divider";

const CreateQuestionForm = (props) => {

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <div className="grid grid-cols-3 pb-3 font-bold">
        <div></div>
        <div className="flex justify-center text-2xl">Section-Info</div>
        <div className="flex justify-end">
          <button
            onClick={props.onCancel}
            className="hover:text-red-600 text-xl"
          >
            x
          </button>
        </div>
      </div>
      <Divider variant="middle" />
      <div>
        <form onSubmit={submitHandler}>
          <div className="first control">
            <label className="block" htmlFor="section-title">
              Section Title
            </label>
            <input
              id="section-title"
              className="w-full mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
        focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
            ></input>
          </div>
          <div className="second control">
            <label className="block" htmlFor="video-URL">
              Video URL (optional)
            </label>
            <input
              id="video_URL"
              className="w-full mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
        focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
            ></input>
          </div>
          <div className="third-control">
            <label className="block" htmlFor="short-description">
              Short Description (optional)
            </label>
            <input
              id="short-description"
              className="w-full h-28 mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
        focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
            ></input>
          </div>
       
          <div className="controls flex justify-end space-x-2 mt-2">
            <PrimaryButton
              className=" rounded-md  "
              text="Confirm"
              type="submit"
            ></PrimaryButton>
          </div>
        </form>
      </div>
      
    </Fragment>
  );
};
export default CreateQuestionForm;
