import type { GetAccountShape } from "../../bridge/jsHelpers";
import { BigNumber } from "bignumber.js";
import { makeSync, makeScanAccounts, mergeOps } from "../../bridge/jsHelpers";
import { encodeAccountId } from "../../account";

import { getAccount, getOperations, getTokenOperations } from "./api";

const getAccountShape: GetAccountShape = async (info) => {
  const { address, initialAccount, currency, derivationMode } = info;
  const oldOperations = initialAccount?.operations || [];
  const startAt = oldOperations.length
    ? (oldOperations[0].blockHeight || 0) + 1
    : 1;

  const accountId = encodeAccountId({
    type: "js",
    version: "2",
    currencyId: currency.id,
    xpubOrAddress: address,
    derivationMode,
  });

  // get the current account balance state depending your api implementation
  const { balance, energy } = await getAccount(address);

  // Merge new operations with the previously synced ones
  const newOperations = await getOperations(accountId, address, startAt);
  const VTHOoperations = await getTokenOperations(
    accountId,
    address,
    "0x0000000000000000000000000000456e65726779",
    1
  );
  const operations = mergeOps(oldOperations, newOperations);

  const shape = {
    ...info,
    id: accountId,
    balance: BigNumber(balance),
    spendableBalance: BigNumber(balance),
    operationsCount: operations.length,
    operations: operations,
    energy: {
      selected:
        initialAccount && initialAccount.energy?.selected
          ? initialAccount.energy.selected
          : "VET",
      history:
        initialAccount && initialAccount.energy?.history
          ? initialAccount.energy.history
          : {
              HOUR: { balances: [], latestDate: 0 },
              DAY: { balances: [], latestDate: 0 },
              WEEK: { balances: [], latestDate: 0 },
            },
      energy: BigNumber(energy),
      transactions: VTHOoperations,
    },
  };

  return { ...shape, operations };
};

export const scanAccounts = makeScanAccounts({ getAccountShape });
export const sync = makeSync({ getAccountShape });
