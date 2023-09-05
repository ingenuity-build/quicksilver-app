import { createSlice } from "@reduxjs/toolkit";
import { osmosis, cosmos, stargaze, junoPng, regen } from "@/assets/img";
import { setSelectedNetworkFunc } from "./selectedNetworks";

export const initialState = {
  loading: false,
  hasErrors: false,
  networks: [],
};

const networksSlice = createSlice({
  name: "networks",
  initialState,
  reducers: {
    getNetworks: (state) => {
      state.loading = true;
    },
    getNetworksSuccess: (state, { payload }) => {
      state.networks = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getNetworksFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getNetworks, getNetworksSuccess, getNetworksFailure } =
  networksSlice.actions;

export const networksSelector = (state) => state.networks;

// The reducer
export default networksSlice.reducer;

export function fetchNetworks() {
  return async (dispatch) => {
    dispatch(getNetworks());

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_QUICKSILVER_API}/quicksilver/interchainstaking/v1/zones`
      );
      const data = await response.json();
      const stats = data.stats;
      const combinedData = data.zones.map((item, index) => {
        return { ...item, ...stats[index] };
      });
      //   console.log("here is the data", combinedData);
      //   let zones = manipulateData(combinedData);
      //   console.log("Zones related data", zones);
      const APR = await fetch("https://data.quicksilver.zone/apr");
      const APRDATa = await APR.json();
      let zones = manipulateData(combinedData);
      let zonesAPY = zones.map((obj) => ({
        ...obj,
        apy:
          APRDATa.chains.find(
            (chain) => chain.chain_id === obj.value.chain_id
          ) !== undefined
            ? APRDATa.chains.find(
                (chain) => chain.chain_id === obj.value.chain_id
              ).apr
            : "0",
      }));
      const chain =
        localStorage.getItem("selected-chain") ||
        process.env.NEXT_PUBLIC_REACT_APP_DEFAULT_CHAIN;
      const selectedNetwork = zonesAPY.find(
        (item) => item.value.chain_id == chain
      );
      dispatch(setSelectedNetworkFunc(selectedNetwork));
      dispatch(getNetworksSuccess(zonesAPY));
      //   dispatch(getNetworksSuccess(data));
    } catch (error) {
      dispatch(getNetworksFailure());
    }
  };
}

const manipulateData = (zones) => {
  const labels = {
    uqatom: "Cosmos Hub",
    uqosmo: "Osmosis",
    uqstars: "Stargaze",
    uqjunox: "Juno",
    uqregen: "Regen",
  };

  let whitelistedZones = zones
    .filter((zone) => zone.deposit_address !== null)
    .filter((zone) =>
      process.env.NEXT_PUBLIC_REACT_APP_WHITELISTED_ZONES.split(",").includes(
        zone.chain_id
      )
    )
    .map((zone) => {
      return {
        label: labels[zone.local_denom].toUpperCase(),
        value: zone,
        image: images[zone.local_denom],
      };
    });
  return whitelistedZones;
};

const images = {
  uqatom: cosmos,
  uqosmo: osmosis,
  uqstars: stargaze,
  uqjunox: junoPng,
  uqregen: regen,
};
