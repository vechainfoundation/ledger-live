import { getEnv } from "../../../env";
import network from "../../../network";
import { HEX_PREFIX } from "../constants";
import crypto from "crypto";
import { Transaction } from "../types";
import BigNumber from "bignumber.js";
import { Transaction as ThorTransaction } from "thor-devkit";
import params from "../contracts/abis/params";
import { BASE_GAS_PRICE_KEY, PARAMS_ADDRESS } from "../contracts/constants";
import { Query } from "../api/types";
import { query } from "../api/sdk";

const BASE_URL = getEnv("API_VECHAIN_THOREST");

/**
 * Get the block ref to use in a transaction
 * @returns the block ref of head
 */
export const getBlockRef = async (): Promise<string> => {
  const { data } = await network({
    method: "GET",
    url: `${BASE_URL}/blocks/best`,
  });

  return data.id.slice(0, 18);
};

/**
 * Generate a Unique ID to be used as a nonce
 * @returns a unique string
 */
export const generateNonce = (): string => {
  const randBuffer = crypto.randomBytes(Math.ceil(4));
  if (!randBuffer) throw Error("Failed to generate random hex");
  return `${HEX_PREFIX}${randBuffer.toString("hex").substring(0, 8)}`;
};

/**
 * Estimate the gas that will be used by the transaction.
 * TODO: Investigate if this implementation is sufficient.
 * There is a much more complex implementation in VeWorld using Connex
 * to simulate the transaction.
 * @param transaction - The transaction to estimate the gas for
 * @returns an estimate of the gas usage
 */
export const estimateGas = (transaction: Transaction): number =>
  ThorTransaction.intrinsicGas(transaction.body.clauses);

const getBaseGasPrice = async (): Promise<string> => {
  const queryData: Query = {
    to: PARAMS_ADDRESS,
    data: params.get.encode(BASE_GAS_PRICE_KEY),
  };

  return await query(queryData);
};

/**
 * Calculate the fee in VTHO
 * @param gas - the gas used
 * @param gasPriceCoef - the gas price coefficient
 * @returns the fee in VTHO
 */
export const calculateFee = async (
  gas: BigNumber,
  gasPriceCoef: number
): Promise<BigNumber> => {
  const baseGasPrice = await getBaseGasPrice();
  return new BigNumber(baseGasPrice)
    .times(gasPriceCoef)
    .idiv(255)
    .plus(baseGasPrice)
    .times(gas);
};
