import { useState } from "react";
import SubtitleInfo from "../AddSubtitles/SubtitleInfo";
import AddIcon from "@mui/icons-material/Add";
import SourceForm from "../AddSubtitles/SourceForm";
import DeleteSubtitle from "../AddSubtitles/DeleteSubtitle";
import { ThemeProvider } from "@material-tailwind/react";

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
  const [sourceModalShown, setSourceModalShown] = useState(false);
  const showSourceModal = () => {
    setSourceModalShown(true);
  };
  const hideSourceModal = () => {
    setSourceModalShown(false);
  };
  const addSourceHandler = (sourceData) => {
    props.onAdd(sourceData);
    setSourceModalShown(false);
  };

  const handleOpen = () => {
    setIsOpened((prevOpen) => !prevOpen);
  };
  const customAnimation = {
    mount: { scale: 1, opacity: 1 },
    unmount: { scale: 0.9 },
  };

  const addSourceIcon = (
    <div className="flex justify-end">
      <button className="rounded-full h-12 flex" onClick={showSourceModal}>
        <AddIcon />
      </button>
    </div>
  );

  const theme = {
    AccordionBody: {
      styles: {
        bgColor: "bg-red",
      },
    },
  };

  //added the if
  if (props.sources) {
    var Body = props.sources.map((source, index) => {
      return (
        <Source
          onSourceEdit={props.onSourceEdit.bind(null, index)}
          isOpened={isOpened}
          title={source.description}
          type={source.sourceType}
          link={source.link}
          duration={source.duration}
        ></Source>
      );
    });
  }
  const showAlertHandler = () => {
    setModalShown(true);
  };
  const hideAlertHandler = () => {
    setModalShown(false);
  };
  const deleteSubtitleHandler = () => {
    setModalShown(false);
    props.onSubtitleRemove();
  };

  const icon = isOpened ? (
    <KeyboardArrowUpRoundedIcon />
  ) : (
    <KeyboardArrowDownRoundedIcon />
  );

  return (
    <ThemeProvider value={theme}>
      <Accordion icon={icon} open={isOpened} animate={customAnimation}>
        {ModalShown && (
          <DeleteSubtitle
            onClick={deleteSubtitleHandler}
            onCancel={hideAlertHandler}
          ></DeleteSubtitle>
        )}
        <div className="space-x-0 items-center mr-4">
          <AccordionHeader onClick={handleOpen}>
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
        <AccordionBody className="opacity-0 transition ease-out duration-150 mt-10">{addSourceIcon}</AccordionBody>
        {sourceModalShown && (
          <AccordionBody className ="opacity-0 transition ease-out duration-150">
            {" "}
            <SourceForm
              isOpened={isOpened}
              onCancel={hideSourceModal}
              onConfirm={addSourceHandler}
            ></SourceForm>
          </AccordionBody>
        )}
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
    </ThemeProvider>
  );
};
export default Subtitle;
