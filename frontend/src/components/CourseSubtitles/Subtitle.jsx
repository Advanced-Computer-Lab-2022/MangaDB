import { useState } from "react";
import SubtitleInfo from "../AddSubtitles/SubtitleInfo";
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
import SecondaryButton from "../SecondaryButton";

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
      <SecondaryButton text="Add Source" onClick={showSourceModal} />
  );

  const theme = {
    AccordionBody: {
      styles: {
        bgColor: "bg-red",
      },
    },
  };

  var totalDuration = 0;
  for (var i = 0; i < props.sources.length; i++) {
    totalDuration += +props.sources[i].duration;
  }
  if (props.sources) {
    var Body = props.sources.map((source, index) => {
      return (
        <Source
          onRemoveSourceHandler={props.onRemoveSourceHandler.bind(null, index)}
          onSourceEdit={props.onSourceEdit.bind(null, index)}
          isOpened={isOpened}
          source={props.sources[index]}
        />
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
            <div>{props.subtitleHeader}</div>
            <div className="flex justify-end absolute right-10 mob:relative mob:right-0 min-w-[40px] bg-gray-100 px-4 shadow-md rounded-3xl">
              {totalDuration} mins
            </div>
          </AccordionHeader>
        </div>
        <SubtitleInfo
          title={props.subtitleHeader}
          onSubtitleEdit={props.onSubtitleEdit}
          shortDescription={props.shortDescription}
          introVideoUrl={props.introVideoUrl}
        ></SubtitleInfo>
        <AccordionBody className="opacity-0 transition ease-out duration-150 flex justify-between items-center px-8">
          <div className="text-lg font-medium">Subtitle sources</div>
          <div>{addSourceIcon}</div>
        </AccordionBody>
        {Body}
        {sourceModalShown && (
          <AccordionBody className="opacity-0 transition ease-out duration-150">
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
