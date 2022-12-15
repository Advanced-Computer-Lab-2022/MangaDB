import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressIcon = (props) => {
  const percentage = 66;
  return (
      <CircularProgressbar
        styles={{
          root: { width: "54px", height: "54px" },
          text: { fill: "black" },
        }}
        value={percentage}
        text={`${percentage}% `}
      ></CircularProgressbar>
  );
};
export default ProgressIcon;
