import Card from "../UI/Card";
import SignalCellularAlt1BarIcon from "@mui/icons-material/SignalCellularAlt1Bar";
import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
const CourseCard = (props) => {
  var level;
  console.log(props.level);
  if (props.level === "Advanced") {
    level = <SignalCellularAltIcon></SignalCellularAltIcon>;
  } else if (props.level === "Intermediate") {
    level = <SignalCellularAlt2BarIcon></SignalCellularAlt2BarIcon>;
  } else {
    level = <SignalCellularAlt1BarIcon></SignalCellularAlt1BarIcon>;
  }

  return (
    <Card>
      <div>
        <img src={props.image} alt="" />
      </div>
      <div>{props.title}</div>
      <div>
        <span>
          {level}
          {props.level}
        </span>
        <span>
          <AccessTimeIcon />
          {props.duration}
        </span>
        <span>{props.reviews}</span>
      </div>
      <div>{props.subject}</div>
      <div>{props.instructorName}</div>
      <div>{props.price}</div>
    </Card>
  );
};
export default CourseCard;
