import { BigNumber } from "bignumber.js";
import {
  AmountRequired,
  FeeNotLoaded,
  NotEnoughBalance,
} from "@ledgerhq/errors";
import type { TransactionStatus } from "./types";
import type { Transaction } from "./types";
import { calculateFee } from "./utils/transaction-utils";
import { Account } from "@ledgerhq/types-live";

// TODO: Implement this properly
const getTransactionStatus = async (
  a: Account,
  t: Transaction
): Promise<TransactionStatus> => {
  const { amount } = t;
  const errors: Record<string, Error> = {};
  const warnings: Record<string, Error> = {};

  // TODO: Implement this properly
  if (!t.body || !t.body.gas) {
    errors["body"] = new FeeNotLoaded();
  }

  const estimatedFees = await calculateFee(
    BigNumber(t.body.gas),
    t.body.gasPriceCoef
  );

  const tokenAccount =
    t.subAccountId && a.subAccounts
      ? a.subAccounts.find((a) => {
          return a.id === t.subAccountId;
        })
      : undefined;

  if (!amount.gt(0)) {
    errors.amount = new AmountRequired();
  } else if (
    // TODO: Add fees check
    tokenAccount ? t.amount.gt(tokenAccount.balance) : t.amount.gt(a.balance)
  ) {
    errors.amount = new NotEnoughBalance();
  }

  return Promise.resolve({
    errors,
    warnings,
    estimatedFees,
    amount: t.amount,
    totalSpent: t.amount,
  });
};

export default getTransactionStatus;
