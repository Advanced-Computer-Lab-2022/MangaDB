import { Fragment, useRef, useState } from "react";
import Divider from "@mui/material/Divider";
import PrimaryButton from "../PrimaryButton";
import RadioTypes from "./RadioTypes";
const SourceForm = (props) => {
  const titleRef = useRef();
  const [sourceType, setSourceType] = useState("video");
  const linkRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const title = titleRef.current.value;
    const link = linkRef.current.value;
    var type;
    if (sourceType === "file") type = "file";
    else type = "video";
    const sourceData = {
      title,
      type,
      link,
    };
    props.onConfirm(sourceData);
  };
  const typeChangeHandler = (type) => {
    setSourceType(type.name)
  }
  return (
    <Fragment>
      <div className="grid grid-cols-3 pb-3 font-bold">
        <div></div>
        <div className="flex justify-center text-2xl">Source-Info</div>
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
            <label className="block" htmlFor="source-title">
              Source Title
            </label>
            <input
              ref={titleRef}
              id="source-title"
              className="w-full mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
            ></input>
          </div>
          <div className="flex gap-10">
            <RadioTypes onChange={typeChangeHandler}></RadioTypes>
          </div>
          <div className="third-control">
            <label className="block" htmlFor="link">
              Link
            </label>
            <input
              ref={linkRef}
              id="link"
              className="w-full mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
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
export default SourceForm;
