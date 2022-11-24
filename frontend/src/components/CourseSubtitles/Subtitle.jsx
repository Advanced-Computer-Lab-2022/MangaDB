import { useState } from "react";
import SubtitleInfo from "../AddSubtitles/SubtitleInfo";
import DeleteSubtitle from "../AddSubtitles/DeleteSubtitle";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Source from "./Source";
const Subtitle = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const [ModalShown, setModalShown] = useState(false);
  const handleOpen = () => {
    setIsOpened((prevOpen) => !prevOpen);
  };
  const customAnimation = {
    mount: { scale: 1, opacity: 1 },
    unmount: { scale: 0.9 },
  };
  //added the if
  if (props.sources) {
    var Body = props.sources.map((source) => {
      return (
        <Source title={source.description} type="Video">
          {" "}
        </Source>
      );
    });
  }
  const showAlertHandler = () => {
    setModalShown(true);
  };
  const hideAlertHandler = () => {
    setModalShown(false);
  }
  const deleteSubtitleHandler = () => {
    setModalShown(false);
    props.onSubtitleRemove();
  }

  const icon = isOpened ? (
    <KeyboardArrowUpRoundedIcon />
  ) : (
    <KeyboardArrowDownRoundedIcon />
  );

  return (
    <Accordion icon={icon} open={isOpened} animate={customAnimation}>
      {ModalShown && (
        <DeleteSubtitle onClick={deleteSubtitleHandler} onCancel={hideAlertHandler}></DeleteSubtitle>
      )}
      <div className="space-x-0 items-center mr-4">
        <AccordionHeader className="text-lg font-medium" onClick={handleOpen}>
          {props.subtitleHeader}
        </AccordionHeader>
      </div>
      <SubtitleInfo
        title={props.subtitleHeader}
        onSubtitleEdit={props.onSubtitleEdit}
        shortDescription={props.shortDescription}
        introVideoUrl={props.introVideoUrl}
      ></SubtitleInfo>
      {Body}
      <AccordionBody>{props.icon}</AccordionBody>
      <AccordionBody>
        {" "}
        <button
          type="button"
          onClick={showAlertHandler}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
        >
          Delete Subtitle
        </button>
      </AccordionBody>
    </Accordion>
  );
};
export default Subtitle;
