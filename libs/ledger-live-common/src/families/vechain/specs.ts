import expect from "expect";
// import invariant from "invariant";
import type {
  AppSpec,
  TransactionArg,
  TransactionRes,
  TransactionTestInput,
} from "../../bot/types";
import type { Transaction } from "./types";
import { pickSiblings, botTest } from "../../bot/specs";
// import { isAccountEmpty } from "../../account";
import { DeviceModelId } from "@ledgerhq/devices";
import { getCryptoCurrencyById } from "@ledgerhq/cryptoassets/currencies";
import deviceAction from "../vechain/speculos-deviceActions";

// Ensure that, when the recipient corresponds to an empty account,
// the amount to send is greater or equal to the required minimum
// balance for such a recipient
// const checkSendableToEmptyAccount = (amount, recipient) => {
//   if (isAccountEmpty(recipient) && amount.lte(minBalanceNewAccount)) {
//     invariant(
//       amount.gt(minBalanceNewAccount),
//       "not enough funds to send to new account"
//     );
//   }
// };

const VeChain: AppSpec<Transaction> = {
  name: "Vechain",
  currency: getCryptoCurrencyById("vechain"),
  appQuery: {
    model: DeviceModelId.nanoSP,
    appName: "VeChain",
  },
  genericDeviceAction: deviceAction.acceptTransaction,
  mutations: [
    {
      name: "move ~50%",
      maxRun: 2,
      transaction: ({
        account,
        siblings,
        bridge,
        maxSpendable,
      }: TransactionArg<Transaction>): TransactionRes<Transaction> => {
        const sibling = pickSiblings(siblings, 4);
        const recipient = sibling.freshAddress;

        const transaction = bridge.createTransaction(account);

        const amount = maxSpendable.div(2).integerValue();

        //checkSendableToEmptyAccount(amount, sibling);

        const updates = [{ amount }, { recipient }];
        return {
          transaction,
          updates,
        };
      },
      test: ({
        account,
        accountBeforeTransaction,
        operation,
      }: TransactionTestInput<Transaction>): void | undefined => {
        botTest("account balance decreased with operation value", () =>
          expect(account.balance.toString()).toBe(
            accountBeforeTransaction.balance.minus(operation.value).toString()
          )
        );
      },
    },
  ],
};

export default { VeChain };
