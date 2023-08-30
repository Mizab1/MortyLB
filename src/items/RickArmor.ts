import { LootTable, Selector } from "sandstone";

const self = Selector("@s");

// Loots
export const rickArmorLootTable = () =>
  LootTable(`loots/rick_armor`, {
    type: "generic",
    pools: [
      {
        rolls: 1,
        bonus_rolls: 0,
        entries: [
          {
            type: "minecraft:item",
            name: "minecraft:netherite_helmet",
            functions: [
              {
                function: "set_nbt",
                tag: `{display:{Name:'{"text":"Rick\\'s Helmet","color":"gold","italic":false}'},HideFlags:255}`,
              },
            ],
          },
          {
            type: "minecraft:item",
            name: "minecraft:netherite_chestplate",
            functions: [
              {
                function: "set_nbt",
                tag: `{display:{Name:'{"text":"Rick\\'s Chestplate","color":"gold","italic":false}'},HideFlags:255}`,
              },
            ],
          },
          {
            type: "minecraft:item",
            name: "minecraft:netherite_leggings",
            functions: [
              {
                function: "set_nbt",
                tag: `{display:{Name:'{"text":"Rick\\'s Leggings","color":"gold","italic":false}'},HideFlags:255}`,
              },
            ],
          },
          {
            type: "minecraft:item",
            name: "minecraft:netherite_boots",
            functions: [
              {
                function: "set_nbt",
                tag: `{display:{Name:'{"text":"Rick\\'s Boots","color":"gold","italic":false}'},HideFlags:255}`,
              },
            ],
          },
        ],
      },
    ],
  });
