import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  input: {
    margin: "5px"
  },
  ribbon: {
    minWidth: "125px",
    maxWidth: "250px"
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
  const [numberOfPlayers, setNumPlayers] = React.useState(0);

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
      for (
        let k = braketSize / 2 - (braketSize - event.target.value);
        k < braketSize / 2;
        k++
      ) {
        newPlayersArray[k].wins = Math.ceil(bestOf / 2);
      }

      setPlayersArray(newPlayersArray);
    } else {
      setNumPlayers(0);
    }
  };

  const onBestChange = event => {
    if (checkEventForNumber(event)) {
      if (event.target.value % 2 !== 1) {
        alert("Number Should Be Odd");
      }
      setBestOutOf(event.target.value);
    }
  };

  const onNameInput = (event, key) => {
    playersArray[key].name = event.target.value;
    setPlayersArray([...playersArray]);
  };

  return (
    <div className={classes.ribbon}>
      {/* TODO add warning if a non number is inputed */}
      <TextField
        label="Number of Players"
        className={classes.input}
        onChange={onInputChange}
      />
      <TextField
        label="Best Out Of"
        className={classes.input}
        onChange={onBestChange}
      />
      {[...Array(parseInt(numberOfPlayers, 10) || 0).keys()].map(key => (
        <TextField
          label={`Player ${key + 1}`}
          className={classes.input}
          key={key}
          onChange={event => onNameInput(event, key)}
        />
      ))}
    </div>
  );
};

export default withStyles(styles)(RibbonTop);
