import type {
  Account,
  AccountRaw,
  TransactionCommon,
  TransactionCommonRaw,
  TransactionStatusCommon,
  TransactionStatusCommonRaw,
  EnergyCommon,
  EnergyRawCommon,
} from "@ledgerhq/types-live";
import { Transaction as ThorTransaction } from "thor-devkit";

export type NetworkInfo = {
  family: "ethereum";
};

export type TransactionMode = "send_vet" | "send_vtho";

export type Transaction = TransactionCommon & {
  family: "vechain";
  mode: TransactionMode;
  body: ThorTransaction.Body;
};

export type TransactionRaw = TransactionCommonRaw & {
  family: "vechain";
  mode: TransactionMode;
  body: ThorTransaction.Body;
};

export type TransactionStatus = TransactionStatusCommon;

export type TransactionStatusRaw = TransactionStatusCommonRaw;

export type Energy = EnergyCommon;

export type EnergyRaw = EnergyRawCommon;

export type VechainAccount = Account & { energy: Energy };

export type VechainAccountRaw = AccountRaw & { energy: EnergyRaw };
