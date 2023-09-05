"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { atom, qAtom } from "@image/index";
import { useChain, useChainWallet } from "@cosmos-kit/react";
import { QuickSilverChainInfo } from "@/utils/chains";
import { useSelector } from "react-redux";
import { quicksilverSelector } from "@/slices/quicksilver";
import { images } from "@/utils/images";
import { quicksilver, getSigningQuicksilverClient } from "quicksilverjs";
import TransactionStatusModal from "./transactionStatusModal";

function Unstaking({ selectedNetwork, quickSilverBalance, balance }) {
  const quickSilverChainId = QuickSilverChainInfo?.chainId || "";

  let quicksilverAddress = useSelector(quicksilverSelector);
  quicksilverAddress = quicksilverAddress.quicksilverAddress || "";

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  const [unStakingAmount, setUnStakingAmount] = useState();
  const [assetAmount, setAssetAmount] = useState();
  const qAsset =
    quickSilverBalance && quickSilverBalance.amount
      ? (Number(quickSilverBalance.amount) * Math.pow(10, -6)).toFixed(2)
      : Number(0).toFixed(2);

  const { requestRedemption } =
    quicksilver.interchainstaking.v1.MessageComposer.withTypeUrl;

  let localChain;
  if (typeof window !== "undefined") {
    localChain = localStorage.getItem("selected-chain");
  }
  const { isWalletConnected, address, openView, wallet } = useChain(
    localChain || process.env.NEXT_PUBLIC_REACT_APP_DEFAULT_CHAIN
  );

  const { getOfflineSignerAmino } = useChainWallet(
    quickSilverChainId,
    wallet?.name
  );

  useEffect(() => {
    if (unStakingAmount && selectedNetwork && selectedNetwork.redemption_rate) {
      setAssetAmount(
        (selectedNetwork?.redemption_rate * unStakingAmount).toFixed(2)
      );
    } else {
      setAssetAmount("");
    }
  }, [unStakingAmount]);

  const sendTokens = (address) => {
    return async () => {
      const stargateClient = await getSigningQuicksilverClient({
        // rpcEndpoint: "https://rpc.dev.quicksilver.zone",
        rpcEndpoint: QuickSilverChainInfo?.rpc,
        signer: getOfflineSignerAmino(),
      });
      console.log("Stargate", stargateClient);
      let msg = requestRedemption({
        value: {
          denom: selectedNetwork.local_denom,
          amount: String(unStakingAmount * Math.pow(10, 6)),
        },
        chainId: quickSilverChainId,
        destinationAddress: address,
        fromAddress: quicksilverAddress,
      });
      const fee = {
        amount: [
          {
            denom: selectedNetwork.local_denom,
            amount: String(unStakingAmount * Math.pow(10, 6)),
          },
        ],
        gas: "200000",
      };
      try {
        const response = await stargateClient.signAndBroadcast(
          quicksilverAddress,
          [msg],
          fee
        );
        console.log("response", response);
        return response;
      } catch (error) {
        console.log("error", error);
      }
    };
  };
  async function unstake() {
    const val = sendTokens(address);
    try {
      setIsLoading(true);
      setShowStatusModal(true);
      const broadCastResult = await val();
      console.log("val 2", broadCastResult);
      if (broadCastResult.code === 0) {
        setIsLoading(false);
        setIsSuccess(true);
        setTransactionHash(broadCastResult.transactionHash);
        console.log(broadCastResult);
      } else {
        console.log(broadCastResult);
        setIsLoading(false);
        setIsSuccess(false);
        setError("The transaction failed! Please try again.");
      }
    } catch (err) {
      setIsLoading(false);
      setIsSuccess(false);
      setShowStatusModal(true);
      console.log(err);
      setError("The transaction failed! Please try again.");
    }
  }
  return (
    <div
      class="staking_tab tab-pane fade show active"
      id="staking_2"
      role="tabpanel"
      aria-labelledby="staking_2-tab"
    >
      <div class="staking_tab--amount staking_tab--amount__to-stake">
        <p class="copy-lg font-medium mb-1">Amount to Unstake</p>
        <div class="staking_tab--amount__network">
          <div class="network">
            <div class="image-wrapper">
              <div class="image-ratio image-ratio--square">
                <Image
                  src={
                    selectedNetwork && selectedNetwork != "Select a network"
                      ? images[
                          selectedNetwork.local_denom[1] +
                            selectedNetwork.local_denom.slice(2).toLowerCase()
                        ]
                      : qAtom
                  }
                  alt="qAtom"
                />
              </div>
            </div>
            <h6 class="font-medium">
              {selectedNetwork && selectedNetwork != "Select a network" ? (
                <>
                  {selectedNetwork.local_denom[1] +
                    selectedNetwork.local_denom.slice(2).toUpperCase()}
                </>
              ) : (
                <>qATOM</>
              )}
            </h6>
          </div>
          <div class="network__stats text-end">
            <input
              type="number"
              class="input-lg"
              placeholder="0.00"
              value={unStakingAmount}
              onChange={(e) => {
                setUnStakingAmount(e.target.value);
              }}
            />
            <p>$0.00</p>
          </div>
        </div>
        <div class="staking_tab--amount__balance mt-2">
          <p class="copy-sm text-uppercase">
            BALANCE: {qAsset}{" "}
            {selectedNetwork && selectedNetwork != "Select a network" ? (
              <>
                {selectedNetwork.local_denom[1] +
                  selectedNetwork.local_denom.slice(2).toUpperCase()}
              </>
            ) : (
              <>qATOM</>
            )}
          </p>
          <ul class="list-reset staking_tab--amount__balance--options">
            <li>
              <button
                class="tag"
                type="button"
                onClick={() => {
                  setUnStakingAmount(Number(qAsset / 2).toFixed(2));
                }}
              >
                Half
              </button>
            </li>
            <li>
              <button
                class="tag"
                type="button"
                onClick={() => {
                  setUnStakingAmount(Number(qAsset).toFixed(2));
                }}
              >
                Max
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="staking_tab--amount staking_tab--amount__to-received">
        <p class="copy-lg font-medium mb-1">Amount Received</p>
        <div class="staking_tab--amount__network">
          <div class="network">
            <div class="image-wrapper">
              <div class="image-ratio image-ratio--square">
                <Image
                  src={
                    selectedNetwork && selectedNetwork != "Select a network"
                      ? images[
                          selectedNetwork?.base_denom?.slice(1).toLowerCase()
                        ]
                      : atom
                  }
                  alt="atom"
                />
              </div>
            </div>
            <h6 class="font-medium">
              {selectedNetwork && selectedNetwork != "Select a network" ? (
                <>{selectedNetwork.base_denom.slice(1).toUpperCase()}</>
              ) : (
                <>ATOM</>
              )}
            </h6>
          </div>
          <div class="network__stats text-end">
            <input
              type="number"
              class="input-lg"
              placeholder="0.00"
              value={assetAmount}
              disabled
            />
            {/* <h5 class="font-normal">0.00</h5> */}
            <p>$0.00</p>
          </div>
        </div>
        <div class="staking_tab--amount__balance mt-2">
          <p class="copy-sm text-uppercase">
            BALANCE: {balance.toFixed(2)}{" "}
            {selectedNetwork && selectedNetwork != "Select a network" ? (
              <>{selectedNetwork.base_denom.slice(1).toUpperCase()}</>
            ) : (
              <>ATOM</>
            )}
          </p>
        </div>
      </div>
      <div class="staking_tab--additional-costs">
        <ul class="list-reset">
          {/* <li>
            <span
              class="copy-normal"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              data-bs-html="true"
              title="Transactions take place <br> on the native chain."
            >
              Transaction Cost
            </span>
            <p class="copy-normal font-medium text-lightgray ms-auto">
              <span>14,103.281212</span>{" "}
              {selectedNetwork && selectedNetwork != "Select a network" ? (
                <>{selectedNetwork.base_denom.slice(1).toUpperCase()}</>
              ) : (
                "ATOM"
              )}
            </p>
          </li> */}
          <li>
            <span
              class="copy-normal"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              data-bs-html="true"
              title="Redemption rate is the value of 1 qATOM <br> if redeemed for ATOM on the Quicksilver <br> protocol. The value of qATOM increases <br> over time as rewards accrue."
            >
              Redemption rate
            </span>
            <p class="copy-normal font-medium text-lightgray ms-auto">
              {selectedNetwork && selectedNetwork != "Select a network" ? (
                <span>
                  1{" "}
                  {selectedNetwork.local_denom[1] +
                    selectedNetwork.local_denom.slice(2).toUpperCase()}
                  = {parseFloat(selectedNetwork?.redemption_rate).toFixed(4)}{" "}
                  {selectedNetwork.base_denom.slice(1).toUpperCase()}
                </span>
              ) : (
                <>
                  <span>1 qATOM = 1.243222</span> ATOM
                </>
              )}
            </p>
          </li>
          <li>
            <span
              class="copy-normal"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              data-bs-html="true"
              title="Length of time to unstake tokens from a <br> validator. Unbonding time is set by the <br> native chain. To exit a position faster, <br> sell qAsset for Asset on Osmosis."
            >
              Unbonding Period
            </span>
            {selectedNetwork && selectedNetwork != "Select a network" ? (
              <p class="copy-normal font-medium text-lightgray ms-auto">
                {selectedNetwork.unbonding_period / (8.64 * Math.pow(10, 13))}{" "}
                days
              </p>
            ) : (
              <p class="copy-normal font-medium text-lightgray ms-auto">
                7 days
              </p>
            )}
          </li>
        </ul>
      </div>
      <div class="staking_tab--btn mt-4">
        {isWalletConnected ? (
          <button
            class={`btn btn-primary w-100 ${
              (!unStakingAmount && "disabled") ||
              (qAsset < unStakingAmount && "disabled") ||
              (unStakingAmount <= 0 && "disabled")
            }`}
            data-bs-toggle="modal"
            data-bs-target="#modal_connect-wallet"
            role="button"
            onClick={() => {
              unstake();
            }}
          >
            Unstake
          </button>
        ) : (
          <button
            class="btn btn-primary w-100"
            data-bs-toggle="modal"
            data-bs-target="#modal_connect-wallet"
            role="button"
            onClick={() => {
              openView();
            }}
          >
            Connect Wallet
          </button>
        )}
      </div>
      {showStatusModal && (
        <TransactionStatusModal
          setShowStatusModal={setShowStatusModal}
          unStakingAmount={unStakingAmount}
          isLoading={isLoading}
          error={error}
          isSuccess={isSuccess}
          transactionHash={transactionHash}
        />
      )}
    </div>
  );
}

export default Unstaking;
