import React from "react";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import Modal from "../UI/Modal";
import { useState, Fragment } from "react";
import SecondaryButton from "../UI/SecondaryButton";
const Table = (props) => {
  const [showPromotationModal, setShowPromotationModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [promotionId, setPromotionId] = useState(-1);
  const [promotionCourse, setPromotionCourse] = useState("");
  const [promotionData, setPromotionData] = useState({});
  const openPromotionModal = (id, course) => {
    setShowPromotationModal(true);
    setPromotionId(id);
    setPromotionCourse(course);
    //console.log(showPromotationModal);
  };

  const closePromotionModal = () => {
    setShowPromotationModal(false);
  };

  const openReportModal = () => {
    setShowReportModal(true);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
  };

  const promotionSubmitHandler = () => {
    closePromotionModal();
    //axios post you have the course id.. 
    //set the promotion data ..
  };
  return (
    <Fragment>
      {showPromotationModal && (
        <Modal onClick={closePromotionModal}>
          <div>
            {promotionCourse}
            <label>Amount</label>
            <input className="border"></input>
            <label>Duration</label>
            <input className="border"></input>
          </div>
          <SecondaryButton text="submit" onClick={promotionSubmitHandler}></SecondaryButton>
        </Modal>
      )}
      {showReportModal && <Modal></Modal>}
      <div>
        <table className="w-full">
          <thead className="bg-gray-100">
            <TableHeader />
          </thead>
          <tbody className="w-full">
            <TableRows
              promotionData={promotionData}
              promotionId={promotionId}
              closePromotionModal={closePromotionModal}
              openPromotionModal={openPromotionModal}
              rows={props.rows}
            />
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Table;
