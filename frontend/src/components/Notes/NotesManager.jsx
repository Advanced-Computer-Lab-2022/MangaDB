import { useState, Fragment, useEffect } from "react";
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

  //send to the backend the new notes
  useEffect(() => {
    //change the endpoint el variable esmo notes ya reda
    axios.post("/api/notes", notes).then((res) => {
      console.log(res);
    });
  }, [notes]);

  // add delete edit notes
  const addNote = (note) => {
    var obj = {
      note: note,
      sourceDescription: props.source,
      subtitleDescription: props.subtitle,
      timestamp: timestamp,
    };
    var newNotes =[...notes,obj]
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
  return (
    <Fragment>
      <Video
        playing={playing}
        isVisible={props.isVisible}
        link={props.link}
        onWatch={props.onWatchHandler}
        getTime={timeChangeHandler}
      ></Video>
      <ToolbarTabs
        currentTab={currentTab}
        onTabChangeHandler={onTabChangeHandler}
      ></ToolbarTabs>
      {showNotes && (
        <Notes
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
