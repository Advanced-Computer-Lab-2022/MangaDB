import { Fragment, useRef, useState } from "react";
import Divider from "@mui/material/Divider";
import PrimaryButton from "../PrimaryButton";
import RadioTypes from "./RadioTypes";

const SourceInfo = (props) => {
  const titleRef = useRef();
  const [sourceType, setSourceType] = useState(props.type);
  const linkRef = useRef();
  const typeChangeHandler = (type) => {
    const newSourceData = {
      description: titleRef.current.value,
      sourceType: type.name,
      link: linkRef.current.value,
    };
    props.onSourceEdit(newSourceData);
    setSourceType(type.name);
  };

  const titleChangeHandler = (event) => {

    const newSourceData = {
      description: event.target.value,
      sourceType: sourceType,
      link: linkRef.current.value,
    };
    props.onSourceEdit(newSourceData);
  };

  const linkChangeHandler = (event) => {
    const newSourceData = {
      description: titleRef.current.value,
      sourceType: sourceType,
      link: event.target.value,
    };
    props.onSourceEdit(newSourceData);
  };

  return (
    <Fragment>
      <div className="first control">
        <label className="block" htmlFor="source-title">
          Source Title
        </label>
        <input
          onChange={titleChangeHandler}
          ref={titleRef}
          defaultValue={props.title}
          id="source-title"
          className="w-full mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
        ></input>
      </div>
      <div className="flex gap-10">
        <RadioTypes type={props.type} onChange={typeChangeHandler}></RadioTypes>
      </div>
      <div className="third-control">
        <label className="block" htmlFor="link">
          Link
        </label>
        <input
          onChange={linkChangeHandler}
          defaultValue={props.link}
          ref={linkRef}
          id="link"
          className="w-full mt-1 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
        ></input>
      </div>
    </Fragment>
  );
};
export default SourceInfo;
