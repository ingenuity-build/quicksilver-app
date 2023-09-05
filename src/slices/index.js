import { combineReducers } from "redux";
import validatorListReducer from "./validatorList";
import networksListReducer from "./networks";
import selectedNetworksReducer from "./selectedNetworks";
import quicksilverReducer from "./quicksilver";

const rootReducer = combineReducers({
  validatorList: validatorListReducer,
  networks: networksListReducer,
  selectedNetwork: selectedNetworksReducer,
  quicksilver: quicksilverReducer,
});

export default rootReducer;
