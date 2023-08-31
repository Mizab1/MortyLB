import {
  LootTable,
  MCFunction,
  NBT,
  NBTObject,
  Predicate,
  PredicateInstance,
  Selector,
  _,
  clear,
  effect,
  nbtParser,
  playsound,
  rel,
  tellraw,
} from "sandstone";

const self = Selector("@s");

/* Invisibility Item */
export const invisibilityItemNBT: NBTObject = {
  display: {
    Name: '{"text":"Invisibility Belt","color":"gold","italic":false}',
  },
  CustomModelData: 100003,
  invisibility_item: NBT.byte(1),
};
export const invisibilityItemLogic = MCFunction(
  "items/invisibility_item_logic",
  () => {
    // check if the player in invisible and has the invisibility tag
    _.if(Selector("@s", { predicate: `!${isInvisiblePredicate}` }), () => {
      playsound(
        "minecraft:block.beacon.power_select",
        "master",
        "@a",
        rel(0, 0, 0),
        1,
        2
      );
      tellraw(self, {
        text: "You are now Invisible, remember to remove any armor you have and don't hold any weapon!",
        color: "gold",
      });
      effect.give(self, "minecraft:invisibility", 15, 0, true);
      clear(self, "minecraft:carrot_on_a_stick{CustomModelData:100003}", 1);
    }).else(() => {
      tellraw(self, {
        text: "You are already invisible, You cannot use this item",
        color: "red",
      });
    });
  }
);
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
            name: "minecraft:carrot_on_a_stick",
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
