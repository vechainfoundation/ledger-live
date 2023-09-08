import React from "react";
import { Account, PortfolioRange, AccountLike, TokenAccount } from "@ledgerhq/types-live";
import Box from "~/renderer/components/Box";
import AccountRowItem from "../AccountRowItem";
import AccountRowItemPlaceholder from "../AccountRowItem/Placeholder";
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
    {[...visibleAccounts, ...(showNewAccount ? [null] : []), ...hiddenAccounts].map((account, i) =>
      !account ? (
        <AccountRowItemPlaceholder key="placeholder" />
      ) : (
        <AccountRowItem
          hidden={i >= visibleAccounts.length}
          key={account.id}
          account={account as TokenAccount | Account}
          search={search}
          parentAccount={account.type !== "Account" ? lookupParentAccount(account.parentId) : null}
          range={range}
          dynamicSignificantDigits={2}
          onClick={onAccountClick}
        />
      ),
    )}
  </Box>
);
export default ListBody;
