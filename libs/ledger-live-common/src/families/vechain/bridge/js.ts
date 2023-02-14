import type { Transaction, VechainAccount } from "../types";
import { makeAccountBridgeReceive } from "../../../bridge/jsHelpers";

import { sync, scanAccounts } from "../js-synchronisation";
import { AccountBridge, CurrencyBridge } from "@ledgerhq/types-live";
import {
  createTransaction,
  updateTransaction,
  prepareTransaction,
} from "../js-transaction";
import getTransactionStatus from "../js-getTransactionStatus";
import signOperation from "../js-signOperation";
import broadcast from "../js-broadcast";
import BigNumber from "bignumber.js";

const receive: AccountBridge<Transaction>["receive"] =
  makeAccountBridgeReceive();

const currencyBridge: CurrencyBridge = {
  scanAccounts,
  preload: async (): Promise<Record<string, any>> => {
    return {};
  },
  hydrate: (): void => {},
};

// TODO: Handle VTHO
const estimateMaxSpendable = async (inputs: {
  account: VechainAccount;
}): Promise<BigNumber> => {
  return inputs.account.balance;
};

const accountBridge: AccountBridge<Transaction> = {
  estimateMaxSpendable,
  createTransaction,
  updateTransaction,
  getTransactionStatus,
  prepareTransaction,
  sync,
  receive,
  signOperation,
  broadcast,
};

export default { currencyBridge, accountBridge };
