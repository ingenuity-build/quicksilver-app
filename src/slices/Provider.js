"use client";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../slices/index";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "quicksilver-wallet/setWalletQSSuccess",
          "quicksilver-wallet/setClientSuccess",
          "quicksilver-wallet/setQuicksilverAddressSuccess",
          "selected-network-wallet/setWalletNetworkSuccess",
          "selected-network-wallet/setClientSuccess",
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: [
          "quicksilver.balances",
          "selectedNetworkWallet.client",
          "quicksilver.walletQS",
          "selectedNetworkWallet.networkBalances",
          "selectedNetworkWallet.networkWallet",
          "quicksilver.quicksilverClient",
          "quicksilver.quicksilverAddress",
        ],
      },
    }),
});

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
