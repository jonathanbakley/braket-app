import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import { withTheme } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";

// TODO - add more styles
const styles = {
  buttons: {
    display: "flex",
    flexDirection: "column",
    padding: "0px"
  },
  winner: {
    backgroundColor: "#a9a9a9",
    borderRadius: "3px"
  },
  entireTable: {
    display: "block",
    margin: "15px",
    width: "auto",
    borderRadius: "6px",
    overflow: "hidden",
    border: "1px solid #a9a9a9"
  },
  button: {
    padding: "0px"
  },
  tBody: {
    minWidth: "90px"
  },
  bottomRow: {
    borderTop: "1px solid #a9a9a9"
  },
  nameLabel: {
    width: "100%"
  }
};

const BracketItem = ({
  classes,
  playerX,
  playerY,
  bestOf,
  updatePlayerWins,
  key
}) => {
  let [[winsX, winsY], updateWins] = useState([0, 0]);
  let [buttonsDisabled, checkWin] = useState(false);

  useEffect(() => {
    const xWon = winsX >= Math.ceil(bestOf / 2);
    const yWon = winsY >= Math.ceil(bestOf / 2);
    if (xWon || yWon) {
      checkWin(true);
    }
  }, [bestOf, winsX, winsY]);

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
              disabled={buttonsDisabled || playerX.name === ""}
              onClick={e => changeWins(e, "x")}
              className={classes.button}
            >
              +
            </Button>
            <Button
              disabled={buttonsDisabled || winsX === 0 || playerX.name === ""}
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
              disabled={buttonsDisabled || playerY.name === ""}
              onClick={e => changeWins(e, "y")}
              className={classes.button}
            >
              +
            </Button>
            <Button
              disabled={buttonsDisabled || winsY === 0 || playerY.name === ""}
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
    buttons: PropTypes.string
  }),
  // playerX: PropTypes.object,
  // playerY: PropTypes.object,
  bestOf: PropTypes.number
};

BracketItem.defaultProps = {
  bestOf: 5
};

export default withTheme(withStyles(styles)(BracketItem));
