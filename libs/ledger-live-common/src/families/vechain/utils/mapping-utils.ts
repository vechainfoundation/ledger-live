import { abi } from "thor-devkit";
import vip180 from "../contracts/abis/VIP180";
import { Operation } from "@ledgerhq/types-live";
import BigNumber from "bignumber.js";
import { EventLog, TransferLog } from "../api/types";

// TODO: Currently hardcoding the fee to 0
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

// TODO: Currently hardcoding the fee to 0
export const mapTokenTransfersToOperations = (
  evnts: EventLog[],
  accountId: string,
  addr: string
): Operation[] => {
  const transferEventAbi = new abi.Event(vip180.TransferEvent);

  return evnts.map((evnt) => {
    const decoded = transferEventAbi.decode(evnt.data, evnt.topics);
    return {
      id: evnt.meta.txID,
      hash: evnt.meta.txID,
      type: decoded.to === addr ? "IN" : "OUT",
      value: new BigNumber(decoded.value),
      fee: new BigNumber(0),
      senders: [decoded.from],
      recipients: [decoded.to],
      blockHeight: evnt.meta.blockNumber,
      blockHash: evnt.meta.blockID,
      accountId,
      date: new Date(evnt.meta.blockTimestamp),
      extra: {},
    };
  });
};
