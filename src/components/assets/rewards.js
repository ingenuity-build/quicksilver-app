import React from "react";

const Rewards = ({
  claimReward,
  handleClaimReward,
  isWalletConnected,
  rewardAmount,
}) => {
  return (
    <>
      <div class="participation-rewards participation-rewards--user-not-available show">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="participation-rewards__details">
                <h6 class="h6-lg font-black text-gray-secondary text-uppercase">
                  Participation Rewards
                </h6>
                <p class="text-almostwhite">
                  Stake with validators with a high PR score to earn QCK
                  rewards. Automatic claiming of rewards is{" "}
                  <a href="#" class="text-decoration-underline">
                    required
                  </a>{" "}
                  for the protocol to consider your validator staking intent.
                </p>
                <a
                  class="text-lightgray font-medium"
                  style={{ display: "flex" }}
                >
                  Learn more about Participation Rewards
                  <svg
                    style={{ flexDirection: "raw" }}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 15L12.5 10L7.5 5"
                      stroke="#FF8500"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
            {claimReward === "1" ? (
              <div class="col-lg-6">
                <div class="participation-rewards__claim">
                  <div class="participation-rewards__claim--head">
                    <div class="text-wrapper text-lightgray">
                      <p class="copy-lg">Available Rewards:</p>
                      <h5 class="h5-lg font-bold">
                        {rewardAmount || "0.00"} QCK
                      </h5>
                    </div>
                    <div class="btn-wrapper">
                      <button
                        class={`btn btn-brown btn--v-sm d-none d-md-block ${
                          !isWalletConnected ? "disabled" : ""
                        }`}
                        data-bs-toggle="modal"
                        data-bs-target="#modal_claim-rewards"
                        role="button"
                        onClick={handleClaimReward}
                        disabled={!isWalletConnected}
                      >
                        Claim Rewards
                      </button>
                      <a
                        class={`btn btn-brown btn--v-sm d-md-none ${
                          !isWalletConnected ? "disabled" : ""
                        }`}
                        onClick={handleClaimReward}
                        disabled={!isWalletConnected}
                      >
                        Claim Rewards
                      </a>
                    </div>
                  </div>
                  <div class="participation-rewards__claim--body">
                    <div class="form-check">
                      <input
                        id="claim"
                        type="checkbox"
                        class="form-check-input outline-orange"
                        style={{ paddingRight: "12px" }}
                      />
                      <label
                        for="claim"
                        class="copy-v-sm"
                        style={{ display: "flex" }}
                      >
                        <i>Enable Automatic Claiming of Rewards</i>
                        <svg
                          style={{ marginLeft: "6px" }}
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-html="true"
                          title="Enable automatic claiming of rewards to allow QCK <br> rewards to be automatically sent to your wallet. <br> Automatic claiming of rewards must be set to ON for the <br> protocol to keep your stake distribution among <br> validators updated"
                        >
                          <path
                            d="M6.99935 12.8346C10.221 12.8346 12.8327 10.223 12.8327 7.0013C12.8327 3.77964 10.221 1.16797 6.99935 1.16797C3.77769 1.16797 1.16602 3.77964 1.16602 7.0013C1.16602 10.223 3.77769 12.8346 6.99935 12.8346Z"
                            stroke="#FBFBFB"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7 9.33333V7"
                            stroke="#FBFBFB"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7 4.66797H7.00729"
                            stroke="#FBFBFB"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ) : claimReward === "2" ? (
              <div class="col-lg-6">
                <div class="participation-rewards__claim">
                  <div class="participation-rewards__claim--head">
                    <div class="text-wrapper text-lightgray">
                      <p class="copy-lg">Available Rewards</p>
                      <h5 class="h5-lg font-bold">0.00 QCK</h5>
                    </div>
                    <div class="countdown d-none d-md-flex">
                      <div class="countdown__circle">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                          <linearGradient
                            id="circle_gradient"
                            x1="-1.83398"
                            y1="40.3746"
                            x2="76.834"
                            y2="40.3746"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#A855F7" />
                            <stop offset="0.526042" stop-color="#3B82F6" />
                            <stop offset="1" stop-color="#14B8A6" />
                          </linearGradient>
                          <circle cx="41" cy="41" r="35.45" />
                          <circle
                            id="countdown_progress"
                            cx="41"
                            cy="41"
                            r="35.45"
                          />
                        </svg>
                        <div class="countdown__time">
                          {/* <!-- Set the [ Start Date & Time ] as Current Date & Time -->
                            <!-- Set the [ Expiry Date & Time ] as Event Expiry Date & Time *FUTURE* -->

                            <!-- Currently 3 days timer has been set from June 15 : 15 clock --> */}
                          <p
                            id="countdown"
                            data-start_date_time="June 17, 2023 15:00:00"
                            data-expire_date_time="June 25, 2023 15:00:00"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            data-bs-html="true"
                            title="Rewards are issued at the end of <br> the Quicksilver epoch."
                          >
                            12:00
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="countdown d-md-none">
                      <div class="countdown__bar">
                        <div
                          class="countdown__bar--stats"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                      <div class="countdown__stats">
                        <p>
                          <i>12:00 hours left</i>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="participation-rewards__claim--body">
                    <div class="form-check">
                      <input
                        id="claim-1"
                        type="checkbox"
                        class="form-check-input outline-orange"
                      />
                      <label
                        for="claim-1"
                        class="copy-v-sm"
                        style={{ display: "flex" }}
                      >
                        <i>Enable Automatic Claiming of Rewards</i>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-html="true"
                          title="Enable automatic claiming of rewards to allow QCK <br> rewards to be automatically sent to your wallet. <br> Automatic claiming of rewards must be set to ON for the <br> protocol to keep your stake distribution among <br> validators updated"
                        >
                          <path
                            d="M6.99935 12.8346C10.221 12.8346 12.8327 10.223 12.8327 7.0013C12.8327 3.77964 10.221 1.16797 6.99935 1.16797C3.77769 1.16797 1.16602 3.77964 1.16602 7.0013C1.16602 10.223 3.77769 12.8346 6.99935 12.8346Z"
                            stroke="#FBFBFB"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7 9.33333V7"
                            stroke="#FBFBFB"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7 4.66797H7.00729"
                            stroke="#FBFBFB"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ) : claimReward === "3" ? (
              <div class="col-lg-6">
                <div class="participation-rewards__claim">
                  <div class="participation-rewards__claim--head">
                    <div class="text-wrapper text-lightgray">
                      <p class="copy-lg">Available Rewards</p>
                      <h5 class="h5-lg font-bold">0.00 QCK</h5>
                    </div>
                    <div class="countdown d-none d-md-flex">
                      <div class="countdown__circle">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                          <linearGradient
                            id="circle_gradient"
                            x1="-1.83398"
                            y1="40.3746"
                            x2="76.834"
                            y2="40.3746"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#A855F7" />
                            <stop offset="0.526042" stop-color="#3B82F6" />
                            <stop offset="1" stop-color="#14B8A6" />
                          </linearGradient>
                          <circle cx="41" cy="41" r="35.45" />
                          <circle
                            id="countdown_progress"
                            cx="41"
                            cy="41"
                            r="35.45"
                          />
                        </svg>
                        <div class="countdown__time">
                          {/* <!-- Set the [ Start Date & Time ] as Current Date & Time -->
                              <!-- Set the [ Expiry Date & Time ] as Event Expiry Date & Time *FUTURE* -->

                              <!-- Currently 3 days timer has been set from June 15 : 15 clock --> */}
                          <p
                            id="countdown"
                            data-start_date_time="June 17, 2023 15:00:00"
                            data-expire_date_time="June 25, 2023 15:00:00"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            data-bs-html="true"
                            title="Rewards are issued at the end of <br> the Quicksilver epoch."
                          >
                            12:00
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="countdown d-md-none">
                      <div class="countdown__bar">
                        <div
                          class="countdown__bar--stats"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                      <div class="countdown__stats">
                        <p>
                          <i>12:00 hours left</i>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="participation-rewards__claim--body">
                    <div class="form-check">
                      <svg
                        width="9"
                        height="16"
                        viewBox="0 0 9 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.62791 0L0 8.61129H4.15282L2.75747 16L8.2392 5.26246H4.28571L5.24917 0H1.62791Z"
                          fill="#FFCE31"
                        />
                      </svg>
                      <p class="copy-v-sm m-0 ms-2" style={{ display: "flex" }}>
                        <i>Automatic claiming of rewards is enabled</i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // claimReward ===
              // "4"
              <div class="col-lg-6">
                <div class="participation-rewards__claim">
                  <div class="participation-rewards__claim--head">
                    <div class="text-wrapper text-lightgray">
                      <p class="copy-lg">Available Rewards</p>
                      <h5 class="h5-lg font-bold">0.00 QCK</h5>
                    </div>
                    <div class="btn-wrapper">
                      <a
                        class="btn btn-brown btn--v-sm d-none d-md-block"
                        data-bs-toggle="modal"
                        data-bs-target="#modal_claim-rewards"
                        role="button"
                        onClick={handleClaimReward}
                      >
                        Claim Rewards
                      </a>
                      <a
                        class="btn btn-brown btn--v-sm d-md-none"
                        onClick={handleClaimReward}
                      >
                        Claim Rewards
                      </a>
                    </div>
                  </div>
                  <div class="participation-rewards__claim--body">
                    <div class="form-check">
                      <input
                        id="claim-2"
                        type="checkbox"
                        class="form-check-input outline-orange"
                      />
                      <label
                        for="claim-2"
                        class="copy-v-sm"
                        style={{ display: "flex" }}
                      >
                        <i>Enable Automatic Claiming of Rewards</i>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-html="true"
                          title="Enable automatic claiming of rewards to allow QCK <br> rewards to be automatically sent to your wallet. <br> Automatic claiming of rewards must be set to ON for the <br> protocol to keep your stake distribution among <br> validators updated"
                        >
                          <path
                            d="M6.99935 12.8346C10.221 12.8346 12.8327 10.223 12.8327 7.0013C12.8327 3.77964 10.221 1.16797 6.99935 1.16797C3.77769 1.16797 1.16602 3.77964 1.16602 7.0013C1.16602 10.223 3.77769 12.8346 6.99935 12.8346Z"
                            stroke="#FBFBFB"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7 9.33333V7"
                            stroke="#FBFBFB"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7 4.66797H7.00729"
                            stroke="#FBFBFB"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Rewards;
