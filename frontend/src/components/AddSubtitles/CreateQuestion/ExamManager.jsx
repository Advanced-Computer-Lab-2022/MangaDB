import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
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
const ExamManager = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Pagination
        className="ml-2 mr-2"
        count={4}
        color="primary"
        //page={selectedQuestion}
        //onChange={onChangeQuestionHandler}
      />
    </ThemeProvider>
  );
};
export default ExamManager;
