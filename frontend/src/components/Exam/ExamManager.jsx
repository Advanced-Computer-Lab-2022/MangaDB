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
  const examQuestionsWithoutAnswers = [
    {
      description: "How do you write react components",
      choices: [
        {
          choiceID: "A",
          description: "This is the First choice for this question",
        },
        {
          choiceID: "B",
          description: "This is the Second choice for this question",
        },
        {
          choiceID: "C",
          description: "This is the Third choice for this question",
        },
        {
          choiceID: "D",
          description: "This is the Fourth choice for this question",
        },
      ],
    },
    {
      description: "this is the second question ",
      choices: [
        {
          choiceID: "A",
          description: "This is the First choice for this question",
        },
        {
          choiceID: "B",
          description: "This is the Second choice for this question",
        },
        {
          choiceID: "C",
          description: "This is the Third choice for this question",
        },
        {
          choiceID: "D",
          description: "This is the Fourth choice for this question",
        },
      ],
    },
    {
      description: "How do you write react components 2",
      choices: [
        {
          choiceID: "A",
          description: "This is the First choice for this question",
        },
        {
          choiceID: "B",
          description: "This is the Second choice for this question",
        },
        {
          choiceID: "C",
          description: "This is the Third choice for this question",
        },
        {
          choiceID: "D",
          description: "This is the Fourth choice for this question",
        },
      ],
    },
    {
      description: "this is the second question 3 ",
      choices: [
        {
          choiceID: "A",
          description: "This is the First choice for this question",
        },
        {
          choiceID: "B",
          description: "This is the Second choice for this question",
        },
        {
          choiceID: "C",
          description: "This is the Third choice for this question",
        },
        {
          choiceID: "D",
          description: "This is the Fourth choice for this question",
        },
      ],
    },
  ];
  const ExamAnswers = [
    {
      questionID: 1,
      answer: "A",
    },
    {
      questionID: 2,
      answer: "B",
    },
    {
      questionID: 3,
      answer: "C",
    },
    {
      questionID: 4,
      answer: "D",
    },
  ];
  const studentAnswers = [
    {
      questionID: 1,
      answer: "A",
    },
    {
      questionID: 2,
      answer: "C",
    },
    {
      questionID: 3,
      answer: "B",
    },
    {
      questionID: 4,
      answer: "A",
    },
  ];

  return (
    <Exam
      exam={examQuestionsWithoutAnswers}
      answers={ExamAnswers}
      studentAnswers={studentAnswers}
    ></Exam>
  );
};
export default ExamManager;
