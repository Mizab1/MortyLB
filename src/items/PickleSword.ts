import {
  Advancement,
  LootTable,
  MCFunction,
  NBT,
  NBTObject,
  Objective,
  ObjectiveInstance,
  Score,
  Selector,
  _,
  advancement,
  data,
  execute,
  kill,
  nbtParser,
  raw,
  rel,
  summon,
  tag,
  tp,
} from "sandstone";

const self = Selector("@s");

// Variables
// Store the UUID of the player for pickle sword purposes
const uuidFirstByteObj: ObjectiveInstance = Objective.create(
  "uuidObj1",
  "dummy"
);
const uuidSecondByteObj: ObjectiveInstance = Objective.create(
  "uuidObj2",
  "dummy"
);
const uuidThirdByteObj: ObjectiveInstance = Objective.create(
  "uuidObj3",
  "dummy"
);
const uuidForthByteObj: ObjectiveInstance = Objective.create(
  "uuidObj4",
  "dummy"
);
const uuidFirstByte: Score = uuidFirstByteObj(self);
const uuidSecondByte: Score = uuidSecondByteObj(self);
const uuidThirdByte: Score = uuidThirdByteObj(self);
const uuidForthByte: Score = uuidForthByteObj(self);

// Timer for mini pickle
const timerForPickleObj: ObjectiveInstance = Objective.create("timer", "dummy");
const timerForPickle: Score = timerForPickleObj(self);

const logic = MCFunction("items/pickle_sword_logic", () => {
  // Revoke the advancement once it is granted
  // ! Change the namespace if edited
  advancement.revoke(self).only("default:hurt_player_with_pickle_sword");

  // Store the UUID
  execute.store.result
    .score(uuidFirstByte)
    .run.data.get.entity(self, `UUID[0]`);
  execute.store.result
    .score(uuidSecondByte)
    .run.data.get.entity(self, `UUID[1]`);
  execute.store.result
    .score(uuidThirdByte)
    .run.data.get.entity(self, `UUID[2]`);
  execute.store.result
    .score(uuidForthByte)
    .run.data.get.entity(self, `UUID[3]`);

  // Summon a pickle
  summon("minecraft:wolf", rel(0, 0, 0), {
    Tags: ["mini_pickle", "new"],
    Owner: NBT`[I;0,0,0,0]`,
  });

  // Store the UUID of the player to the wolf and set the timer
  execute.as(Selector("@e", { type: "minecraft:wolf", tag: "new" })).run(() => {
    raw(
      `execute store result entity @s Owner[0] int 1 run scoreboard players get @a[distance=..1, sort=nearest, limit=1] uuidObj1`
    );
    raw(
      `execute store result entity @s Owner[1] int 1 run scoreboard players get @a[distance=..1, sort=nearest, limit=1] uuidObj2`
    );
    raw(
      `execute store result entity @s Owner[2] int 1 run scoreboard players get @a[distance=..1, sort=nearest, limit=1] uuidObj3`
    );
    raw(
      `execute store result entity @s Owner[3] int 1 run scoreboard players get @a[distance=..1, sort=nearest, limit=1] uuidObj4`
    );

    // Set the timer
    timerForPickle.set(6);

    // remove the new tag
    tag(self).remove("new");
  });
});

// Timer count down logic
const timerCountDown = MCFunction(
  "items/pickle_sword_timer",
  () => {
    execute
      .as(Selector("@e", { type: "minecraft:wolf", tag: "mini_pickle" }))
      .run(() => {
        _.if(timerForPickle.matches(0), () => {
          // Dissociate the wolf Owner ID from the player UUID and kill it
          data.modify.entity(self, "Owner[0]").set.value(0);
          tp(self, rel(0, 600, 0));
          kill(self);
        }).else(() => {
          timerForPickle.remove(1);
        });
      });
  },
  {
    runEach: "1s",
  }
);

// Advancement which detect if the player hurt another entity and check if they have right sword
Advancement("hurt_player_with_pickle_sword", {
  criteria: {
    requirement: {
      trigger: "minecraft:player_hurt_entity",
      conditions: {
        player: [
          {
            condition: "minecraft:entity_properties",
            entity: "this",
            predicate: {
              type: "minecraft:player",
              equipment: {
                mainhand: {
                  items: ["minecraft:netherite_sword"],
                },
              },
            },
          },
        ],
      },
    },
  },
  rewards: {
    function: "default:items/pickle_sword_logic",
  },
});

// Loot table
const pickleSwordNbt: NBTObject = {
  display: { Name: '{"text":"Pickle Sword","color":"gold","italic":false}' },
  HideFlags: 255,
  Unbreakable: NBT.byte(1),
  CustomModelData: 100001,
};
export const pickleSwordLootTable = () =>
  LootTable(`loots/pickle_sword`, {
    type: "generic",
    pools: [
      {
        rolls: 1,
        bonus_rolls: 0,
        entries: [
          {
            type: "minecraft:item",
            name: "minecraft:netherite_sword",
            functions: [
              {
                function: "set_nbt",
                tag: nbtParser(pickleSwordNbt),
              },
            ],
          },
        ],
      },
    ],
  });
