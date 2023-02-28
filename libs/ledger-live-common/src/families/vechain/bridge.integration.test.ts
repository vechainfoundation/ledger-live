import "../../__tests__/test-helpers/setup";
import { testBridge } from "../../__tests__/test-helpers/bridge";
import type { AccountRaw, DatasetTest } from "@ledgerhq/types-live";
import type { Transaction } from "./types";
import { fromTransactionRaw } from "./transaction";
import { DEFAULT_GAS_COEFFICIENT, TESTNET_CHAIN_TAG } from "./constants";
import { vechain1 } from "./datasets/vechain";
import { generateNonce } from "./utils/transaction-utils";
import BigNumber from "bignumber.js";
import {
  setSupportedCurrencies,
  listSupportedCurrencies,
  getCryptoCurrencyById,
} from "../../currencies";
import vechainScanAccounts1 from "./datasets/vechain.scanAccounts.1";

const listSupported = listSupportedCurrencies();
listSupported.push(getCryptoCurrencyById("vechain"));
setSupportedCurrencies(listSupported.map((c) => c.id));

const dataset: DatasetTest<Transaction> = {
  implementations: ["js"],
  currencies: {
    vechain: {
      scanAccounts: [vechainScanAccounts1],
      accounts: [
        {
          implementations: ["mock", "js"],
          transactions: [
            {
              name: "Send",
              transaction: fromTransactionRaw({
                family: "vechain",
                mode: "send_vet",
                recipient: "0x17733CAb76d9A2112576443F21735789733B1ca3",
                amount: "10000000000000",
                body: {
                  chainTag: TESTNET_CHAIN_TAG,
                  blockRef: "0x00634a0c856ec1db",
                  expiration: 18,
                  clauses: [{ to: "", value: 0, data: "0x" }],
                  gasPriceCoef: DEFAULT_GAS_COEFFICIENT,
                  gas: "0",
                  dependsOn: null,
                  nonce: generateNonce(),
                },
              }),
              expectedStatus: {
                amount: new BigNumber("10000000000000"),
                estimatedFees: new BigNumber("530000000000000000"),
                totalSpent: new BigNumber("10000000000000"),
                errors: {},
                warnings: {},
              },
            },
          ],
          raw: vechain1 as AccountRaw,
        },
      ],
    },
  },
};

testBridge(dataset);
