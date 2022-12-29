import React from "react";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import Modal from "../UI/Modal";
import { useState, Fragment } from "react";
import SecondaryButton from "../UI/SecondaryButton";
const Table = (props) => {
  return (
    <Fragment>
      {props.showPromotationModal && (
        <Modal onClick={props.closePromotionModal}>
          <div>
            {props.promotionCourse}
            <label>Amount</label>
            <input className="border"></input>
            <label>Duration</label>
            <input className="border"></input>
          </div>
          <SecondaryButton
            text="submit"
            onClick={props.promotionSubmitHandler}
          ></SecondaryButton>
        </Modal>
      )}
      {props.showReportModal && (
        <Modal onClick={props.closeReportModal}>
          <div>{props.reportCourse}</div>
        </Modal>
      )}
      <div>
        <table className="w-full">
          <thead className="bg-gray-100">
            <TableHeader />
          </thead>
          <tbody className="w-full">
            <TableRows
              promotionData={props.promotionData}
              promotionId={props.promotionId}
              closePromotionModal={props.closePromotionModal}
              openPromotionModal={props.openPromotionModal}
              reportData={props.reportData}
              reportId={props.reportId}
              openReportModal={props.openReportModal}
              closeReportModal={props.closeReportModal}
              rows={props.rows}
            />
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Table;
