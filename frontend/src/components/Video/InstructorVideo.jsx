import ReactPlayer from "react-player";
const youtubeEmbed = require("youtube-embed");
const Video = (props) => {
  const embeddedURL = youtubeEmbed(props.link); 
  return (
    <div className="h-full">
      <ReactPlayer
        width={"100%"}
        height="100%"
        controls={true}
        url={embeddedURL}
      />
    </div>
  );
};
export default Video;
