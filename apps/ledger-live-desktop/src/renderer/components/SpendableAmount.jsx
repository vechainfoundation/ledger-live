// @flow
import React, { useEffect, useState } from "react";
import type { Account, AccountLike } from "@ledgerhq/types-live";
import type { Transaction } from "@ledgerhq/live-common/generated/types";
import { useDebounce } from "@ledgerhq/live-common//hooks/useDebounce";
import { getAccountUnit } from "@ledgerhq/live-common/account/index";
import { getAccountBridge } from "@ledgerhq/live-common/bridge/index";

import FormattedVal from "~/renderer/components/FormattedVal";
import { getCryptoCurrencyById } from "@ledgerhq/live-common/currencies/index";

type Props = {
  account: AccountLike,
  transaction: Transaction,
  parentAccount: ?Account,
  prefix?: string,
  showAllDigits?: boolean,
  disableRounding?: boolean,
  change: string,
};

const SpendableAmount = ({
  account,
  parentAccount,
  transaction,
  prefix,
  showAllDigits,
  disableRounding,
  change,
}: Props) => {
  const [maxSpendable, setMaxSpendable] = useState(null);
  let current = account.energy.selected;

  const debouncedTransaction = useDebounce(transaction, 500);

  useEffect(() => {
    if (change == "VTHO") {
      account.energy.selected = "VTHO";
    } else {
      account.energy.selected = "VET";
    }
    if (!account) return;
    let cancelled = false;
    getAccountBridge(account, parentAccount)
      .estimateMaxSpendable({
        account,
        parentAccount,
        transaction: debouncedTransaction,
      })
      .then(estimate => {
        if (cancelled) return;
        setMaxSpendable(estimate);
      });
    current = change;

    return () => {
      cancelled = true;
    };
  }, [account, parentAccount, debouncedTransaction]);

  let accountUnit;
  if (current == "VTHO") {
    accountUnit = getCryptoCurrencyById("vechainThor").units[0];
  } else {
    accountUnit = getAccountUnit(account);
  }

  return maxSpendable ? (
    <FormattedVal
      style={{ width: "auto" }}
      color="palette.text.shade100"
      val={maxSpendable}
      unit={accountUnit}
      prefix={prefix}
      disableRounding={disableRounding}
      showAllDigits={showAllDigits}
      showCode
      alwaysShowValue
    />
  ) : null;
};

export default SpendableAmount;
