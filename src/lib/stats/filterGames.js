/* eslint-disable */

/*
 * Taken from: https://github.com/project-slippi/slippi-set-stats/blob/master/main.js
 */

import _ from "lodash";

export function filterGames(games) {
  // console.log(games);
  const gamesByIsSingles = _.groupBy(games, (game) => {
    const numberOfPlayers = game.settings.players.length;
    return numberOfPlayers === 2;
  });

  const nonSinglesGames = _.get(gamesByIsSingles, false) || [];
  if (_.some(nonSinglesGames)) {
    console.log("The following games have been excluded because they are not singles games:");
    _.forEach(nonSinglesGames, (game) => {
      console.log(game.filePath);
    });
    console.log();
  }

  const singlesGames = _.get(gamesByIsSingles, true) || [];
  const gamesByPorts = _.chain(singlesGames)
    .groupBy((game) => {
      const ports = _.map(game.settings.players, "port");
      return _.join(ports, "-");
    })
    .orderBy(["length"], ["desc"])
    .value();

  const gamesWithSamePorts = gamesByPorts.shift();
  if (_.some(gamesByPorts)) {
    console.log("The following games have been excluded because the player ports differ:");
    const flatGames = _.flatten(gamesByPorts);
    _.forEach(flatGames, (game) => {
      console.log(game.filePath);
    });
    console.log();
  }

  if (_.isEmpty(gamesWithSamePorts)) {
    throw new Error("There were no valid games found to compute stats from.");
  }

  console.log(`Including ${gamesWithSamePorts.length} games for stat calculation...`);

  return gamesWithSamePorts;
}
