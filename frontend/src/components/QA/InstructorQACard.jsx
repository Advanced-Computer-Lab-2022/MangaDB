import Avatar from "react-avatar";
import SecondaryButton from "../UI/SecondaryButton";
import Modal from "../UI/Modal";
import ReplyForm from "./ReplyForm";
import { useState, Fragment } from "react";
const InstructorQACard = (props) => {
  const [showQAModal, setShowQAModal] = useState(false);

  //handlers
  const showQAHandler = () => {
    setShowQAModal(true);
  };
  const hideQAHandler = () => {
    setShowQAModal(false);
  };
  const onConfirmHandler = (reply) => {
    setShowQAModal(false);
    props.onConfirmReplyHandler(reply);
  };
  return (
    <Fragment>
      {showQAModal && (
        <Modal onClick={hideQAHandler}>
          <ReplyForm
            onClick={hideQAHandler}
            question={props.question}
            courseName={props.courseName}
            onConfirmHandler={onConfirmHandler}
          ></ReplyForm>
        </Modal>
      )}
      <div className=" mt-4 border p-4 rounded-lg relative ">
        <div className="">
          <div className="flex space-x-4 items-center">
            <div className="w-7 h-7 rounded-full">
              <Avatar
                round={true}
                size={30}
                textSizeRatio={2}
                name={props.userName}
              />
            </div>
            <div className="text-lg font-medium">{props.userName}</div>
            <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-yellow-400 text-yellow-500 bg-yellow-100 rounded-full">
              Pending
            </div>
          </div>
          <div className="ml-12">
            <div className="font-semibold mt-2">
              Course: {props.courseName}{" "}
            </div>
            <div className="font-medium text-md text-gray-500">
              Asked on: {props.date}
            </div>
            <div className="mb-2">question: {props.question}</div>
            <div className="md:absolute md:right-2 md:top-2">
              <SecondaryButton
                onClick={showQAHandler}
                text="reply"
              ></SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default InstructorQACard;
