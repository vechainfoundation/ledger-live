import React, { useCallback, useEffect, useState } from "react";
import { BigNumber } from "bignumber.js";
import { Trans, TFunction } from "react-i18next";
import { getAccountBridge } from "@ledgerhq/live-common/bridge/index";
import { Account, AccountBridge, AccountLike } from "@ledgerhq/types-live";
import { Transaction, TransactionStatus } from "@ledgerhq/live-common/generated/types";

import Box from "~/renderer/components/Box";
import Label from "~/renderer/components/Label";
import RequestAmount from "~/renderer/components/RequestAmount";
import Switch from "~/renderer/components/Switch";
import Text from "~/renderer/components/Text";
import Toggler from "~/renderer/components/Toggler";

import { generateHistoryFromOperations } from "@ledgerhq/live-common/account/index";
import { getCryptoCurrencyById } from "@ledgerhq/live-common/currencies/index";

type Props = {
  parentAccount?: Account;
  account: AccountLike;
  transaction: Transaction;
  onChangeTransaction: (_: AccountBridge<any>) => void;
  status: TransactionStatus;
  bridgePending: boolean;
  t: TFunction;
  initValue?: BigNumber;
  walletConnectProxy?: boolean;
  resetInitValue?: () => void;
  withUseMaxLabel?: boolean;
  change: string;
  setChange?: () => void;
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

const AmountField = ({
  account,
  parentAccount,
  transaction,
  onChangeTransaction,
  status,
  bridgePending,
  t,
  initValue,
  resetInitValue,
  walletConnectProxy,
  withUseMaxLabel,
  change,
  setChange,
}: Props) => {
  const bridge = getAccountBridge(account, parentAccount);
  let VTHOaccount: Account;
  let selectedAccount;

  if (account.type == "Account" && account.currency.id == "vechain") {
    if (change == "" && account.energy) account.energy.selected = "VET";
  }

  if (!change || change == "VET") {
    selectedAccount = account;
  } else if (change == "VTHO") {
    if (account.type == "Account") {
      VTHOaccount = createVTHOaccount(account);
      selectedAccount = VTHOaccount;
    }
  }

  useEffect(() => {
    if (initValue && !initValue.eq(transaction.amount || new BigNumber(0))) {
      onChangeTransaction(bridge.updateTransaction(transaction, { amount: initValue }));
      resetInitValue && resetInitValue();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onChange = useCallback(
    (amount: BigNumber) => {
      onChangeTransaction(bridge.updateTransaction(transaction, { amount }));
    },
    [bridge, transaction, onChangeTransaction],
  );

  const onSelectionChange = () => {
    transaction.mode = change == "VET" || change == "" ? "send_vtho" : "send_vet";
    onChangeTransaction(bridge.updateTransaction(transaction, { amount }));
  };

  const onChangeSendMax = useCallback(
    (useAllAmount: boolean) => {
      onChangeTransaction(
        bridge.updateTransaction(transaction, {
          useAllAmount,
          amount: new BigNumber(0),
        }),
      );
    },
    [bridge, transaction, onChangeTransaction],
  );

  const handleToggle = e => {
    if (
      e.nativeEvent.target.id == "togglercontainer" ||
      e.nativeEvent.target.id == "togglerbg" ||
      e.nativeEvent.target.id == "togglertxt"
    ) {
      onSelectionChange();
      change == "VET" || change == "" ? setChange("VTHO") : setChange("VET");
    }
  };

  if (!status) return null;

  const { useAllAmount } = transaction;
  const { amount, errors, warnings } = status;
  const { amount: amountError, dustLimit: messageDust, gasPrice: messageGas } = errors;
  const { amount: amountWarning } = warnings;

  let amountErrMessage: Error | undefined = amountError;
  let amountWarnMessage: Error | undefined = amountWarning;

  // we ignore zero case for displaying field error because field is empty.
  if (amount.eq(0) && (bridgePending || !useAllAmount)) {
    amountErrMessage = undefined;
    amountWarnMessage = undefined;
  }

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
        <Label>{t("send.steps.details.amount")}</Label>
        <>
          <Toggler props={selectedAccount}></Toggler>
          {typeof useAllAmount === "boolean" ? (
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
          ) : null}
        </>
      </Box>
      <RequestAmount
        disabled={!!useAllAmount || walletConnectProxy}
        account={selectedAccount}
        validTransactionError={amountErrMessage || messageGas || messageDust}
        validTransactionWarning={amountWarnMessage}
        onChange={onChange}
        value={walletConnectProxy ? transaction.amount : amount}
        autoFocus={!initValue}
      />
    </Box>
  );
};

export default AmountField;
