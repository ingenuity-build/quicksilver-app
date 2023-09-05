import React from "react";
import { favicon } from "@/assets/img";
import Image from "next/image";
import { selectedNetworkSelector } from "@/slices/selectedNetworks";
import { useSelector } from "react-redux";

function StakingSummary({
  setShowSummaryModal,
  selectedValidator,
  confirmStaking,
  coin,
  stakingAmount,
}) {
  let selectedNetwork = useSelector(selectedNetworkSelector);
  const selectedNetworkApy = selectedNetwork?.selectedNetwork?.apy || 0;
  selectedNetwork =
    selectedNetwork?.selectedNetwork?.value || selectedNetwork.selectedNetwork;
  return (
    <div
      class="modal modal__stake-summary fade show"
      id="modal_stake-summary"
      aria-hidden="true"
      aria-labelledby="modal_stake-summaryLabel"
      tabindex="-1"
      style={{ display: "block" }}
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title" id="modal_stake-summaryLabel">
              <div class="image-wrapper">
                <div class="image-ratio image-ratio--square">
                  <Image src={favicon} alt="favicon" />
                </div>
              </div>
              {/* data-heading include the after approval heading text */}
              <h6
                class="h6-lg font-bold text-lightgray heading"
                data-heading="Unstake Initiated"
              >
                Stake Summary
              </h6>
            </div>
            <div class="modal-description">
              {/* data-description include the after approval description text */}
              <p class="description" data-description="Transaction successful">
                Confirm your staking amount and your intent for staking
                allocation.
              </p>
            </div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setShowSummaryModal(false);
              }}
            ></button>
          </div>
          <div class="modal-body">
            <div class="transection-details">
              <div class="transection-details__top">
                <ul class="list-reset">
                  <li>
                    <h6 class="copy-sm font-normal text-almostwhite">
                      Total Stake:
                    </h6>
                    <p class="copy-normal font-demi text-almostwhite ms-auto">
                      <span>{stakingAmount}</span>{" "}
                      {selectedNetwork &&
                      selectedNetwork != "Select a network" ? (
                        <>{selectedNetwork.base_denom.slice(1).toUpperCase()}</>
                      ) : (
                        <>ATOM</>
                      )}
                    </p>
                  </li>
                  <li>
                    <h6 class="copy-sm font-normal text-almostwhite">
                      Quicksilver APY:
                    </h6>
                    <p class="copy-normal font-demi text-almostwhite ms-auto">
                      {selectedNetworkApy}%
                    </p>
                  </li>
                  <li>
                    <h6 class="copy-sm font-normal text-almostwhite">
                      Redemption Rate:
                    </h6>
                    <p class="copy-normal font-demi text-almostwhite ms-auto">
                      {selectedNetwork &&
                      selectedNetwork != "Select a network" ? (
                        <span>
                          1 {selectedNetwork.base_denom.slice(1).toUpperCase()}{" "}
                          ={" "}
                          {parseFloat(
                            1 / selectedNetwork?.redemption_rate
                          ).toFixed(4)}{" "}
                          {selectedNetwork.local_denom[1] +
                            selectedNetwork.local_denom
                              .slice(2)
                              .toUpperCase()}{" "}
                        </span>
                      ) : (
                        <>
                          <span>1 ATOM = 1.243222</span> qATOM
                        </>
                      )}
                    </p>
                  </li>
                  <li>
                    <h6 class="copy-sm font-normal text-almostwhite">
                      {selectedNetwork &&
                      selectedNetwork != "Select a network" ? (
                        <>
                          {selectedNetwork.local_denom[1] +
                            selectedNetwork.local_denom
                              .slice(2)
                              .toUpperCase()}{" "}
                          Received
                        </>
                      ) : (
                        <>qATOM Received</>
                      )}
                    </h6>
                    <p class="copy-normal font-demi text-almostwhite ms-auto">
                      {selectedNetwork &&
                      selectedNetwork != "Select a network" ? (
                        <>
                          <span>
                            {(
                              (1 / Number(selectedNetwork?.redemption_rate)) *
                              stakingAmount
                            ).toFixed(6)}
                          </span>{" "}
                          {selectedNetwork.local_denom[1] +
                            selectedNetwork.local_denom.slice(2).toUpperCase()}
                        </>
                      ) : (
                        <>
                          <span>11.123123</span> qATOM
                        </>
                      )}
                    </p>
                  </li>
                </ul>
              </div>
              <div class="transection-details__validators-list">
                <div class="transection-details__validators-list--head">
                  <h6 class="copy-lg font-demi text-uppercase text-lightgray">
                    Validator List
                  </h6>
                  <a
                    class="edit-stake"
                    onClick={() => {
                      setShowSummaryModal(false);
                    }}
                  >
                    Edit Stake Allocation
                  </a>
                </div>
                <div class="transection-details__validators-list--body">
                  <ul class="list-reset">
                    {selectedValidator.map((item) => {
                      return (
                        <li key={item.name}>
                          {/* Network */}
                          <div class="network">
                            <div class="image-wrapper">
                              <div class="image-ratio image-ratio--square">
                                {/* <Image
                                src={lavender}
                                alt="lavender"
                                width={100}
                                height={100}
                              /> */}
                                <Image src={item.img} alt={item.name} />
                              </div>
                            </div>
                            <div class="text-wrapper text-almostwhite">
                              {/* <p class="copy-sm">Lavender.Five Nodes</p> */}
                              <p class="copy-sm">{item.name}</p>
                            </div>
                          </div>
                          {/* Network Stake */}
                          <div class="network__stake">
                            {/* <span>12.5%</span> */}
                            <span>{item?.stakingAllocation}%</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div class="transection-details__validators-list--bottom">
                  <p class="copy-sm text-almostwhite">
                    Aggregate staking intent for all stakers is calculated at
                    the end of each epoch. Given limitations in concurrent
                    redelegations, redelegation to the new intent may take up to
                    21 days.
                  </p>
                  <div class="form-check mt-2 pt-1">
                    <input
                      id="claim"
                      type="checkbox"
                      class="form-check-input outline-orange"
                      checked
                    />
                    <label
                      for="claim"
                      class="form-check-label copy-v-sm"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      data-bs-html="true"
                      title=""
                      data-bs-original-title="Enable automatic claiming of rewards to allow QCK <br> rewards to be automatically sent to your wallet. <br> Automatic claiming of rewards must be set to ON for the <br> protocol to keep your stake distribution among <br> validators updated"
                    >
                      <i>Enable Automatic Claiming of Rewards</i>
                    </label>
                  </div>
                  <div class="btn-wrapper mt-4">
                    <button
                      class="btn btn-primary w-100"
                      data-bs-toggle="modal"
                      data-bs-target="#modal_approve-transection"
                      role="button"
                      onClick={confirmStaking}
                    >
                      Confirm Stake
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StakingSummary;
