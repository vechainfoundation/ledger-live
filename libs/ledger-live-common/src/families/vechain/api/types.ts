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

export interface VetCriteria {
  recipient?: string;
  sender?: string;
}
export interface VetTxsQuery {
  range?: {
    unit: "block";
    from: number;
    to?: number;
  };
  options?: {
    offset: number;
    limit: number;
  };
  criteriaSet: VetCriteria[];
  order: "desc" | "asc";
}
