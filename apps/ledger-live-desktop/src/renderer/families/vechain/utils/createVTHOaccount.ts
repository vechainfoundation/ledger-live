import { generateHistoryFromOperations } from "@ledgerhq/live-common/account/index";
import { getCryptoCurrencyById } from "@ledgerhq/live-common/currencies/index";
// eslint-disable-next-line prettier/prettier
import type { AccountLike } from "@ledgerhq/types-live";
import BigNumber from "bignumber.js"

export const createVTHOaccount = (account: AccountLike) => {
  if(account.type==="Account") {
  const tmp = {
    ...account,
    balance: account.energy?.energy || BigNumber(0),
    balanceHistoryCache: generateHistoryFromOperations({
      ...account,
      balanceHistoryCache: account.energy?.history || {
        HOUR: { balances: [], latestDate: 0 },
        DAY: { balances: [], latestDate: 0 },
        WEEK: { balances: [], latestDate: 0 },
      },
      balance: account.energy?.energy || BigNumber(0),
      currency: getCryptoCurrencyById("vechainThor"),
      unit: getCryptoCurrencyById("vechainThor").units[0],
      operations: account.energy?.transactions || [],
    }),
    currency: getCryptoCurrencyById("vechainThor"),
    unit: getCryptoCurrencyById("vechainThor").units[0],
    operations: account.energy?.transactions || [],
  };
  //  saves new VTHO history inside account
  if(account.energy)
    account.energy.history = tmp.balanceHistoryCache;
  return tmp;}
  return account
};
