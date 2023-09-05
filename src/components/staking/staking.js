"use client";
import React from "react";
import Image from "next/image";
import { atom, qAtom } from "@image/index";
import { images } from "@/utils/images";

function MainStaking({
  selectedNetwork,
  quickSilverBalance,
  balance,
  stakingAmount,
  setStakingAmount,
  qAsset,
  isWalletConnected,
  openView,
  setStep,
}) {
  return (
    <div
      class="staking_tab tab-pane fade show active"
      id="staking_1"
      role="tabpanel"
      aria-labelledby="staking_1-tab"
    >
      <div class="staking_tab--amount staking_tab--amount__to-stake">
        <p class="copy-lg font-medium mb-1">Amount to Stake</p>
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
              value={stakingAmount}
              onChange={(e) => {
                setStakingAmount(e.target.value);
              }}
            />
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
          <ul class="list-reset staking_tab--amount__balance--options">
            <li>
              <button
                class="tag"
                type="button"
                onClick={() => {
                  setStakingAmount((balance / 2).toFixed(2));
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
                  setStakingAmount(balance.toFixed(2));
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
              value={qAsset}
              disabled
            />
            {/* <h5 class="font-normal">
                            {qAsset ? qAsset : "0.00"}
                          </h5> */}
            <p>$0.00</p>
          </div>
        </div>
        <div class="staking_tab--amount__balance mt-2">
          <p class="copy-sm text-uppercase">
            BALANCE:{" "}
            {quickSilverBalance && quickSilverBalance.amount
              ? (Number(quickSilverBalance.amount) * Math.pow(10, -6)).toFixed(
                  2
                )
              : Number(0).toFixed(2)}{" "}
            {selectedNetwork && selectedNetwork != "Select a network" ? (
              <>
                {selectedNetwork.local_denom[1] +
                  selectedNetwork.local_denom.slice(2).toUpperCase()}
              </>
            ) : (
              <>qATOM</>
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
                              {selectedNetwork &&
                              selectedNetwork != "Select a network" ? (
                                <>
                                  {selectedNetwork.base_denom
                                    .slice(1)
                                    .toUpperCase()}
                                </>
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
                  1 {selectedNetwork.base_denom.slice(1).toUpperCase()} ={" "}
                  {parseFloat(1 / selectedNetwork?.redemption_rate).toFixed(4)}{" "}
                  {selectedNetwork.local_denom[1] +
                    selectedNetwork.local_denom.slice(2).toUpperCase()}{" "}
                </span>
              ) : (
                <>
                  <span>1 ATOM = 1.243222</span> qATOM
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
      <div class="staking_tab--confirmation">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
          />
          <label
            class="form-check-label"
            for="flexCheckChecked"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            data-bs-html="true"
            title="Click here to use <br> your existing stake <br> allocation intent."
          >
            Proceed with Existing Intent
          </label>
        </div>
      </div>
      <div class="staking_tab--btn mt-4">
        {isWalletConnected ? (
          <button
            class={`btn btn-primary w-100 ${
              (balance < stakingAmount && "disabled") ||
              (!stakingAmount && "disabled") ||
              (stakingAmount <= 0 && "disabled")
            } `}
            data-bs-toggle="modal"
            data-bs-target="#modal_connect-wallet"
            role="button"
            disabled={balance < stakingAmount}
            onClick={() => {
              setStep(2);
            }}
          >
            Next
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
    </div>
  );
}

export default MainStaking;
