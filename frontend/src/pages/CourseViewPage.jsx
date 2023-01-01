import { useState, useEffect, Fragment, useRef } from "react";
import ExamManager from "../components/Exam/ExamManager";
import NotesManager from "../components/Notes/NotesManager";
import axios from "axios";
import { useLocation } from "react-router-dom";
import WarningAlert from "../components/UI/WarningAlert";
import ContentCourseView from "../components/CourseView/ContentCourseView";
import ExamToolManager from "../components/ExamToolBar/ExamToolManager";
import Certificate from "../components/Certificate/Certificate";
import NavBarSearch from "../components/UI/NavBar/NavBarSearch";
import ReactLoading from "react-loading";

const CourseViewPage = () => {
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);
  const [receivedData, setReceivedData] = useState({});
  const [currentSource, setCurrentSource] = useState("");
  const [studentSolutions, setStudentSolutions] = useState([]);
  const [showNextLessonAlert, setShowNextLessonAlert] = useState(false);
  const [notes, setNotes] = useState([]);
  const [QA, setQA] = useState([]);
  const [QAFilter, setQAFilter] = useState({
    id: 1,
    name: "All",
  });
  const [reviews, setReviews] = useState([]);
  const [reviewsCount, setReviewsCount] = useState([]);
  const [reports, setReports] = useState([]);
  const [currentNotesFilter, setCurrentNotesFilter] = useState({
    id: 1,
    name: "All Lessons",
  });
  const [currentReportsSelector, setCurrentReportsSelector] = useState({
    id: 1,
    name: "Technical",
  });
  const [progress, setProgress] = useState(0);
  const [totalSources, setTotalSources] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showQA, setShowQA] = useState(false);
  const [showReviews, setShowReviews] = useState(true);
  const [showReports, setShowReports] = useState(false);
  const [currentTab, setCurrentTab] = useState("Reviews");
  const [certificateAlert, setCertificateAlert] = useState(false);
  const managerRef = useRef(null);
  const downloadRef = useRef(null);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [followUpId, setFollowUpId] = useState(-1);
  const [followUpProblem, setFollowUpProblem] = useState("");
  const [followUpDescription, setFollowUpDescription] = useState("");

  const openFollowUpModal = (id, problem) => {
    setShowFollowUpModal(true);
    setFollowUpId(id);
    setFollowUpProblem(problem);
  };

  const closeFollowUpModal = () => {
    setShowFollowUpModal(false);
    setFollowUpId(-1);
  };

  const followUpDescriptionChangeHandler = (event) => {
    setFollowUpDescription(event.target.value);
  };

  const followUpSubmitHandler = () => {
    const data = {
      followUpComment: followUpDescription,
    };
    axios
      .patch("http://localhost:3000/problem/followUp/" + followUpId, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {});
    closeFollowUpModal();
  };

  useEffect(() => {
    window.scrollTo(0, 0, "smooth");
    const courseId = location.state;
    if (currentNotesFilter.name === "All Lessons") {
      axios
        .get(`http://localhost:3000/user/courseNotes?cid=${courseId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          var notesSet = [];
          for (var i = 0; i < res.data.noteData.length; i++) {
            if (res.data.noteData[i].notes.length !== 0) {
              for (var j = 0; j < res.data.noteData[i].notes.length; j++) {
                var temp = {
                  sourceId: res.data.noteData[i].sourceId,
                  note: res.data.noteData[i].notes[j].note,
                  timestamp: res.data.noteData[i].notes[j].timestamp,
                  sourceDescription: `${
                    res.data.noteData[i].sourceIndex + 1
                  }. ${res.data.noteData[i].sourceDescription}`,
                  subtitleDescription: `${
                    res.data.noteData[i].subtitleIndex + 1
                  }. ${res.data.noteData[i].subtitleDescription}`,
                };
                notesSet.push(temp);
              }
            } else {
              continue;
            }
          }

          setNotes(notesSet);
        });
    } else if (currentNotesFilter.name === "Current Section") {
      var subtitleId;
      for (var i = 0; i < receivedData.subtitles.length; i++) {
        for (var j = 0; j < receivedData.subtitles[i].sources.length; j++) {
          if (currentSource._id === receivedData.subtitles[i].sources[j]._id) {
            subtitleId = receivedData.subtitles[i]._id;
          }
        }
      }
      axios
        .get(
          `http://localhost:3000/user/subtitleNotes?cid=${courseId}&sid=${subtitleId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          var notesSet = [];
          for (var i = 0; i < res.data.noteData.length; i++) {
            if (res.data.noteData[i].notes.length !== 0) {
              for (var j = 0; j < res.data.noteData[i].notes.length; j++) {
                var temp = {
                  sourceId: res.data.noteData[i].sourceId,
                  note: res.data.noteData[i].notes[j].note,
                  timestamp: res.data.noteData[i].notes[j].timestamp,
                  sourceDescription: `${
                    res.data.noteData[i].sourceIndex + 1
                  }. ${res.data.noteData[i].sourceDescription}`,
                  subtitleDescription: `${
                    res.data.noteData[i].subtitleIndex + 1
                  }. ${res.data.noteData[i].subtitleDescription}`,
                };
                notesSet.push(temp);
              }
            } else {
              continue;
            }
          }

          setNotes(notesSet);
        });
    } else {
      axios
        .get(
          `http://localhost:3000/user/sourceNotes?cid=${courseId}&sid=${currentSource._id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          var notesSet = [];
          for (var i = 0; i < res.data.noteData.length; i++) {
            if (res.data.noteData[i].notes.length !== 0) {
              for (var j = 0; j < res.data.noteData[i].notes.length; j++) {
                var temp = {
                  sourceId: res.data.noteData[i].sourceId,
                  note: res.data.noteData[i].notes[j].note,
                  timestamp: res.data.noteData[i].notes[j].timestamp,
                  sourceDescription: `${
                    res.data.noteData[i].sourceIndex + 1
                  }. ${res.data.noteData[i].sourceDescription}`,
                  subtitleDescription: `${
                    res.data.noteData[i].subtitleIndex + 1
                  }. ${res.data.noteData[i].subtitleDescription}`,
                };
                notesSet.push(temp);
              }
            } else {
              continue;
            }
          }

          setNotes(notesSet);
        });
    }
    axios
      .get(`http://localhost:3000/problem/userCourseProblems/${courseId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setReports(res.data);
      });
    axios.get(`http://localhost:3000/course/rate/${courseId}`).then((res) => {
      setReviews(res.data.review);
      setReviewsCount(res.data.count);
    });
  }, [currentNotesFilter, location.state, receivedData, currentSource]);

  //useEffect at the start to receive the data
  useEffect(() => {
    const courseId = location.state;
    axios
      .get(`http://localhost:3000/course/${courseId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setReceivedData(res.data.course);
        setQA(res.data.QA);
        setStudentSolutions(res.data.userData.exams);
        setCurrentSource(res.data.course.subtitles[0].sources[0]);
        setProgress(res.data.userData.percentageCompleted);
        setTotalSources(res.data.userData.totalSources);
        setLoaded(true);
      });
  }, [location.state]);
  const onSourceChangeHandler = (source) => {
    if (source.sourceType === "Quiz" && currentSource.sourceType === "Quiz") {
      managerRef.current.refreshManager();
    }
    setCurrentSource(source);
    if (source.sourceType === "Quiz") {
      setCurrentTab("");
      setCertificateAlert(false);
      setShowQA(false);
      setShowNotes(false);
      setShowReports(false);
      setShowReviews(false);
    }
  };
  const changeNotesFilter = (data) => {
    setCurrentNotesFilter(data);
  };

  const changeReportsSelector = (data) => {
    setCurrentReportsSelector(data);
  };

  const onSolveExamHandler = (receivedSolution) => {
    //should mark this as visited in the back and store the data
    //send the sourceId , examId ,userid and courseId
    var endPoint = `http://localhost:3000/user/solveExam/`;

    var sentData = {
      studentAnswers: receivedSolution,
      courseid: receivedData._id,
      examid: currentSource.quiz._id,
    };
    axios
      .post(endPoint, sentData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        var temp = {
          score: res.data.score,
          answers: res.data.answers,
          examId: currentSource.quiz._id,
          _id: receivedData._id,
        };
        setStudentSolutions([...studentSolutions, temp]);
        managerRef.current.refreshManager();
        setProgress((prevProg) => {
          return prevProg + 1;
        });
      })
      .catch((err) => {});
  };
  const nextSource = () => {
    for (var i = 0; i < receivedData.subtitles.length; i++) {
      for (var j = 0; j < receivedData.subtitles[i].sources.length; j++) {
        if (receivedData.subtitles[i].sources[j]._id === currentSource._id) {
          if (j === receivedData.subtitles[i].sources.length - 1) {
            if (i === receivedData.subtitles.length - 1) {
              setShowNextLessonAlert(true);
            } else {
              setCurrentSource(receivedData.subtitles[i + 1].sources[0]);
            }
          } else {
            setCurrentSource(receivedData.subtitles[i].sources[j + 1]);
          }
        }
      }
    }
  };
  //controls
  const onTabChangeHandler = (tab) => {
    setCurrentTab(tab);
    if (tab === "Notes") {
      setShowNotes(true);
      setShowQA(false);
      setShowReviews(false);
      setShowReports(false);
      setCertificateAlert(false);
    } else if (tab === "Q&A") {
      setShowNotes(false);
      setShowQA(true);
      setShowReviews(false);
      setShowReports(false);
      setCertificateAlert(false);
    } else if (tab === "Reviews") {
      setShowNotes(false);
      setShowQA(false);
      setShowReviews(true);
      setShowReports(false);
      setCertificateAlert(false);
    } else if (tab === "Reports") {
      setShowNotes(false);
      setShowQA(false);
      setShowReviews(false);
      setShowReports(true);
      setCertificateAlert(false);
    } else if (tab === "Download Certificate") {
      setShowNotes(false);
      setShowQA(false);
      setShowReviews(false);
      setShowReports(false);
      setCertificateAlert(true);
    }
  };

  const hideWarningAlert = () => {
    setShowNextLessonAlert(false);
  };
  const notesChangeHandler = (newNotes) => {
    setNotes(newNotes);
  };
  const downloadCertificateHandler = () => {
    downloadRef.current.generatePDF2();
  };
  const onWatchHandler = () => {
    //will need the userID , sourceId, courseId
    //the userID and courseid are given from the navigation
    var endPoint = `http://localhost:3000/user/openSource/${receivedData._id}`;
    const submittedData = {
      sourceId: currentSource._id,
    };
    axios
      .patch(endPoint, submittedData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        axios
          .get(`http://localhost:3000/user/progress/${receivedData._id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            setProgress(res.data.percentage);
          });
      });
  };

  if (currentSource !== "") {
    var subtitle;
    var subtitleNo;
    var sourceNo;
    for (var i = 0; i < receivedData.subtitles.length; i++) {
      for (var j = 0; j < receivedData.subtitles[i].sources.length; j++) {
        if (currentSource._id === receivedData.subtitles[i].sources[j]._id) {
          subtitle = receivedData.subtitles[i].description;
          sourceNo = j + 1;
          subtitleNo = i + 1;
        }
      }
    }
  }
  //QAS handlers
  const addQuestionHandler = (recQuestion) => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    const sentData = {
      question: recQuestion,
      date: currentDate,
    };
    axios.post(
      `http://localhost:3000/course/askQuestion/${receivedData._id}`,
      sentData,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setQA([...QA, { question: recQuestion, date: currentDate }]);
  };
  const changeQuestionFilterHandler = (newSelected) => {
    setQAFilter(newSelected);
  };

  const submitReportHandler = (data) => {
    axios
      .post("http://localhost:3000/problem/", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setReports([...reports, res.data]);
      });
  };

  const submitReviewHandler = (data) => {
    axios
      .post(
        "http://localhost:3000/course/rate/"
          .concat(receivedData._id)
          .concat("/"),
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {});
  };

  //we will have an array of viewed sources
  var displayedSource;
  if (currentSource !== "") {
    if (currentSource.sourceType === "Video") {
      displayedSource = (
        <NotesManager
          courseDescription={receivedData.courseTitle}
          currentNotesFilter={currentNotesFilter}
          changeNotesFilter={changeNotesFilter}
          currentReportsSelector={currentReportsSelector}
          changeReportsSelector={changeReportsSelector}
          studentId="63a37e9688311fa832f43336"
          courseId={receivedData._id}
          currentSourceId={currentSource._id}
          source={currentSource.description}
          notes={notes}
          reviews={reviews}
          reviewsCount={reviewsCount}
          reports={reports}
          setNotes={notesChangeHandler}
          subtitle={subtitle}
          isVisible={true}
          link={currentSource.link}
          onWatch={onWatchHandler}
          progress={progress}
          totalSources={totalSources}
          downloadCertificateHandler={downloadCertificateHandler}
          QA={QA}
          addQuestionHandler={addQuestionHandler}
          changeQuestionFilterHandler={changeQuestionFilterHandler}
          QAFilter={QAFilter}
          submitReportHandler={submitReportHandler}
          submitReviewHandler={submitReviewHandler}
          showNotes={showNotes}
          showQA={showQA}
          showReviews={showReviews}
          showReports={showReports}
          currentTab={currentTab}
          certificateAlert={certificateAlert}
          onTabChangeHandler={onTabChangeHandler}
          sourceNo={sourceNo}
          subtitleNo={subtitleNo}
          followUpDescriptionChangeHandler={followUpDescriptionChangeHandler}
          followUpSubmitHandler={followUpSubmitHandler}
          followUpDescription={followUpDescription}
          followUpId={followUpId}
          followUpProblem={followUpProblem}
          showFollowUpModal={showFollowUpModal}
          openFollowUpModal={openFollowUpModal}
          closeFollowUpModal={closeFollowUpModal}
        />
      );
    } else {
      var studentAnswers;
      var grade;
      for (var k = 0; k < studentSolutions.length; k++) {
        if (studentSolutions[k].examId === currentSource.quiz._id) {
          studentAnswers = studentSolutions[k].answers;
          grade = studentSolutions[k].score;
        }
      }
      displayedSource = (
        <Fragment>
          {showNextLessonAlert && (
            <WarningAlert
              hide={hideWarningAlert}
              message={
                "This was the last course lesson,solve the exam to get your certificate"
              }
            />
          )}
          <ExamManager
            ref={managerRef}
            next={nextSource}
            exam={currentSource.quiz.exercises}
            studentAnswers={studentAnswers}
            grade={grade}
            onSolveExamHandler={onSolveExamHandler}
            QA={QA}
          />
          <ExamToolManager
            courseDescription={receivedData.courseTitle}
            currentNotesFilter={currentNotesFilter}
            changeNotesFilter={changeNotesFilter}
            currentReportsSelector={currentReportsSelector}
            changeReportsSelector={changeReportsSelector}
            studentId="638a07cdbc3508481a2d7da9"
            courseId={receivedData._id}
            currentSourceId={currentSource._id}
            source={currentSource.description}
            notes={notes}
            reviews={reviews}
            reviewsCount={reviewsCount}
            reports={reports}
            setNotes={notesChangeHandler}
            subtitle={subtitle}
            isVisible={true}
            link={currentSource.link}
            onWatch={onWatchHandler}
            progress={progress}
            totalSources={totalSources}
            downloadCertificateHandler={downloadCertificateHandler}
            QA={QA}
            addQuestionHandler={addQuestionHandler}
            changeQuestionFilterHandler={changeQuestionFilterHandler}
            QAFilter={QAFilter}
            submitReportHandler={submitReportHandler}
            submitReviewHandler={submitReviewHandler}
            showNotes={showNotes}
            showQA={showQA}
            showReviews={showReviews}
            showReports={showReports}
            currentTab={currentTab}
            certificateAlert={certificateAlert}
            onTabChangeHandler={onTabChangeHandler}
            followUpDescriptionChangeHandler={followUpDescriptionChangeHandler}
            followUpSubmitHandler={followUpSubmitHandler}
            followUpDescription={followUpDescription}
            followUpId={followUpId}
            followUpProblem={followUpProblem}
            showFollowUpModal={showFollowUpModal}
            openFollowUpModal={openFollowUpModal}
            closeFollowUpModal={closeFollowUpModal}
          ></ExamToolManager>
        </Fragment>
      );
    }
  }
  return (
    <Fragment>
      <NavBarSearch currentTab="My Courses" />
      {!loaded ? (
        <div className=" w-full h-full mt-12">
          <div className="flex w-full h-full  justify-center items-center ">
            <ReactLoading
              type={"bars"}
              color="#C6D8EC"
              height={667}
              width={375}
            />
          </div>
          <div className="flex items-center justify-center -mt-[275px]">
            <h1 className="text-center text-darkBlue font-bold text-3xl ">
              Loading...
            </h1>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className=" opacity-0 h-0 overflow-hidden w-full relative ">
            <Certificate ref={downloadRef}></Certificate>
          </div>

          <div className="py-4 flex justify-center font-medium text-xl bg-gray-50 z-20 mt-[4.5rem]">
            {receivedData.courseTitle}: {currentSource.description}
          </div>
          <div className="md:flex z-50">
            <div className="video/exam md:w-[70%] w-full mb-4 md:mb-0">
              {displayedSource}
            </div>
            <div className="md:w-[30%]">
              <ContentCourseView
                progress={progress}
                totalSources={totalSources}
                courseDuration={receivedData.totalMins}
                content={receivedData.subtitles}
                onClick={onSourceChangeHandler}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default CourseViewPage;
