import { MCFunction, _, execute, effect, Selector } from "sandstone";
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
