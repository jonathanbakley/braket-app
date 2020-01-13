import React, { useState } from "react";
import BracketItem from "./BracketItem";
import getBracketLayout from "../helpers/getBracketLayout";
import { withStyles } from "@material-ui/styles";

const styles = {
  columns: {
    display: "flex",
    alignItems: "center"
  },
  column: {
    flexDirection: "row"
  }
};

const GeneratedBracket = ({ players, setPlayersArray, bestOf, classes }) => {
  let [[playerXWins, playerYWins], updateWins] = useState([0, 0]);

  const updatePlayerWins = (playerToUpdate, plusOrMinus) => {
    players = players.map(player => {
      if (player.name === playerToUpdate.name) {
        player.wins = plusOrMinus === "+" ? player.wins + 1 : player.wins - 1;
      }
      return player;
    });
    window.sessionStorage.setItem("bracket", JSON.stringify([...players]));
    setPlayersArray([...players]);
  };

  const layout = getBracketLayout(players.length); // players.length

  return (
    <div className={classes.columns}>
      {/* Each Row */}
      {layout.map((numberOfFaceOffs, column) => {
        // Each item in a row
        return (
          <div key={column} className={classes.column}>
            {[...Array(numberOfFaceOffs).keys()].map((item, position) => {
              // check each player wins and compare to current row
              let playerX;
              let playerY;
              const winsNeeded = Math.ceil(bestOf / 2);
              [playerX] = players.filter((player, index) => {
                const base = position * Math.pow(2, column + 1);
                if (
                  player.id >= base &&
                  player.id < base + Math.pow(2, column)
                ) {
                  return player.wins >= winsNeeded * column;
                }
                return false;
              });
              [playerY] = players.filter((player, index) => {
                const base = position * Math.pow(2, column + 1);
                if (
                  player.id >= base + Math.pow(2, column) &&
                  player.id < base + 2 * Math.pow(2, column)
                ) {
                  return player.wins >= winsNeeded * column;
                }
                return false;
              });

              const totalWins = winsNeeded * (column + 1);
              let pXWins = 0;
              let pYWins = 0;
              if (playerX) {
                pXWins =
                  playerX.wins > totalWins
                    ? winsNeeded
                    : playerX.wins - winsNeeded * column > 0
                    ? playerX.wins - winsNeeded * column
                    : 0;
              }
              if (playerY) {
                pYWins =
                  playerY.wins > totalWins
                    ? winsNeeded
                    : playerY.wins - winsNeeded * column > 0
                    ? playerY.wins - winsNeeded * column
                    : 0;
              }

              return (
                <BracketItem
                  column={column}
                  key={position}
                  position={position}
                  playerX={playerX ? playerX : { name: "" }}
                  playerY={playerY ? playerY : { name: "" }}
                  winsX={pXWins}
                  winsY={pYWins}
                  updateWins={updateWins}
                  bestOf={parseInt(bestOf, 10)}
                  updatePlayerWins={updatePlayerWins}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default withStyles(styles)(GeneratedBracket);
