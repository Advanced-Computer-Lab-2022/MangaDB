import Card from "../UI/Card";
import SignalCellularAlt1BarIcon from "@mui/icons-material/SignalCellularAlt1Bar";
import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
const CourseCard = (props) => {
  var level;
  if (props.level === "Advanced") {
    level = <SignalCellularAltIcon></SignalCellularAltIcon>;
  } else if (props.level === "Intermediate") {
    level = <SignalCellularAlt2BarIcon></SignalCellularAlt2BarIcon>;
  } else {
    level = <SignalCellularAlt1BarIcon></SignalCellularAlt1BarIcon>;
  }

  return (
    <Card className="font-mono">
      <div className="w-auto">
        <img src={props.image} alt="" />
      </div>
      <div className="font-bold text-lg">{props.title}</div>
      <div className="bg-lightGrey h-8 text-center space-x-4">
        <span className="align-middle">
          {level}
          {props.level}
        </span>
        <span className="align-middle">
          <AccessTimeIcon />
          {props.duration}
        </span>
        <span className="align-middle">
          {props.reviews}
        </span>
      </div>
      <div className="font-semibold">{props.subject}</div>
      <div>{props.instructorName}</div>
      <div className="bg-primaryBlue text-white rounded-md max-w-[20%] text-center
       bottom-0 right-0">{props.price}</div>
    </Card>
    
  );
};
export default CourseCard;
