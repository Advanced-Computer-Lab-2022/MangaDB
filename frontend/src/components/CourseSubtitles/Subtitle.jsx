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

  return (
    <Accordion className="mb-3 " open={isOpened} animate={customAnimation}>
      <div className="flex space-x-0 items-center mb-3 ">
        <div>
        <AccordionHeader onClick={handleOpen}>
          {props.subtitleHeader}
        </AccordionHeader>
        </div>
        {isOpened ? (
          <KeyboardArrowUpRoundedIcon className="mt-1" />
        ) : (
          <KeyboardArrowDownRoundedIcon className="mt-1"/>
        )}
      </div>
      <Divider variant="middle" />
      {Body}
    </Accordion>
  );
};
export default Subtitle;
