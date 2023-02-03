import { Operation } from "@ledgerhq/types-live";
import BigNumber from "bignumber.js";
import { TransferLog } from "../api/types";

export const mapVetTransfersToOperations = (
  txs: TransferLog[],
  accountId: string,
  addr: string
): Operation[] => {
  return txs.map((tx) => {
    return {
      id: tx.meta.txID,
      hash: tx.meta.txID,
      type: tx.recipient === addr ? "IN" : "OUT",
      value: new BigNumber(tx.amount),
      fee: new BigNumber(0),
      senders: [tx.sender],
      recipients: [tx.recipient],
      blockHeight: tx.meta.blockNumber,
      blockHash: tx.meta.blockID,
      accountId,
      date: new Date(tx.meta.blockTimestamp),
      extra: {},
    };
  });
};
