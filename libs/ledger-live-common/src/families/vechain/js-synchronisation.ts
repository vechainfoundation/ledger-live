import BigNumber from "bignumber.js";
import {
  GetAccountShape,
  makeScanAccounts,
  makeSync,
} from "../../bridge/jsHelpers";
import type { Account } from "@ledgerhq/types-live";
import api from "./api";
import { encodeAccountId } from "../../account";

// TODO: Implement getAccountShape() properly
export const getAccountShape: GetAccountShape = async (info) => {
  const { currency, address, derivationMode } = info;

  const accountId = encodeAccountId({
    type: "js",
    version: "2",
    currencyId: currency.id,
    xpubOrAddress: address,
    derivationMode,
  });

  const acct = await api.getAccount(address);

  const response: Partial<Account> = {
    id: accountId,
    balance: new BigNumber(acct.balance),
  };
  return response;
};

export const scanAccounts = makeScanAccounts({ getAccountShape });
export const sync = makeSync({ getAccountShape });
