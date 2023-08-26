import type { SandstoneConfig } from "sandstone";

export default {
  name: "MortyLB",
  description: ["A Datapack Created By: ", { text: "Mizab", color: "gold" }],
  formatVersion: 15,
  namespace: "default",
  packUid: "9PqmSX99",
  // saveOptions: { path: "./.sandstone/output/datapack" },
  saveOptions: { world: "Testing 4" },
  onConflict: {
    default: "warn",
  },
} as SandstoneConfig;
