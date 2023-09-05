import { DevQuickSilverChainInfo, devChains } from "./chains/dev";
import { customChain } from "./chains/customChains";

const Chains = {
  //   "preprod": ProdChainInfos,
  prod: customChain,
  //   "test": TestChainInfos,
  dev: devChains,
};

const QuickSilverChains = {
  // preprod: ProdQuickSilverChainInfo,
  // prod: ProdQuickSilverChainInfo,
  // test: TestQuickSilverChainInfo,
  dev: DevQuickSilverChainInfo,
};

export const ChainInfos = Chains[process.env.NEXT_PUBLIC_REACT_APP_ENV];
export const QuickSilverChainInfo =
  QuickSilverChains[process.env.NEXT_PUBLIC_REACT_APP_ENV];
