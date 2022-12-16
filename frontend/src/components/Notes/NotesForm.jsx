import { useState } from "react";
import TertiaryButton from "../UI/TertiaryButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SecondaryButton from "../UI/SecondaryButton";
var toolbarOptions = [
  ["bold", "italic", "underline"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ font: [] }],
];

const NotesForm = (props) => {
  const defaultNote = props.currentNote ? props.currentNote : "";
  const [currentNote, setCurrentNote] = useState(defaultNote);

  const changeHandler = (event) => {
    setCurrentNote(event);
  };

  const cancelHandler = () => {
    props.onHidehandler();
    props.resumeVideo();
  };
  const onSaveHandler = () => {
    props.addNote(currentNote);
    props.onHidehandler();
    props.resumeVideo();
  };

  return (
    <div className="m-4 w-full">
      <ReactQuill
        modules={{ toolbar: toolbarOptions }}
        className="bg-white rounded-md"
        value={currentNote}
        onChange={changeHandler}
      />
      <div className="flex justify-end items-center mt-2">
        <TertiaryButton onClick={cancelHandler} text="Cancel"></TertiaryButton>
        <SecondaryButton
          onClick={onSaveHandler}
          className="ml-2"
          text="Save Note"
        ></SecondaryButton>
      </div>
    </div>
  );
};
export default NotesForm;
