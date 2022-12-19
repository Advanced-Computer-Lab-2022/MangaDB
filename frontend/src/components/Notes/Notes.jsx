import { Fragment, useState } from "react";
import NotesForm from "./NotesForm";
import NotesCard from "./NotesCard";
import NotesSelector from "./NotesSelector";
const Notes = (props) => {
  const [showForm, setShowForm] = useState(false);
  const onShowHandler = () => {
    props.stopVideo();
    setShowForm(true);
  };
  const onHidehandler = () => {
    setShowForm(false);
  };
  const displayedNotes = props.notes.map((note, index) => {
    return (
      <NotesCard
        editNote={props.editNote.bind(null, index)}
        deleteNote={props.deleteNote.bind(null, index)}
        note={note.note}
        timestamp={note.timestamp}
        sourceDescription={note.sourceDescription}
        subtitleDescription={note.subtitleDescription}
      ></NotesCard>
    );
  });
  var minutes = Math.floor(+props.timestamp / 60);
  var seconds = +props.timestamp % 60;
  var zeroS = seconds < 10 ? "0" : "";
  return (
    <Fragment>
      {!showForm && (
        <div
          onClick={onShowHandler}
          className="relative bg-white text-gray-500 border border-gray-500 p-4 m-4 cursor-pointer hover:bg-gray-200"
        >
          Create a new note at {minutes + ":" + zeroS + seconds}
          <div className="absolute right-2 bottom-5 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-plus-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
            </svg>
          </div>
        </div>
      )}
      {showForm && (
        <div className="flex items-center space-x-2 px-4">
          <div className="bg-veryLightBlue text-gray-900 text-sm py-[2px] px-2 rounded-lg">
            {minutes + ":" + zeroS + seconds}
          </div>
          <NotesForm
            addNote={props.addNote}
            onHidehandler={onHidehandler}
            resumeVideo={props.resumeVideo}
          ></NotesForm>
        </div>
      )}
      <div className=" items-center m-4 w-[50%]">
        <NotesSelector
          selected={props.selected}
          selectedChangeHandler={props.selectedChangeHandler}
        ></NotesSelector>
      </div>

      <div className="mt-8"> {displayedNotes}</div>
    </Fragment>
  );
};
export default Notes;
