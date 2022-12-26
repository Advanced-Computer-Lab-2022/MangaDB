import { useState, Fragment, useEffect } from "react";
import axios from "axios";
import Notes from "./Notes";
import Video from "../Video/Video";
import ToolbarTabs from "./ToolbarTabs";
import Reports from "../CourseView/Reports";
import QA from "../QA/QA";
import { Alert } from "@material-tailwind/react";
import ReviewsCourseView from "../CourseView/ReviewsCourseView";

const NotesManager = (props) => {
  const [timestamp, setTimeStamp] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (
      +props.progress / +props.totalSources === 1 &&
      props.currentTab === "Download Certificate"
    ) {
      props.downloadCertificateHandler();
    }
  }, [props.currentTab, props.progress, props.totalSources]);

  // add delete edit notes
  const addNote = (note) => {
    var obj = {
      sourceId: props.currentSourceId,
      note: note,
      sourceDescription: props.source,
      subtitleDescription: props.subtitle,
      timestamp: timestamp,
    };
    var temp = [];
    var flag = false;
    for (var i = 0; i < props.notes.length; i++) {
      if (props.notes[i].sourceId === props.currentSourceId) {
        temp.push(props.notes[i]);
        flag = true;
      } else {
        if (flag) {
          break;
        }
      }
    }
    var sentData = {
      courseId: props.courseId,
      sourceId: props.currentSourceId,
      notes: [...temp, obj],
    };
    var newNotes = [...props.notes, obj];
    axios.patch(
      `http://localhost:3000/user/notes/${props.studentId}`,
      sentData
    );
    props.setNotes(newNotes);
  };

  const editNote = (noteIndex, newNote) => {
    var newNotes = [];
    var sourceId;
    for (var i = 0; i < props.notes.length; i++) {
      if (noteIndex === i) {
        sourceId = props.notes[i].sourceId;
        var obj = {
          ...props.notes[i],
          note: newNote,
        };
        newNotes.push(obj);
      } else {
        newNotes.push(props.notes[i]);
      }
    }

    var temp = [];

    for (var j = 0; j < newNotes.length; j++) {
      if (newNotes[j].sourceId === sourceId) {
        temp.push(newNotes[j]);
      }
    }

    var sentData = {
      courseId: props.courseId,
      sourceId: sourceId,
      notes: temp,
    };
    axios.patch(
      `http://localhost:3000/user/notes/${props.studentId}`,
      sentData
    );
    props.setNotes(newNotes);
  };

  const deleteNote = (noteIndex) => {
    var newNotes = [];
    var sourceId;
    for (var i = 0; i < props.notes.length; i++) {
      if (noteIndex !== i) {
        newNotes.push(props.notes[i]);
      } else {
        sourceId = props.notes[i].sourceId;
      }
    }

    var temp = [];

    for (var j = 0; j < newNotes.length; j++) {
      if (newNotes[j].sourceId === sourceId) {
        temp.push(newNotes[j]);
      }
    }
    var sentData = {
      courseId: props.courseId,
      sourceId: sourceId,
      notes: temp,
    };
    axios.patch(
      `http://localhost:3000/user/notes/${props.studentId}`,
      sentData
    );
    props.setNotes(newNotes);
  };

  //controls
  const timeChangeHandler = (time) => {
    setTimeStamp(time);
  };
  const stopVideo = () => {
    setPlaying(false);
  };
  const resumeVideo = () => {
    setPlaying(true);
  };

 

  const selectedNotesChangeHandler = (newSelected) => {
    props.changeNotesFilter(newSelected);
  };

  const selectedReportsChangeHandler = (newSelected) => {
    props.changeReportsSelector(newSelected);
  };

  return (
    <Fragment>
      <Video
        playing={playing}
        isVisible={props.isVisible}
        link={props.link}
        onWatch={props.onWatch}
        getTime={timeChangeHandler}
      />
      <div className="">
        <ToolbarTabs
          currentTab={props.currentTab}
          onTabChangeHandler={props.onTabChangeHandler}
        />
        {props.showNotes && (
          <Notes
            courseDescription={props.courseDescription}
            selected={props.currentNotesFilter}
            selectedChangeHandler={selectedNotesChangeHandler}
            timestamp={timestamp}
            stopVideo={stopVideo}
            notes={props.notes}
            resumeVideo={resumeVideo}
            addNote={addNote}
            editNote={editNote}
            deleteNote={deleteNote}
          />
        )}
        {props.showQA && (
          <QA
            QAFilter={props.QAFilter}
            QA={props.QA}
            addQuestionHandler={props.addQuestionHandler}
            changeQuestionFilterHandler={props.changeQuestionFilterHandler}
          ></QA>
        )}
        {props.showReviews && (
          <ReviewsCourseView
            onSubmit={props.submitReviewHandler}
            courseId={props.courseId}
            reviews={props.reviews}
            reviewsCount={props.reviewsCount}
          />
        )}
        {props.showReports && (
          <Reports
            onSubmit={props.submitReportHandler}
            selected={props.currentReportsSelector}
            selectedChangeHandler={selectedReportsChangeHandler}
            courseId={props.courseId}
            reports={props.reports}
          />
        )}
        {props.certificateAlert ? (
          +props.progress / +props.totalSources !== 1 ? (
            <Alert
              show={true}
              className="bg-yellow-100 text-gray-900 mt-4 opacity-50 font-semibold "
              animate={{
                mount: { y: 0 },
                unmount: { y: 100 },
              }}
            >
              <div className="flex space-x-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-exclamation-triangle"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                  <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                </svg>
                <p>
                  Finish The Course Content And Pass the Exam To Download Your
                  Certificate.
                </p>
              </div>
            </Alert>
          ) : (
            <div className=" w-0 h-0 overflow-hidden"></div>
          )
        ) : (
          <div className=" w-0 h-0 overflow-hidden"></div>
        )}
      </div>
    </Fragment>
  );
};
export default NotesManager;
