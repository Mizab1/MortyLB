import {
  LootTable,
  MCFunction,
  NBTObject,
  Selector,
  clear,
  execute,
  nbtParser,
  playsound,
} from "sandstone";
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
    // "instant_health",
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
    // "levitation",
    // "glowing",
    "slow_falling",
    "conduit_power",
    "dolphins_grace",
    // "darkness",
    // "hero_of_the_village",
  ];

  // Generate Random Number
  rngEffects.set(uniform(0, effects.length - 1));

  // Play Sounds
  playsound("minecraft:sfx.meseeks", "master", self);

  // Clear the meseeks box from the player
  clear(self, "minecraft:carrot_on_a_stick{CustomModelData:100004}", 1);

  // Give random effect to the player when they use the item
  effects.forEach((value, idx) => {
    execute
      .if(rngEffects.equalTo(idx))
      .run.effect.give(self, value, 15, 4, true);
  });
});

// Loot table
const meseeksBoxNbt: NBTObject = {
  display: {
    Name: '{"text":"Mr. Meseeks Box","color":"red","italic":false}',
    Lore: [
      '{"text":"Right-Click to get a random buff","color":"dark_purple","italic":false}',
    ],
  },
  HideFlags: 255,
  CustomModelData: 100004,
};
export const meseeksBoxLootTable = () =>
  LootTable(`loots/meseeks_box`, {
    type: "generic",
    pools: [
      {
        rolls: 1,
        bonus_rolls: 0,
        entries: [
          {
            type: "minecraft:item",
            name: "minecraft:carrot_on_a_stick",
            functions: [
              {
                function: "set_nbt",
                tag: nbtParser(meseeksBoxNbt),
              },
            ],
          },
        ],
      },
    ],
  });
