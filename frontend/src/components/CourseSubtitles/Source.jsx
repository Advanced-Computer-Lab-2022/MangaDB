import { AccordionBody } from "@material-tailwind/react";
const Source = (props) => {
  var icon;
  // var iconPath;
  // if (props.type === "Video") {
  //   iconPath = require("../../assets/videoIcon.png");
  //   icon = <img src={iconPath} alt="video" />;
  // } else {
  //   iconPath = require("../../assets/textIcon.png");
  //   icon = <img src="../assets/textIcon.png" alt="text" />;
  // }
  return (
    <AccordionBody className="opacity-0 transition ease-out duration-150">
      <div className="flex space-x-3 items-center">
        {icon}
        <p >{props.title}</p>
      </div>
    </AccordionBody>
  );
};

export default Source;
