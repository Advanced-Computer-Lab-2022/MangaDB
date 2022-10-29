import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
} from "@material-tailwind/react";
import Divider from "@mui/material/Divider";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Source from "./Source"
const Subtitle = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const handleOpen = () => {
    setIsOpened((prevOpen) => !prevOpen);
  };
  const customAnimation = {
    mount: { scale: 1 ,  opacity: 1},
    unmount: { scale: 0.9 },
   
  };

  var Body = props.sources.map((source) => {
    return <Source title = {source.title} type ="Video"> </Source>;
  });

  const icon = isOpened ? (
    <KeyboardArrowUpRoundedIcon />
  ) : (
    <KeyboardArrowDownRoundedIcon />
  )

  return (
    <Accordion icon={icon} open={isOpened} animate={customAnimation}>
      <div className="space-x-0 items-center mr-4">
        <div>
        <AccordionHeader className="text-lg font-medium" onClick={handleOpen}>
          {props.subtitleHeader}
        </AccordionHeader>
        </div>
      </div>
      {Body}
    </Accordion>
  );
};
export default Subtitle;
