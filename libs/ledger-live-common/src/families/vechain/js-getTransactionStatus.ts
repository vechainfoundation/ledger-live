import { BigNumber } from "bignumber.js";
import {
  AmountRequired,
  FeeNotLoaded,
  InvalidAddress,
  InvalidAddressBecauseDestinationIsAlsoSource,
  NotEnoughBalance,
  RecipientRequired,
} from "@ledgerhq/errors";
import type { TransactionStatus } from "./types";
import type { Transaction } from "./types";
import { calculateFee } from "./utils/transaction-utils";
import { Account } from "@ledgerhq/types-live";
import { isValidVechainAddress } from "./utils/isValidAddress";

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

  if (!t.recipient) {
    errors.recipient = new RecipientRequired();
  } else if (a.freshAddress === t.recipient) {
    warnings.recipient = new InvalidAddressBecauseDestinationIsAlsoSource();
  } else if (!isValidVechainAddress(t.recipient)) {
    errors.recipient = new InvalidAddress("", {
      currencyName: a.currency.name,
    });
  }
  // TODO: add a validation function

  if (!amount.gt(0)) {
    errors.amount = new AmountRequired();
  } else {
    const tokenAccount =
      t.subAccountId && a.subAccounts
        ? a.subAccounts.find((a) => {
            return a.id === t.subAccountId;
          })
        : undefined;

    if (tokenAccount) {
      // vtho
      if (t.amount.plus(estimatedFees).gt(tokenAccount.balance)) {
        errors.amount = new NotEnoughBalance();
      }
    } else {
      // vet
      if (t.amount.gt(a.balance)) {
        errors.amount = new NotEnoughBalance();
      }
      const vthoBalance = a.subAccounts?.[0].balance;
      if (estimatedFees.gt(vthoBalance || 0)) {
        errors.amount = new NotEnoughBalance();
      }
    }
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
