import React, { useCallback, useEffect, useState } from "react";

import {
  Transaction as VechainTransaction,
  TransactionStatus,
} from "@ledgerhq/live-common/families/vechain/types";
import { Account, AccountLike } from "@ledgerhq/types-live";
import { Result } from "@ledgerhq/live-common/bridge/useBridgeTransaction";
import Box from "~/renderer/components/Box";
import RequestAmount from "~/renderer/components/RequestAmount";
import { getAccountBridge } from "@ledgerhq/live-common/bridge/index";
import Toggler from "~/renderer/components/Toggler";
import BigNumber from "bignumber.js";

import { generateHistoryFromOperations } from "@ledgerhq/live-common/account/index";
import { getCryptoCurrencyById } from "@ledgerhq/live-common/currencies/index";

type Props = {
  transaction: VechainTransaction;
  account: AccountLike;
  parentAccount: Account | undefined;
  updateTransaction: Result<VechainTransaction>["updateTransaction"];
  status: TransactionStatus;
  change: string;
  setChange: (prop: string) => void;
};

const createVTHOaccount = (account: Account): Account => {
  const tmp = {
    ...account,
    balance: account?.energy?.energy || BigNumber(0),
    balanceHistoryCache: generateHistoryFromOperations({
      ...account,
      balanceHistoryCache: account.energy?.history || {
        DAY: { balances: [], latestDate: 0 },
        HOUR: { balances: [], latestDate: 0 },
        WEEK: { balances: [], latestDate: 0 },
      },
      balance: account.energy?.energy || BigNumber(0),
      currency: getCryptoCurrencyById("vechainThor"),
      unit: getCryptoCurrencyById("vechainThor").units[0],
      operations: account.energy?.transactions || [],
    }),
    currency: getCryptoCurrencyById("vechainThor"),
    unit: getCryptoCurrencyById("vechainThor").units[0],
    operations: account.energy?.transactions || [],
  };
  return tmp;
};

const Root = (props: Props) => {
  const initValue = "";
  let VTHOaccount: Account;
  let selectedAccount;

  if (props.account.type === "Account" && props.account.currency.id === "vechain") {
    if (props.change === "" && props.account.energy) props.account.energy.selected = "VET";
  }

  if (!props.change || props.change === "VET") {
    selectedAccount = props.account;
  } else if (props.change === "VTHO") {
    if (props.account.type === "Account") {
      VTHOaccount = createVTHOaccount(props.account);
      selectedAccount = VTHOaccount;
    }
  }

  const bridge = getAccountBridge(props.account, props.parentAccount);

  const onChange = useCallback(
    (amount: BigNumber) => {
      bridge.updateTransaction(props.transaction, { amount });
    },
    [bridge, props.transaction],
  );

  const onSelectionChange = () => {
    props.transaction.mode =
      props.change === "VET" || props.change === "" ? "send_vtho" : "send_vet";
    bridge.updateTransaction(props.transaction, { amount: props.transaction.amount });
  };
  const handleToggle = e => {
    if (
      e.nativeEvent.target.id === "togglercontainer" ||
      e.nativeEvent.target.id === "togglerbg" ||
      e.nativeEvent.target.id === "togglertxt"
    ) {
      onSelectionChange();
      props.change === "VET" || props.change === ""
        ? props.setChange("VTHO")
        : props.setChange("VET");
    }
  };

  return (
    <Box flow={1}>
      <Box
        horizontal
        alignItems="center"
        justifyContent="space-between"
        style={{ width: "50%", paddingRight: 28 }}
        onClick={e => {
          handleToggle(e);
        }}
      >
        <>
          <Toggler props={selectedAccount}></Toggler>
          {/* {typeof useAllAmount === "boolean" ? (
            <Box horizontal alignItems="center">
              <Text
                color="palette.text.shade40"
                ff="Inter|Medium"
                fontSize={10}
                style={{ paddingRight: 5 }}
                onClick={() => {
                  if (!walletConnectProxy) {
                    onChangeSendMax(!useAllAmount);
                  }
                }}
              >
                <Trans
                  i18nKey={
                    withUseMaxLabel ? "send.steps.details.useMax" : "send.steps.details.sendMax"
                  }
                />
              </Text>
              <Switch
                small
                isChecked={useAllAmount}
                onChange={onChangeSendMax}
                disabled={walletConnectProxy}
              />
            </Box>
          ) : null} */}
        </>
      </Box>
      <RequestAmount
        account={selectedAccount}
        onChange={onChange}
        value={props.transaction.amount}
        autoFocus={!initValue}
      />
    </Box>
  );
};

export default { component: Root };
