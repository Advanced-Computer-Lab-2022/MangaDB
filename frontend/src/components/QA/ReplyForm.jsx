import { Fragment, useState } from "react";
import Divider from "@mui/material/Divider";
import SecondaryButton from "../UI/SecondaryButton";
const ReplyForm = (props) => {
  const [reply, setReply] = useState("");
  const onChangeHandler = (event) => {
    setReply(event.target.value);
  };
  const onConfirmHandler = () => {
    props.onConfirmHandler(reply);
  };
  return (
    <Fragment>
      <div className="grid grid-cols-3 pb-3 font-bold">
        <div></div>
        <div className="flex justify-center text-2xl">Reply</div>
        <div className="flex justify-end">
          <button
            className="hover:text-red-600 text-xl"
            onClick={props.onClick}
          >
            x
          </button>
        </div>
      </div>
      <Divider variant="middle" />
      <div className="font-semibold mt-4">Course: {props.courseName} </div>
      <div className="mb-2 mt-1"><p className="text-gray-900 inline first-letter: font-medium">Question:</p> {props.question}</div>
      <div>
        Your Answer: 
        <textarea
          value={reply}
          onChange={onChangeHandler}
          className="w-full bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
        />
      </div>

      <SecondaryButton
        text="confirm"
        onClick={onConfirmHandler}
      ></SecondaryButton>
    </Fragment>
  );
};
export default ReplyForm;
