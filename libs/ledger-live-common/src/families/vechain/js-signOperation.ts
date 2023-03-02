import { BigNumber } from "bignumber.js";
import { Observable } from "rxjs";

import type { Transaction } from "./types";
import type {
  Account,
  Operation,
  SignOperationEvent,
} from "@ledgerhq/types-live";

import { withDevice } from "../../hw/deviceAccess";
import { encodeOperationId } from "../../operation";
import { Transaction as ThorTransaction } from "thor-devkit";
import Vet from "@ledgerhq/hw-app-vet";
import { calculateFee } from "./utils/transaction-utils";

const buildOptimisticOperation = async (
  account: Account,
  transaction: Transaction
): Promise<Operation> => {
  const type = "OUT";

  const operation: Operation = {
    id: encodeOperationId(account.id, "", type),
    hash: "",
    type,
    value: BigNumber(transaction.amount),
    fee: await calculateFee(
      BigNumber(transaction.body.gas),
      transaction.body.gasPriceCoef
    ),
    blockHash: null,
    blockHeight: null,
    senders: [account.freshAddress],
    recipients: [transaction.recipient].filter(Boolean),
    accountId: account.id,
    date: new Date(),
    extra: { transaction },
  };

  return operation;
};

/**
 * Sign Transaction with Ledger hardware
 */
const signOperation = ({
  account,
  deviceId,
  transaction,
}: {
  account: Account;
  deviceId: string;
  transaction: Transaction;
}): Observable<SignOperationEvent> =>
  withDevice(deviceId)(
    (transport) =>
      new Observable((o) => {
        async function main() {
          o.next({
            type: "device-signature-requested",
          });

          const unsigned = new ThorTransaction(transaction.body);

          // Sign on device
          const vechainApp = new Vet(transport);
          const signature = await vechainApp.signTransaction(
            account.freshAddressPath,
            unsigned.encode().toString("hex")
          );

          o.next({ type: "device-signature-granted" });

          const operation = await buildOptimisticOperation(
            account,
            transaction
          );

          o.next({
            type: "signed",
            signedOperation: {
              operation,
              signature: signature.toString("hex"),
              expirationDate: null,
            },
          });
        }

        main().then(
          () => o.complete(),
          (e) => o.error(e)
        );
      })
  );

export default signOperation;
