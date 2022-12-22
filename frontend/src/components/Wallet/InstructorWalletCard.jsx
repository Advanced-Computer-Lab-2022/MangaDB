import Table from "./TransactionsTable/Table";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
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

const InstructorWalletCard = (props) => {
  const [selectedPage, setSelectedpage] = useState(1);

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("en-US", { month: "long" });
  };

  const onChangePageHandler = (event, value) => {
    setSelectedpage(value);
  };
  const rows = props.data.map((row) => {
    const month = getMonthName(row.month);
    return {
      month: month,
      year: row.year,
      amount: row.amount,
    };
  });
  const count = Math.ceil(props.data.length / 8);

  var start;
  var end;
  if(selectedPage === 1){
    start=0;
    if(rows.length< 8){
      end = rows.length-1;
    }
    else{
      end = 7
  }
  }
  else{
    start = (selectedPage-1)*8;
    if((selectedPage-1)*8>rows.length){
      end = rows.length-1;
    }
    else{
      end =  8*(selectedPage) -1 
    }

  }
  
  var displayedRows = rows.slice(start, end+1);
  return (
    <div className="border border-r-8  bg-white m-4 border-white p-4 space-x-14 flex-col items-center justify-center ">
      <Table rows={displayedRows}></Table>
      <ThemeProvider theme={theme}>
        <Pagination
          className="mt-3 justify-center items-center flex"
          count={count}
          color="primary"
          page={selectedPage}
          onChange={onChangePageHandler}
        />
      </ThemeProvider>
    </div>
  );
};
export default InstructorWalletCard;
