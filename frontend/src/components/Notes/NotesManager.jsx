import { useState, Fragment } from "react";
import Notes from "./Notes";
import Video from "../Video/Video";
import ToolbarTabs from "./ToolbarTabs";

const NotesManager = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [showNotes, setShowNotes] = useState(false);
  const [currentTab, setCurrentTab] = useState("");
  const [timestamp, setTimeStamp] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timeChangeHandler = (time) => {
    setTimeStamp(time);
  };
  const stopVideo = () => {
    setPlaying(false);
  };
  const resumeVideo = () => {
    setPlaying(true);
  }
  
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
        ></Notes>
      )}
    </Fragment>
  );
};
export default NotesManager;
