import React from "react";

const GeneratedBracket = ({ players }) => {
  const onClickHandler = e => {
    console.log("PLayers:", players);
  };
  return (
    <div>
      Hello I am the generated bracket
      {[...Array(players.length).keys()].map(key => (
        <div key={key}>Hello from key {key}</div>
      ))}
      <button onClick={onClickHandler} />
    </div>
  );
};

export default GeneratedBracket;
