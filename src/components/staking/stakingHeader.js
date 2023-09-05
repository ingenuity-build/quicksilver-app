"use client";
import React from "react";
import Image from "next/image";
import { atom, qAtom } from "@image/index";
import { images } from "@/utils/images";

function StakingHeader({ selectedNetwork, balance, isWalletConnected, apy }) {
  return (
    <div class="site-header" style={{ position: "relative", zIndex: "1" }}>
      <div class="site-header__active-network">
        <div class="active-network">
          {/* Active Network - About  */}
          <div class="active-network__each active-network__each--about">
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
              <h5 class="font-demi">
                {selectedNetwork && selectedNetwork != "Select a network" ? (
                  <>{selectedNetwork.base_denom.slice(1).toUpperCase()}</>
                ) : (
                  "ATOM"
                )}
              </h5>
            </div>
            <div class="network__stats text-end">
              <h5 class="font-demi mb-2 text-lightgray">~{apy}%</h5>
              <p class="copy-v-sm font-light text-uppercase">QUICKSILVER APY</p>
            </div>
          </div>
          {/* Active Network - Portfolio  */}
          <div class="active-network__each active-network__each--portfolio">
            <h6 class="active-network__each--title">My portfolio</h6>
            {/* Add a class [ include-pt ] to [ ul ] if needed  */}
            {/* And it will be based on the text existance  */}
            <ul class="list-reset">
              <li>
                {/* Toggle classes of [ p ] b/w [ text-lightgray ] and [ text-gray-50 ]  */}
                {/* And it will be based on the text existance  */}
                <p
                  class={`copy-lg font-demi ${
                    isWalletConnected ? "text-lightgray" : "text-gray-50"
                  } `}
                >
                  {isWalletConnected ? (
                    <>
                      {balance.toFixed(2)}{" "}
                      {selectedNetwork &&
                      selectedNetwork != "Select a network" ? (
                        <>{selectedNetwork.base_denom.slice(1).toUpperCase()}</>
                      ) : (
                        <>ATOM</>
                      )}
                    </>
                  ) : (
                    <>----</>
                  )}
                </p>
                <span
                  class="copy-v-sm text-orange"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  data-bs-html="true"
                  title="Tokens in your wallet <br> available to stake"
                >
                  Available to Stake
                </span>
              </li>
              <li>
                {/* Toggle classes of [ p ] b/w [ text-lightgray ] and [ text-gray-50 ]  */}
                {/* And it will be based on the text existance  */}
                <p class="copy-lg font-demi text-gray-50">----</p>
                <span
                  class="copy-v-sm text-orange"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  data-bs-html="true"
                  title="qAssets are liquid <br> representatives of <br> your staked Assets"
                >
                  Total Staked
                </span>
              </li>
              <li>
                {/* Toggle classes of [ p ] b/w [ text-lightgray ] and [ text-gray-50 ]  */}
                {/* And it will be based on the text existance  */}
                <p class="copy-lg font-demi text-gray-50">----</p>
                <span
                  class="copy-v-sm text-orange"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  data-bs-html="true"
                  title="Tokens being unbonded <br> from a validator"
                >
                  Total Unstaking
                </span>
              </li>
            </ul>
          </div>
          {/* Active Network - Stats  */}
          <div class="active-network__each active-network__each--stats">
            <h6 class="active-network__each--title">STATS</h6>
            <ul class="list-reset include-pt">
              <li>
                <p class="copy-lg font-demi text-lightgray">$ 383.12M</p>
                <span
                  class="copy-v-sm text-orange"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  data-bs-html="true"
                  title="TVL is equal to the USD <br> value of all assets held by <br> the protocol."
                >
                  Total Value Locked
                </span>
              </li>
              <li>
                <p class="copy-lg font-demi text-lightgray">$ 383.12M</p>
                <span
                  class="copy-v-sm text-orange"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  data-bs-html="true"
                  title="TVL is equal to the USD <br> value of all assets held <br> by the protocol."
                >
                  Monthly Rewards
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StakingHeader;
