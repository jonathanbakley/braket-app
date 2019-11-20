import React from "react";

const GeneratedBracket = ({ players }) => {
  console.log(players);
  return (
    <div>
      Hello I am the generated bracket
      {[...Array(players.length).keys()].map(key => (
        <div key={key}>Hello from key {key}</div>
      ))}
    </div>
  );
};

export default GeneratedBracket;
