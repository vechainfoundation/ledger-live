import { TransactionCommon } from "@ledgerhq/types-live";
import BigNumber from "bignumber.js";
import { $Shape } from "utility-types";
import {
  DEFAULT_GAS_COEFFICIENT,
  HEX_PREFIX,
  TESTNET_CHAIN_TAG,
} from "./constants";
import { Transaction, VechainAccount } from "./types";
import { Transaction as ThorTransaction } from "thor-devkit";
import {
  estimateGas,
  generateNonce,
  getBlockRef,
} from "./utils/transaction-utils";
import { VTHO_ADDRESS } from "./contracts/constants";
import VIP180 from "./contracts/abis/VIP180";

/**
 * Create an empty transaction
 *
 * TODO: Need some way to determine whether this is VET or VTHO. Currently just using VET.
 * We need to pass something from the screens.
 *
 * @returns {Transaction}
 */
export const createTransaction = (): Transaction => {
  return createVetTransaction();
};

/**
 * Create an empty VET transaction
 *
 * @returns {Transaction}
 */
const createVetTransaction = (): Transaction => ({
  family: "vechain",
  mode: "send_vet",
  body: {
    chainTag: TESTNET_CHAIN_TAG,
    blockRef: "empty",
    expiration: 18,
    clauses: [],
    gasPriceCoef: DEFAULT_GAS_COEFFICIENT,
    gas: "0",
    dependsOn: null,
    nonce: generateNonce(),
  },
  amount: BigNumber(0),
  recipient: "",
});

/**
 * Create an empty VTHO transaction
 *
 * @returns {Transaction}
 */
const createVthoTransaction = (): Transaction => ({
  family: "vechain",
  mode: "send_vtho",
  body: {
    chainTag: TESTNET_CHAIN_TAG,
    blockRef: "empty",
    expiration: 18,
    clauses: [],
    gasPriceCoef: DEFAULT_GAS_COEFFICIENT,
    gas: "0",
    dependsOn: null,
    nonce: generateNonce(),
  },
  amount: BigNumber(0),
  recipient: "",
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
): Transaction =>
  t.mode === "send_vet"
    ? updateVetTransaction(t, patch)
    : updateVthoTransaction(t, patch);

/**
 * Apply patch to a VET transaction
 *
 * @param {Transaction} t
 * @param {TransactionCommon} patch
 * @returns patched transaction
 */
const updateVetTransaction = (
  t: Transaction,
  patch: $Shape<TransactionCommon>
): Transaction => {
  const clauses: ThorTransaction.Clause[] = [];

  // Get the existing clause or create a blank one
  const updatedClause: ThorTransaction.Clause =
    t.body.clauses.length > 0
      ? t.body.clauses[0]
      : { to: null, value: 0, data: "0x" };

  if (patch.amount)
    updatedClause.value = `${HEX_PREFIX}${patch.amount.toString(16)}`;
  if (patch.recipient) updatedClause.to = patch.recipient;

  clauses.push(updatedClause);

  const updatedBody = { ...t.body, clauses };

  return { ...t, ...patch, body: updatedBody };
};

/**
 * Apply patch to a VTHO transaction
 *
 * @param {Transaction} t
 * @param {TransactionCommon} patch
 * @returns patched transaction
 */
const updateVthoTransaction = (
  t: Transaction,
  patch: $Shape<TransactionCommon>
): Transaction => {
  const clauses: ThorTransaction.Clause[] = [];

  // Get the existing clause or create a blank one
  const updatedClause: ThorTransaction.Clause =
    t.body.clauses.length > 0
      ? t.body.clauses[0]
      : { to: VTHO_ADDRESS, value: 0, data: "0x" };

  const updatedValues = {
    to: t.recipient,
    amount: t.amount.toFixed(),
  };
  if (patch.amount) updatedValues.amount = patch.amount.toFixed();
  if (patch.recipient) updatedValues.to = patch.recipient;

  updatedClause.data = VIP180.transfer.encode(
    updatedValues.to,
    updatedValues.amount
  );

  clauses.push(updatedClause);

  const updatedBody = { ...t.body, clauses };

  return { ...t, ...patch, body: updatedBody };
};

/**
 * Prepare transaction before checking status
 *
 * @param {Account} a
 * @param {Transaction} t
 */
export const prepareTransaction = async (
  a: VechainAccount,
  t: Transaction
): Promise<Transaction> => {
  const blockRef = await getBlockRef();

  const gas = await estimateGas(t);

  const body = { ...t.body, gas, blockRef };

  return { ...t, body };
};
