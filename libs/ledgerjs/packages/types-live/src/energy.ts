import BigNumber from "bignumber.js";
import { BalanceHistoryCache } from "./account";
import { Operation } from "./operation";

export type EnergyCommon = {
  selected: string;
  history: BalanceHistoryCache;
  energy: BigNumber;
  transactions: Operation[];
  pendingOperations: Operation[];
};

export type EnergyRawCommon = {
  selected: string;
  history: string;
  energy: string;
  transactions: string[];
  pendingOperations: string[];
};
