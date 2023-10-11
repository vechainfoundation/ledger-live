import React, { PureComponent } from "react";
import { BigNumber } from "bignumber.js";
import { Unit } from "@ledgerhq/types-cryptoassets";
import Box from "~/renderer/components/Box";
import FormattedVal from "~/renderer/components/FormattedVal";
class Balance extends PureComponent<{
  unit: Unit;
  balance: BigNumber;
  disableRounding?: boolean;
  dynamicSignificantDigits?: number;
}> {
  render() {
    const { unit, balance, dynamicSignificantDigits, disableRounding } = this.props;
    return (
      <Box flex="30%" justifyContent="center" fontSize={4}>
        <FormattedVal
          alwaysShowSign={false}
          animateTicker={false}
          dynamicSignificantDigits={dynamicSignificantDigits}
          ellipsis
          color="palette.text.shade100"
          unit={unit}
          showCode
          val={balance}
          disableRounding={disableRounding}
        />
      </Box>
    );
  }
}
export default Balance;
