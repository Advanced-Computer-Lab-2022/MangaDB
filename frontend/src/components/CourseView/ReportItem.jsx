import { Divider } from "@mui/material";
import React, { Fragment } from "react";
import Modal from "../UI/Modal";
import SecondaryButton from "../UI/SecondaryButton";

const ReportItem = (props) => {
  return (
    <Fragment>
      {props.showFollowUpModal && (
        <Modal onClick={props.closeFollowUpModal}>
          <div>
            <div className="grid grid-cols-3 mb-2 font-semibold text-lg">
              <div></div>
              <div className="flex justify-center text-center">
                {props.followUpProblem}
              </div>
              <div className="flex justify-end">
                <button
                  className="hover:text-red-600"
                  onClick={props.closeFollowUpModal}
                >
                  x
                </button>
              </div>
            </div>
            <Divider />
            <div className="mt-4">
              <div className="items-center">
                <div className=" font-medium">
                  Follow Up Description:
                </div>
                <div>
                  <textarea
                    className="w-full px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
                    type="date"
                    onChange={props.followUpDescriptionChangeHandler}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <SecondaryButton
              text="Submit"
              onClick={props.followUpSubmitHandler}
            ></SecondaryButton>
          </div>
        </Modal>
      )}
      <div className="m-4">
        <div className="md:flex hidden justify-between">
          <div className="font-medium text-lg">
            {props.index}. Reported on: {props.date}
          </div>
          {props.status === "Resolved" && (
            <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-green-400 text-green-500 bg-green-100 rounded-full">
              {props.status}
            </div>
          )}
          {props.status === "Pending" && (
            <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-yellow-400 text-yellow-500 bg-yellow-100 rounded-full">
              {props.status}
            </div>
          )}
          {props.status === "Unseen" && (
            <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-red-400 text-red-500 bg-red-100 rounded-full">
              {props.status}
            </div>
          )}
        </div>
        <div className="md:hidden space-y-2">
          <div className="font-medium text-lg">
            {props.index}. Reported on: {props.date}
          </div>
          {props.status === "Resolved" && (
            <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-green-400 text-green-500 bg-green-100 rounded-full">
              {props.status}
            </div>
          )}
          {props.status === "Pending" && (
            <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-yellow-400 text-yellow-500 bg-yellow-100 rounded-full">
              {props.status}
            </div>
          )}
          {props.status === "Unseen" && (
            <div class="inline-flex items-center py-1 px-2 text-xs font-medium text-center border-2 border-red-400 text-red-500 bg-red-100 rounded-full">
              {props.status}
            </div>
          )}
        </div>
        <div className="text-gray-700 font-light text-sm my-1">
          Type: {props.type}
        </div>
        {props.courseName ? (
          <div className="text-gray-700 font-light text-sm my-1">
            Course: {props.courseName}
          </div>
        ) : (
          <></>
        )}
        <div className="lg:flex lg:justify-between items-center mb-2">
          <div className="mb-2 lg:mb-0 truncate">{props.description}</div>
          {props.status !== "Resolved" && (
            <div>
              <SecondaryButton
                text="Follow Up"
                onClick={props.openFollowUpModal.bind(
                  null,
                  props.id,
                  props.type + ": On " + props.date
                )}
              />
            </div>
          )}
        </div>
        <Divider />
      </div>
    </Fragment>
  );
};

export default ReportItem;
