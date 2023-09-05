import { createSlice } from "@reduxjs/toolkit";
import { lavender } from "@image/index";

const initialState = {
  loading: false,
  hasErrors: false,
  validatorList: [],
  selectedValidatorList: [],
  redelegateValidatorList: [],
  votingPowerSum: 1,
};

const validatorListSlice = createSlice({
  name: "validator-list",
  initialState,
  reducers: {
    getValidatorList: (state) => {
      state.loading = true;
    },
    getValidatorListSuccess: (state, { payload }) => {
      state.validatorList = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    setTotalVotingPower: (state, { payload }) => {
      state.votingPowerSum = payload;
    },
    setSelectedValidatorListSuccess: (state, { payload }) => {
      state.selectedValidatorList = payload;
    },
    getValidatorListFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  getValidatorList,
  getValidatorListSuccess,
  setSelectedValidatorListSuccess,
  getValidatorListFailure,
  setTotalVotingPower,
} = validatorListSlice.actions;

export const validatorListSelector = (state) => state.validatorList;

export default validatorListSlice.reducer;

const loadValData = async (chainId) => {
  const result = await fetch(
    `https://data.${process.env.NEXT_PUBLIC_REACT_APP_ENV}.${process.env.NEXT_PUBLIC_REACT_APP_ZONE_URL}/validatorList/${chainId}`
  );
  return await result.json();
};

export function _loadValsAsync(chainId) {
  let sum = 0;
  return async (dispatch) => {
    loadValData(chainId)
      .then((externalData) => {
        console.log("herehrehre", externalData);
        let vals = externalData.validators
          .filter((line) => {
            return (
              !line.jailed ||
              line.commission.commission_rates.rate > 0.8 ||
              line.status != "BOND_STATUS_BONDED"
            );
          })
          .map((line, index) => {
            // map to Data objects
            sum = sum + Number(line.tokens);
            return {
              rank: 0,
              voting_power: line.tokens,
              name:
                line.description.moniker.length > 0
                  ? line.description.moniker
                  : "NO_NAME_SET",
              commission: line.commission.commission_rates.rate,
              address: line.operator_address,
              logo: "",
              status: line.status,
              img: lavender,
              votingPower: line.tokens,
              votingPowerDiff: "6.18%",
              votingRecord: "12/65",
              PRScore: "LEVEL 01",
              isLock: true,
            };
          });

        dispatch(getValidatorListSuccess(vals));
        dispatch(setTotalVotingPower(sum));
        console.log(vals);
        console.log("sum", sum);
      })
      .catch(dispatch(getValidatorListFailure()));
  };
}

export function setSelectedValidatorList(val) {
  return async (dispatch) => {
    try {
      dispatch(setSelectedValidatorListSuccess(val));
    } catch (error) {}
  };
}
