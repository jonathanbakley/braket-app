/**
 * Takes in a number of players and returns an array of what the genereated bracket should look like
 * @param {int} totalPlayers
 */
export default function getBracketLayout(totalPlayers) {
  let bracketLayout = [];

  for (var i = 1; i < totalPlayers; i = i * 2) {
    bracketLayout.unshift(i);
  }

  return bracketLayout;
}
