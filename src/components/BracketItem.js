import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import { withTheme } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import { styles } from "./BraketItem.styles";

const BracketItem = ({
  classes,
  playerX,
  playerY,
  bestOf,
  updatePlayerWins,
  column
}) => {
  let [[winsX, winsY], updateWins] = React.useState([0, 0]);

  const changeWins = (event, player) => {
    const text = event.target.textContent;
    if (player === "x") {
      updateWins(
        text === "+"
          ? [winsX + 1, winsY]
          : [winsX > 0 ? winsX - 1 : winsX, winsY]
      );
      updatePlayerWins(playerX, text);
    } else {
      updateWins(
        text === "+"
          ? [winsX, winsY + 1]
          : [winsX, winsY > 0 ? winsY - 1 : winsY]
      );
      updatePlayerWins(playerY, text);
    }
  };

  const neededWins = Math.ceil(bestOf / 2);
  const playerHasNeededWins = winsX >= neededWins || winsY >= neededWins;
  const plusTopDisabled = playerX.name === "" || playerHasNeededWins;
  const plusBottomDisabled = playerY.name === "" || playerHasNeededWins;

  // logic to determine number of wins to display in x and y player spots
  const totalWins = neededWins * (column + 1);
  if (playerX.name !== "") {
    winsX =
      playerX.wins > totalWins
        ? neededWins
        : playerX.wins - neededWins * column > 0
        ? playerX.wins - neededWins * column
        : 0;
  }
  if (playerY.name !== "") {
    winsY =
      playerY.wins > totalWins
        ? neededWins
        : playerY.wins - neededWins * column > 0
        ? playerY.wins - neededWins * column
        : 0;
  }

  return (
    <Table className={classes.entireTable}>
      <TableBody className={classes.tBody}>
        <TableRow
          className={classNames({
            [classes.winner]: winsX >= Math.ceil(bestOf / 2)
          })}
        >
          <TableCell className={classes.nameLabel}>{playerX.name}</TableCell>
          <TableCell>{winsX}</TableCell>
          <TableCell className={classes.buttons}>
            <Button
              disabled={plusTopDisabled}
              onClick={e => changeWins(e, "x")}
              className={classes.button}
            >
              +
            </Button>
            <Button
              disabled={winsX === 0 || playerX.name === ""}
              onClick={e => changeWins(e, "x")}
              className={classes.button}
            >
              -
            </Button>
          </TableCell>
        </TableRow>
        <TableRow
          className={classNames(classes.bottomRow, {
            [classes.winner]: winsY >= Math.ceil(bestOf / 2)
          })}
        >
          <TableCell className={classes.nameLabel}>{playerY.name}</TableCell>
          <TableCell>{winsY}</TableCell>
          <TableCell className={classes.buttons}>
            <Button
              disabled={plusBottomDisabled}
              onClick={e => changeWins(e, "y")}
              className={classes.button}
            >
              +
            </Button>
            <Button
              disabled={winsY === 0 || playerY.name === ""}
              onClick={e => changeWins(e, "y")}
              className={classes.button}
            >
              -
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

BracketItem.propTypes = {
  classes: PropTypes.shape({
    buttons: PropTypes.string,
    button: PropTypes.string,
    winner: PropTypes.string,
    entireTable: PropTypes.string,
    tBody: PropTypes.string,
    bottomRow: PropTypes.string,
    nameLabel: PropTypes.string
  }),
  // Player in top spot
  playerX: PropTypes.shape({
    name: PropTypes.string
  }),
  // Player in bottom spot
  playerY: PropTypes.shape({
    name: PropTypes.string
  }),
  // number of games total (best out of 7)
  bestOf: PropTypes.number,
  // Function to update number of wins for a player
  updatePlayerWins: PropTypes.func,
  column: PropTypes.number
};

BracketItem.defaultProps = {
  bestOf: 3
};

export default withTheme(withStyles(styles)(BracketItem));
