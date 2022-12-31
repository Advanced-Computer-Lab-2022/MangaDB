import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";

const TableHeader = (props) => {
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

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    //console.log(event.target.checked);
    props.selectAllHandler(event.target.checked);
  };
  useEffect(() => {
    if (props.selectedNow && props.rows) {
      if (props.selectedNow.length !== props.rows.length) {
        setChecked(false);
      }
    }

  }, [props.selectedNow, props.rows]);
  return (
    <tr className="w-full">
      <th
        scope="col"
        className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide"
      >
        Course Title
      </th>
      <th
        scope="col"
        className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide"
      >
        Instructor
      </th>
      <th
        scope="col"
        className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide"
      >
        Subject
      </th>
      <th
        scope="col"
        className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide"
      >
        Rating
      </th>
      <th
        scope="col"
        className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide"
      >
        Level
      </th>
      <th
        scope="col"
        className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide"
      >
        Price
      </th>
      <th
        scope="col"
        className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide"
      >
        Discounted Price
      </th>
      <th
        scope="col"
        className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide"
      >
        Total Hours
      </th>
      <th
        scope="col"
        className="py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide"
      >
        {!props.admin ? (
          "Actions"
        ) : (
          <ThemeProvider theme={theme}>
            <Checkbox
              color="primary"
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </ThemeProvider>
        )}
      </th>
    </tr>
  );
};

export default TableHeader;
