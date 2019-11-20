import React from "react";
import RibbonTop from "./components/RibbonTop";
import GeneratedBracket from "./components/GeneratedBracket";

import Typography from "@material-ui/core/Typography";

const BracketBase = () => {
  const [playersArray, setPlayersArray] = React.useState([]);
  
  return (
    <div>
      <Typography variant="h3">Bracket App</Typography>
      <RibbonTop
        setPlayersArray={setPlayersArray}
        playersArray={playersArray}
      />
      <GeneratedBracket 
        players={playersArray}
      />
    </div>
  );
};

export default BracketBase;
