import React from "react";
import BracketBase from "./BracketBase";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        padding: "0px 10px 0px 10px",
        borderBottom: "none"
      }
    },
    MuiButton: {
      root: {
        minWidth: "24px"
      }
    },
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "#1976d2"
        }
      }
    },
    MuiInput: {
      underline: {
        "&:after": {
          borderBottom: "2px solid #1976d2"
        }
      }
    }
  }
});

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <BracketBase />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
