import React from "react";
import Input from "@material-ui/core/Input";

const RibbonTop = ({ numberOfPlayers, setNumPlayers }) => {
  // TODO: pass these up to the "BrackBase" level in the structure so that we have access to these vars
  const [playersArray, setPlayersArray] = React.useState([]);

  const onInputChange = event => {
    if (
      event &&
      event.target &&
      event.target.value &&
      Number.isInteger(parseInt(event.target.value), 10)
    ) {
      setNumPlayers(event.target.value);
      setPlayersArray(new Array(event.target.value));
    } else {
      setNumPlayers(0);
    }
  };

  const onNameInput = (event, key) => {
    playersArray[key] = {
      id: key,
      name: event.target.value,
      wins: 0
    };
    setPlayersArray(playersArray);
  };

  return (
    <div>
      {/* TODO add warning if a non number is inputed */}
      <Input onChange={onInputChange} />
      {[...Array(parseInt(numberOfPlayers, 10) || 0).keys()].map(key => (
        <Input key={key} onChange={event => onNameInput(event, key)} />
      ))}
    </div>
  );
};

export default RibbonTop;
