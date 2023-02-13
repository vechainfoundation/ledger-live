import BigNumber from "bignumber.js";
import { BalanceHistoryCache } from "./account";
import { Operation } from "./operation";

export type EnergyCommon = {
  history: BalanceHistoryCache;
  energy: BigNumber;
  transactions: Operation[];
};

export type EnergyRawCommon = {
  history: string;
  energy: string;
  transactions: string[];
};
