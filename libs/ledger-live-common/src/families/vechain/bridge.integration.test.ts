import "../../__tests__/test-helpers/setup";
import { testBridge } from "../../__tests__/test-helpers/bridge";
import type { AccountRaw, DatasetTest } from "@ledgerhq/types-live";
import type { Transaction } from "./types";
import { fromTransactionRaw } from "./transaction";
import { DEFAULT_GAS_COEFFICIENT, TESTNET_CHAIN_TAG } from "./constants";
import { vechain1 } from "./datasets/vechain";
import { generateNonce } from "./utils/transaction-utils";
import BigNumber from "bignumber.js";

const dataset: DatasetTest<Transaction> = {
  implementations: ["js"],
  currencies: {
    vechain: {
      scanAccounts: [
        {
          name: "vechain seed 1",
          apdus: `
      => e002000015058000002c80000332800000000000000000000000
      <= 410482c44bc99cdf08d4360c97fbf62d387288ab75c576926943ad90059002720e93f58799391393c98ad41136aa4ac871b103d25cb9a88f1aadd7dbbe3c7794888928333234373631393364346133323438383332326666426239383335613763463263376532323032439000
      => e002000015058000002c80000332800000000000000000000001
      <= 410447267cc778e6f13242ae7f91b0be417746e59073d952a8c39900343f9de3e478f20221c3fff122ffefb30fe6b344e929561acd5d1060936fad036b1c57a1ccd128433039663137453965333542436130446537353339413433373246433337443934313733363731379000
      => e002000015058000002c80000332800000000000000000000002
      <= 4104e83afcbbec62e097093bcc24b74a259876fb86a0c5c39aa1ed9d850870c5f8ac05ad4e11d2bbfefbca2768518c5d57118ffcb67ad0c4a7d582ac94a618fb882828343438323531634436383163436363373931463234654130444432364233384239363633614537349000
      => e002000015058000002c80000332800000000000000000000003
      <= 41042351c71fa22ea9efdfbafbdd3366a7603fdd4ba52832fa4affebeb506dd40ba221ccd03c8b88f20a4d4c46c82edb9a98b85f3d8792b59baef0be1bb5a55335fa28303837466239306433374132453234363243436346454444373465434232346336383332393734319000
      `,
        },
      ],
      accounts: [
        {
          implementations: ["js"],
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
                estimatedFees: new BigNumber("2100000000000"),
                totalSpent: new BigNumber("12100000000000"),
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
