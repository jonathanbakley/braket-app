import React from "react";
import BracketItem from "./BracketItem";
import getBraketLayout from "../helpers/getBracketLayout";

// TODO: Add styles - make sure rows for each round are in a column
// TODO: Arrows from one bracket to the other
// TODO: add players into each bracket name
// TODO: make sure players move on to correct round as they win

const GeneratedBracket = ({ players }) => {
  const onClickHandler = e => {
    console.log("PLayers:", players);
  };
  const layout = getBraketLayout(players.length); // players.length
  return (
    <div>
      Hello I am the generated bracket
      {[...Array(players.length).keys()].map(key => (
        <div key={key}>Hello from key {key}</div>
      ))}
      <button onClick={onClickHandler} />
      {/* Each Row */}
      {layout.map((numberOfFaceOffs, index) => {
        // Each item in a row
        return (
          <div key={index}>
            {[...Array(numberOfFaceOffs).keys()].map((item, position) => {
              console.log("ITEM", item);
              return (
                <BracketItem
                  row={index}
                  key={position}
                  playerX={"Jon"}
                  playerY={"Matt"}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GeneratedBracket;
