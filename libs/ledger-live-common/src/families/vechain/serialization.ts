import { BigNumber } from "bignumber.js";
import { Energy, EnergyRaw } from "./types";
import { Operation } from "@ledgerhq/types-live";

export function toEnergyRaw(r: Energy): EnergyRaw {
  const { selected, history, energy, transactions, pendingOperations } = r;
  const transactionStrings: string[] = [];
  const pendingOperationsStrings: string[] = [];
  if (transactions)
    transactions.forEach((c) => {
      transactionStrings.push(
        JSON.stringify({ ...c, value: c.value.toString() })
      );
    });
  if (pendingOperations)
    pendingOperations.forEach((c) => {
      pendingOperationsStrings.push(JSON.stringify({ ...c }));
    });

  return {
    selected: selected,
    history: JSON.stringify(history),
    energy: energy.toString(),
    transactions: transactionStrings,
    pendingOperations: pendingOperationsStrings,
  };
}

export function fromEnergyRaw(r: EnergyRaw): Energy {
  const { selected, history, energy, transactions, pendingOperations } = r;
  const transactionObj: Operation[] = [];
  let pendingOperationsObj: Operation[] = [];

  if (transactions)
    transactions.forEach((c) => {
      transactionObj.push(JSON.parse(c));
    });
  transactionObj.forEach((c) => {
    c.date = new Date(c.date);
    c.value = new BigNumber(c.value);
  });

  if (pendingOperations)
    pendingOperations.forEach((c) => {
      pendingOperationsObj.push(JSON.parse(c));
    });

  return {
    selected: selected,
    history: history
      ? JSON.parse(history)
      : {
          HOUR: { balances: [], latestDate: 0 },
          DAY: { balances: [], latestDate: 0 },
          WEEK: { balances: [], latestDate: 0 },
        },
    energy: BigNumber(energy),
    transactions: transactionObj,
    pendingOperations: pendingOperationsObj,
  };
}
