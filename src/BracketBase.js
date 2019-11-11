import React from "react";
import RibbonTop from "./components/RibbonTop";
import GeneratedBracket from "./components/GeneratedBracket";

import Typography from "@material-ui/core/Typography";

const BracketBase = () => {
  return (
    <div>
      <Typography variant="h3">Bracket App</Typography>
      <RibbonTop />
      <GeneratedBracket />
    </div>
  );
};

export default BracketBase;
