import { Account, TransactionCommon } from "@ledgerhq/types-live";
import BigNumber from "bignumber.js";
import { $Shape } from "utility-types";
import {
  DEFAULT_GAS_COEFFICIENT,
  HEX_PREFIX,
  TESTNET_CHAIN_TAG,
} from "./constants";
import { Transaction } from "./types";
import { Transaction as ThorTransaction } from "thor-devkit";
import {
  estimateGas,
  generateNonce,
  getBlockRef,
} from "./utils/transaction-utils";
import { VTHO_ADDRESS } from "./contracts/constants";
import VIP180 from "./contracts/abis/VIP180";
import { calculateTransactionInfo } from "./utils/calculateTransactionInfo";
import { isValid } from "./utils/address-utils";
/**
 * Create an empty VET or VTHO transaction
 *
 * @returns {Transaction}
 */
export const createTransaction = (): Transaction => ({
  family: "vechain",
  mode: "send_vet",
  body: {
    chainTag: TESTNET_CHAIN_TAG,
    // placeholder, if "empty" returns error on send modal open
    blockRef: "0x00634a0c856ec1db",
    expiration: 18,
    clauses: [],
    gasPriceCoef: DEFAULT_GAS_COEFFICIENT,
    gas: "0",
    dependsOn: null,
    nonce: generateNonce(),
  },
  amount: BigNumber(0),
  recipient: "",
  useAllAmount: false,
});

/**
 * Apply patch to a transaction
 *
 * @param {Transaction} t
 * @param {TransactionCommon} patch
 * @returns patched transaction
 */
export const updateTransaction = (
  t: Transaction,
  patch: $Shape<TransactionCommon>
): Transaction => {
  return { ...t, ...patch };
};

/**
 * Prepare transaction before checking status
 *
 * @param {Account} a
 * @param {Transaction} t
 */
export const prepareTransaction = async (
  account: Account,
  transaction: Transaction
): Promise<Transaction> => {
  const { amount, isTokenAccount } = await calculateTransactionInfo(
    account,
    transaction
  );

  const blockRef = await getBlockRef();

  const gas = await estimateGas(transaction);

  let clauses: Array<ThorTransaction.Clause> = [];
  if (transaction.recipient && isValid(transaction.recipient)) {
    if (isTokenAccount) {
      clauses = await calculateClausesVtho(transaction, amount);
    } else {
      clauses = await calculateClausesVet(transaction, amount);
    }
  }
  const body = { ...transaction.body, gas, blockRef, clauses };

  return { ...transaction, body, amount };
};

const calculateClausesVtho = async (
  transaction: Transaction,
  amount: BigNumber
): Promise<ThorTransaction.Clause[]> => {
  const clauses: ThorTransaction.Clause[] = [];

  // Get the existing clause or create a blank one
  const updatedClause: ThorTransaction.Clause = {
    to: VTHO_ADDRESS,
    value: 0,
    data: "0x",
  };

  transaction.mode = "send_vtho";
  const updatedValues = {
    to: transaction.recipient,
    amount: amount.toFixed(),
  };

  updatedClause.data = VIP180.transfer.encode(
    updatedValues.to,
    updatedValues.amount
  );

  clauses.push(updatedClause);
  return clauses;
};

const calculateClausesVet = async (
  transaction: Transaction,
  amount: BigNumber
): Promise<ThorTransaction.Clause[]> => {
  const clauses: ThorTransaction.Clause[] = [];

  // Get the existing clause or create a blank one
  const updatedClause: ThorTransaction.Clause = {
    to: null,
    value: 0,
    data: "0x",
  };

  transaction.mode = "send_vet";

  updatedClause.value = `${HEX_PREFIX}${amount.toString(16)}`;
  updatedClause.to = transaction.recipient;

  clauses.push(updatedClause);

  return clauses;
};
