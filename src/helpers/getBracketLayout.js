/**
 * Takes in a number of players and returns an array of what the genereated bracket should look like
 * @param {int} totalPlayers
 */
function getBracketLayout(totalPlayers) {
  if (totalPlayers <= 1) {
    return [];
  }
  let bracketLayout = [0, 1];

  for (var i = 2; i < totalPlayers; i++) {
    if (bracketLayout[1] * 2 > bracketLayout[0]) {
      bracketLayout[0] = bracketLayout[0] + 1;
    } else {
      bracketLayout.unshift(1);
    }
  }
  return bracketLayout;
}

export default getBracketLayout;
