import { Fragment, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import CreateQuestionForm from "../../AddSubtitles/CreateQuestion/CreateQuestionForm";
import SecondaryButton from "../../SecondaryButton";
//Theme to change the pagination color
const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#3970AC",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const CreateExam = (props) => {
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [examState, setExamState] = useState([]);

  //methods to control the questions
  const onSaveQuestionHandler = (Data) => {
    var newExamState = [...examState];
    newExamState.push(Data);
    setExamState(newExamState);
    setSelectedQuestion((prev) => {
      return (prev = prev + 1);
    });
  };

  const onQuestionChangeHandler = (selectedQuestion, Data) => {
    //selectedQuestion will be corrected in the component
    var newExamState = [...examState];
    newExamState[selectedQuestion] = Data;
    setExamState(newExamState);
  };
  const onQuestionRemoveHandler = () => {
    //selectedQuestion will be corrected in the component
    var newExamState = [...examState];
    newExamState.splice(selectedQuestion - 1, 1);
    setExamState(newExamState);
    if (selectedQuestion !== 1) {
      setSelectedQuestion((prev) => {
        return (prev = prev - 1);
      });
    }
  };

  const onChangeSelectedQuestionHandler = (event, value) => {
    setSelectedQuestion(value);
  };

  const submitHandler = () => {
    const exam = {
      courseFinalExam: examState,
    };
    props.onSubmit(exam);
  };

  //check if the examState is empty
  var empty = false;
  examState.length === 0 ? (empty = true) : (empty = false);

  return (
    <Fragment>
      <CreateQuestionForm
        examState={examState[selectedQuestion - 1]}
        empty={empty}
        onQuestionChangeHandler={onQuestionChangeHandler.bind(
          null,
          selectedQuestion - 1
        )}
        onSubmit={onSaveQuestionHandler}
        length={examState.length}
        onQuestionRemoveHandler={onQuestionRemoveHandler}
      ></CreateQuestionForm>
      <ThemeProvider theme={theme}>
        {!empty && (
          <Pagination
            className="ml-2 mr-2"
            count={examState.length}
            color="primary"
            page={selectedQuestion}
            onChange={onChangeSelectedQuestionHandler}
          />
        )}
      </ThemeProvider>
      <div className="flex justify-center items-center">
        <SecondaryButton onClick={submitHandler}>Submit</SecondaryButton>
      </div>
    </Fragment>
  );
};
export default CreateExam;
