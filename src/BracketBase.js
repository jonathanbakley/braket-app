import React from "react";
import RibbonTop from "./components/RibbonTop";
import GeneratedBracket from "./components/GeneratedBracket";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  content: {
    display: "flex",
    paddingTop: "20px"
  },
  heading: {
    textAlign: "center",
    backgroundColor: "#1976d2",
    height: "54px",
    color: "white",
    boxShadow: "0 5px 6px #a9a9a9"
  }
};

const BracketBase = ({ classes }) => {
  const [playersArray, setPlayersArray] = React.useState(
    JSON.parse(window.sessionStorage.getItem("bracket")) || []
  );
  const [bestOf, setBestOutOf] = React.useState(
    parseInt(window.sessionStorage.getItem("bestOutOf"), 10) || null
  );

  return (
    <div>
      <Typography className={classes.heading} variant="h3">
        Bracket Generator
      </Typography>
      <div className={classes.content}>
        <RibbonTop
          setPlayersArray={setPlayersArray}
          playersArray={playersArray}
          setBestOutOf={setBestOutOf}
          bestOf={bestOf}
        />
        <GeneratedBracket
          players={playersArray}
          setPlayersArray={setPlayersArray}
          bestOf={bestOf || 3}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(BracketBase);
