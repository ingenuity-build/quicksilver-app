import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  isQSWalletConnected: false,
  balances: [],
  walletQS: {},
  loading: false,
  quicksilverClient: {},
  quicksilverAddress: "",
  walletType: "",
};
const quicksilverNetworkSlice = createSlice({
  name: "quicksilver-wallet",
  initialState,
  reducers: {
    setIsQSWalletConnected: (state) => {
      state.loading = true;
    },
    setIsQSWalletConnectedSuccees: (state) => {
      state.isQSWalletConnected = true;
      state.loading = false;
    },
    setISQSWalletDisconnectedSuccess: (state) => {
      state.isQSWalletConnected = false;
      state.loading = false;
    },
    setBalancesQSSuccess: (state, { payload }) => {
      state.balances = payload;
    },
    setWalletQSSuccess: (state, { payload }) => {
      state.walletQS = payload;
    },
    setClientSuccess: (state, { payload }) => {
      state.quicksilverClient = payload;
    },
    setQuicksilverAddressSuccess: (state, { payload }) => {
      state.quicksilverAddress = payload;
    },
    setWalletTypeSuccess: (state, { payload }) => {
      state.walletType = payload;
    },
  },
});
export const {
  setIsQSWalletConnected,
  setISQSWalletDisconnectedSuccess,
  setQuicksilverAddressSuccess,
  setWalletTypeSuccess,
  setClientSuccess,
  setIsQSWalletConnectedSuccees,
  setBalancesQSSuccess,
  setWalletQSSuccess,
} = quicksilverNetworkSlice.actions;
export const quicksilverSelector = (state) => state.quicksilver;

// The reducer
export default quicksilverNetworkSlice.reducer;
export function setQSWalletConnected() {
  return async (dispatch) => {
    dispatch(setIsQSWalletConnected);
    try {
      dispatch(setIsQSWalletConnectedSuccees());
    } catch (error) {}
  };
}
export function setQSWalletDisconnected() {
  return async (dispatch) => {
    try {
      dispatch(setISQSWalletDisconnectedSuccess());
    } catch (error) {}
  };
}
export function setQSWallet(key, val) {
  return async (dispatch) => {
    try {
      dispatch(setWalletQSSuccess(val));
    } catch (error) {}
  };
}
export function setQSBalance(val) {
  return async (dispatch) => {
    try {
      dispatch(setBalancesQSSuccess(val));
    } catch (error) {}
  };
}
export function setQSClient(val) {
  return async (dispatch) => {
    try {
      dispatch(setClientSuccess(val));
    } catch (error) {}
  };
}

export function setQuicksilverAddress(val) {
  return async (dispatch) => {
    try {
      dispatch(setQuicksilverAddressSuccess(val));
    } catch (error) {}
  };
}

export function setWalletType(wallet) {
  return async (dispatch) => {
    try {
      dispatch(setWalletTypeSuccess(wallet));
    } catch (error) {}
  };
}
