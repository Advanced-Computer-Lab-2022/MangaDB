import { useState, Fragment } from "react";
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
  const [examState, setExamState] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(1);

  const onChangeQuestionHandler = (event, value) => {
    setSelectedQuestion(value);
  };
  const onSaveQuestionHandler = (Data) => {
    var newExamState = [...examState];
    newExamState.push(Data);
    setExamState(newExamState);
  };
  return (
    <Fragment>
      <CreateQuestionForm onSubmit={onSaveQuestionHandler}></CreateQuestionForm>
      <ThemeProvider theme={theme}>
        <Pagination
          className="ml-2 mr-2"
          count={examState.length}
          color="primary"
          page={selectedQuestion}
          onChange={onChangeQuestionHandler}
        />
      </ThemeProvider>
    </Fragment>
  );
};
export default CreateExamManager;
