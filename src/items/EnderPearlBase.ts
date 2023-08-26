import {
  ObjectiveInstance,
  Objective,
  Score,
  execute,
  Selector,
  _,
} from "sandstone";
import { invisibilityItemLogic } from "./InvisibilityItem";

const usedEnderPearlObj: ObjectiveInstance = Objective.create(
  "used_ender_pearl",
  "minecraft.used:minecraft.ender_pearl"
);
export const playerUsedEnderPearl: Score = usedEnderPearlObj("@s");

const self = Selector("@s");

// Main Logic for ender pearl
export const enderPearlItemsLogic = () => {
  execute
    .as("@a")
    .at(self)
    .if(playerUsedEnderPearl.matches([1, Infinity]))
    .run(() => {
      playerUsedEnderPearl.reset();

      // Invisibility Item Logic
      tagCheckingForEnderPearl(
        "Item.tag.invisibility_item",
        invisibilityItemLogic
      );
    });
};

// Tag Checking: that is if the enderpearl has the specified tag
const tagCheckingForEnderPearl = (tagName: string, cb: { (): void }) => {
  _.if(
    _.data.entity(
      Selector("@e", {
        type: "minecraft:ender_pearl",
        distance: [Infinity, 1.6],
        limit: 1,
        sort: "nearest",
      }),
      tagName
    ),
    () => {
      cb();
    }
  );
};
