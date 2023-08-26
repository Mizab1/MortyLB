import {
  MCFunction,
  Objective,
  ObjectiveInstance,
  Score,
  particle,
  rel,
  summon,
} from "sandstone";
import {
  placeLuckyBlockInTheWorld,
  typeOfLuckyBlocks,
  validateBreaking,
} from "./blocks/LuckyBlocksLogic";
import { carrotOnAStickItemsLogic } from "./items/CarrotOnAStickBase";
import { enderPearlItemsLogic } from "./items/EnderPearlBase";
import { pickRandom } from "./loots/LootsPicker";

// ** Scores & Variables ** //
export const internal: ObjectiveInstance = Objective.create(
  "internal",
  "dummy"
);
export const rng: Score = internal("rng");

// ** Game functions **//
MCFunction(
  "tick",
  () => {
    // Lucky Block Related
    {
      // Place the lucky block in the world
      placeLuckyBlockInTheWorld();
      // Handler for when the player breaks the lucky block
      validateBreaking(typeOfLuckyBlocks[0].name, () => {
        particle(
          "minecraft:totem_of_undying",
          rel(0, 0, 0),
          [0.3, 0.3, 0.3],
          0.1,
          100
        );
        summon("minecraft:firework_rocket", rel(0, 0.5, 0), {
          LifeTime: 20,
        });
        pickRandom();
      });
    }

    // Logic related to ender pearl based custom items
    enderPearlItemsLogic();

    // Logic related to Carrot on a stick based custom items
    carrotOnAStickItemsLogic();
  },
  {
    runEachTick: true,
  }
);
