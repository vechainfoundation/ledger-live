// @flow

import React from "react";
import { getAccountCurrency, getAccountName } from "@ledgerhq/live-common/account/index";
import type { AccountLike } from "@ledgerhq/types-live";
import styled from "styled-components";
import useTheme from "~/renderer/hooks/useTheme";
import Box from "~/renderer/components/Box";
import Ellipsis from "~/renderer/components/Ellipsis";
import Tooltip from "~/renderer/components/Tooltip";
import CryptoCurrencyIcon from "~/renderer/components/CryptoCurrencyIcon";
import AccountTagDerivationMode from "~/renderer/components/AccountTagDerivationMode";
import { useState } from "react";

type Props = {
  account: AccountLike,
  nested?: boolean,
};

// NB Inside Head to not break alignment with parent row;
// and this is in fact not seen, because we draw on top
// from AccountRowItem/index.js TokenBarIndicator
const NestedIndicator = styled.div`
  height: 44px;
  width: 14px;
`;

const Header = ({ account, nested }: Props) => {
  const theme = useTheme();
  const currency = getAccountCurrency(account);
  const name = getAccountName(account);
  const color =
    currency.type === "CryptoCurrency" ? currency.color : theme.colors.palette.text.shade60;
  const title = currency.type === "CryptoCurrency" ? currency.name : "token";
  const toggleStyle = {
    position: "relative",
    width: "55px",
    height: "30px",
    backgroundColor: "rgb(19, 20, 21)",
    borderRadius: "8px",
    cursor: "pointer",
  };
  const togglerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: "1px",
    borderRadius: "8px",
    width: "30px",
    height: "30px",
    backgroundColor: "rgba(155, 115, 255, 0.6)",
  };
  const togglerStyleActive = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: "1px",
    borderRadius: "8px",
    width: "30px",
    height: "30px",
    backgroundColor: "#2A5284",
  };
  const buttonText = {
    fontSize: "9px",
    lineHeight: "9px",
    color: "white",
  };

  const togglerStyles = [togglerStyle, togglerStyleActive];
  const [curr, setCurr] = useState(0);

  function changeStatus(e) {
    if (curr == 0) {
      setCurr(1);
    } else {
      setCurr(0);
    }
  }

  function checkCoin(coin: string) {
    if (coin == "vechain" || coin == "vechainThor") return true;
    return false;
  }
  return (
    <Box
      horizontal
      ff="Inter|SemiBold"
      flow={3}
      flex={`${nested ? 42 : 30}%`}
      pr={1}
      alignItems="center"
    >
      <>
        {nested && <NestedIndicator />}
        <Box alignItems="center" justifyContent="center" style={{ color }}>
          <CryptoCurrencyIcon currency={currency} size={20} />
        </Box>
        <Box style={{ flexShrink: 1 }}>
          {!nested && account.type === "Account" && (
            <Box
              style={{ textTransform: "uppercase" }}
              horizontal
              fontSize={9}
              color="palette.text.shade60"
              alignItems="center"
              className="accounts-account-row-crypto-name"
            >
              {title} <AccountTagDerivationMode account={account} />
            </Box>
          )}
          <Tooltip delay={1200} content={name}>
            <Ellipsis fontSize={12} color="palette.text.shade100">
              {name}
            </Ellipsis>
          </Tooltip>
        </Box>
        {checkCoin(account.currency.id) && (
          <div id="togglercontainer" style={toggleStyle} onClick={changeStatus}>
            <div id="togglerbg" style={togglerStyles[curr]}>
              <span id="togglertxt" style={buttonText}>
                {curr == 0 ? "VET" : "VTHO"}
              </span>
            </div>
          </div>
        )}
      </>
    </Box>
  );
};

export default React.memo<Props>(Header);
