import Exam from "./Exam";

// we store in the db to check whether the user viewed this source before or not
//thus we can check to see if it's viewed then the user can click it and view his answers
//1) pass the answers
//2) pass the student's answers (from the parent component simply check if the user have solved it
//if not pass an empty array)
//3) compare both

//also before making him compare we need to check if the instructor allows
const ExamManager = (props) => {
  //get the exam from the database based on the source/examID (either is passed as a prop)
  //take as props the viewed boolean
  //take the answers as props
  //take the exam questions w/o answers as props
  //take the student's answers if applicable as props

  //this will be  props.exam

  const examQuestionsWithAnswers = props.exam

  const studentAnswers = props.studentAnswers;;
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
