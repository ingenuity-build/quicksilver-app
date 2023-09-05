"use client";
import React, { useEffect, useState } from "react";
import { favicon, kaplrCircle, leap, cosmos } from "@image/index";
import Image from "next/image";
import { useManager, useWallet } from "@cosmos-kit/react";

function ConnectWalletModal({ isOpen, setOpen, walletRepo }) {
  const walletManager = useWallet();
  const check = useManager();
  console.log(
    "WalletManager",
    walletRepo,
    walletRepo?.wallets
    // walletManager,
    // check,
    // walletManager.chainWallets
  );
  const [isKeplrInstalled, setIsKeplrInstalled] = useState(false);
  const [isLeapInstalled, setIsLeapInstalled] = useState(false);
  const [isCosmostationInstalled, setIsCosmostationInstalled] = useState(false);

  useEffect(() => {
    if (window && window.keplr) {
      setIsKeplrInstalled(true);
    }
    // @ts-expect-error
    if (window && window.leap) {
      setIsLeapInstalled(true);
    }
    // @ts-expect-error
    if (window && window.cosmostation) {
      setIsCosmostationInstalled(true);
    }
  }, []);
  return (
    <>
      {isOpen ? (
        <div
          class="modal fade show"
          id="modal_connect-wallet"
          aria-hidden="true"
          aria-labelledby="modal_connect-walletLabel"
          tabindex="-1"
          style={{ display: "block" }}
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <div class="modal-title" id="modal_connect-walletLabel">
                  <div class="image-wrapper">
                    <div class="image-ratio image-ratio--square">
                      <Image src={favicon} alt="favicon" />
                    </div>
                  </div>
                  <h6 class="h6-lg font-bold text-lightgray">
                    Connect Your Wallet
                  </h6>
                </div>
                <div class="modal-description">
                  <p class="copy-sm text-almostwhite">
                    Select your preferred wallet below.
                  </p>
                </div>
                <div class="modal-addition-info">
                  <p class="copy-v-sm font-demi">
                    Don{"'"}t have a wallet?{" "}
                    <a href="#">See supported wallets</a>
                  </p>
                </div>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setOpen(false);
                  }}
                ></button>
              </div>
              <div class="modal-body">
                {/* Add class [ include-p ] if option are more then 8  */}
                <div class="preferred_options">
                  <div class="row gx-0">
                    {walletRepo.wallets.map(
                      ({ walletPrettyName, connect }, index) => (
                        //   <button
                        //     key={walletName}
                        //     //   colorScheme="blue"
                        //     //   variant="ghost"
                        //     //   onClick={() => connect}
                        //   >
                        //     {walletName}
                        //     </button>
                        <>
                          {walletPrettyName === "Cosmostation" ||
                          walletPrettyName === "Keplr" ||
                          walletPrettyName === "Leap" ? (
                            <div class="col-md-6">
                              <div
                                class={`preferred_options--each ${
                                  walletPrettyName === "Keplr" &&
                                  !isKeplrInstalled
                                    ? "disabled"
                                    : ""
                                } ${
                                  walletPrettyName === "Leap" &&
                                  !isLeapInstalled
                                    ? "disabled"
                                    : ""
                                } ${
                                  walletPrettyName === "Cosmostation" &&
                                  !isCosmostationInstalled
                                    ? "disabled"
                                    : ""
                                }`}
                              >
                                <input
                                  id={`option-` + (index + 1)}
                                  class="option"
                                  type="checkbox"
                                  // checked
                                  onClick={() => {
                                    connect();
                                    setOpen(false);
                                  }}
                                />
                                <label for={`option-` + (index + 1)}>
                                  <div class="content-wrapper">
                                    <div class="content-wrapper__intro">
                                      <div class="image-wrapper">
                                        <div class="image-ratio image-ratio--square">
                                          {walletPrettyName === "Keplr" ? (
                                            <Image
                                              src={kaplrCircle}
                                              alt="kaplrCircle"
                                            />
                                          ) : walletPrettyName === "Leap" ? (
                                            <Image
                                              src={leap}
                                              alt="kaplrCircle"
                                            />
                                          ) : walletPrettyName ===
                                            "Cosmostation" ? (
                                            <Image
                                              src={cosmos}
                                              alt="kaplrCircle"
                                            />
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      </div>

                                      <div class="text-wrapper">
                                        <p class="font-medium text-lightgray">
                                          {walletPrettyName}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ConnectWalletModal;
