import Exam from "./Exam";

const ExamManager = (props) => {
  const examQuestionsWithAnswers = props.exam;

  const studentAnswers = props.studentAnswers;
  var solvedBefore = true;
  if (studentAnswers.length === 0) {
    solvedBefore = false;
  }
  return (
    <Exam
      exam={examQuestionsWithAnswers}
      studentAnswers={studentAnswers}
      solvedBefore={solvedBefore}
      onSolveExamHandler={props.onSolveExamHandler}
    ></Exam>
  );
};
export default ExamManager;
