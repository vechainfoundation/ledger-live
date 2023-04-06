import type {
  Transaction,
  TransactionRaw,
  TransactionStatus,
  TransactionStatusRaw,
} from "./types";
import {
  formatTransactionStatusCommon as formatTransactionStatus,
  fromTransactionCommonRaw,
  fromTransactionStatusRawCommon,
  toTransactionCommonRaw,
  toTransactionStatusRawCommon,
} from "@ledgerhq/coin-framework/transaction/common";

export const formatTransaction = (t: Transaction): string => {
  return "";
};

export const fromTransactionRaw = (tr: TransactionRaw): Transaction => {
  const common = fromTransactionCommonRaw(tr);

  return {
    ...tr,
    ...common,
  };
};

export const toTransactionRaw = (t: Transaction): TransactionRaw => {
  const common = toTransactionCommonRaw(t);

  return {
    ...t,
    ...common,
  };
};

export const fromTransactionStatusRaw = (
  ts: TransactionStatusRaw
): TransactionStatus => {
  const common = fromTransactionStatusRawCommon(ts);

  return {
    ...ts,
    ...common,
  };
};

export const toTransactionStatusRaw = (
  ts: TransactionStatus
): TransactionStatusRaw => {
  const common = toTransactionStatusRawCommon(ts);

  return {
    ...ts,
    ...common,
  };
};

export default {
  formatTransaction,
  formatTransactionStatus,
  fromTransactionRaw,
  toTransactionRaw,
  fromTransactionStatusRaw,
  toTransactionStatusRaw,
};
