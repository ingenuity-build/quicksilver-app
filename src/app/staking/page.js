"use client";
import React, { useEffect, useState } from "react";
import Validator from "@/components/staking/validator";
import Allocate from "@/components/staking/allocate";
import { useChain } from "@cosmos-kit/react";
import { useDispatch, useSelector } from "react-redux";
import { _loadValsAsync } from "@/slices/validatorList";
import { cosmos } from "juno-network";
import { selectedNetworkSelector } from "@/slices/selectedNetworks";
import { quicksilverSelector } from "@/slices/quicksilver";
import Unstaking from "@/components/unstaking/unstaking";
import MainStaking from "@/components/staking/staking";
import StakingHeader from "@/components/staking/stakingHeader";

function Staking() {
  const dispatch = useDispatch();
  let selectedNetwork = useSelector(selectedNetworkSelector);
  const apy = selectedNetwork?.selectedNetwork?.apy || 0;
  selectedNetwork =
    selectedNetwork?.selectedNetwork?.value || selectedNetwork.selectedNetwork;

  const quicksilverData = useSelector(quicksilverSelector);
  const quickSilverBalance =
    quicksilverData.balances.find(
      (item) => item.denom == selectedNetwork.local_denom
    ) || 0;

  const [step, setStep] = useState(1);
  const [isStaking, setIsStaking] = useState(true);
  const [stakingAmount, setStakingAmount] = useState();
  const [qAsset, setQAsset] = useState();

  let localChain;
  if (typeof window !== "undefined") {
    localChain = localStorage.getItem("selected-chain");
  }
  const { isWalletConnected, chain, address, openView, getRpcEndpoint } =
    useChain(localChain || process.env.NEXT_PUBLIC_REACT_APP_DEFAULT_CHAIN);

  let walletData;
  if (typeof window !== "undefined") {
    walletData = localStorage.getItem("cosmos-kit@1:core//current-wallet");
  }

  //////////////////////////////////////////

  const chainName =
    localChain || process.env.NEXT_PUBLIC_REACT_APP_DEFAULT_CHAIN;
  const coin = chain.staking.staking_tokens[0] || {};

  const [balance, setBalance] = useState(0);
  const getBalance = async () => {
    if (!address) {
      setBalance(0);
      return;
    }

    let rpcEndpoint = await getRpcEndpoint();

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
    const balance = await client.cosmos.bank.v1beta1.balance({
      address,
      // denom: "uatom",
      denom: coin.minimal_denom,
    });

    const exp = coin.decimals;
    const a = balance.balance?.amount || 0;
    const amount = a * Math.pow(10, -exp);
    setBalance(amount);
  };

  //////////////////////////////////////

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  useEffect(() => {
    if (isWalletConnected) {
      dispatch(_loadValsAsync(chain.chain_id));
    }
  }, [isWalletConnected]);

  useEffect(() => {
    if (isWalletConnected) {
      getBalance();
    }
  }, [isWalletConnected, selectedNetwork.chain_id]);

  useEffect(() => {
    if (stakingAmount && selectedNetwork && selectedNetwork.redemption_rate) {
      setQAsset(
        ((1 / selectedNetwork?.redemption_rate) * stakingAmount).toFixed(2)
      );
    } else {
      setQAsset("");
    }
  }, [stakingAmount]);
  return (
    <>
      {step == 1 ? (
        <>
          {/* Site Header Start here  */}
          <StakingHeader
            selectedNetwork={selectedNetwork}
            balance={balance}
            isWalletConnected={isWalletConnected}
            apy={apy}
          />
          {/* Site Header Ends here  */}
          {/* Staking Start here  */}
          <div class="staking">
            <div class="container">
              <div class="staking__inner">
                {/* Tabs Filters [ Stake/Unstake ] [ If you are using Loop, replace (_1) (_2) with index respectively ]  */}
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <button
                      class={`nav-link ${isStaking ? "active" : ""}`}
                      id="staking_1-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#staking_1"
                      type="button"
                      role="tab"
                      aria-controls="staking_1"
                      aria-selected="true"
                      onClick={() => {
                        setIsStaking(true);
                      }}
                    >
                      Stake
                    </button>
                  </li>
                  <li class="nav-item">
                    <button
                      class={`nav-link ${!isStaking ? "active" : ""}`}
                      id="staking_2-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#staking_2"
                      type="button"
                      role="tab"
                      aria-controls="staking_2"
                      aria-selected="false"
                      onClick={() => {
                        if (isWalletConnected) setIsStaking(false);
                      }}
                    >
                      Unstake
                    </button>
                  </li>
                </ul>
                {/* Tabs Content [ Stake/Unstake ] [ If you are using Loop, replace (_1) (_2) with index respectively ]  */}
                <div class="tab-content__staking tab-content">
                  {isStaking ? (
                    <MainStaking
                      selectedNetwork={selectedNetwork}
                      quickSilverBalance={quickSilverBalance}
                      balance={balance}
                      stakingAmount={stakingAmount}
                      setStakingAmount={setStakingAmount}
                      qAsset={qAsset}
                      isWalletConnected={isWalletConnected}
                      openView={openView}
                      setStep={setStep}
                    />
                  ) : (
                    <Unstaking
                      selectedNetwork={selectedNetwork}
                      quickSilverBalance={quickSilverBalance}
                      balance={balance}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Staking Ends here  */}
        </>
      ) : step == 2 ? (
        <Validator
          setStep={setStep}
          stakingAmount={stakingAmount}
          coin={coin}
        />
      ) : (
        <Allocate setStep={setStep} stakingAmount={stakingAmount} coin={coin} />
      )}
    </>
  );
}

export default Staking;
