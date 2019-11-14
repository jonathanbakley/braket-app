import React from "react";

const GeneratedBracket = ({ numPlayers }) => {
  console.log(numPlayers);
  return (
    <div>
      Hello I am the generated bracket
      {[...Array(numPlayers).keys()].map(key => (
        <div key={key}>Hello from key {key}</div>
      ))}
    </div>
  );
};

export default GeneratedBracket;
