import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const styles = {
  input: {
    margin: "5px"
  },
  ribbon: {
    minWidth: "125px",
    maxWidth: "250px"
  },
  resetButton: {
    width: "125px",
    margin: "25px",
    background: "#1976d2",
    color: "white",
    boxShadow: "1px 2px 3px #a9a9a9"
  }
};

const checkEventForNumber = event => {
  return (
    event &&
    event.target &&
    event.target.value &&
    event.target.value.length <= 3 &&
    Number.isInteger(parseInt(event.target.value), 10)
  );
};

const RibbonTop = ({
  setPlayersArray,
  playersArray,
  classes,
  setBestOutOf,
  bestOf
}) => {
  const bracketLengthFromSession =
    JSON.parse(window.sessionStorage.getItem("bracket")) &&
    JSON.parse(window.sessionStorage.getItem("bracket")).length;
  const [numberOfPlayers, setNumPlayers] = React.useState(
    bracketLengthFromSession || 0
  );

  const onInputChange = event => {
    if (checkEventForNumber(event)) {
      setNumPlayers(event.target.value);
      const playersArrayBuilder = [...Array(parseInt(event.target.value, 10))];
      let braketSize = 1;
      while (braketSize < event.target.value) {
        braketSize = braketSize * 2;
      }
      // create players array with a temporary name and alternatig id
      const newPlayersArray = playersArrayBuilder.map((player, key) => ({
        id: key >= braketSize / 2 ? (key - braketSize / 2) * 2 + 1 : key * 2,
        name: `p${key + 1}`,
        wins: 0,
        stage: 0
      }));
      // populate wins for players with a bye game
      if (bestOf === "") {
        bestOf = 3;
      }
      for (
        let k = braketSize / 2 - (braketSize - event.target.value);
        k < braketSize / 2;
        k++
      ) {
        newPlayersArray[k].wins = Math.ceil(bestOf / 2);
      }
      window.sessionStorage.setItem("bracket", JSON.stringify(newPlayersArray));
      setPlayersArray(newPlayersArray);
    } else {
      setNumPlayers(0);
    }
    if (event.target.value === "") {
      setPlayersArray([]);
    }
  };

  const onBestChange = event => {
    if (checkEventForNumber(event)) {
      if (event.target.value % 2 !== 1) {
        alert("Number Should Be Odd");
      }
      window.sessionStorage.setItem("bestOutOf", event.target.value);
      setBestOutOf(event.target.value);
    }
    if (event.target.value === "") {
      setBestOutOf("");
    }
  };

  const onNameInput = (event, key) => {
    playersArray[key].name = event.target.value;
    window.sessionStorage.setItem("bracket", JSON.stringify([...playersArray]));
    setPlayersArray([...playersArray]);
  };

  const resetBracket = () => {
    setPlayersArray([]);
    window.sessionStorage.removeItem("bracket");
    window.sessionStorage.removeItem("bestOutOf");
    setNumPlayers(0);
    setBestOutOf("");
  };

  return (
    <div className={classes.ribbon}>
      {/* TODO add warning if a non number is inputed */}
      <TextField
        label="Number of Players"
        className={classes.input}
        onChange={onInputChange}
        value={playersArray.length || ""}
      />
      <TextField
        label="Best Out Of"
        className={classes.input}
        onChange={onBestChange}
        value={bestOf || ""}
      />
      {[...Array(parseInt(numberOfPlayers, 10) || 0).keys()].map(key => (
        <TextField
          label={`Player ${key + 1}`}
          className={classes.input}
          key={key}
          value={(playersArray[key] && playersArray[key].name) || ""}
          onChange={event => onNameInput(event, key)}
        />
      ))}
      <Button className={classes.resetButton} onClick={resetBracket}>
        Reset
      </Button>
    </div>
  );
};

export default withStyles(styles)(RibbonTop);
