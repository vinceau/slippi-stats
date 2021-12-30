import { ConversionType } from "@slippi/slippi-js";
import { exists } from "lib/exists";
import _ from "lodash";

import { StatDefinition } from "../types";

export const highDamagePunishes: StatDefinition = {
  name: "Highest Damage Punish",
  type: "number",
  betterDirection: "higher",
  recommendedRounding: 1,
  calculate(games, playerIndex) {
    const punishes = _.flatMap(games, (game) => {
      const conversions = _.get(game, ["stats", "conversions"]) || [];
      return _.filter(conversions, (conversion) => {
        const isForPlayer = conversion.playerIndex !== playerIndex;
        const hasEndPercent = conversion.endPercent !== null;
        return isForPlayer && hasEndPercent;
      });
    });

    const getDamageDone = (punish: ConversionType) => {
      if (exists(punish.endPercent)) {
        return punish.endPercent - punish.startPercent;
      }
      return 0;
    };

    const orderedPunishes = _.orderBy(punishes, [getDamageDone], "desc");
    const topPunish = _.first(orderedPunishes);
    const simple = {
      text: "N/A",
      number: null as number | null,
    };

    if (topPunish) {
      simple.number = getDamageDone(topPunish);
      simple.text = simple.number.toFixed(this.recommendedRounding);
    }

    return {
      result: _.take(orderedPunishes, 5),
      simple: simple,
    };
  },
};
