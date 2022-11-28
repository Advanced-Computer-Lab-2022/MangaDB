import { React, useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import SubtitleBody from "./SubtitleBody";

const SubtitleAccordion = (props) => {
  useEffect(() => {
    console.log(
      document
        .getElementsByClassName("AccordionOpenButton")[0]
        .parentElement.classList.add("AccordionOpenParent")
    );
  }, []);
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
  const sources = props.sources.map((source) => {
    return (
      <SubtitleBody
        onClick ={props.onClick}
        description={source.description}
        //duration={source.duration}
        duration="5"
        type={source.sourceType}
        link = {source.link}
        id={source._id}
      />
    );
  });
  return (
    <Accordion icon={icon} open={isOpened} animate={customAnimation}>
      <AccordionHeader
        className="text-md font-medium AccordionOpenButton"
        onClick={handleOpen}
      >
        <div>{props.title}</div>
        <div className="flex justify-end absolute right-10 mob:relative mob:right-0 min-w-[40px] bg-gray-100 px-4 shadow-md rounded-3xl">
          {props.duration} mins
        </div>
      </AccordionHeader>
      <AccordionBody className="opacity-0 transition ease-out duration-150 ml-6 w-auto">
        {sources}
      </AccordionBody>
    </Accordion>
  );
};

export default SubtitleAccordion;
