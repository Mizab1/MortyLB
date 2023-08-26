import {
  MCFunction,
  NBT,
  Selector,
  effect,
  execute,
  fill,
  give,
  rel,
  setblock,
  spreadplayers,
  summon,
  tellraw,
  time,
} from "sandstone";

const self = Selector("@s");

// Repo for bad loots which can be obtained from the lucky block
export const availableBadLoots: string[] = [
  "zombie_horde",
  "lava",
  "prison",
  "spawn_slime",
  "spawn_magma",
  "spawn_witch",
  "spawn_skeleton_jokey",
  "op_zombie",
  "bad_effects",
  "look_up_trap",
  "illusioner_trap",
  "evoker_trap",
  "wither_trap",
  "tnt_trap",
  "lightning_bolt_trap",
];
let badLootsCounter: number = 0; // Counter for available loots for file naming purposes

// ! Order matter as it is sampling the name from the array itself
// zombie_horde
MCFunction(`loots/${availableBadLoots[badLootsCounter++]}`, () => {
  time.set("midnight");
  give("@a", "minecraft:wooden_sword", 1);
  for (let i = 0; i < 10; i++) {
    summon("minecraft:zombie", rel(0, 3, 0), {
      Tags: ["lb_zombie_horde"],
    });
  }
  spreadplayers(
    rel(0, 0),
    5,
    10,
    false,
    Selector("@e", { tag: ["lb_zombie_horde"], distance: [Infinity, 20] })
  );
});
// lava
MCFunction(`loots/${availableBadLoots[badLootsCounter++]}`, () => {
  setblock(rel(0, 0, 0), "minecraft:lava");
});
// prison
MCFunction(`loots/${availableBadLoots[badLootsCounter++]}`, () => {
  execute
    .as(Selector("@a", { distance: [Infinity, 5], sort: "nearest" }))
    .at(self)
    .run(() => {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          setblock(rel(i, -1, j), "minecraft:stone");
          setblock(rel(i, 2, j), "minecraft:stone_slab");
        }
      }
      // right
      fill(rel(-1, 0, 1), rel(1, 1, 1), "minecraft:iron_bars");
      // left
      fill(rel(-1, 0, -1), rel(1, 1, -1), "minecraft:iron_bars");
      // back
      fill(rel(-1, 0, 0), rel(-1, 1, 0), "minecraft:iron_bars");
      // front
      fill(rel(1, 0, 0), rel(1, 1, 0), "minecraft:iron_bars");
    });
});
// slime
MCFunction(`loots/${availableBadLoots[badLootsCounter++]}`, () => {
  summon("minecraft:slime", rel(0, 0, 0), { Size: 10, Tags: ["lb_slime"] });
});
// magma
MCFunction(`loots/${availableBadLoots[badLootsCounter++]}`, () => {
  summon("minecraft:magma_cube", rel(0, 0, 0), {
    Size: 10,
    Tags: ["lb_magma"],
  });
});
// witch
MCFunction(`loots/${availableBadLoots[badLootsCounter++]}`, () => {
  summon("minecraft:witch", rel(0, 0, 0), { Tags: ["lb_witch"] });
  for (let i = 0; i < 10; i++) {
    summon("bat", rel(0, 0, 0), { Tags: ["lb_bat"] });
  }
});
// spawn_skeleton_jokey
MCFunction(`loots/${availableBadLoots[badLootsCounter++]}`, () => {
  summon("minecraft:skeleton_horse", rel(0, 0, 0), {
    Tags: ["lb_skeleton_horse"],
    Passengers: [
      {
        id: "minecraft:skeleton",
        Tags: ["lb_skeleton"],
        HandItems: [
          {
            id: "minecraft:bow",
            Count: NBT.byte(1),
            tag: {
              Enchantments: [{ id: "minecraft:power", lvl: NBT.short(2) }],
            },
          },
          {},
        ],
      },
    ],
  });
});
// OP zombie
MCFunction(`loots/${availableBadLoots[badLootsCounter++]}`, () => {
  summon("minecraft:zombie", rel(0, 0, 0), {
    Tags: ["lb_op_zombie"],
    HandItems: [
      {
        id: "minecraft:diamond_sword",
        Count: NBT.byte(1),
        tag: {
          Enchantments: [{ id: "minecraft:sharpness", lvl: NBT.short(2) }],
        },
      },
      {},
    ],
    ArmorItems: [
      {
        id: "minecraft:diamond_boots",
        Count: NBT.byte(1),
        tag: {
          Enchantments: [
            { id: "minecraft:protection", lvl: NBT.short(1) },
            { id: "minecraft:thorns", lvl: NBT.short(1) },
          ],
        },
      },
      {
        id: "minecraft:diamond_leggings",
        Count: NBT.byte(1),
        tag: {
          Enchantments: [
            { id: "minecraft:protection", lvl: NBT.short(1) },
            { id: "minecraft:thorns", lvl: NBT.short(1) },
          ],
        },
      },
      {
        id: "minecraft:diamond_chestplate",
        Count: NBT.byte(1),
        tag: {
          Enchantments: [
            { id: "minecraft:protection", lvl: NBT.short(1) },
            { id: "minecraft:thorns", lvl: NBT.short(1) },
          ],
        },
      },
      {
        id: "minecraft:diamond_helmet",
        Count: NBT.byte(1),
        tag: {
          Enchantments: [
            { id: "minecraft:protection", lvl: NBT.short(1) },
            { id: "minecraft:thorns", lvl: NBT.short(1) },
          ],
        },
      },
    ],
  });
});
// Bad Effects
MCFunction(`loots/${availableBadLoots[badLootsCounter++]}`, () => {
  execute
    .as(Selector("@a", { distance: [Infinity, 5] }))
    .at(self)
    .run(() => {
      effect.give(self, "minecraft:blindness", 8, 1, true);
      effect.give(self, "minecraft:slowness", 8, 3, true);
    });
});
// Look up trap
MCFunction(`loots/${availableBadLoots[badLootsCounter++]}`, () => {
  execute
    .as(Selector("@a", { distance: [Infinity, 5], limit: 1 }))
    .at(self)
    .run(() => {
      tellraw(self, { text: "Look Up!", color: "red" });
      setblock(rel(0, 10, 0), "minecraft:anvil");
    });
});
// illusioner_trap
MCFunction(`loots/${availableBadLoots[badLootsCounter++]}`, () => {
  summon("minecraft:illusioner", rel(0, 0, 0), { Tags: ["lb_illusioner"] });
});
// evoker_trap
MCFunction(`loots/${availableBadLoots[badLootsCounter++]}`, () => {
  for (let i = 0; i < 4; i++) {
    summon("minecraft:evoker", rel(0, 0, 0), { Tags: ["lb_evoker"] });
  }
});
// wither_trap
MCFunction(`loots/${availableBadLoots[badLootsCounter++]}`, () => {
  summon("minecraft:wither", rel(0, 0, 0), { Tags: ["lb_wither"] });
});
// tnt_trap
MCFunction(`loots/${availableBadLoots[badLootsCounter++]}`, () => {
  summon("minecraft:tnt", rel(0, 0, 0), {
    Tags: ["lb_tnt"],
    Fuse: 10,
    ignited: NBT.byte(1),
  });
});
// lightning_bolt_trap
MCFunction(`loots/${availableBadLoots[badLootsCounter++]}`, () => {
  summon("minecraft:lightning_bolt", rel(0, 0, 0));
});
