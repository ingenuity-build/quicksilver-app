import React from "react";
import Image from "next/image";
import { atom, qAtom, osmosis, junoSvg, stargaze2, k } from "@image/index";
import { images } from "@/utils/images";

const Card = ({ CardData, isWalletConnected, networks, balances }) => {
  // console.log("card", CardData);

  const updatedBalances = balances
    .filter((bal) => networks.find((y) => y.value.local_denom === bal.denom))
    .map((item, index) => ({
      ...item,
      ...networks.find((y) => y.value.local_denom === item.denom),
    }));

  console.log("updated Balance", updatedBalances);
  return isWalletConnected ? (
    <>
      <div class="assets__all">
        <div class="assets__all--title text-gray-secondary">
          <h6 class="font-bold text-uppercase">
            Assets (qAssets + Other Chain Assets)
          </h6>
        </div>
        <div class="assets__all--assets" style={{ overflow: "hidden" }}>
          <div class="row gy-3 gy-xl-0 gx-3 gx-xxl-4">
            {/* {balances.length > 0 &&
              balances
                .filter(
                  (bal) =>
                    networks.find((y) => y.value.local_denom === bal.denom) ||
                    bal.denom === "uqck"
                )
                .map((item, index) => ( */}
            {updatedBalances.length > 0 &&
              updatedBalances.map((item, index) => (
                <div class="col-xl-3 col-md-6" key={index}>
                  <div class="assets__all--assets-each">
                    {/* qNetwork */}
                    <div class="assets__all--assets-each__q">
                      <div class="network-wrapper">
                        {/* Network */}
                        <div class="network">
                          <div class="image-wrapper">
                            <div class="image-ratio image-ratio--square">
                              <Image
                                src={
                                  images[
                                    item.value.local_denom[1] +
                                      item.value.local_denom
                                        .slice(2)
                                        .toLowerCase()
                                  ] || qAtom
                                }
                                alt=""
                              />
                            </div>
                          </div>
                          <div class="text-wrapper text-lightgray">
                            <p class="copy-lg font-bold">
                              {item.denom[1] +
                                item.denom.slice(2).toUpperCase() || "qAtom"}
                            </p>
                          </div>
                        </div>
                        {/* Network Stats */}
                        <div class="network__stats text-end">
                          <p class="text-lightgray font-demi">
                            {item?.apy || "12.23"}%
                          </p>
                          <span class="copy-v-sm font-light">
                            QUICKSILVER APY
                          </span>
                        </div>
                      </div>
                      {/* Network Balances */}
                      <div class="assets__all--balances">
                        <ul class="list-reset">
                          <li>
                            <p class="copy-v-sm">Quicksilver Balance</p>
                            <span class="font-demi">
                              {(+item.amount / 1000000).toFixed(6) || "12.23%"}
                            </span>
                          </li>
                          <li>
                            <p class="copy-v-sm">Other Chain Balance</p>
                            {/* OTHER CHAIN BALANCE */}
                            <div class="other-chain-balance has-tooltip">
                              <span class="font-demi text-lightgray">
                                {item?.otherChainBalance?.number || "12.23%"}
                              </span>
                              <div class="other-chain-balance__tooltip">
                                {/* Main Network */}
                                <div class="main-network">
                                  <div class="image-wrapper">
                                    <div class="image-ratio image-ratio--square">
                                      <Image src={qAtom} alt="" />
                                    </div>
                                  </div>
                                  <div class="text-wrapper text-lightgray">
                                    <p class="copy-v-sm font-bold">
                                      qATOM – Other Chain Balance
                                    </p>
                                  </div>
                                </div>
                                {/* Other Networks */}
                                <div class="other-networks">
                                  <ul class="list-reset">
                                    <li>
                                      {/* Network */}
                                      <div class="network">
                                        <div class="image-wrapper">
                                          <div class="image-ratio image-ratio--square">
                                            <Image src={osmosis} alt="" />
                                          </div>
                                        </div>
                                        <div class="text-wrapper text-lightgray">
                                          <p class="copy-v-sm font-bold">
                                            Osmosis
                                          </p>
                                        </div>
                                      </div>
                                      {/* Network Stats */}
                                      <div class="network__stats">
                                        <p>12.345123</p>
                                      </div>
                                    </li>
                                    <li>
                                      {/* Network */}
                                      <div class="network">
                                        <div class="image-wrapper">
                                          <div class="image-ratio image-ratio--square">
                                            <Image src={stargaze2} alt="" />
                                          </div>
                                        </div>
                                        <div class="text-wrapper text-lightgray">
                                          <p class="copy-v-sm font-bold">
                                            Stargaze
                                          </p>
                                        </div>
                                      </div>
                                      {/* Network Stats */}
                                      <div class="network__stats">
                                        <p>12.345123</p>
                                      </div>
                                    </li>
                                    <li>
                                      {/* Network */}
                                      <div class="network">
                                        <div class="image-wrapper">
                                          <div class="image-ratio image-ratio--square">
                                            <Image src={junoSvg} alt="" />
                                          </div>
                                        </div>
                                        <div class="text-wrapper text-lightgray">
                                          <p class="copy-v-sm font-bold">
                                            Juno
                                          </p>
                                        </div>
                                      </div>
                                      {/* Network Stats */}
                                      <div class="network__stats">
                                        <p>12.345123</p>
                                      </div>
                                    </li>
                                    <li>
                                      {/* Network */}
                                      <div class="network">
                                        <div class="image-wrapper">
                                          <div class="image-ratio image-ratio--square">
                                            <Image src={k} alt="" />
                                          </div>
                                        </div>
                                        <div class="text-wrapper text-lightgray">
                                          <p class="copy-v-sm font-bold">
                                            Stargaze
                                          </p>
                                        </div>
                                      </div>
                                      {/* Network Stats */}
                                      <div class="network__stats">
                                        <p>12.345123</p>
                                      </div>
                                    </li>
                                    <li>
                                      {/* Network */}
                                      <div class="network">
                                        <div class="image-wrapper">
                                          <div class="image-ratio image-ratio--square">
                                            <Image src={osmosis} alt="" />
                                          </div>
                                        </div>
                                        <div class="text-wrapper text-lightgray">
                                          <p class="copy-v-sm font-bold">
                                            Stargaze
                                          </p>
                                        </div>
                                      </div>
                                      {/* Network Stats */}
                                      <div class="network__stats">
                                        <p>12.345123</p>
                                      </div>
                                    </li>
                                    <li>
                                      {/* Network */}
                                      <div class="network">
                                        <div class="image-wrapper">
                                          <div class="image-ratio image-ratio--square">
                                            <Image src={osmosis} alt="" />
                                          </div>
                                        </div>
                                        <div class="text-wrapper text-lightgray">
                                          <p class="copy-v-sm font-bold">
                                            Stargaze
                                          </p>
                                        </div>
                                      </div>
                                      {/* Network Stats */}
                                      <div class="network__stats">
                                        <p>12.345123</p>
                                      </div>
                                    </li>
                                    <li>
                                      {/* Network */}
                                      <div class="network">
                                        <div class="image-wrapper">
                                          <div class="image-ratio image-ratio--square">
                                            <Image src={osmosis} alt="" />
                                          </div>
                                        </div>
                                        <div class="text-wrapper text-lightgray">
                                          <p class="copy-v-sm font-bold">
                                            Stargaze
                                          </p>
                                        </div>
                                      </div>
                                      {/* Network Stats */}
                                      <div class="network__stats">
                                        <p>12.345123</p>
                                      </div>
                                    </li>
                                    <li>
                                      {/* Network */}
                                      <div class="network">
                                        <div class="image-wrapper">
                                          <div class="image-ratio image-ratio--square">
                                            <Image src={osmosis} alt="" />
                                          </div>
                                        </div>
                                        <div class="text-wrapper text-lightgray">
                                          <p class="copy-v-sm font-bold">
                                            Stargaze
                                          </p>
                                        </div>
                                      </div>
                                      {/* Network Stats */}
                                      <div class="network__stats">
                                        <p>12.345123</p>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      {/* Network Action */}
                      <div class="btn-wrapper">
                        <div class="row gx-3">
                          <div class="col-6">
                            <a class="btn btn--sm btn-transparent w-100">
                              Deposit
                              <svg
                                width="15"
                                height="14"
                                viewBox="0 0 15 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 11L10 4"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M4.58398 4.08398H10.4173V9.91732"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </a>
                          </div>
                          <div class="col-6">
                            <a class="btn btn--sm btn-transparent w-100">
                              Withdraw
                              <svg
                                width="15"
                                height="14"
                                viewBox="0 0 15 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 11L10 4"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M4.58398 4.08398H10.4173V9.91732"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    {/* Network */}
                    <div class="assets__all--assets-each__q">
                      <div class="network-wrapper">
                        {/* Network */}
                        <div class="network">
                          <div class="image-wrapper">
                            <div class="image-ratio image-ratio--square">
                              <Image
                                src={
                                  images[
                                    item.value?.base_denom
                                      ?.slice(1)
                                      .toLowerCase()
                                  ] || atom
                                }
                                alt=""
                              />
                            </div>
                          </div>
                          <div class="text-wrapper text-lightgray">
                            <p class="copy-lg font-bold">
                              {item.denom.slice(2).toUpperCase() || "ATOM"}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Network Balances */}
                      <div class="assets__all--balances mt-3">
                        <ul class="list-reset">
                          <li>
                            <p class="copy-v-sm">Quicksilver Balance</p>
                            <span class="font-demi">
                              {(
                                (networks.find(
                                  (y) => y.value.local_denom === item.denom
                                ).value.redemption_rate *
                                  +item.amount) /
                                1000000
                              ).toFixed(6) || 0.123456}
                            </span>
                          </li>
                        </ul>
                      </div>
                      {/* Network Action */}
                      <div class="btn-wrapper">
                        <div class="row gx-3">
                          <div class="col-6">
                            <a class="btn btn--sm btn-transparent w-100">
                              Deposit
                              <svg
                                width="15"
                                height="14"
                                viewBox="0 0 15 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 11L10 4"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M4.58398 4.08398H10.4173V9.91732"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </a>
                          </div>
                          <div class="col-6">
                            <a class="btn btn--sm btn-transparent w-100">
                              Withdraw
                              <svg
                                width="15"
                                height="14"
                                viewBox="0 0 15 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 11L10 4"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M4.58398 4.08398H10.4173V9.91732"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {/* ))} */}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div class="assets__all">
        <div class="assets__all--title text-gray-secondary">
          <h6 class="font-bold text-uppercase">
            Assets (qAssets + Other Chain Assets)
          </h6>
        </div>
        <div class="assets__all--assets">
          <div class="row">
            {networks.length > 0 &&
              networks.map((item, index) => (
                <div class="col-lg-3" key={index}>
                  <div class="assets__all--assets-each">
                    {/* qNetwork */}
                    <div class="assets__all--assets-each__q">
                      <div class="network-wrapper">
                        {/* Network */}
                        <div class="network">
                          <div class="image-wrapper">
                            <div class="image-ratio image-ratio--square">
                              <Image
                                src={
                                  images[
                                    item.value.local_denom[1] +
                                      item.value.local_denom
                                        .slice(2)
                                        .toLowerCase()
                                  ] || qAtom
                                }
                                alt=""
                              />
                            </div>
                          </div>
                          <div class="text-wrapper text-lightgray">
                            <p class="copy-lg font-bold">
                              {item.value.local_denom[1] +
                                item.value.local_denom.slice(2).toUpperCase() ||
                                "qAtom"}
                            </p>
                          </div>
                        </div>
                        {/* Network Stats */}
                        <div class="network__stats text-end">
                          <p class="text-lightgray font-demi">
                            {item?.apy || "12.23"}%
                          </p>
                          <span class="copy-v-sm font-light">
                            QUICKSILVER APY
                          </span>
                        </div>
                      </div>
                      {/* Network Balances */}
                      <div class="assets__all--balances">
                        <ul class="list-reset">
                          <li>
                            <p class="copy-v-sm">Quicksilver Balance</p>
                            <span class="font-demi">{"----"}</span>
                          </li>
                          <li>
                            <p class="copy-v-sm">Other Chain Balance</p>
                            {/* OTHER CHAIN BALANCE */}
                            <div class="other-chain-balance">
                              <span class="font-demi">{"----"}</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                      {/* Network Action */}
                      <div class="btn-wrapper">
                        <div class="row gx-3">
                          <div class="col-6">
                            <button
                              class="btn btn--sm btn-transparent w-100 disabled"
                              style={{ color: "yellow" }}
                              disabled
                            >
                              Deposit
                              <svg
                                width="15"
                                height="14"
                                viewBox="0 0 15 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 11L10 4"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M4.58398 4.08398H10.4173V9.91732"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                          <div class="col-6">
                            <button
                              class="btn btn--sm btn-transparent w-100 disabled"
                              disabled
                              style={{ color: "black" }}
                            >
                              Withdraw
                              <svg
                                width="15"
                                height="14"
                                viewBox="0 0 15 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 11L10 4"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M4.58398 4.08398H10.4173V9.91732"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr style={{ border: "none" }} />
                    {/* Network */}
                    <div class="assets__all--assets-each__q">
                      <div class="network-wrapper">
                        {/* Network */}
                        <div class="network">
                          <div class="image-wrapper">
                            <div class="image-ratio image-ratio--square">
                              <Image
                                src={
                                  images[
                                    item.value?.base_denom
                                      ?.slice(1)
                                      .toLowerCase()
                                  ] || atom
                                }
                                alt=""
                              />
                            </div>
                          </div>
                          <div class="text-wrapper text-lightgray">
                            <p class="copy-lg font-bold">
                              {item.value.local_denom.slice(2).toUpperCase() ||
                                "ATOM"}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Network Balances */}
                      <div class="assets__all--balances mt-3">
                        <ul class="list-reset">
                          <li>
                            <p class="copy-v-sm">Quicksilver Balance</p>
                            <span class="font-demi">----</span>
                          </li>
                        </ul>
                      </div>
                      {/* Network Action */}
                      <div class="btn-wrapper">
                        <div class="row gx-3">
                          <div class="col-6">
                            <button
                              class="btn btn--sm btn-transparent w-100 disabled"
                              disabled
                            >
                              Deposit
                              <svg
                                width="15"
                                height="14"
                                viewBox="0 0 15 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 11L10 4"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M4.58398 4.08398H10.4173V9.91732"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                          <div class="col-6">
                            <button
                              class="btn btn--sm btn-transparent w-100 disabled"
                              disabled
                            >
                              Withdraw
                              <svg
                                width="15"
                                height="14"
                                viewBox="0 0 15 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 11L10 4"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M4.58398 4.08398H10.4173V9.91732"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
