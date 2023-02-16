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
};

const createVTHOaccount = (account: Account | undefined) => {
  if (account) {
    const tmp = {
      ...account,
      balance: account?.energy?.energy,
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
    //saves new VTHO history inside account
    if (account.energy) account.energy.history = tmp.balanceHistoryCache;
    return tmp;
  } else {
  }
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
}: Props) => {
  const [selection, setSelection] = useState("VET");
  const bridge = getAccountBridge(account, parentAccount);

  useEffect(() => {
    if (initValue && !initValue.eq(transaction.amount || new BigNumber(0))) {
      onChangeTransaction(bridge.updateTransaction(transaction, { amount: initValue }));
      resetInitValue && resetInitValue();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onChange = useCallback(
    (amount: BigNumber) => {
      if ((selection == "VET" || selection == "VTHO") && transaction?.mode)
        transaction.mode = selection == "VET" ? "send_vet" : "send_vtho";
      onChangeTransaction(bridge.updateTransaction(transaction, { amount }));
      console.log(transaction);
    },
    [bridge, transaction, onChangeTransaction],
  );

  // const onSelectionChange = useCallback(() => {
  //   if ((selection == "VET" || selection == "VTHO") && transaction?.mode)
  //     transaction.mode = selection == "VET" ? "send_vet" : "send_vtho";
  //   onChangeTransaction(bridge.updateTransaction(transaction, { amount: BigNumber(0) }));
  //   console.log(transaction);
  // }, [selection]);

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

  let VTHOaccount = createVTHOaccount(account.type == "Account" ? account : undefined);
  const handleToggle = e => {
    if (
      e.nativeEvent.target.id == "togglercontainer" ||
      e.nativeEvent.target.id == "togglerbg" ||
      e.nativeEvent.target.id == "togglertxt"
    ) {
      selection == "VTHO" ? setSelection("VET") : setSelection("VTHO");
      if (selection == "VTHO" && account.type == "Account")
        VTHOaccount = createVTHOaccount(account);
      // onSelectionChange();
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
          <Toggler props={account}></Toggler>
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
        account={selection == "VET" ? account : VTHOaccount}
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
