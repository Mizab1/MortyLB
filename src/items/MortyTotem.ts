import { LootTable } from "sandstone";

export const mortyTotemLootTable = () =>
  LootTable(`loots/morty_totem`, {
    pools: [
      {
        rolls: 1,
        bonus_rolls: 1,
        entries: [
          {
            type: "minecraft:item",
            name: "minecraft:totem_of_undying",
          },
        ],
      },
    ],
  });
