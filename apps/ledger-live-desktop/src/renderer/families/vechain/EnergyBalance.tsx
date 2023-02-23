import React from "react";
import { Account, AccountLike } from "@ledgerhq/types-live";
import { createVTHOaccount } from "./utils/createVTHOaccount";
import BalanceSummary from "~/renderer/screens/account/BalanceSummary";

type Props = {
  account: AccountLike;
  chartColor: any;
  countervalueFirst: boolean;
  setCountervalueFirst: boolean;
  isCompoundEnabled: boolean;
  setNewCoin: () => void;
};

const EnergyBalance = (props: Props) => {
  const account = createVTHOaccount(props.account);
  return (
    <BalanceSummary
      mainAccount={account as Account}
      account={account}
      parentAccount={account.type === "Account" ? account : null}
      chartColor={props.chartColor}
      countervalueFirst={props.countervalueFirst}
      setCountervalueFirst={props.setCountervalueFirst}
      isCompoundEnabled={props.isCompoundEnabled}
      ctoken={null}
      setNewCoin={props.setNewCoin}
    />
  );
};

export default EnergyBalance;
