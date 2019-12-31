import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  input: {
    margin: "5px"
  },
  ribbon: {
    width: "25%",
    maxWidth: "250px"
  }
};

const RibbonTop = ({ setPlayersArray, playersArray, classes }) => {
  const [numberOfPlayers, setNumPlayers] = React.useState(0);

  const onInputChange = event => {
    if (
      event &&
      event.target &&
      event.target.value &&
      event.target.value.length <= 3 &&
      Number.isInteger(parseInt(event.target.value), 10)
    ) {
      setNumPlayers(event.target.value);
      // setPlayersArray(new Array(parseInt(event.target.value, 10)));
      const playersArrayBuilder = [...Array(parseInt(event.target.value, 10))];
      const newPlayersArray = playersArrayBuilder.map((player, key) => ({
        id: key,
        name: "",
        wins: 0,
        stage: 0
      }));
      setPlayersArray(newPlayersArray);
    } else {
      setNumPlayers(0);
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
