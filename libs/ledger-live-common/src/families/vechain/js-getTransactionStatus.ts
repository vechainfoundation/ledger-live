import { BigNumber } from "bignumber.js";
import { FeeNotLoaded } from "@ledgerhq/errors";
import type { VechainAccount, TransactionStatus } from "./types";
import type { Transaction } from "./types";
import { calculateFee } from "./utils/transaction-utils";

// TODO: Implement this properly
const getTransactionStatus = async (
  a: VechainAccount,
  t: Transaction
): Promise<TransactionStatus> => {
  const errors = {};
  const warnings = {};

  // TODO: Implement this properly
  if (!t.body || !t.body.gas) {
    errors["body"] = new FeeNotLoaded();
  }

  const estimatedFees = await calculateFee(
    BigNumber(t.body.gas),
    t.body.gasPriceCoef
  );

  return Promise.resolve({
    errors,
    warnings,
    estimatedFees,
    amount: t.amount,
    totalSpent: t.amount,
  });
};

export default getTransactionStatus;
