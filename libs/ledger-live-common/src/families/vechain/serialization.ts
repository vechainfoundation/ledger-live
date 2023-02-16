import { BigNumber } from "bignumber.js";
import { Energy, EnergyRaw } from "./types";
import { Operation } from "@ledgerhq/types-live";

export function toEnergyRaw(r: Energy): EnergyRaw {
  const { selected, history, energy, transactions } = r;
  const transactionStrings: string[] = [];
  if (transactions)
    transactions.forEach((c) => {
      transactionStrings.push(
        JSON.stringify({ ...c, value: c.value.toString() })
      );
    });

  return {
    selected:selected,
    history: JSON.stringify(history),
    energy: energy.toString(),
    transactions: transactionStrings,
  };
}

export function fromEnergyRaw(r: EnergyRaw): Energy {
  const { selected, history, energy, transactions } = r;
  const transactionObj: Operation[] = [];
  if (transactions)
    transactions.forEach((c) => {
      transactionObj.push(JSON.parse(c));
    });
  transactionObj.forEach((c) => {
    c.date = new Date(c.date);
    c.value = new BigNumber(c.value);
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
  };
}
