import { ITEMS, LiteralUnion, NBTObject } from "sandstone";

export const clamp = (num: number, min: number, max: number): number =>
  Math.min(Math.max(num, min), max);

export const randomRanged = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const item = (item: LiteralUnion<ITEMS>, nbt: NBTObject) => {
  return `${item}${nbt}`;
};
