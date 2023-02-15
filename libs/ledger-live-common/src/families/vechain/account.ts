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

  if (energy.energy) {
    str += account.energy
      ? `${formatCurrencyUnit(
          getCryptoCurrencyById("vechainThor").units[0],
          account.energy.energy,
          formatConfig
        )}\n`
      : "no_VTHO_data\n";
    str += account.energy ? `\n\nOperations VTHO:\n` : "";
    if (account.energy?.transactions)
      account.energy.transactions.forEach((c) => {
        str +=
          (c.type == "IN" ? "+" : "-") +
          `${formatCurrencyUnit(
            getCryptoCurrencyById("vechainThor").units[0],
            c.value,
            formatConfig
          )}\t` +
          (c.type == "IN" ? "IN" : "OUT") +
          "\t" +
          c.recipients[0] +
          "\t" +
          c.date +
          "\n";
      });
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
