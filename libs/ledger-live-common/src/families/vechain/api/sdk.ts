import { getEnv } from "../../../env";
import network from "../../../network";
import { AccountResponse, TransferLog } from "./types";
import { BigNumber } from "bignumber.js";
import { log } from "@ledgerhq/logs";
import type { Operation } from "@ledgerhq/types-live";

const BASE_URL = getEnv("API_VECHAIN_THOREST");

export const getAccount = async (address: string): Promise<AccountResponse> => {
  const { data } = await network({
    method: "GET",
    url: `${BASE_URL}/accounts/${address}`,
  });

  return data;
};

interface VetCriteria {
  recipient?: string;
  sender?: string;
}
interface VetTxsQuery {
  criteriaSet: VetCriteria[];
  order: "desc" | "asc";
}

const mapTxToOperations = (
  ops: TransferLog[],
  accountId: string
): Operation[] => {
  return ops.map((op) => {
    return {
      id: op.meta.txID,
      hash: op.meta.txID,
      type: "IN",
      value: new BigNumber(op.amount),
      fee: new BigNumber(0),
      senders: [op.sender],
      recipients: [op.recipient],
      blockHeight: op.meta.blockNumber,
      blockHash: op.meta.blockID,
      accountId,
      date: new Date(op.meta.blockTimestamp),
      extra: {},
    };
  });
};

export const getOperations = async (
  accountId: string,
  addr: string,
  startAt: number
): Promise<Operation[]> => {
  log(`Daithi accountId: ${accountId} addr: ${addr} startAt: ${startAt}`);

  const query: VetTxsQuery = {
    criteriaSet: [{ sender: addr }, { recipient: addr }],
    order: "desc",
  };

  const { data } = await network({
    method: "POST",
    url: `${BASE_URL}/logs/transfer`,
    data: JSON.stringify(query),
  });

  return mapTxToOperations(data, accountId);
};
