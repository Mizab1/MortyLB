import {
  ObjectiveInstance,
  Objective,
  Score,
  execute,
  Predicate,
  Selector,
  _,
} from "sandstone";
import { laserGunLogic } from "./LaserGunItem";
import {
  PortalGunCooldownLogic,
  portalGunHighlight,
  portalGunLogic,
} from "./PortalGunItem";

const usedCarrotOnAStickObj: ObjectiveInstance = Objective.create(
  "used_coas",
  "minecraft.used:minecraft.carrot_on_a_stick"
);
export const playerUsedCarrotOnAStick: Score = usedCarrotOnAStickObj("@s");

const self = Selector("@s");

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
      itemCheckingForCOAS("red_lightsaber", 100002, portalGunHighlight);

      // Red light Saber Cooldown Logic
      PortalGunCooldownLogic();
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
      itemCheckingForCOAS("red_lightsaber", 100002, portalGunLogic);

      /* Laser Gun */
      // if the player used the custom item item
      itemCheckingForCOAS("laser_gun", 100001, laserGunLogic);
    });
};
// Create the predicate and test if the player is folding the custom item
// ! This function must be run from the context of the player
const itemCheckingForCOAS = (
  predicateName: string,
  customModelData: number,
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
  _.if(Selector("@s", { predicate: predicate }), () => {
    cb();
  });
};
