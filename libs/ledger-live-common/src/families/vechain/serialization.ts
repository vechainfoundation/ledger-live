import { BigNumber } from "bignumber.js";
import { Energy, EnergyRaw } from "./types";

export function toEnergyRaw(r: Energy): EnergyRaw {
  const { energy } = r;

  return {
    energy: energy.toString(),
  };
}

export function fromEnergyRaw(r: EnergyRaw): Energy {
  const { energy } = r;
  return {
    energy: BigNumber(energy),
  };
}
