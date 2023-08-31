import { LootTable } from "sandstone";
import {
  invisibilityItemNBT,
  invisibilityItemLootTable,
} from "../items/InvisibilityItem";
import { rickArmorLootTable } from "../items/RickArmor";
import { portalGunLootTable } from "../items/PortalGunItem";
import { pickleSwordLootTable } from "../items/PickleSword";
import { laserGunLootTable } from "../items/LaserGunItem";
import { mortyTotemLootTable } from "../items/MortyTotem";
import { meseeksBoxLootTable } from "../items/MeseeksBox";

// ! Only loot tables reside here!

LootTable("good_loot", {
  type: "generic",
  pools: [
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:loot_table",
          name: "default:loots/basic_tools",
        },
        {
          type: "minecraft:loot_table",
          name: "default:loots/basic_armor",
        },
        {
          type: "minecraft:loot_table",
          name: "default:loots/iron_armor",
        },
        {
          type: "minecraft:loot_table",
          name: "default:loots/enchanted_tools",
        },
        {
          type: "minecraft:loot_table",
          name: "default:loots/rare_blocks",
        },
        {
          type: "minecraft:loot_table",
          name: "default:loots/bow",
        },
        {
          type: "minecraft:loot_table",
          name: "default:loots/ender_pearl",
        },
        {
          type: "minecraft:loot_table",
          name: "minecraft:chests/end_city_treasure",
        },
        {
          type: "minecraft:loot_table",
          name: "minecraft:chests/bastion_treasure",
        },
        {
          type: "minecraft:loot_table",
          name: "minecraft:chests/shipwreck_treasure",
        },
        {
          type: "minecraft:loot_table",
          name: "minecraft:gameplay/fishing/treasure",
        },
        {
          type: "minecraft:loot_table",
          name: "default:loots/sponge",
        },
        {
          type: "minecraft:loot_table",
          name: "default:loots/enchanted_golden_apple",
        },
        {
          type: "minecraft:loot_table",
          name: "default:loots/golden_apple",
        },
        {
          type: "minecraft:loot_table",
          name: "default:loots/potions",
        },
        {
          type: "minecraft:loot_table",
          name: "default:loots/horse",
        },
        {
          type: "minecraft:loot_table",
          name: "default:loots/foods",
        },

        // Custom Item
        {
          type: "minecraft:loot_table",
          name: "default:loots/pickle_sword",
        },
        {
          type: "minecraft:loot_table",
          name: "default:loots/rick_armor",
        },
        {
          type: "minecraft:loot_table",
          name: "default:loots/morty_totem",
        },
        {
          type: "minecraft:loot_table",
          name: "default:loots/invisibility_belt",
        },
        {
          type: "minecraft:loot_table",
          name: "default:loots/portal_gun",
        },
        {
          type: "minecraft:loot_table",
          name: "default:loots/laser_gun",
        },
        {
          type: "minecraft:loot_table",
          name: "default:loots/meseeks_box",
        },
      ],
    },
  ],
});

LootTable(`loots/basic_tools`, {
  type: "generic",
  pools: [
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:wooden_sword",
        },
      ],
    },
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:wooden_axe",
        },
      ],
    },
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:wooden_pickaxe",
        },
      ],
    },
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:golden_sword",
        },
      ],
    },
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:golden_axe",
        },
      ],
    },
  ],
});
LootTable(`loots/basic_armor`, {
  type: "generic",
  pools: [
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:leather_helmet",
        },
      ],
    },
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:leather_chestplate",
        },
      ],
    },
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:leather_leggings",
        },
      ],
    },
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:leather_boots",
        },
      ],
    },
  ],
});
LootTable(`loots/iron_armor`, {
  type: "generic",
  pools: [
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:iron_helmet",
        },
      ],
    },
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:iron_chestplate",
        },
      ],
    },
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:iron_leggings",
        },
      ],
    },
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:iron_boots",
        },
      ],
    },
  ],
});
LootTable(`loots/enchanted_tools`, {
  type: "generic",
  pools: [
    {
      rolls: 2,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:sequence",
          children: [
            {
              type: "minecraft:item",
              name: "minecraft:diamond_axe",
              functions: [
                {
                  function: "enchant_randomly",
                  enchantments: [],
                },
              ],
            },
            {
              type: "minecraft:item",
              name: "minecraft:diamond_sword",
              functions: [
                {
                  function: "enchant_randomly",
                  enchantments: [],
                },
              ],
            },
            {
              type: "minecraft:item",
              name: "minecraft:diamond_helmet",
              functions: [
                {
                  function: "enchant_randomly",
                  enchantments: [],
                },
              ],
            },
            {
              type: "minecraft:item",
              name: "minecraft:diamond_chestplate",
              functions: [
                {
                  function: "enchant_randomly",
                  enchantments: [],
                },
              ],
            },
            {
              type: "minecraft:item",
              name: "minecraft:diamond_leggings",
              functions: [
                {
                  function: "enchant_randomly",
                  enchantments: [],
                },
              ],
            },
            {
              type: "minecraft:item",
              name: "minecraft:diamond_boots",
              functions: [
                {
                  function: "enchant_randomly",
                  enchantments: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
LootTable(`loots/tame_dog`, {
  type: "generic",
  pools: [
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:wolf_spawn_egg",
          functions: [
            {
              function: "set_count",
              count: 4,
            },
          ],
        },
      ],
    },
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:bone",
          functions: [
            {
              function: "set_count",
              count: 32,
            },
          ],
        },
      ],
    },
  ],
});
LootTable(`loots/rare_blocks`, {
  type: "generic",
  pools: [
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:diamond_block",
          functions: [
            {
              function: "set_count",
              count: {
                type: "uniform",
                min: 1,
                max: 3,
              },
            },
          ],
        },
        {
          type: "minecraft:item",
          name: "minecraft:gold_block",
          functions: [
            {
              function: "set_count",
              count: {
                type: "uniform",
                min: 1,
                max: 3,
              },
            },
          ],
        },
        {
          type: "minecraft:item",
          name: "minecraft:netherite_block",
          functions: [
            {
              function: "set_count",
              count: {
                type: "uniform",
                min: 1,
                max: 3,
              },
            },
          ],
        },
        {
          type: "minecraft:item",
          name: "minecraft:iron_block",
          functions: [
            {
              function: "set_count",
              count: {
                type: "uniform",
                min: 1,
                max: 3,
              },
            },
          ],
        },
      ],
    },
  ],
});
LootTable(`loots/bow`, {
  pools: [
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:bow",
          functions: [
            {
              function: "enchant_randomly",
              enchantments: [],
            },
            {
              function: "enchant_randomly",
              enchantments: [],
            },
          ],
        },
      ],
    },
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:arrow",
          functions: [
            {
              function: "set_count",
              count: {
                type: "uniform",
                min: 8,
                max: 64,
              },
            },
          ],
        },
      ],
    },
  ],
});
LootTable(`loots/ender_pearl`, {
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
              function: "set_count",
              count: {
                type: "uniform",
                min: 1,
                max: 8,
              },
            },
          ],
        },
      ],
    },
  ],
});
LootTable(`loots/sponge`, {
  pools: [
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:sponge",
          functions: [
            {
              function: "set_count",
              count: 1,
            },
          ],
        },
      ],
    },
  ],
});
LootTable(`loots/enchanted_golden_apple`, {
  pools: [
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:enchanted_golden_apple",
          functions: [
            {
              function: "set_count",
              count: {
                type: "uniform",
                min: 1,
                max: 4,
              },
            },
          ],
        },
      ],
    },
  ],
});
LootTable(`loots/golden_apple`, {
  pools: [
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:golden_apple",
          functions: [
            {
              function: "set_count",
              count: {
                type: "uniform",
                min: 1,
                max: 8,
              },
            },
          ],
        },
      ],
    },
  ],
});
LootTable(`loots/potions`, {
  pools: [
    {
      rolls: 3,
      bonus_rolls: 0,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:splash_potion",
          functions: [
            {
              // @ts-ignore
              function: "minecraft:set_potion",
              id: "minecraft:healing",
            },
          ],
        },
        {
          type: "minecraft:item",
          name: "minecraft:splash_potion",
          functions: [
            {
              // @ts-ignore
              function: "minecraft:set_potion",
              id: "minecraft:harming",
            },
          ],
        },
        {
          type: "minecraft:item",
          name: "minecraft:splash_potion",
          functions: [
            {
              // @ts-ignore
              function: "minecraft:set_potion",
              id: "minecraft:invisibility",
            },
          ],
        },
        {
          type: "minecraft:item",
          name: "minecraft:splash_potion",
          functions: [
            {
              // @ts-ignore
              function: "minecraft:set_potion",
              id: "minecraft:leaping",
            },
          ],
        },
        {
          type: "minecraft:item",
          name: "minecraft:splash_potion",
          functions: [
            {
              // @ts-ignore
              function: "minecraft:set_potion",
              id: "minecraft:poison",
            },
          ],
        },
        {
          type: "minecraft:item",
          name: "minecraft:splash_potion",
          functions: [
            {
              // @ts-ignore
              function: "minecraft:set_potion",
              id: "minecraft:strong_swiftness",
            },
          ],
        },
        {
          type: "minecraft:item",
          name: "minecraft:splash_potion",
          functions: [
            {
              // @ts-ignore
              function: "minecraft:set_potion",
              id: "minecraft:strength",
            },
          ],
        },
      ],
    },
  ],
  functions: [
    {
      function: "set_count",
      count: {
        type: "uniform",
        min: 3,
        max: 6,
      },
    },
  ],
});
LootTable(`loots/horse`, {
  type: "generic",
  pools: [
    {
      rolls: 1,
      bonus_rolls: 0,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:horse_spawn_egg",
          functions: [
            {
              function: "set_nbt",
              tag: '{display:{Name:\'{"text":"Tamed Horse Spawn Egg","italic":false}\'},EntityTag:{Tame:1b,CustomName:\'{"text":"Horse"}\',SaddleItem:{id:"minecraft:saddle",Count:1b},ArmorItem:{}}}',
            },
          ],
        },
      ],
      functions: [
        {
          function: "set_count",
          count: {
            type: "uniform",
            min: 1,
            max: 3,
          },
        },
      ],
    },
  ],
});
LootTable(`loots/foods`, {
  pools: [
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:cooked_beef",
          functions: [
            {
              function: "set_count",
              count: {
                type: "uniform",
                min: 6,
                max: 25,
              },
            },
          ],
        },
        {
          type: "minecraft:item",
          name: "minecraft:cooked_chicken",
          functions: [
            {
              function: "set_count",
              count: {
                type: "uniform",
                min: 6,
                max: 25,
              },
            },
          ],
        },
        {
          type: "minecraft:item",
          name: "minecraft:cooked_mutton",
          functions: [
            {
              function: "set_count",
              count: {
                type: "uniform",
                min: 6,
                max: 25,
              },
            },
          ],
        },
        {
          type: "minecraft:item",
          name: "minecraft:bread",
          functions: [
            {
              function: "set_count",
              count: {
                type: "uniform",
                min: 6,
                max: 25,
              },
            },
          ],
        },
      ],
    },
  ],
});

// Custom Items
pickleSwordLootTable();
rickArmorLootTable();
mortyTotemLootTable();
invisibilityItemLootTable();
portalGunLootTable();
laserGunLootTable();
meseeksBoxLootTable();
