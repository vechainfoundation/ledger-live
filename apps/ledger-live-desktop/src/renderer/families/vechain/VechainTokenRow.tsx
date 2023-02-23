import React from "react";
import { AccountLike, PortfolioRange } from "@ledgerhq/types-live";
import { getCryptoCurrencyById } from "@ledgerhq/live-common/currencies/index";
import Header from "~/renderer/screens/accounts/AccountRowItem/Header";
import Balance from "~/renderer/screens/accounts/AccountRowItem/Balance";
import Box from "~/renderer/components/Box";
import AccountSyncStatusIndicator from "~/renderer/screens/accounts/AccountSyncStatusIndicator";
import Countervalue from "~/renderer/screens/accounts/AccountRowItem/Countervalue";
import { BigNumber } from "bignumber.js";

type Props = {
  account: AccountLike;
  range: PortfolioRange;
};

const accountRow = (props: Props) => {
  if (props.account.type === "Account")
    return (
      <>
        <Header
          account={{ ...props.account, currency: getCryptoCurrencyById("vechainThor") }}
          name={props.account.name}
        />
        <Box flex="12%">
          <div>
            <AccountSyncStatusIndicator accountId={props.account.id} account={props.account} />
          </div>
        </Box>
        <Balance
          unit={getCryptoCurrencyById("vechainThor").units[0]}
          balance={props.account.energy?.energy || BigNumber(0)}
          disableRounding={false}
        />
        <Countervalue
          account={{
            ...props.account,
            balance: props.account.energy ? props.account.energy.energy : BigNumber(0),
          }}
          currency={getCryptoCurrencyById("vechainThor")}
          range={props.range}
        />
      </>
    );
  else return <></>;
};

export default accountRow;
