"use client";
import { useChain, useWalletClient } from "@cosmos-kit/react";
import { Box, GridItem, Stack } from "@chakra-ui/react";
import {
  Error,
  Connected,
  Connecting,
  Disconnected,
  NotExist,
  Rejected,
  WalletConnectComponent,
} from "./wallet-connect";
import { useEffect, useState } from "react";
import { QuickSilverChainInfo } from "@/utils/chains";
import { cosmos } from "juno-network";
import { useDispatch } from "react-redux";
import { setQSBalance, setQuicksilverAddress } from "@/slices/quicksilver";

export const WalletCardSection = ({ chainName }) => {
  const { connect, openView, disconnect, status, address, wallet, chain } =
    useChain(chainName);
  const { getRpcEndpoint } = useChain(QuickSilverChainInfo.chainId);
  const dispatch = useDispatch();
  let walletData;
  if (typeof window !== "undefined") {
    walletData = localStorage.getItem("cosmos-kit@1:core//current-wallet");
  }
  const val = useWalletClient(walletData);

  const [balance, setBalance] = useState(0);
  const getBalance = async (address) => {
    if (!address) {
      setBalance(0);
      dispatch(setQSBalance([]));
      return;
    }

    let rpcEndpoint = await getRpcEndpoint();

    console.log("rpc000000", rpcEndpoint);

    if (!rpcEndpoint) {
      console.info("no rpc endpoint — using a fallback");
      rpcEndpoint = `https://rpc.cosmos.directory/${chainName}`;
    }

    // get RPC client
    const client = await cosmos.ClientFactory.createRPCQueryClient({
      rpcEndpoint:
        typeof rpcEndpoint === "string" ? rpcEndpoint : rpcEndpoint.url,
    });
    // fetch balance
    const balance = await client.cosmos.bank.v1beta1.allBalances({
      address: address,
    });
    dispatch(setQSBalance(balance.balances));
    // const balance2 = await client.cosmos.bank.v1beta1.balance({
    //   address,
    //   // denom: "uatom",
    //   denom: "uqatom",
    // });
    // console.log("balance1212000000", balance, balance2);

    // const exp = coin.decimals;
    // const a = balance.balance?.amount || 0;
    // const amount = a * Math.pow(10, -exp);
    // console.log("here we get the value", a, exp, amount);
    // setBalance(amount);
  };
  // Events
  const onClickConnect = async (e) => {
    e.preventDefault();
    await connect();
  };

  const onClickOpenView = (e) => {
    e.preventDefault();
    // openView();
    disconnect();
  };

  useEffect(() => {
    if (val.status == "Done") {
      val.client.enable?.(QuickSilverChainInfo.chainId);
      val.client.getAccount?.(QuickSilverChainInfo.chainId).then((account) => {
        dispatch(setQuicksilverAddress(account.address));
        getBalance(account.address);
      });
    }
  }, [val.client, val.status]);

  // Components
  const connectWalletButton = (
    <WalletConnectComponent
      walletStatus={status}
      disconnect={
        <Disconnected buttonText="Connect Wallet" onClick={onClickConnect} />
      }
      connecting={<Connecting />}
      connected={
        <Connected
          onClick={onClickOpenView}
          wallet={wallet}
          address={address}
          chain={chain}
        />
      }
      rejected={<Rejected buttonText="Reconnect" onClick={onClickConnect} />}
      error={<Error buttonText="Change Wallet" onClick={onClickOpenView} />}
      notExist={
        <NotExist buttonText="Install Wallet" onClick={onClickOpenView} />
      }
    />
  );

  return (
    <>
      <GridItem px={6}>
        <Stack
          justifyContent="center"
          alignItems="center"
          borderRadius="lg"
          spacing={0}
          p={0}
        >
          <Box w="full" maxW={{ base: 52, md: 64 }}>
            {connectWalletButton}
          </Box>
        </Stack>
      </GridItem>
    </>
  );
};
