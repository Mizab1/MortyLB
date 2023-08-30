import {
  LootTable,
  LootTableInstance,
  MCFunction,
  MCFunctionInstance,
  Selector,
  _,
  execute,
  kill,
  loot,
  rel,
  say,
} from "sandstone";
import { rng } from "../Tick";
import { uniform } from "../lib/uniform";
import { availableBadLoots } from "./GenericBadLoots";

const self = Selector("@s");

// Scores and Variables

LootTable("bad_loot", {
  type: "generic",
  pools: [
    {
      rolls: 1,
      bonus_rolls: 1,
      entries: [
        {
          type: "minecraft:item",
          name: "minecraft:stone",
          functions: [
            {
              function: "set_nbt",
              tag: '{"bad_loot":1b}', // It means its a bad loot
            },
          ],
        },
      ],
    },
  ],
});

const randomLoot: LootTableInstance = LootTable("random_loot", {
  type: "generic",
  pools: [
    {
      rolls: 1,
      bonus_rolls: 0,
      entries: [
        {
          type: "minecraft:loot_table",
          name: "default:good_loot",
        },
        {
          type: "minecraft:loot_table",
          name: "default:bad_loot",
        },
      ],
    },
  ],
});

// Pick a random event
export const pickRandom: MCFunctionInstance = MCFunction(
  "loots/pick_random",
  () => {
    loot.spawn(rel(0, 0, 0)).loot(randomLoot.toString());
    execute
      .as(Selector("@e", { type: "minecraft:item", distance: [Infinity, 3] }))
      .at(self)
      .if(_.data.entity(self, "Item.tag.bad_loot"))
      .run(() => {
        rng.set(uniform(0, availableBadLoots.length - 1));
        availableBadLoots.forEach((value, i) => {
          // ! Change the name space if edited
          execute.if(rng.equalTo(i)).run.functionCmd(`default:loots/${value}`);
        });
        kill(self);
        // rng.set(0);
      });
  }
);
