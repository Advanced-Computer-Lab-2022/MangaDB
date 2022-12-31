import React from "react";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import Modal from "../UI/Modal";
import { Fragment } from "react";
import SecondaryButton from "../UI/SecondaryButton";
import { Divider } from "@mui/material";
import ReportTypeSelector from "../CourseView/ReportTypeSelector";



const Table = (props) => {
  return (
    <Fragment>
      {props.showPromotationModal && (
        <Modal onClick={props.closePromotionModal}>
          <div>
            <div className="grid grid-cols-3 mb-2 font-semibold text-lg">
              <div></div>
              <div className="flex justify-center text-center">{props.promotionCourse}</div>
              <div className="flex justify-end">
                <button
                  className="hover:text-red-600"
                  onClick={props.closePromotionModal}
                >
                  x
                </button>
              </div>
            </div>
            <Divider />
            <div className="mt-4 sm:flex">
              <div className="flex justify-start items-center w-1/2 space-x-2">
                <label>Discount Percentage:</label>
                <input
                  className="w-20 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
                  type="number"
                  min="1"
                  max="100"
                  onChange={props.promotionAmountChangeHandler}
                />
              </div>
              <div className="flex justify-end items-center w-1/2 space-x-2">
                <label>Discount End Date:</label>
                <input
                  className=" w-32 px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
                  type="date"
                  onChange={props.promotionEndDateChangeHandler}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <SecondaryButton
              text="Submit"
              onClick={props.promotionSubmitHandler}
            ></SecondaryButton>
          </div>
        </Modal>
      )}
      {props.showReportModal && (
        <Modal onClick={props.closeReportModal}>
          <div>
            <div className="grid grid-cols-3 mb-2 font-semibold text-lg">
              <div></div>
              <div className="flex justify-center text-center">{props.reportCourse}</div>
              <div className="flex justify-end">
                <button
                  className="hover:text-red-600"
                  onClick={props.closeReportModal}
                >
                  x
                </button>
              </div>
            </div>
            <Divider />
            <div className="mt-4">
              <div className="text-lg font-medium">
                Type:
              </div>
              <ReportTypeSelector
                selected={props.currentReportsSelector}
                selectedChangeHandler={props.reportSelectorChangeHandler}
              />
            </div>
            <div>
              <div className="text-lg font-medium mt-4">
                Report Your Problem:
              </div>
              <textarea
                  className="w-full px-3 py-1 bg-white border border-slate-300 rounded-md text-sm shadow-sm
            focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue"
                  onChange={props.enteredReportChangeHandler}
                />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <SecondaryButton
              text="Submit"
              onClick={props.reportSubmitHandler}
            ></SecondaryButton>
          </div>
        </Modal>
      )}
      <div>
        <table className="w-full">
          <thead className="bg-gray-100">
            <TableHeader admin={props.admin} selectAllHandler={props.selectAllHandler}/>
          </thead>
          <tbody className="w-full">
            <TableRows
              promotionId={props.promotionId}
              promotionAmount={props.promotionAmount}
              promotionEndDate={props.promotionEndDate}
              closePromotionModal={props.closePromotionModal}
              openPromotionModal={props.openPromotionModal}
              reportData={props.reportData}
              reportId={props.reportId}
              openReportModal={props.openReportModal}
              closeReportModal={props.closeReportModal}
              rows={props.rows}
              viewCourse={props.viewCourse}
              admin={props.admin}
              selected={props.selected}
            />
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Table;
