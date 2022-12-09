import { useRef } from "react";

import ReactPlayer from "react-player";
const youtubeEmbed = require("youtube-embed");
const Video = (props) => {
  //set the display to none if in AddCourse to get the duration and to block if in coursePage
  const displayed = props.isVisible ? "block" : "none";
  const playerRef = useRef();
  //pass the embedded link or the video link both work
  const embeddedURL = youtubeEmbed(props.link);
 
  //needed to get the video duration from the url in case of Addcourse
  const onReadyHandler = () => {
    props.getSourceDuration((playerRef.current.getDuration() / 60).toFixed(0));
  };
  const progressHandler = (event) => {
    //will pass the current played to the notes component
    if(props.getTime){
      props.getTime(event.playedSeconds.toFixed(0))
    }

  };
  return (
    <div style={{ display: displayed }}>
      <ReactPlayer
        width={"100%"}
        // height={"100%"}
        controls={true}
        playing={props.playing}
        ref={playerRef}
        url={embeddedURL}
        onPlay={props.onWatch}
        onReady={onReadyHandler}
        onProgress={progressHandler}
      />
    </div>
  );
};
export default Video;
