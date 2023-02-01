export interface AccountResponse {
  balance: string;
  energy: string;
  hasCode: boolean;
}

export interface TransferLog {
  sender: string;
  recipient: string;
  amount: string;
  meta: {
    blockID: string;
    blockNumber: number;
    blockTimestamp: number;
    txID: string;
    txOrigin: string;
    clauseIndex: number;
  };
}
