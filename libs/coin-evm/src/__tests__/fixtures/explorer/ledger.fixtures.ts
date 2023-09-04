import { LedgerExplorerOperation } from "../../../types";

export const coinOperation1: LedgerExplorerOperation = {
  hash: "0xf350d4f8e910419e2d5cec294d44e69af8c6185b7089061d33bb4fc246cefb79",
  transaction_type: 2,
  nonce: "0x4b",
  nonce_value: 75,
  value: "0",
  gas: "62350",
  gas_price: "81876963401",
  max_fee_per_gas: "125263305914",
  max_priority_fee_per_gas: "33000000000",
  from: "0x6cbcd73cd8e8a42844662f0a0e76d7f79afd933d",
  to: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  transfer_events: [
    {
      contract: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      from: "0x6cbcd73cd8e8a42844662f0a0e76d7f79afd933d",
      to: "0xc2907efcce4011c491bbeda8a0fa63ba7aab596c",
      count: "100000000000000",
    },
  ],
  erc721_transfer_events: [],
  erc1155_transfer_events: [],
  approval_events: [],
  actions: [],
  confirmations: 5968364,
  input: null,
  gas_used: "51958",
  cumulative_gas_used: "16087064",
  status: 1,
  received_at: "2023-01-24T17:11:45Z",
  block: {
    hash: "0xcbd52de09904fd89a94b0638a8e39107e247d761e92411fd5b7b7d8b88641ddd",
    height: 38476740,
    time: "2023-01-24T17:11:45Z",
  },
};

export const coinOperation2: LedgerExplorerOperation = {
  hash: "0xf350d4f8e910419e2d5cec294d44e69af8c6185b7089061d33bb4fc246cefb79",
  transaction_type: 2,
  nonce: "0x4b",
  nonce_value: 75,
  value: "10",
  gas: "62350",
  gas_price: "81876963401",
  max_fee_per_gas: "125263305914",
  max_priority_fee_per_gas: "33000000000",
  from: "0x6cbcd73cd8e8a42844662f0a0e76d7f79afd933d",
  to: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
  transfer_events: [],
  erc721_transfer_events: [
    {
      contract: "0x9a29e4e488ab34fb792c0bd9ada78c2c07ebe55a",
      sender: "0x6cbcd73cd8e8a42844662f0a0e76d7f79afd933d",
      receiver: "0xc2907efcce4011c491bbeda8a0fa63ba7aab596c",
      token_id: "49183440411075624253866807957299276245920874859439606792850319902048050479106",
    },
  ],
  erc1155_transfer_events: [],
  approval_events: [],
  actions: [
    {
      from: "0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0",
      to: "0x6cbcd73cd8e8a42844662f0a0e76d7f79afd933d",
      input: null,
      value: "93140000000000000",
      gas: null,
      gas_used: null,
      error: null,
    },
  ],
  confirmations: 5968364,
  input: null,
  gas_used: "51958",
  cumulative_gas_used: "16087064",
  status: 1,
  received_at: "2023-01-24T17:11:44Z",
  block: {
    hash: "0xcbd52de09904fd89a94b0638a8e39107e247d761e92411fd5b7b7d8b88641ddd",
    height: 38476730,
    time: "2023-01-24T17:11:44Z",
  },
};

export const coinOperation3: LedgerExplorerOperation = {
  hash: "0xf350d4f8e910419e2d5cec294d44e69af8c6185b7089061d33bb4fc246cefb79",
  transaction_type: 2,
  nonce: "0x4b",
  nonce_value: 75,
  value: "100",
  gas: "62350",
  gas_price: "81876963401",
  max_fee_per_gas: "125263305914",
  max_priority_fee_per_gas: "33000000000",
  from: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
  to: "0x6cbcd73cd8e8a42844662f0a0e76d7f79afd933d",
  transfer_events: [],
  erc721_transfer_events: [],
  erc1155_transfer_events: [
    {
      contract: "0x2953399124f0cbb46d2cbacd8a89cf0599974963",
      sender: "0x6cbcd73cd8e8a42844662f0a0e76d7f79afd933d",
      operator: "0x6cbcd73cd8e8a42844662f0a0e76d7f79afd933d",
      receiver: "0xc2907efcce4011c491bbeda8a0fa63ba7aab596c",
      transfers: [
        {
          id: "49183440411075624253866807957299276245920874859439606792850319904247073734666",
          value: "1",
        },
        {
          id: "49183440411075624253866807957299276245920874859439606792850319904247073734665",
          value: "2",
        },
      ],
    },
  ],
  approval_events: [],
  actions: [],
  confirmations: 5968364,
  input: null,
  gas_used: "51958",
  cumulative_gas_used: "16087064",
  status: 1,
  received_at: "2023-01-24T17:11:43Z",
  block: {
    hash: "0xcbd52de09904fd89a94b0638a8e39107e247d761e92411fd5b7b7d8b88641ddd",
    height: 38476720,
    time: "2023-01-24T17:11:43Z",
  },
};

export const coinOperation4: LedgerExplorerOperation = {
  hash: "0xf350d4f8e910419e2d5cec294d44e69af8c6185b7089061d33bb4fc246cefb79",
  transaction_type: 2,
  nonce: "0x4b",
  nonce_value: 75,
  value: "100",
  gas: "62350",
  gas_price: "81876963401",
  max_fee_per_gas: "125263305914",
  max_priority_fee_per_gas: "33000000000",
  from: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
  to: "0x6cbcd73cd8e8a42844662f0a0e76d7f79afd933d",
  transfer_events: [],
  erc721_transfer_events: [],
  erc1155_transfer_events: [],
  approval_events: [],
  actions: [
    {
      from: "0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0",
      to: "0xb0b5b0106d69fe64545a60a68c014f7570d3f861",
      input: null,
      value: "93140000000000000",
      gas: null,
      gas_used: null,
      error: null,
    },
  ],
  confirmations: 5968364,
  input: null,
  gas_used: "51958",
  cumulative_gas_used: "16087064",
  status: 1,
  received_at: "2023-01-24T17:11:42Z",
  block: {
    hash: "0xcbd52de09904fd89a94b0638a8e39107e247d761e92411fd5b7b7d8b88641ddd",
    height: 38476710,
    time: "2023-01-24T17:11:42Z",
  },
};
