"use client";
import React, { useState } from "react";
import Image from "next/image";
import { favicon } from "@image/index";
import { networksSelector } from "@/slices/networks";
import { useSelector } from "react-redux";

function SwitchNetwork({ chainName, chainInfos, onChange }) {
  const networks = useSelector(networksSelector);
  const [showSwitchNetwork, setShowSwitchNetwork] = useState(false);

  const closeModal = () => {
    setShowSwitchNetwork(false);
  };

  function showApyData(item) {
    const val = networks.networks.find(
      (network) => network.value.chain_id == item.id
    );
    return val?.apy || 0;
  }
  return (
    <div>
      <div
        class="wallet-and-network__network--active"
        onClick={() => {
          setShowSwitchNetwork(true);
        }}
      >
        <a
          data-bs-toggle="modal"
          data-bs-target="#modal_switch-network"
          role="button"
        >
          {chainName}
        </a>
      </div>
      {showSwitchNetwork && (
        <div
          class="modal modal__switch-network fade show"
          id="modal_switch-network"
          aria-hidden="true"
          aria-labelledby="modal_switch-networkLabel"
          tabindex="-1"
          style={{ display: "block" }}
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <div class="modal-title" id="modal_switch-networkLabel">
                  <div class="image-wrapper">
                    <div class="image-ratio image-ratio--square">
                      <Image src={favicon} alt="favicon" />
                    </div>
                  </div>
                  <h6 class="h6-lg font-bold text-lightgray">Switch Network</h6>
                </div>
                <div class="modal-description">
                  <p>
                    Stake Cosmos assets with your preferred validator and
                    receive a qAsset for use in DeFi while earning staking
                    yield. Select a network to get started with liquid staking.
                  </p>
                  <p>
                    By selecting a network, you confirm you accept the
                    Quicksilver Terms of Service.
                  </p>
                </div>
                <div class="modal-addition-info">
                  <p class="copy-v-sm font-demi">
                    Don’t see your preferred network?{" "}
                    <a href="#">Request a network</a>
                  </p>
                </div>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setShowSwitchNetwork(false);
                  }}
                ></button>
              </div>
              {/* Add class [ modal-body--include-p ] if option are more then 6  */}
              <div class="modal-body modal-body--include-p">
                <div class="preferred_options">
                  <div class="row gx-0">
                    {chainInfos.map((item, index) => {
                      return (
                        <>
                          {item.label && item.status != "Quicksilver" && (
                            <div class="col-md-6">
                              <div
                                class={`preferred_options--each ${
                                  item.status != "live" ? "disabled" : ""
                                }`}
                                key={index}
                              >
                                <input
                                  id={`option-${index}`}
                                  class="option"
                                  type="checkbox"
                                  checked={item.chainName == chainName}
                                  onClick={() => {
                                    onChange(item, closeModal);
                                  }}
                                />
                                <label for={`option-${index}`}>
                                  <div class="content-wrapper">
                                    <div class="content-wrapper__intro">
                                      <div class="image-wrapper">
                                        <div class="image-ratio image-ratio--square">
                                          <Image
                                            src={item.icon}
                                            alt="atom"
                                            width={50}
                                            height={50}
                                          />
                                        </div>
                                      </div>
                                      <div class="text-wrapper">
                                        <p class="font-medium text-lightgray">
                                          {item.label}
                                        </p>
                                        <p class="copy-v-sm font-normal">
                                          {item.chainName}{" "}
                                          <span>
                                            {item.status != "live" && (
                                              <>- {item.status}</>
                                            )}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                    <div class="content-wrapper__detail">
                                      <h6 class="copy-lg font-medium text-lightgray">
                                        {showApyData(item)}%{/* 25% */}
                                      </h6>
                                      <p class="copy-v-sm fw-light text-almostwhite">
                                        APY
                                      </p>
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SwitchNetwork;
