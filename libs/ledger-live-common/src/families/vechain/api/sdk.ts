import { getEnv } from "../../../env";
import network from "../../../network";
import { AccountResponse, VetTxsQuery, TokenTxsQuery } from "./types";
import type { Operation } from "@ledgerhq/types-live";
import {
  mapVetTransfersToOperations,
  mapTokenTransfersToOperations,
} from "../utils/mapping-utils";
import { padAddress } from "../utils/pad-address";
import { TransferEventSignature } from "../contracts/constants";

const BASE_URL = getEnv("API_VECHAIN_THOREST");

export const getAccount = async (address: string): Promise<AccountResponse> => {
  const { data } = await network({
    method: "GET",
    url: `${BASE_URL}/accounts/${address}`,
  });

  return data;
};

/**
 * Get VET operations
 * TODO: If startAt is 0, this will return an empty array. We need to handle this scenario somehow.
 * @param accountId
 * @param addr
 * @param startAt
 * @returns an array of operations
 */
export const getOperations = async (
  accountId: string,
  addr: string,
  startAt: number
): Promise<Operation[]> => {
  const query: VetTxsQuery = {
    range: {
      unit: "block",
      from: startAt,
    },
    criteriaSet: [{ sender: addr }, { recipient: addr }],
    order: "desc",
  };

  const { data } = await network({
    method: "POST",
    url: `${BASE_URL}/logs/transfer`,
    data: JSON.stringify(query),
  });

  return mapVetTransfersToOperations(data, accountId, addr);
};

/**
 * Get operations for a fungible token
 * TODO: If startAt is 0, this will return an empty array. We need to handle this scenario somehow.
 * @param accountId
 * @param addr
 * @param tokenAddr - The token address (The VTHO token address is available from constants.ts)
 * @param startAt
 * @returns an array of operations
 */
export const getTokenOperations = async (
  accountId: string,
  addr: string,
  tokenAddr: string,
  startAt: number
): Promise<Operation[]> => {
  const paddedAddress = padAddress(addr);

  const query: TokenTxsQuery = {
    range: {
      unit: "block",
      from: startAt,
    },
    criteriaSet: [
      {
        address: tokenAddr,
        topic0: TransferEventSignature,
        topic1: paddedAddress,
      },
      {
        address: tokenAddr,
        topic0: TransferEventSignature,
        topic2: paddedAddress,
      },
    ],
    order: "desc",
  };

  const { data } = await network({
    method: "POST",
    url: `${BASE_URL}/logs/event`,
    data: JSON.stringify(query),
  });

  return mapTokenTransfersToOperations(data, accountId, addr);
};
