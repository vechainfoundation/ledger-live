import React from "react";
import { Account, PortfolioRange, AccountLike, TokenAccount } from "@ledgerhq/types-live";
import Box from "~/renderer/components/Box";
import AccountRowItem from "../AccountRowItem";
import AccountRowItemPlaceholder from "../AccountRowItem/Placeholder";
import { getAccountCurrency } from "@ledgerhq/live-common/account/index";
import { TokenCurrency } from "@ledgerhq/types-cryptoassets";
type Props = {
  visibleAccounts: AccountLike[];
  hiddenAccounts: AccountLike[];
  onAccountClick: (a: AccountLike) => void;
  lookupParentAccount: (id: string) => Account | undefined | null;
  range: PortfolioRange;
  showNewAccount: boolean;
  horizontal: boolean;
  search?: string;
};
const ListBody = ({
  visibleAccounts,
  showNewAccount,
  hiddenAccounts,
  range,
  onAccountClick,
  lookupParentAccount,
  search,
}: Props) => (
  <Box id="accounts-list">
    {[...visibleAccounts, ...(showNewAccount ? [null] : []), ...hiddenAccounts].map(
      (account, i) => {
        if (!account) return <AccountRowItemPlaceholder key="placeholder" />;
        else {
          const currency = getAccountCurrency(account);
          return (
            <AccountRowItem
              hidden={i >= visibleAccounts.length}
              key={account.id}
              account={account as TokenAccount | Account}
              search={search}
              parentAccount={
                account.type !== "Account" ? lookupParentAccount(account.parentId) : null
              }
              range={range}
              dynamicSignificantDigits={
                currency.dynamicSignificantDigits ||
                (currency as TokenCurrency).parentCurrency?.dynamicSignificantDigits
              }
              onClick={onAccountClick}
            />
          );
        }
      },
    )}
  </Box>
);
export default ListBody;
