import { MCFunction, Score, Selector, effect, execute } from "sandstone";
import { rngEffects } from "../Tick";
import { uniform } from "../lib/uniform";

const self = Selector("@s");

export const meseeksBoxLogic = MCFunction("items/meseeks_box_logic", () => {
  // ctx = player who used the item

  const effects: Array<string> = [
    "speed",
    // "slowness",
    "haste",
    // "mining_fatigue",
    "strength",
    "instant_health",
    // "instant_damage",
    "jump_boost",
    // "nausea",
    "regeneration",
    "resistance",
    "fire_resistance",
    "water_breathing",
    "invisibility",
    // "blindness",
    "night_vision",
    // "hunger",
    // "weakness",
    // "poison",
    // "wither",
    "health_boost",
    "absorption",
    "saturation",
    "levitation",
    // "glowing",
    "slow_falling",
    "conduit_power",
    "dolphins_grace",
    // "darkness",
    "hero_of_the_village",
  ];

  // Generate Random Number
  rngEffects.set(uniform(0, effects.length - 1));

  // Give random effect to the player when they use the item
  effects.forEach((value, idx) => {
    execute
      .if(rngEffects.equalTo(idx))
      .run.effect.give(self, value, 10, 1, true);
  });
});
