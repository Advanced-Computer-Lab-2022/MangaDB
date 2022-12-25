import { useState, Fragment } from "react";
import axios from "axios";
import Notes from "./ExamNotes";
import ToolbarTabs from "./ExamToolbarTabs";
import Reports from "../CourseView/Reports";
import QA from "../QA/QA";
const ExamToolManager = (props) => {
  const [showNotes, setShowNotes] = useState(true);
  const [showQA, setShowQA] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [currentTab, setCurrentTab] = useState("Notes");
  
  const timestamp=0;
  //delete edit notes
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
  const onTabChangeHandler = (tab) => {
    setCurrentTab(tab);
    if (tab === "Notes") {
      setShowNotes(true);
      setShowQA(false);
      setShowReviews(false);
      setShowReports(false);
    } else if (tab === "Q&A") {
      setShowNotes(false);
      setShowQA(true);
      setShowReviews(false);
      setShowReports(false);
    } else if (tab === "Reviews") {
      setShowNotes(false);
      setShowQA(false);
      setShowReviews(true);
      setShowReports(false);
    } else if (tab === "Reports") {
      setShowNotes(false);
      setShowQA(false);
      setShowReviews(false);
      setShowReports(true);
    }
  };

  const selectedNotesChangeHandler = (newSelected) => {
    props.changeNotesFilter(newSelected);
  };

  const selectedReportsChangeHandler = (newSelected) => {
    props.changeReportsFilter(newSelected);
  };

  const submitReportHandler = (data) => {
    axios.post("http://localhost:3000/problem/", data).then((res) => {
      console.log(res);
    });
  };

  return (
    <Fragment>
   
      <div className="">
        <ToolbarTabs
          currentTab={currentTab}
          onTabChangeHandler={onTabChangeHandler}
        />
        {showNotes && (
          <Notes
            courseDescription={props.courseDescription}
            selected={props.currentNotesFilter}
            selectedChangeHandler={selectedNotesChangeHandler}
            timestamp={timestamp}
            notes={props.notes}
            editNote={editNote}
            deleteNote={deleteNote}
          />
        )}
        {showQA && <QA></QA>}
        {showReviews && <></>}
        {showReports && (
          <Reports
            onSubmit={submitReportHandler}
            selected={props.currentReportsFilter}
            selectedChangeHandler={selectedReportsChangeHandler}
            courseId={props.courseId}
          />
        )}
      </div>
    </Fragment>
  );
};
export default ExamToolManager;
