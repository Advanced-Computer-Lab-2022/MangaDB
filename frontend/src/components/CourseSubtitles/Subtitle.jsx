import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
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
  //added the if
  if(props.sources){
    var Body = props.sources.map((source) => {
      return <Source title = {source.description} type ="Video"> </Source>;
    });
  }

  const icon = isOpened ? (
    <KeyboardArrowUpRoundedIcon />
  ) : (
    <KeyboardArrowDownRoundedIcon />
  )

  return (
    <Accordion icon={icon} open={isOpened} animate={customAnimation}>
      <div className="space-x-0 items-center mr-4">
        <AccordionHeader className="text-lg font-medium" onClick={handleOpen}>
          {props.subtitleHeader}
        </AccordionHeader>
      </div>
      {Body} 
      <AccordionBody>{props.icon}</AccordionBody>
    </Accordion>
  );
};
export default Subtitle;
