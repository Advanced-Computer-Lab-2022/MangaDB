import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressIcon = (props) => {
  const percentage = (+props.progress / +props.totalSources) * 100;
  return (
    <CircularProgressbar
      styles={{
        root: { width: "54px", height: "54px" },
        text: { fill: "black" },
        path: { stroke: "#74a0d1" }
      }}
      value={percentage}
      text={`${percentage}% `}
    ></CircularProgressbar>
  );
};
export default ProgressIcon;
