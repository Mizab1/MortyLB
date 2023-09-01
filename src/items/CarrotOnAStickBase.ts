import {
  ObjectiveInstance,
  Objective,
  Score,
  execute,
  Predicate,
  Selector,
  _,
} from "sandstone";
import {
  excludeUsers,
  laserGunCooldownLogic,
  laserGunLogic,
} from "./LaserGunItem";
import {
  PortalGunCooldownLogic,
  portalGunHighlight,
  portalGunLogic,
} from "./PortalGunItem";
import { meseeksBoxLogic } from "./MeseeksBox";
import { invisibilityItemLogic } from "./InvisibilityItem";

const usedCarrotOnAStickObj: ObjectiveInstance = Objective.create(
  "used_coas",
  "minecraft.used:minecraft.carrot_on_a_stick"
);
export const playerUsedCarrotOnAStick: Score = usedCarrotOnAStickObj("@s");

const self = Selector("@s");
export const portalGunPredicateName: string = "portal_gun";
export const laserGunPredicateName: string = "laser_gun";

/**
 * Executes the logic for carrotOnAStickItemsLogic.
 *
 * @return {void} This function does not return anything.
 */
// * Ticking Function
export const carrotOnAStickItemsLogic = () => {
  /* Portal Gun */
  // Always highlight the target when player is holding the item
  execute
    .as("@a")
    .at(self)
    .run(() => {
      itemCheckingForCOAS(
        "portal_gun_highlight",
        100002,
        null,
        portalGunHighlight
      );

      // Portal Gun Cooldown Logic
      PortalGunCooldownLogic();
      // Laser Gun Cooldown Logic
      laserGunCooldownLogic();
    });

  // Detect when the player When used the item
  execute
    .as("@a")
    .at(self)
    .if(playerUsedCarrotOnAStick.matches([1, Infinity]))
    .run(() => {
      playerUsedCarrotOnAStick.reset();

      /* Portal Gun */
      // if the player used the custom item item
      itemCheckingForCOAS(portalGunPredicateName, 100002, null, portalGunLogic);

      /* Laser Gun */
      // if the player used the custom item item
      itemCheckingForCOAS(
        laserGunPredicateName,
        100001,
        excludeUsers,
        laserGunLogic
      );

      /* Invisibility Item */
      // if the player used the custom item item
      itemCheckingForCOAS(
        "invisibility_item",
        100003,
        null,
        invisibilityItemLogic
      );

      /* Meseeks Box */
      // if the player used the custom item item
      itemCheckingForCOAS("meseeks_box", 100004, null, meseeksBoxLogic);
    });
};

// PRIVATE FUNCTIONS
// Create the predicate and test if the player is folding the custom item
// ! This function must be run from the context of the player
const itemCheckingForCOAS = (
  predicateName: string,
  customModelData: number,
  excludeTag: string,
  cb: { (): void }
) => {
  // Create a  custom predicate
  const predicate = Predicate(
    predicateName,
    {
      condition: "minecraft:entity_properties",
      entity: "this",
      predicate: {
        type: "minecraft:player",
        equipment: {
          mainhand: {
            items: ["minecraft:carrot_on_a_stick"],
            nbt: `{CustomModelData:${customModelData}}`,
          },
        },
      },
    },
    {
      onConflict: "replace",
    }
  );

  // check if the player is using the custom item from which the predicate was created
  if (excludeTag === null) {
    _.if(Selector("@s", { predicate: predicate }), () => {
      cb();
    });
  } else {
    _.if(
      Selector("@s", { predicate: predicate, tag: `!${excludeTag}` }),
      () => {
        cb();
      }
    );
  }
};
