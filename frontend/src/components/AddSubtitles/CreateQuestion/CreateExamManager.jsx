import { Fragment, useState } from "react";
import CreateQuestionForm from "./CreateQuestionForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";

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

const CreateExamManager = (props) => {
  const [selectedQuestion, setSelectedQuestion] = useState(1);

  const onChangeSelectedQuestionHandler = (event, value) => {
    setSelectedQuestion(value);
  };
  const onSaveQuestionHandler = (data) => {
    setSelectedQuestion((prev) => {
      return (prev = prev + 1);
    });
    props.onSaveQuestionHandler(data);
  };
  const onQuestionRemoveHandler = () => {
    props.onQuestionRemoveHandler(selectedQuestion-1);
    if(selectedQuestion !==1){
      setSelectedQuestion((prev) => {
        return (prev = prev - 1);
      })
    } 
  }
  var empty = false
  props.examState.length===0?empty=true:empty=false
  return (
    <Fragment>
      <CreateQuestionForm
        examState = {props.examState[selectedQuestion-1]}
        empty={empty}
        onQuestionChangeHandler={props.onQuestionChangeHandler.bind(
          null,
          selectedQuestion - 1
        )}
        onSubmit={onSaveQuestionHandler}
        length={props.examState.length}
        onQuestionRemoveHandler={onQuestionRemoveHandler}
      ></CreateQuestionForm>
      <ThemeProvider theme={theme}>
        <Pagination
          className="ml-2 mr-2"
          count={props.examState.length}
          color="primary"
          page={selectedQuestion}
          onChange={onChangeSelectedQuestionHandler}
        />
      </ThemeProvider>
    </Fragment>
  );
};
export default CreateExamManager;
