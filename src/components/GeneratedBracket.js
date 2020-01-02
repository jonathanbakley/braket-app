import React, { useEffect } from "react";
import BracketItem from "./BracketItem";
import getBraketLayout from "../helpers/getBracketLayout";
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

// TODO: Arrows from one bracket to the other

const GeneratedBracket = ({ players, setPlayersArray, bestOf, classes }) => {
  useEffect(() => {
    setPlayersArray(players);
  }, [players, setPlayersArray]);

  const updatePlayerWins = (playerToUpdate, plusOrMinus) => {
    players = players.map(player => {
      if (player.name === playerToUpdate.name) {
        player.wins = plusOrMinus === "+" ? player.wins + 1 : player.wins - 1;
      }
      return player;
    });
    setPlayersArray([...players]);
    console.log(players);
  };

  const layout = getBraketLayout(players.length); // players.length
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
              [playerX] = players.filter((player, index) => {
                const base = position * Math.pow(2, column + 1);
                if (index >= base && index < base + Math.pow(2, column)) {
                  return player.wins >= Math.ceil(bestOf / 2) * column;
                }
                return false;
              });
              [playerY] = players.filter((player, index) => {
                const base = position * Math.pow(2, column + 1);
                if (
                  index >= base + Math.pow(2, column) &&
                  index < base + 2 * Math.pow(2, column)
                ) {
                  return player.wins >= Math.ceil(bestOf / 2) * column;
                }
                return false;
              });

              return (
                <BracketItem
                  column={column}
                  key={position}
                  position={position}
                  playerX={playerX ? playerX : { name: "" }}
                  playerY={playerY ? playerY : { name: "" }}
                  bestOf={bestOf}
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
