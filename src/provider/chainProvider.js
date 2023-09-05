"use client";
// import { defaultTheme, ChainProvider } from "@cosmos-kit/react";
import { ChainProvider } from "@cosmos-kit/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as cosmostationWallets } from "@cosmos-kit/cosmostation";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import { chains, assets } from "chain-registry";
import ConnectWalletModal from "@/components/walletConnectModal";
// import { customChain } from "@/utils/chains/customChains";
// import { devChains } from "@/utils/chains/dev";
import { ChainInfos } from "@/utils/chains";

function CreateCosmosApp({ children }) {
  // console.log("cjaiscnascina", chains);
  const signerOptions = {
    // signingStargate: (_chain: Chain) => {
    //   return getSigningCosmosClientOptions();
    // }
  };

  const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          bg: "",
          color: "",
          fontFamily: "",
        },
      }),
    },
  });
  return (
    // <ChakraProvider theme={defaultTheme}>
    <ChakraProvider theme={theme}>
      <ChainProvider
        // chains={customChain}
        // chains={devChains}
        chains={ChainInfos}
        assetLists={assets}
        wallets={[...cosmostationWallets, ...leapWallets, ...keplrWallets]}
        walletConnectOptions={{
          signClient: {
            projectId: "a8510432ebb71e6948cfd6cde54b70f7",
            relayUrl: "wss://relay.walletconnect.org",
            metadata: {
              name: "CosmosKit Template",
              description: "CosmosKit dapp template",
              url: "https://docs.cosmoskit.com/",
              icons: [],
            },
          },
        }}
        wrappedWithChakra={true}
        signerOptions={signerOptions}
        walletModal={ConnectWalletModal}
      >
        {children}
      </ChainProvider>
    </ChakraProvider>
  );
}

export default CreateCosmosApp;
