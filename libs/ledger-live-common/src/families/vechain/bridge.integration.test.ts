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
import { AmountRequired, NotEnoughBalance } from "@ledgerhq/errors";
import VIP180 from "./contracts/abis/VIP180";
import { CryptoCurrencyId } from "@ledgerhq/types-cryptoassets";

const listSupported = listSupportedCurrencies();
listSupported.push(getCryptoCurrencyById("vechain"));
setSupportedCurrencies(listSupported.map((c) => c.id) as CryptoCurrencyId[]);

const dataset: DatasetTest<Transaction> = {
  implementations: ["js"],
  currencies: {
    vechain: {
      FIXME_ignoreAccountFields: [
        "balance",
        "spendableBalance",
        "estimateMaxSpendable",
        "creationDate",
        "blockRef",
      ],
      FIXME_ignoreOperationFields: ["nonce"],
      scanAccounts: [vechainScanAccounts1],
      accounts: [
        {
          implementations: ["mock", "js"],
          transactions: [
            {
              name: "Send VET",
              transaction: fromTransactionRaw({
                family: "vechain",
                mode: "send_vet",
                recipient: "0x17733CAb76d9A2112576443F21735789733B1ca3",
                amount: "10000000000000000000",
                body: {
                  chainTag: TESTNET_CHAIN_TAG,
                  blockRef: "0x00634a0c856ec1db",
                  expiration: 18,
                  clauses: [
                    {
                      to: "0x17733CAb76d9A2112576443F21735789733B1ca3",
                      value: "10000000000000000000",
                      data: "0x",
                    },
                  ],
                  gasPriceCoef: DEFAULT_GAS_COEFFICIENT,
                  gas: "0",
                  dependsOn: null,
                  nonce: generateNonce(),
                },
              }),
              expectedStatus: {
                amount: new BigNumber("10000000000000000000"),
                estimatedFees: new BigNumber("210000000000000000"),
                totalSpent: new BigNumber("10000000000000000000"),
                errors: {},
                warnings: {},
              },
            },
            {
              name: "Send VTHO",
              transaction: fromTransactionRaw({
                family: "vechain",
                mode: "send_vtho",
                recipient: "0x17733CAb76d9A2112576443F21735789733B1ca3",
                amount: "9000000000000000000",
                body: {
                  chainTag: TESTNET_CHAIN_TAG,
                  blockRef: "0x00634a0c856ec1db",
                  expiration: 18,
                  clauses: [
                    {
                      to: "0x0000000000000000000000000000456e65726779",
                      value: 0,
                      data: VIP180.transfer.encode(
                        "0x17733CAb76d9A2112576443F21735789733B1ca3",
                        "9000000000000000000"
                      ),
                    },
                  ],
                  gasPriceCoef: DEFAULT_GAS_COEFFICIENT,
                  gas: "0",
                  dependsOn: null,
                  nonce: generateNonce(),
                },
              }),
              expectedStatus: {
                amount: new BigNumber("9000000000000000000"),
                estimatedFees: new BigNumber("385030000000000000"),
                totalSpent: new BigNumber("9000000000000000000"),
                errors: {},
                warnings: {},
              },
            },
            {
              name: "Amount required",
              transaction: fromTransactionRaw({
                family: "vechain",
                mode: "send_vet",
                recipient: "0x17733CAb76d9A2112576443F21735789733B1ca3",
                amount: "",
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
                errors: {
                  amount: new AmountRequired(),
                },
                warnings: {},
              },
            },
            {
              name: "VET balance not enough",
              transaction: fromTransactionRaw({
                family: "vechain",
                mode: "send_vet",
                recipient: "0x17733CAb76d9A2112576443F21735789733B1ca3",
                amount: "2000000000000000000000",
                body: {
                  chainTag: TESTNET_CHAIN_TAG,
                  blockRef: "0x00634a0c856ec1db",
                  expiration: 18,
                  clauses: [
                    {
                      to: "0x17733CAb76d9A2112576443F21735789733B1ca3",
                      value: "2000000000000000000000",
                      data: "0x",
                    },
                  ],
                  gasPriceCoef: DEFAULT_GAS_COEFFICIENT,
                  gas: "0",
                  dependsOn: null,
                  nonce: generateNonce(),
                },
              }),
              expectedStatus: {
                amount: new BigNumber("2000000000000000000000"),
                errors: {
                  amount: new NotEnoughBalance(),
                },
                warnings: {},
                totalSpent: new BigNumber("0"),
                estimatedFees: new BigNumber("0"),
              },
            },
            {
              name: "VTHO balance not enough",
              transaction: fromTransactionRaw({
                family: "vechain",
                mode: "send_vtho",
                recipient: "0x17733CAb76d9A2112576443F21735789733B1ca3",
                amount: "2000000000000000000000",
                body: {
                  chainTag: TESTNET_CHAIN_TAG,
                  blockRef: "0x00634a0c856ec1db",
                  expiration: 18,
                  clauses: [
                    {
                      to: "0x17733CAb76d9A2112576443F21735789733B1ca3",
                      value: "2000000000000000000000",
                      data: "0x",
                    },
                  ],
                  gasPriceCoef: DEFAULT_GAS_COEFFICIENT,
                  gas: "0",
                  dependsOn: null,
                  nonce: generateNonce(),
                },
              }),
              expectedStatus: {
                amount: new BigNumber("2000000000000000000000"),
                errors: {
                  amount: new NotEnoughBalance(),
                },
                warnings: {},
                totalSpent: new BigNumber("0"),
                estimatedFees: new BigNumber("0"),
              },
            },
          ],
          raw: vechain1 as AccountRaw,
          FIXME_tests: [
            "balance is sum of ops",
            "empty transaction is equals to itself",
          ],
        },
      ],
    },
  },
};

testBridge(dataset);
