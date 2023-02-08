import { BigNumber } from "bignumber.js";
import type { Account, Operation } from "@ledgerhq/types-live";
import { getAccountUnit } from "../../account";
import { formatCurrencyUnit } from "../../currencies";
import { Unit } from "@ledgerhq/types-cryptoassets";
import { getCryptoCurrencyById } from "../../currencies";

function formatAccountSpecifics(account: Account): string {
  const { energy } = account;
  if (!energy) {
    throw new Error("mycoin account expected");
  }

  const unit = getAccountUnit(account);
  const formatConfig = {
    disableRounding: true,
    alwaysShowSign: false,
    showCode: true,
  };

  let str = " ";

  str +=
    formatCurrencyUnit(unit, account.spendableBalance, formatConfig) +
    " spendable. ";

  if (energy?.energy) {
    str += account.energy
      ? `${formatCurrencyUnit(
          getCryptoCurrencyById("vechainThor").units[0],
          account.energy.energy,
          formatConfig
        )}`
      : "no_VTHO_data";
  }

  return str;
}

function formatOperationSpecifics(op: Operation, unit: Unit): string {
  const { additionalField } = op.extra;

  let str = " ";

  const formatConfig = {
    disableRounding: true,
    alwaysShowSign: false,
    showCode: true,
  };

  str +=
    additionalField && !additionalField.isNaN()
      ? `\n    additionalField: ${
          unit
            ? formatCurrencyUnit(unit, additionalField, formatConfig)
            : additionalField
        }`
      : "";

  return str;
}

export default {
  formatAccountSpecifics,
  formatOperationSpecifics,
};
