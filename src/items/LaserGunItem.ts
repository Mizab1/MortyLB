import {
  LootTable,
  MCFunction,
  NBTObject,
  Objective,
  ObjectiveInstance,
  Selector,
  _,
  execute,
  loc,
  nbtParser,
  particle,
  playsound,
  raw,
  rel,
  tag,
} from "sandstone";
import { raycast } from "sandstone-raycast";

const self = Selector("@s");

const laserGunCooldownObj: ObjectiveInstance = Objective.create(
  "las_g_cooldown",
  "dummy"
);
const laserGunCooldown = laserGunCooldownObj("@s");

export const laserGunLogic = MCFunction("items/laser_gun_logic", () => {
  _.if(laserGunCooldown.matches(0), () => {
    tag(self).add("used_laser_gun");
    playsound("minecraft:sfx.laser", "master", "@a", rel(0, 0, 0), 0.1, 1);
    execute.anchored("eyes").run(() => {
      raycast(
        "raycast/laser_gun/main",
        // @ts-ignore
        "#aestd1:passthrough",
        Selector("@e", {
          type: "#aestd1:living_base",
          tag: "!used_laser_gun",
          dx: 0,
        }),
        MCFunction("raycast/laser_gun/update", () => {
          particle(
            // @ts-ignore
            "minecraft:dust",
            [1, 0, 0],
            1,
            loc(-0.5, -0.3, 0),
            [0, 0, 0],
            1,
            1
          );
        }),
        MCFunction("raycast/laser_gun/hit", () => {
          execute
            .as(
              Selector("@e", {
                type: "#aestd1:living_base",
                tag: "!used_laser_gun",
                dx: 0,
              })
            )
            .run(() => {
              raw(`damage @s 3 minecraft:magic`);
            });
        }),
        1,
        60
      );
    });
    tag(self).remove("used_laser_gun");
    // Add a cooldown
    laserGunCooldown.set(10);
  });
});

export const laserGunCooldownLogic = () => {
  // Run asat player
  _.if(_.not(laserGunCooldown.matches([Infinity, 0])), () => {
    laserGunCooldown.remove(1);
  }).else(() => {
    laserGunCooldown.set(0);
  });
};

// Loot table
const laserGunNbt: NBTObject = {
  display: {
    Name: '{"text":"Laser Gun","color":"red","italic":false}',
    Lore: [
      '{"text":"Right-Click to use Shoot","color":"dark_purple","italic":false}',
    ],
  },
  HideFlags: 255,
  CustomModelData: 100001,
};
export const laserGunLootTable = () =>
  LootTable(`loots/laser_gun`, {
    type: "generic",
    pools: [
      {
        rolls: 1,
        bonus_rolls: 0,
        entries: [
          {
            type: "minecraft:item",
            name: "minecraft:carrot_on_a_stick",
            functions: [
              {
                function: "set_nbt",
                tag: nbtParser(laserGunNbt),
              },
            ],
          },
        ],
      },
    ],
  });
