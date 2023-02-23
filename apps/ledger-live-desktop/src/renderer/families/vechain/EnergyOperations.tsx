import React from "react";

import type { AccountLike } from "@ledgerhq/types-live";
import OperationsList from "~/renderer/components/OperationsList";
import { createVTHOaccount } from "./utils/createVTHOaccount";

type Props = {
  account: AccountLike;
  title: string;
  filterOperation: () => void;
};

const EnergyOperations = (props: Props) => {
  const account = createVTHOaccount(props.account);
  return (
    <OperationsList
      account={account}
      parentAccount={account}
      title={props.title}
      filterOperation={props.filterOperation}
    />
  );
};

export default EnergyOperations;
