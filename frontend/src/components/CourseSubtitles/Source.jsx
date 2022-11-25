import { useState, Fragment } from "react";
import Video from "../Video/Video";
import SourceInfo from "../AddSubtitles/SourceInfo";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const Source = (props) => {
  const [sourceDuration, setSourceDuration] = useState(0);
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

  var sourceIcon;
  if (props.type === "Quiz") {
    sourceIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-5 mt-1 mr-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
    );
  } else {
    sourceIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-5 mt-1 mr-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
        />
      </svg>
    );
  }
  const getDuration = (duration) => {
    if (sourceDuration !== duration) {
      setSourceDuration(duration);
    }
  };

  return (
    <Fragment>
      {props.isOpened && (
        <Accordion icon={icon} open={isOpened} animate={customAnimation}>
          <div className="space-x-0 items-center mr-4">
            <AccordionHeader onClick={handleOpen}>
              <div className="flex">
                {sourceIcon} {props.title}
              </div>
              <Video
                isVisible={false}
                getSourceDuration={getDuration}
                link={props.link}
              ></Video>
              {sourceDuration}
            </AccordionHeader>
          </div>
          <AccordionBody>
            <SourceInfo
              onSourceEdit={props.onSourceEdit}
              link={props.link}
              type={props.type}
              title={props.title}
            ></SourceInfo>{" "}
          </AccordionBody>
        </Accordion>
      )}
    </Fragment>
  );
};

export default Source;
