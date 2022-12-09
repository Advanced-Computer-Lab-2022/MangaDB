import { Fragment, useState } from "react";
import NotesForm from "./NotesForm";
import NotesCard from "./NotesCard";
const Notes = (props) => {
  const [showForm, setShowForm] = useState(false);
  const onShowHandler = () => {
    props.stopVideo();
    setShowForm(true);
  };
  const onHidehandler = () => {
    setShowForm(false);
  };
  const displayedNotes = props.notes.map((note ,index) => {
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
  return (
    <Fragment>
      {!showForm && (
        <div
          onClick={onShowHandler}
          className="relative bg-white text-gray-500 border border-gray-500 p-4 m-4 cursor-pointer hover:bg-gray-200"
        >
          Create a new note at {props.timestamp}
          <div className="absolute right-2 bottom-5 text-black">
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
        <div className="flex items-center space-x-2 ">
          <div className="bg-black text-white rounded-full px-2 font-semibold  ">
            {props.timestamp}
          </div>
          <NotesForm
            addNote={props.addNote}
            onHidehandler={onHidehandler}
            resumeVideo={props.resumeVideo}
          ></NotesForm>
        </div>
      )}
      <div className="mt-8"> {displayedNotes}</div>
    </Fragment>
  );
};
export default Notes;
