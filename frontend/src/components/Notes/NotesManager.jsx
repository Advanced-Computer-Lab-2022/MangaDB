import { useState, Fragment } from "react";
import axios from "axios";
import Notes from "./Notes";
import Video from "../Video/Video";
import ToolbarTabs from "./ToolbarTabs";

const NotesManager = (props) => {
  const [showNotes, setShowNotes] = useState(false);
  const [currentTab, setCurrentTab] = useState("");
  const [timestamp, setTimeStamp] = useState(0);
  const [playing, setPlaying] = useState(true);


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
    for (var i = 0; i < props.notes.length; i++) {
      if (props.notes[i].sourceId === props.currentSourceId) {
        temp.push(props.notes[i]);
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
      notes: [...temp, obj],
    };
    var newNotes = [...props.notes, obj];
    axios.patch(
      `http://localhost:3000/user/notes/${props.studentId}`,
      sentData
    );
    props.setNotes(newNotes);
  };

  const editNote = (noteIndex, newNote) => {
    var newNotes = [];
    var sourceId;
    for (var i = 0; i < props.notes.length; i++) {
      if (noteIndex === i) {
        sourceId = props.notes[i].sourceId;
        var obj = {
          ...props.notes[i],
          note: newNote,
        };
        newNotes.push(obj);
      } else {
        newNotes.push(props.notes[i]);
      }
    }

    var temp = [];

    for (var j = 0; j < newNotes.length; j++) {
      if (newNotes[j].sourceId === sourceId) {
        temp.push(newNotes[j]);
      }
    }

    var sentData = {
      courseId: props.courseId,
      sourceId: sourceId,
      notes: temp,
    };
    axios.patch(
      `http://localhost:3000/user/notes/${props.studentId}`,
      sentData
    );
    props.setNotes(newNotes);
  };

  const deleteNote = (noteIndex) => {
    var newNotes = [];
    var sourceId;
    for (var i = 0; i < props.notes.length; i++) {
      if (noteIndex !== i) {
        newNotes.push(props.notes[i]);
      } else {
        sourceId = props.notes[i].sourceId;
      }
    }

    var temp = [];

    for (var j = 0; j < newNotes.length; j++) {
      if (newNotes[j].sourceId === sourceId) {
        temp.push(newNotes[j]);
      }
    }
    var sentData = {
      courseId: props.courseId,
      sourceId: sourceId,
      notes: temp,
    };
    axios.patch(
      `http://localhost:3000/user/notes/${props.studentId}`,
      sentData
    );
    props.setNotes(newNotes);
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
    props.changeNotesFilter(newSelected);
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
          selected={props.currentNotesFilter}
          selectedChangeHandler={selectedChangeHandler}
          timestamp={timestamp}
          stopVideo={stopVideo}
          notes={props.notes}
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
