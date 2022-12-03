import { useState, Fragment } from "react";
import SourceInfo from "../AddSubtitles/SourceInfo";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import DeleteSubtitle from "../AddSubtitles/DeleteSubtitle";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
const Source = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const [ModalShown, setModalShown] = useState(false);
  const handleOpen = () => {
    setIsOpened((prevOpen) => !prevOpen);
  };
  const customAnimation = {
    mount: { scale: 1, opacity: 1 },
    unmount: { scale: 0.9 },
  };

  const showAlertHandler = () => {
    setModalShown(true);
  };
  const hideAlertHandler = () => {
    setModalShown(false);
  };

  const icon = isOpened ? (
    <KeyboardArrowUpRoundedIcon />
  ) : (
    <KeyboardArrowDownRoundedIcon />
  );

  var sourceIcon;
  if (props.source.sourceType === "Quiz") {
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

  return (
    <div className="px-20">
      {props.isOpened && (
        <Accordion icon={icon} open={isOpened} animate={customAnimation}>
          {ModalShown && (
            <DeleteSubtitle
              onClick={props.onRemoveSourceHandler}
              type="source"
              onCancel={hideAlertHandler}
            ></DeleteSubtitle>
          )}
          <div className="space-x-0 items-center mr-4">
            <AccordionHeader onClick={handleOpen}>
              {/* <div className="flex font-light text-md">
                {sourceIcon} {props.source.description}
              </div> */}
              <div className="flex font-light text-md">
                {sourceIcon} {props.source.description}
              </div>
              <div className="flex justify-end font-light text-md absolute right-10 mob:relative mob:right-0 min-w-[40px] bg-gray-100 px-4 shadow-md rounded-3xl">
                {props.source.sourceDuration} mins
              </div>
            </AccordionHeader>
          </div>
          <AccordionBody className="opacity-0 transition ease-out duration-150">
            <SourceInfo
              onSourceEdit={props.onSourceEdit}
              source={props.source}
              isOpened={isOpened}
            ></SourceInfo>{" "}
          </AccordionBody>
          <AccordionBody className="opacity-0 transition ease-out duration-150 px-20">
            <button
              type="button"
              onClick={showAlertHandler}
              className="mb-2 inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
            >
              Delete Source
            </button>
          </AccordionBody>
        </Accordion>
      )}
    </div>
  );
};

export default Source;
