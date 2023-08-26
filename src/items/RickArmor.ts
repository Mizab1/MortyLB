import { MCFunction, _, execute, effect, Selector, LootTable } from "sandstone";
import { ConditionClass } from "sandstone/variables";

const self = Selector("@s");

/* Basically this function check if the player is wearing the specified armor and if true, the function gives powerups */
MCFunction(
  "armor_effect",
  () => {
    let isWearingAhsokaHelmet: ConditionClass = _.data.entity(
      self,
      "Inventory[{Slot:103b}].tag.ahsoka_helmet"
    );
    let isWearingAhsokaChestplate: ConditionClass = _.data.entity(
      self,
      "Inventory[{Slot:102b}].tag.ahsoka_chestplate"
    );
    let isWearingAhsokaLeggings: ConditionClass = _.data.entity(
      self,
      "Inventory[{Slot:101b}].tag.ahsoka_leggings"
    );
    let isWearingAhsokaBoots: ConditionClass = _.data.entity(
      self,
      "Inventory[{Slot:100b}].tag.ahsoka_boots"
    );

    // execute as @a if data entity @s Inventory[{Slot:103b}].tag.ahsoka_helmet run say hi <- Command to rewrite
    execute
      .as("@a")
      .if(isWearingAhsokaHelmet)
      .if(isWearingAhsokaChestplate)
      .if(isWearingAhsokaLeggings)
      .if(isWearingAhsokaBoots)
      .run(() => {
        effect.give(self, "minecraft:jump_boost", 1, 4, true);
        effect.give(self, "minecraft:speed", 1, 2, true);
      });
  },
  {
    runEach: "5t",
  }
);

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
                tag: `{display:{Name:'{"text":"Rick\\'s Helmet","color":"gold","italic":false}'},HideFlags:255,ahsoka_helmet:1b,AttributeModifiers:[{AttributeName:"generic.max_health",Name:"generic.max_health",Amount:0.2,Operation:1,UUID:[I;-1600194419,796740124,-2061262516,-1732951350], Slot:"head"}]}`,
              },
            ],
          },
          {
            type: "minecraft:item",
            name: "minecraft:netherite_chestplate",
            functions: [
              {
                function: "set_nbt",
                tag: `{display:{Name:'{"text":"Rick\\'s Chestplate","color":"gold","italic":false}'},HideFlags:255,ahsoka_chestplate:1b,AttributeModifiers:[{AttributeName:"generic.max_health",Name:"generic.max_health",Amount:0.2,Operation:1,UUID:[I;-939962238,-821476971,-1719916940,1110537383], Slot:"chest"},{AttributeName:"generic.knockback_resistance",Name:"generic.knockback_resistance",Amount:0.1,Operation:1,UUID:[I;2070244310,-771078295,-1685789333,-1480455025], Slot:"chest"}]}`,
              },
            ],
          },
          {
            type: "minecraft:item",
            name: "minecraft:netherite_leggings",
            functions: [
              {
                function: "set_nbt",
                tag: `{display:{Name:'{"text":"Rick\\'s Leggings","color":"gold","italic":false}'},HideFlags:255,ahsoka_leggings:1b,AttributeModifiers:[{AttributeName:"generic.max_health",Name:"generic.max_health",Amount:0.1,Operation:1,UUID:[I;1865019265,-1397667338,-1820938560,-219611821], Slot:"legs"}]}`,
              },
            ],
          },
          {
            type: "minecraft:item",
            name: "minecraft:netherite_boots",
            functions: [
              {
                function: "set_nbt",
                tag: `{display:{Name:'{"text":"Rick\\'s Boots","color":"gold","italic":false}'},HideFlags:255,ahsoka_boots:1b,AttributeModifiers:[{AttributeName:"generic.max_health",Name:"generic.max_health",Amount:0.1,Operation:1,UUID:[I;1773482327,37572041,-1658102902,-939607436], Slot:"feet"}]}`,
              },
            ],
          },
        ],
      },
    ],
  });
