import React from "react";
import PropTypes from "prop-types";
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

              return (
                <BracketItem
                  column={column}
                  key={position}
                  position={position}
                  playerX={playerX ? playerX : { name: "" }}
                  playerY={playerY ? playerY : { name: "" }}
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

GeneratedBracket.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      wins: PropTypes.number
    })
  ),
  setPlayersArray: PropTypes.func,
  bestOf: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  classes: PropTypes.shape({
    columns: PropTypes.string,
    column: PropTypes.string
  })
};

export default withStyles(styles)(GeneratedBracket);
