import { FramesType } from "@slippi/slippi-js";

import { StatDefinition } from "../types";

/**
 * Based on pdiot's L Cancel calculation code from here:
 *
 * https://github.com/pdiot/Slippi-Electron/blob/354f1dd73092cf844df76501936c3dceb4165328/slippi-stats-workerfile.js
 */

function getLCancels(frames: FramesType, playerIndex: number) {
  const playerLCancels = { successful: 0, failed: 0 };
  const playerFailedMoves = [];
  for (const frameNumber of Object.keys(frames)) {
    const frameKey = +frameNumber;
    const playerPostFrameUpdate = (frames[frameKey].players as any[]).find(
      (player) => player.pre.playerIndex === playerIndex
    ).post;
    const playerAttack = getAttackAction(playerPostFrameUpdate.actionStateId);

    if (playerAttack) {
      if (playerPostFrameUpdate.lCancelStatus === 1) {
        playerLCancels.successful++;
      } else if (playerPostFrameUpdate.lCancelStatus === 2) {
        playerLCancels.failed++;
        playerFailedMoves.push(playerAttack);
      }
    }
  }
  const ratio = playerLCancels.successful / (playerLCancels.successful + playerLCancels.failed);
  const returnValue = {
    ...playerLCancels,
    ratio,
  };
  return returnValue;
}

const ATTACK_ACTION_STATES = new Map<
  number,
  {
    id: number;
    name: string;
    niceName: string;
  }
>();

ATTACK_ACTION_STATES.set(44, { id: 44, name: "Attack11", niceName: "Jab 1" });
ATTACK_ACTION_STATES.set(45, { id: 45, name: "Attack12", niceName: "Jab 2" });
ATTACK_ACTION_STATES.set(46, { id: 46, name: "Attack13", niceName: "Jab 3" });
ATTACK_ACTION_STATES.set(47, { id: 47, name: "Attack100Start", niceName: "Rapid jab" });
ATTACK_ACTION_STATES.set(48, { id: 48, name: "Attack100Loop", niceName: "Rapid jab" });
ATTACK_ACTION_STATES.set(49, { id: 49, name: "Attack100End", niceName: "Rapid jab" });
ATTACK_ACTION_STATES.set(50, { id: 50, name: "AttackDash", niceName: "Dash attack" });
ATTACK_ACTION_STATES.set(51, { id: 51, name: "AttackS3Hi", niceName: "Forward tilt" });
ATTACK_ACTION_STATES.set(52, { id: 52, name: "AttackS3HiS", niceName: "Forward tilt" });
ATTACK_ACTION_STATES.set(53, { id: 53, name: "AttackS3S", niceName: "Forward tilt" });
ATTACK_ACTION_STATES.set(54, { id: 54, name: "AttackS3LwS", niceName: "Forward tilt" });
ATTACK_ACTION_STATES.set(55, { id: 55, name: "AttackS3Lw", niceName: "Forward tilt" });
ATTACK_ACTION_STATES.set(56, { id: 56, name: "AttackHi3", niceName: "Up tilt" });
ATTACK_ACTION_STATES.set(57, { id: 57, name: "AttackLw3", niceName: "Down tilt" });
ATTACK_ACTION_STATES.set(58, { id: 58, name: "AttackS4Hi", niceName: "Forward smash" });
ATTACK_ACTION_STATES.set(59, { id: 59, name: "AttackS4HiS", niceName: "Forward smash" });
ATTACK_ACTION_STATES.set(60, { id: 60, name: "AttackS4S", niceName: "Forward smash" });
ATTACK_ACTION_STATES.set(61, { id: 61, name: "AttackS4LwS", niceName: "Forward smash" });
ATTACK_ACTION_STATES.set(62, { id: 62, name: "AttackS4Lw", niceName: "Forward smash" });
ATTACK_ACTION_STATES.set(63, { id: 63, name: "AttackHi4", niceName: "Up smash" });
ATTACK_ACTION_STATES.set(64, { id: 64, name: "AttackLw4", niceName: "Down smash" });
ATTACK_ACTION_STATES.set(65, { id: 65, name: "AttackAirN", niceName: "Neutral air" });
ATTACK_ACTION_STATES.set(66, { id: 66, name: "AttackAirF", niceName: "Forward air" });
ATTACK_ACTION_STATES.set(67, { id: 67, name: "AttackAirB", niceName: "Back air" });
ATTACK_ACTION_STATES.set(68, { id: 68, name: "AttackAirHi", niceName: "Up air" });
ATTACK_ACTION_STATES.set(69, { id: 69, name: "AttackAirLw", niceName: "Down air" });
ATTACK_ACTION_STATES.set(70, { id: 70, name: "LandingAirN", niceName: "Nair landing" });
ATTACK_ACTION_STATES.set(71, { id: 71, name: "LandingAirF", niceName: "Fair landing" });
ATTACK_ACTION_STATES.set(72, { id: 72, name: "LandingAirB", niceName: "Bair landing" });
ATTACK_ACTION_STATES.set(73, { id: 73, name: "LandingAirHi", niceName: "Uair landing" });
ATTACK_ACTION_STATES.set(74, { id: 74, name: "LandingAirLw", niceName: "Dair landing" });
ATTACK_ACTION_STATES.set(212, { id: 212, name: "Catch", niceName: "Grab" });
ATTACK_ACTION_STATES.set(214, { id: 214, name: "CatchDash", niceName: "Dash grab" });

function getAttackAction(id: number) {
  const action = ATTACK_ACTION_STATES.get(id);
  if (action) {
    return action.niceName;
  } else {
    return null;
  }
}

export const lCancelAccuracy: StatDefinition = {
  name: "L-Cancel Accuracy",
  type: "number",
  betterDirection: "higher",
  recommendedRounding: 0,
  calculate(games, playerIndex) {
    const lCancelsPerGame = games.map((game) => {
      const frames = game.frames;
      const gameLCancels = getLCancels(frames, playerIndex);
      return gameLCancels;
    });

    const totalLCancels = lCancelsPerGame.reduce(
      (tally, val) => ({
        successful: tally.successful + val.successful,
        failed: tally.failed + val.failed,
      }),
      { successful: 0, failed: 0 }
    );
    const ratio = totalLCancels.successful / (totalLCancels.successful + totalLCancels.failed);

    return {
      result: totalLCancels,
      simple: {
        text: isNaN(ratio) ? "N/A" : `${(ratio * 100).toFixed(this.recommendedRounding)}%`,
        number: ratio,
      },
    };
  },
};
