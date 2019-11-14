import React from "react";
import RibbonTop from "./components/RibbonTop";
import GeneratedBracket from "./components/GeneratedBracket";

import Typography from "@material-ui/core/Typography";

const BracketBase = () => {
  // TODO: Switch to playersArray
  const [numberOfPlayers, setNumPlayers] = React.useState(0);
  return (
    <div>
      <Typography variant="h3">Bracket App</Typography>
      <RibbonTop
        numberOfPlayers={numberOfPlayers}
        setNumPlayers={setNumPlayers}
      />
      <GeneratedBracket numPlayers={numberOfPlayers} />
    </div>
  );
};

export default BracketBase;
