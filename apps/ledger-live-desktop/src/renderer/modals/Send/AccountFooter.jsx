// @flow

import React from "react";
import { Trans } from "react-i18next";
import {
  getAccountCurrency,
  getAccountUnit,
  getMainAccount,
} from "@ledgerhq/live-common/account/index";
import type { Account, AccountLike } from "@ledgerhq/types-live";
import type { TransactionStatus } from "@ledgerhq/live-common/generated/types";

import Box from "~/renderer/components/Box";
import { CurrencyCircleIcon } from "~/renderer/components/CurrencyBadge";
import FormattedVal from "~/renderer/components/FormattedVal";
import Label from "~/renderer/components/Label";
import CounterValue from "~/renderer/components/CounterValue";
import { getCryptoCurrencyById } from "@ledgerhq/live-common/currencies/index";

type Props = {
  account: AccountLike,
  parentAccount: ?Account,
  status: TransactionStatus,
};

const AccountFooter = ({ account, parentAccount, status }: Props) => {
  const currency =
    account.currency.id != "vechain"
      ? getAccountCurrency(account)
      : getCryptoCurrencyById("vechainThor");
  const mainAccount = getMainAccount(account, parentAccount);
  const accountUnit =
    account.currency.id != "vechain"
      ? getAccountUnit(mainAccount)
      : getCryptoCurrencyById("vechainThor").units[0];
  const feesCurrency =
    account.currency.id != "vechain"
      ? getAccountCurrency(mainAccount)
      : getCryptoCurrencyById("vechainThor");
  return (
    <>
      <CurrencyCircleIcon size={40} currency={currency} />
      <Box grow>
        <Label fontSize={3} style={{ lineHeight: "20px" }}>
          <Trans i18nKey="send.footer.estimatedFees" />
        </Label>
        {accountUnit && (
          <>
            <FormattedVal
              style={{ width: "auto", lineHeight: "15px" }}
              color="palette.text.shade100"
              val={status.estimatedFees}
              unit={accountUnit}
              showCode
              alwaysShowValue
            />
            <CounterValue
              color="palette.text.shade60"
              fontSize={2}
              horizontal
              style={{ lineHeight: "12px" }}
              currency={feesCurrency}
              value={status.estimatedFees}
              alwaysShowSign={false}
              alwaysShowValue
            />
          </>
        )}
      </Box>
    </>
  );
};

export default AccountFooter;
