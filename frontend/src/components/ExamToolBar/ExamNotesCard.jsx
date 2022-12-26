import { Fragment, useState } from "react";
import DeleteNote from "./ExamDeleteNote";
import NotesInfo from "./ExamNotesInfo";
const ExamNotesCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const onShowHandler = () => {
    setShowModal(true);
  };
  const onHideHandler = () => {
    setShowModal(false);
  };
  const onShowForm = () => {
    setShowForm(true);
  };
  const onHideForm = () => {
    setShowForm(false);
  };
  var displayedData;
  var minutes = Math.floor(+props.timestamp / 60);
  var seconds = +props.timestamp % 60;
  var zeroS = seconds < 10 ? "0" : "";
  if (showForm) {
    displayedData = (
      <div className="w-[97%]">
        <NotesInfo
          editNote={props.editNote}
          onHidehandler={onHideForm}
          currentNote={props.note}
        />
      </div>
    );
  } else {
    displayedData = (
      <Fragment>
        <div className="flex items-center justify-between space-x-4 m-4">
          <div className="flex">
            <div className="flex items-center">
              <div className="bg-veryLightBlue text-gray-900 text-sm py-[2px] px-2 rounded-lg">
                {minutes + ":" + zeroS + seconds}
              </div>
            </div>
            <div className="ml-4">
              <div className="font-semibold flex-1">
                {props.subtitleDescription}
              </div>
              <div className="text-sm text-gray-500 ml-1">
                {props.sourceDescription}
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <svg
              onClick={onShowForm}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pen-fill"
              viewBox="0 0 16 16"
              className="cursor-pointer"
            >
              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
            </svg>
            <svg
              onClick={onShowHandler}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash-fill"
              viewBox="0 0 16 16"
              className="cursor-pointer"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
          </div>
        </div>
        <div
          className="bg-gray-100 mx-4 p-6"
          dangerouslySetInnerHTML={{ __html: props.note }}
        ></div>
      </Fragment>
    );
  }
  return (
    <Fragment>
      {showModal && (
        <DeleteNote
          onClick={props.deleteNote}
          onCancel={onHideHandler}
        ></DeleteNote>
      )}
      {displayedData}
    </Fragment>
  );
};
export default ExamNotesCard;
