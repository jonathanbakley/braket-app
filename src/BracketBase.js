import React from "react";
import RibbonTop from "./components/RibbonTop";
import GeneratedBracket from "./components/GeneratedBracket";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  content: {
    display: "flex",
    paddingTop: "20px"
  }
};

const BracketBase = ({ classes }) => {
  const [playersArray, setPlayersArray] = React.useState([]);

  return (
    <div>
      <Typography variant="h3">Bracket App</Typography>
      <div className={classes.content}>
        <RibbonTop
          setPlayersArray={setPlayersArray}
          playersArray={playersArray}
        />
        <GeneratedBracket players={playersArray} />
      </div>
    </div>
  );
};

export default withStyles(styles)(BracketBase);
