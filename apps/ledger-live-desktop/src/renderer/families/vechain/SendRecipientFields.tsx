import React from "react";
import type { Account } from "@ledgerhq/types-live";
import type { Transaction, TransactionStatus } from "@ledgerhq/live-common/generated/types";

import Toggler from "~/renderer/components/Toggler";

type Props = {
  account: Account,
  transaction: Transaction,
  status: TransactionStatus,
  onChange: any,
};

const Root = (props: Props) => {
  const currency = props.account;
  return <Toggler currency={currency}></Toggler>;
};

export default {
  component: Root,
};
