import {
  LootTable,
  MCFunction,
  NBT,
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
  rel,
  summon,
  tag,
  title,
  tp,
} from "sandstone";
import { raycast } from "sandstone-raycast";
import { portalGunPredicateName } from "./CarrotOnAStickBase";

const self = Selector("@s");

const portalGunCooldownObj: ObjectiveInstance = Objective.create(
  "por_g_cooldown",
  "dummy"
);
const portalGunCooldown = portalGunCooldownObj("@s");

export const portalGunLogic = MCFunction("items/portal_gun_logic", () => {
  _.if(portalGunCooldown.matches(0), () => {
    tag(self).add("used_portal_gun");
    execute
      .anchored("eyes")
      .positioned(loc(0, 0, 2))
      .run(() => {
        raycast(
          "raycast/portal_gun/main",
          // @ts-ignore
          "#aestd1:passthrough",
          null,
          MCFunction("raycast/portal_gun/update", () => {}),
          MCFunction("raycast/portal_gun/hit", () => {
            tp(rel(0, 0, 0));
            particle("minecraft:portal", rel(0, 1, 0), [0.5, 0.5, 0.5], 1, 100);
            playsound(
              "minecraft:sfx.portal_gun_2",
              "master",
              "@s",
              rel(0, 0, 0),
              0.3,
              1
            );
            // Add a cooldown
            portalGunCooldown.set(60);
          }),
          1,
          60
        );
      });
    tag(self).remove("used_portal_gun");
  });
});
export const portalGunHighlight = () => {
  tag(self).add("is_holding_portal_gun");
  _.if(portalGunCooldown.matches([Infinity, 0]), () => {
    execute
      .anchored("eyes")
      .positioned(loc(0, 0, 2))
      .run(() => {
        raycast(
          "raycast/portal_gun/highlight/main",
          // @ts-ignore
          "#aestd1:passthrough",
          null,
          MCFunction("raycast/portal_gun/highlight/update", () => {}),
          MCFunction("raycast/portal_gun/highlight/hit", () => {
            _.if(
              _.not(
                Selector("@e", {
                  type: "minecraft:shulker",
                  tag: "portal_gun_highlight",
                  dx: 0,
                })
              ),
              () => {
                summon("minecraft:shulker", rel(0, 0, 0), {
                  DeathLootTable: "minecraft:bat",
                  Tags: ["portal_gun_highlight"],
                  Glowing: NBT.byte(1),
                  NoAI: NBT.byte(1),
                  ActiveEffects: [
                    {
                      Id: 14,
                      Amplifier: NBT.byte(1),
                      Duration: 999999,
                      ShowParticles: NBT.byte(0),
                    },
                  ],
                });
              }
            );
          }),
          1,
          60
        );
      });
  });
  tag(self).remove("is_holding_portal_gun");

  // Kill the shulker if the player is not looking at it
  tp(
    Selector("@e", { type: "minecraft:shulker", tag: "portal_gun_highlight" }),
    rel(0, -600, 0)
  );
};
export const PortalGunCooldownLogic = () => {
  // Run asat player
  _.if(_.not(portalGunCooldown.matches([Infinity, 0])), () => {
    portalGunCooldown.remove(1);
    // ! Change the namespace
    _.if(
      Selector("@s", { predicate: `default:${portalGunPredicateName}` }),
      () => {
        title(self).actionbar({ text: "Reloading..", color: "red" });
      }
    ).else(() => {
      title(self).actionbar({ text: "" });
    });
  }).else(() => {
    portalGunCooldown.set(0);
  });
};

// Loot table
const portalGunNbt: NBTObject = {
  display: {
    Name: '{"text":"Portal Gun","color":"red","italic":false}',
    Lore: [
      '{"text":"Right-Click to use Teleport Ability","color":"dark_purple","italic":false}',
    ],
  },
  HideFlags: 255,
  CustomModelData: 100002,
};
export const portalGunLootTable = () =>
  LootTable(`loots/portal_gun`, {
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
                tag: nbtParser(portalGunNbt),
              },
            ],
          },
        ],
      },
    ],
  });
