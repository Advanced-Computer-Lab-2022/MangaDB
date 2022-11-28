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
  const examQuestionsWithAnswers = [
    {
      question: "How do you write react components",
      solution: "1",
      choices: [
        {
          choiceId: "1",
          description: "This is the First choice for this question",
        },
        {
          choiceId: "2",
          description: "This is the Second choice for this question",
        },
        {
          choiceId: "3",
          description: "This is the Third choice for this question",
        },
        {
          choiceId: "4",
          description: "This is the Fourth choice for this question",
        },
      ],
    },
    {
      question: "this is the second question ",
      solution: "2",
      choices: [
        {
          choiceId: "1",
          description: "This is the First choice for this question",
        },
        {
          choiceId: "2",
          description: "This is the Second choice for this question",
        },
        {
          choiceId: "3",
          description: "This is the Third choice for this question",
        },
        {
          choiceId: "4",
          description: "This is the Fourth choice for this question",
        },
      ],
    },
    {
      question: "How do you write react components 2",
      solution: "3",
      choices: [
        {
          choiceId: "1",
          description: "This is the First choice for this question",
        },
        {
          choiceId: "2",
          description: "This is the Second choice for this question",
        },
        {
          choiceId: "3",
          description: "This is the Third choice for this question",
        },
        {
          choiceId: "4",
          description: "This is the Fourth choice for this question",
        },
      ],
    },
    {
      question: "this is the second question 3 ",
      solution: "4",
      choices: [
        {
          choiceId: "1",
          description: "This is the First choice for this question",
        },
        {
          choiceId: "2",
          description: "This is the Second choice for this question",
        },
        {
          choiceId: "3",
          description: "This is the Third choice for this question",
        },
        {
          choiceId: "4",
          description: "This is the Fourth choice for this question",
        },
      ],
    },
  ];

  //this will be props.studentAnswers
  const studentAnswers = ["4", "3", "2", "1"];


  var solvedBefore = true;
  if (studentAnswers.length === 0) {
    solvedBefore = false;
  }
  return (
    <Exam
      exam={examQuestionsWithAnswers}
      studentAnswers={studentAnswers}
      solvedBefore={solvedBefore}
    ></Exam>
  );
};
export default ExamManager;
