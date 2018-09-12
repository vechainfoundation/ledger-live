// @flow
import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation";
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
import colors from "./colors";
import SettingsIcon from "./images/icons/Settings";
import ManagerIcon from "./images/icons/Manager";
import AccountsIcon from "./images/icons/Accounts";
import HeaderTitle from "./components/HeaderTitle";
import HeaderBackImage from "./components/HeaderBackImage";
import Portfolio from "./screens/Portfolio";
import Accounts from "./screens/Accounts";
import Account from "./screens/Account";
import Settings from "./screens/Settings";
import CountervalueSettings from "./screens/Settings/General/CountervalueSettings";
import RateProviderSettings from "./screens/Settings/General/RateProviderSettings";
import GeneralSettings from "./screens/Settings/General";
import AboutSettings from "./screens/Settings/About";
import HelpSettings from "./screens/Settings/Help";
import CurrencySettings from "./screens/Settings/Currencies/CurrencySettings";
import CurrenciesList from "./screens/Settings/Currencies/CurrenciesList";
import Manager from "./screens/Manager";
import ReceiveFundsMain from "./screens/ReceiveFunds";
import ConnectDevice from "./screens/ConnectDevice";
import SendFundsMain from "./screens/SendFunds";
import SendSelectRecipient from "./screens/SelectRecipient";
import SendSelectFunds from "./screens/SelectFunds";
import SendSummary from "./screens/SendSummary";
import SendValidation from "./screens/Validation";
import OperationDetails from "./screens/OperationDetails";
// import Transfer from "./screens/Transfer"; // FIXME READONLYMVP
import AccountSettingsMain from "./screens/AccountSettings";
import EditAccountUnits from "./screens/AccountSettings/EditAccountUnits";
import EditAccountName from "./screens/AccountSettings/EditAccountName";
import ImportAccounts from "./screens/ImportAccounts";
import EditFees from "./screens/EditFees";
import VerifyAddress from "./screens/VerifyAddress";
import ReceiveConfirmation from "./screens/ReceiveComfirmation";

// TODO look into all FlowFixMe

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.lightGrey,
  },
  header: {
    backgroundColor: "white",
    borderBottomWidth: 0,
    elevation: 0,
  },
  bottomTabBar: {
    height: 48,
    borderTopColor: colors.lightFog,
    backgroundColor: colors.white,
  },
});

const StackNavigatorConfig = {
  navigationOptions: {
    headerStyle: styles.header,
    headerTitle: HeaderTitle,
    headerBackTitle: null,
    headerBackImage: HeaderBackImage,
  },
  cardStyle: styles.card,
  headerLayoutPreset: "center",
};

const SettingsStack = createStackNavigator(
  {
    Settings,
    CountervalueSettings,
    RateProviderSettings,
    // $FlowFixMe
    GeneralSettings,
    // $FlowFixMe
    AboutSettings,
    // $FlowFixMe
    HelpSettings,
    CurrenciesList,
    CurrencySettings,
  },
  StackNavigatorConfig,
);

SettingsStack.navigationOptions = {
  tabBarIcon: ({ tintColor }: *) => (
    <SettingsIcon size={18} color={tintColor} />
  ),
};

const ManagerStack = createStackNavigator(
  {
    // $FlowFixMe
    Manager,
  },
  StackNavigatorConfig,
);

ManagerStack.navigationOptions = {
  tabBarIcon: ({ tintColor }: *) => <ManagerIcon size={18} color={tintColor} />,
};

const AccountsStack = createStackNavigator(
  {
    Accounts,
    Account,
  },
  StackNavigatorConfig,
);
AccountsStack.navigationOptions = {
  header: null,
  tabBarIcon: ({ tintColor }: *) => (
    <AccountsIcon size={18} color={tintColor} />
  ),
};

const CustomTabBar = props => (
  <BottomTabBar {...props} style={styles.bottomTabBar} />
);

const Main = createBottomTabNavigator(
  {
    Portfolio,
    Accounts: AccountsStack,
    // Transfer, // FIXME READONLYMVP
    // Manager: ManagerStack, // FIXME READONLYMVP
    Settings: SettingsStack,
  },
  {
    tabBarComponent: CustomTabBar,
  },
);

Main.navigationOptions = {
  header: null,
};

const ReceiveFunds = createStackNavigator(
  {
    ReceiveFundsMain,
    ConnectDevice,
    VerifyAddress,
    ReceiveConfirmation,
  },
  StackNavigatorConfig,
);
ReceiveFunds.navigationOptions = {
  header: null,
};

const SendFunds = createStackNavigator(
  {
    SendFundsMain,
    SendSelectRecipient,
    SendSelectFunds,
    SendSummary,
    SendValidation,
  },
  StackNavigatorConfig,
);

SendFunds.navigationOptions = {
  header: null,
};

const SendFundsSettings = createStackNavigator(
  {
    EditFees,
  },
  StackNavigatorConfig,
);

SendFundsSettings.navigationOptions = {
  header: null,
};

const AccountSettings = createStackNavigator(
  {
    AccountSettingsMain,
    EditAccountUnits,
    EditAccountName,
  },
  StackNavigatorConfig,
);

AccountSettings.navigationOptions = {
  header: null,
};

export const RootNavigator = createStackNavigator(
  {
    Main,
    ReceiveFunds,
    SendFunds,
    OperationDetails,
    AccountSettings,
    // $FlowFixMe
    ImportAccounts,
    SendFundsSettings,
  },
  {
    mode: "modal",
    ...StackNavigatorConfig,
  },
);
