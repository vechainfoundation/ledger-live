import flatMap from "lodash/flatMap";
import type { Transaction } from "../../generated/types";
import { Transaction as VechainTransaction } from "./types";
import type { Account, AccountLike } from "@ledgerhq/types-live";
import { VTHO_ADDRESS } from "./contracts/constants";
import VIP180 from "./contracts/abis/VIP180";

type Clauses = {
  to: string;
  data: string;
  value: string | number;
};
function inferTransactions(
  transactions: Array<{
    account: AccountLike;
    transaction: Transaction;
    mainAccount: Account;
  }>,
  opts: Record<string, any>
): Transaction[] {
  return flatMap(transactions, ({ transaction, account, mainAccount }) => {
    let subAccountId =
      account.type == "Account" && account.subAccounts
        ? account.subAccounts[0].id
        : "";

    if (account.type === "TokenAccount") {
      subAccountId = account.id;
    }

    const clauses: Array<Clauses> = [];

    if (opts.mode == "send_vet") {
      clauses.push({
        to: transaction.recipient,
        value: "0x" + transaction.amount.toString(16),
        data: "0x",
      });
    } else if (opts.mode == "send_vtho") {
      clauses.push({
        value: 0,
        to: VTHO_ADDRESS,
        data: VIP180.transfer.encode(
          transaction.recipient,
          transaction.amount.toFixed()
        ),
      });
    }

    return {
      ...transaction,
      family: "vechain",
      mode: opts.mode || "send",
      subAccountId: opts.mode == "send_vtho" ? subAccountId : "",
      body: { ...(transaction as VechainTransaction).body, clauses },
    } as VechainTransaction;
  });
}

export default {
  inferTransactions,
};
