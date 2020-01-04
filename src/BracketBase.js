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
  const [playersArray, setPlayersArray] = React.useState([]);
  const [bestOf, setBestOutOf] = React.useState(3);

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
        />
        <GeneratedBracket
          players={playersArray}
          setPlayersArray={setPlayersArray}
          bestOf={bestOf}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(BracketBase);
