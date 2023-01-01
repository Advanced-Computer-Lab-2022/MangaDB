import { React, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import SubtitleBodyCourseView from "./SubtitleBodyCourseView";

const SubtitleAccordionCourseView = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const handleOpen = () => {
    setIsOpened((prevOpen) => !prevOpen);
  };
  const customAnimation = {
    mount: { scale: 1, opacity: 1 },
    unmount: { scale: 0.9 },
  };
  const icon = isOpened ? (
    <KeyboardArrowUpRoundedIcon />
  ) : (
    <KeyboardArrowDownRoundedIcon />
  );
  var description;
 
  var sourceCount = 0;
  const sources = props.sources.map((source, index) => {
    description = `${index + 1 }. `.concat(
      source.description
    );
    sourceCount++;
    return (
      <SubtitleBodyCourseView
        onClick={props.onClick}
        description={description}
        duration={source.sourceDuration}
        type={source.sourceType}
        link={source.link}
        id={source._id}
        source={source}
      />
    );
  });
  return (
    <Accordion icon={icon} open={isOpened} animate={customAnimation}>
      <AccordionHeader className="text-md font-medium" onClick={handleOpen}>
        <div>
          <div className="truncate flex justify-start">{props.title}</div>
          <div className="flex justify-start font-light text-sm ml-4">
            {sourceCount} sources | {props.duration} mins
          </div>
        </div>
      </AccordionHeader>
      <AccordionBody className="opacity-0 transition ease-out duration-150 ml-3 w-auto">
        {sources}
      </AccordionBody>
    </Accordion>
  );
};

export default SubtitleAccordionCourseView;
