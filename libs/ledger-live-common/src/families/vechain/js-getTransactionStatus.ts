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
import { Account } from "@ledgerhq/types-live";
import { calculateTransactionInfo } from "./utils/calculateTransactionInfo";
import { isValid } from "./utils/address-utils";

// NOTE: seems like the spendableBalance is not updated correctly:
// use balance.minus(estimatedFees) instead
const getTransactionStatus = async (
  account: Account,
  transaction: Transaction
): Promise<TransactionStatus> => {
  const { freshAddress, currency, subAccounts } = account;
  const { body, recipient } = transaction;
  const errors: Record<string, Error> = {};
  const warnings: Record<string, Error> = {};
  const {
    amount,
    isTokenAccount,
    estimatedFees,
    totalSpent,
    spendableBalance,
  } = await calculateTransactionInfo(account, transaction);

  // TODO: Implement this properly
  if (!body || !body.gas) {
    errors["body"] = new FeeNotLoaded();
  }

  if (!recipient) {
    errors.recipient = new RecipientRequired();
  } else if (freshAddress === recipient) {
    warnings.recipient = new InvalidAddressBecauseDestinationIsAlsoSource();
  } else if (!isValid(recipient)) {
    errors.recipient = new InvalidAddress("", {
      currencyName: currency.name,
    });
  }
  // TODO: add a validation function

  if (!amount.gt(0)) {
    errors.amount = new AmountRequired();
  } else {
    if (amount.gt(spendableBalance)) {
      errors.amount = new NotEnoughBalance();
    }
    if (!isTokenAccount) {
      // vet
      const vthoBalance = subAccounts?.[0].balance;
      if (estimatedFees.gt(vthoBalance || 0)) {
        errors.amount = new NotEnoughBalance();
      }
    }
  }

  return Promise.resolve({
    errors,
    warnings,
    estimatedFees,
    amount,
    totalSpent,
  });
};

export default getTransactionStatus;
