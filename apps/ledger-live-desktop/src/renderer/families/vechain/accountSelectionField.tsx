import React from "react";
import { AccountLike } from "@ledgerhq/types-live";
import { getCryptoCurrencyById } from "@ledgerhq/live-common/currencies/index";
import Box from "~/renderer/components/Box";
import FormattedVal from "~/renderer/components/FormattedVal";
import { BigNumber } from "bignumber.js";

type Props = {
  account: AccountLike;
};

const additionalBalance = (props: Props) => {
  if (props.account && props.account.type === "Account" && props.account.energy)
    return (
      <Box>
        <FormattedVal
          color="palette.text.shade60"
          val={props.account?.energy?.energy || BigNumber(0)}
          unit={getCryptoCurrencyById("vechainThor").units[0]}
          showCode
        />
      </Box>
    );
  else return <></>;
};

export default additionalBalance;
