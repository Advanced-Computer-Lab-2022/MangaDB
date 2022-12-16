import { useState, Fragment } from "react";
import axios from "axios";
import Notes from "./Notes";
import Video from "../Video/Video";
import ToolbarTabs from "./ToolbarTabs";

const NotesManager = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [showNotes, setShowNotes] = useState(false);
  const [currentTab, setCurrentTab] = useState("");
  const [timestamp, setTimeStamp] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [selected, setSelected] = useState({ id: 1, name: "All Lessons" });

  // add delete edit notes
  const addNote = (note) => {
    var obj = {
      sourceId: props.currentSourceId,
      note: note,
      sourceDescription: props.source,
      subtitleDescription: props.subtitle,
      timestamp: timestamp,
    };
    var temp = [];
    var flag = false;
    for (var i = 0; i < notes.length; i++) {
      if (notes[i].sourceId === props.currentSourceId) {
        temp.push(notes[i]);
        flag = true;
      } else {
        if (flag) {
          break;
        }
      }
    }
    var sentData = {
      courseId: props.courseId,
      sourceId: props.currentSourceId,
      notes: temp,
    };
    var newNotes = [...notes, obj];
    axios.patch(`http://localhost:3000/user/notes/${props.studentId}` , sentData)
    setNotes(newNotes);
  };
  const editNote = (noteIndex, newNote) => {
    var newNotes = [];
    for (var i = 0; i < notes.length; i++) {
      if (noteIndex === i) {
        var obj = {
          ...notes[i],
          note: newNote,
        };
        newNotes.push(obj);
      } else {
        newNotes.push(notes[i]);
      }
    }
    setNotes(newNotes);
  };

  const deleteNote = (noteIndex) => {
    var newNotes = [];
    for (var i = 0; i < notes.length; i++) {
      if (noteIndex !== i) {
        newNotes.push(notes[i]);
      }
    }
    setNotes(newNotes);
  };

  //controls
  const timeChangeHandler = (time) => {
    setTimeStamp(time);
  };
  const stopVideo = () => {
    setPlaying(false);
  };
  const resumeVideo = () => {
    setPlaying(true);
  };

  const onTabChangeHandler = (tab) => {
    setCurrentTab(tab);
    if (tab === "Notes") {
      setShowNotes(true);
    } else {
      setShowNotes(false);
    }
  };

  const selectedChangeHandler = (newSelected) => {
    setSelected(newSelected);
  };

  return (
    <Fragment>
      <Video
        playing={playing}
        isVisible={props.isVisible}
        link={props.link}
        onWatch={props.onWatch}
        getTime={timeChangeHandler}
      ></Video>
      <ToolbarTabs
        currentTab={currentTab}
        onTabChangeHandler={onTabChangeHandler}
      ></ToolbarTabs>
      {showNotes && (
        <Notes
          selected={selected}
          selectedChangeHandler={selectedChangeHandler}
          timestamp={timestamp}
          stopVideo={stopVideo}
          notes={notes}
          resumeVideo={resumeVideo}
          addNote={addNote}
          editNote={editNote}
          deleteNote={deleteNote}
        ></Notes>
      )}
    </Fragment>
  );
};
export default NotesManager;
