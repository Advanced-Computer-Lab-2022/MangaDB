import { useRef, useState } from "react";
import SecondaryButton from "../SecondaryButton";
import ReactPlayer from "react-player";
const youtubeEmbed = require("youtube-embed");
const Video = (props) => {
  const [playing, setIsPlaying] = useState(true);
  const playerRef = useRef();

  //pass the embedded link or the video link both work
  const embeddedURL = youtubeEmbed(props.link);
  const onClickhandler = () => {
    setIsPlaying(!playing);
    console.log(playerRef.current.getDuration() / 60);
    console.log(playerRef.current.getCurrentTime());
  };
  
  //needed to get the video duration from the url in case of Addcourse
  const onReadyHandler =() => {
    console.log(playerRef.current.getDuration() / 60);
  }

  //set the display to none if in AddCourse to get the duration and to block if in coursePage
  const displayed = props.isVisible? 'block': 'none';

    return (
      <div style={{display:displayed}}>
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
