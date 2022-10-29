import TextField from "@mui/material/TextField";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#0971f1",
        darker: "#053e85",
      },
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
      lightBlue: {
        main: "#74a0d1",
      },
    },
  });
  
  export default function CourseForm(props) {
    return (
      <ThemeProvider theme={theme} className="m-5">
        <TextField
          id={props.id}
          label={props.label}
          variant="outlined"
          color="lightBlue"
          className="m-5"
          required={props.required}
          fullWidth={true}
          
        />
      </ThemeProvider>
    );
  }
  