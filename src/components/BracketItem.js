import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import TableBody from "@material-ui/core/TableBody";

// TODO - add more styles
const styles = {
  buttons: {
    display: "flex",
    flexDirection: "column"
  },
  winner: {
    backgroundColor: "green"
  }
};

const BracketItem = ({ classes, playerX, playerY, bestOf }) => {
  // TODO: This state will likely need to be made more global
  let [[winsX, winsY], updateWins] = useState([0, 0]);
  let [buttonsDisabled, checkWin] = useState(false);

  useEffect(() => {
    const xWon = winsX >= Math.ceil(bestOf / 2);
    const yWon = winsY >= Math.ceil(bestOf / 2);
    console.log("X Wins:", xWon, "Y Wins", yWon);
    if (xWon || yWon) {
      checkWin(true);
    }
  }, [bestOf, winsX, winsY]);

  const changeWins = (event, player) => {
    if (player === "x") {
      updateWins(
        event.target.textContent === "+"
          ? [winsX + 1, winsY]
          : [winsX > 0 ? winsX - 1 : winsX, winsY]
      );
      console.log(winsX);
    } else {
      updateWins(
        event.target.textContent === "+"
          ? [winsX, winsY + 1]
          : [winsX, winsY > 0 ? winsY - 1 : winsY]
      );
    }
  };
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>{playerX}</TableCell>
          <TableCell
            className={classNames({
              [classes.winner]: winsX >= Math.ceil(bestOf / 2)
            })}
          >
            {winsX}
          </TableCell>
          <TableCell className={classes.buttons}>
            <Button
              disabled={buttonsDisabled}
              onClick={e => changeWins(e, "x")}
            >
              +
            </Button>
            <Button
              disabled={buttonsDisabled || winsX === 0}
              onClick={e => changeWins(e, "x")}
            >
              -
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{playerY}</TableCell>
          <TableCell
            className={classNames({
              [classes.winner]: winsY >= Math.ceil(bestOf / 2)
            })}
          >
            {winsY}
          </TableCell>
          <TableCell className={classes.buttons}>
            <Button
              disabled={buttonsDisabled}
              onClick={e => changeWins(e, "y")}
            >
              +
            </Button>
            <Button
              disabled={buttonsDisabled || winsY === 0}
              onClick={e => changeWins(e, "y")}
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
    buttons: PropTypes.string
  }),
  playerX: PropTypes.string,
  playerY: PropTypes.string,
  bestOf: PropTypes.number
};

BracketItem.defaultProps = {
  bestOf: 5
};

export default withStyles(styles)(BracketItem);
