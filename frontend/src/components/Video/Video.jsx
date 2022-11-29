import { useRef, useState } from "react";
import SecondaryButton from "../SecondaryButton";
import ReactPlayer from "react-player";
const youtubeEmbed = require("youtube-embed");
const Video = (props) => {

  //set the display to none if in AddCourse to get the duration and to block if in coursePage
  const displayed = props.isVisible ? "block" : "none";
  const defaultState = displayed==="none"? true: false;

  const [playing, setIsPlaying] = useState(false);

  const playerRef = useRef();
  //pass the embedded link or the video link both work
  const embeddedURL = youtubeEmbed(props.link);
  const onClickhandler = () => {
    setIsPlaying(!playing);
    console.log(playerRef.current.getDuration() / 60);
    console.log(playerRef.current.getCurrentTime());
  };

  //needed to get the video duration from the url in case of Addcourse
  const onReadyHandler = () => {
    props.getSourceDuration((playerRef.current.getDuration() / 60).toFixed(0));
  };

  return (
    <div style={{ display: displayed }}>
      <ReactPlayer
        controls={true}
        playing={playing}
        ref={playerRef}
        url={embeddedURL}
        onReady={onReadyHandler}
      />
      <SecondaryButton onClick={onClickhandler}> Notes</SecondaryButton>
    </div>
  );
};
export default Video;
