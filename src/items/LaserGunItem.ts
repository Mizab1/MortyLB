import {
  MCFunction,
  Selector,
  execute,
  loc,
  particle,
  raw,
  rel,
  say,
  tag,
} from "sandstone";
import { raycast } from "sandstone-raycast";

const self = Selector("@s");

export const laserGunLogic = () => {
  tag(self).add("used_laser_gun");
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
            raw(`damage @s 2 minecraft:magic`);
          });
      }),
      1,
      60
    );
  });
  tag(self).remove("used_laser_gun");
};
