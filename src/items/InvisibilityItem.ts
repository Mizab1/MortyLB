import { log } from "console";
import {
  _,
  Selector,
  tellraw,
  effect,
  give,
  execute,
  kill,
  PredicateInstance,
  Predicate,
  NBTObject,
  NBT,
  nbtParser,
  LootTable,
  say,
} from "sandstone";

const self = Selector("@s");

/* Invisibility Item */
export const invisibilityItemNBT: NBTObject = {
  display: {
    Name: '{"text":"Invisibility Belt","color":"gold","italic":false}',
  },
  CustomModelData: 100002,
  invisibility_item: NBT.byte(1),
};
export const invisibilityItemLogic = () => {
  // check if the player in invisible and has the invisibility tag
  _.if(Selector("@s", { predicate: `!${isInvisiblePredicate}` }), () => {
    tellraw(self, {
      text: "You are now Invisible, remember to remove any armor you have and don't hold any weapon!",
      color: "gold",
    });
    effect.give(self, "minecraft:invisibility", 15, 0, true);
  }).else(() => {
    tellraw(self, {
      text: "You are already invisible, You cannot use this item again",
      color: "red",
    });
    give(self, "minecraft:ender_pearl" + nbtParser(invisibilityItemNBT), 1);
  });

  // kill the ender pearl
  execute
    .as(Selector("@e", { type: "minecraft:ender_pearl" }))
    .if(_.data.entity("@s", "Item.tag.invisibility_item"))
    .run(() => {
      kill(self);
    });
};
const isInvisiblePredicate: PredicateInstance = Predicate(
  "is_invisible_predicate",
  {
    condition: "minecraft:entity_properties",
    entity: "this",
    predicate: {
      type: "minecraft:player",
      // @ts-ignore
      effects: {
        "minecraft:invisibility": {},
      },
    },
  }
);

// Loot Table
export const invisibilityItemLootTable = () =>
  LootTable(`loots/invisibility_belt`, {
    pools: [
      {
        rolls: 1,
        bonus_rolls: 1,
        entries: [
          {
            type: "minecraft:item",
            name: "minecraft:ender_pearl",
            functions: [
              {
                function: "set_nbt",
                tag: nbtParser(invisibilityItemNBT),
              },
              {
                function: "set_count",
                count: {
                  type: "uniform",
                  min: 2,
                  max: 6,
                },
              },
            ],
          },
        ],
      },
    ],
  });
