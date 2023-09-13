"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { atom, quicksilverSvg } from "@image/index";
// import SwiperCore, { Navigation } from "swiper";
// import "swiper/swiper-bundle.min.css";
// SwiperCore.use([Navigation]);
import Table from "../../components/assets/table";
import Card from "../../components/assets/assetsCard";
import { CardData } from "../../utils/assetsCardData";
import Reward from "../../components/assets/rewards";
import NotificationFailedModel from "../../components/assets/notificationFailedModel";
import NotificationSuccessModel from "../../components/assets/notificationSuccessModel";
import RewardClaimModel from "../../components/assets/claimRewardModel";
import stakeIntentData from "@/utils/assetsstakeIntentData";
import { quicksilverSelector } from "@/slices/quicksilver";
import { useSelector } from "react-redux";
import { quicksilver, getSigningQuicksilverClient } from "quicksilverjs";
import { QuickSilverChainInfo } from "@/utils/chains";
import { useChain, useChainWallet } from "@cosmos-kit/react";
import { networksSelector } from "@/slices/networks";
import { images } from "@/utils/images";
import Validator from "@/components/assets/validator";

const Assets = () => {
  const { balances, quicksilverAddress } = useSelector(quicksilverSelector);
  const quicksilverData = useSelector(quicksilverSelector);
  console.log("Dataaaaaa", balances, quicksilverData);
  const { networks } = useSelector(networksSelector);

  // let messages = [];
  const [messages, setMessages] = useState([]);
  let localChain;
  if (typeof window !== "undefined") {
    localChain = localStorage.getItem("selected-chain");
  }
  const { isWalletConnected, address, openView } = useChain(
    localChain || process.env.NEXT_PUBLIC_REACT_APP_DEFAULT_CHAIN
  );
  console.log("iswalletconnected", isWalletConnected);
  let wallet;
  if (typeof window !== "undefined") {
    wallet = localStorage.getItem("cosmos-kit@1:core//current-wallet");
  }
  const { getOfflineSignerAmino } = useChainWallet(
    QuickSilverChainInfo?.chainId || "",
    wallet || process.env.NEXT_PUBLIC_REACT_APP_DEFAULT_WALLET
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [claimReward, setClaimReward] = useState("1");
  const [noAssets, setNoAssets] = useState(false);
  const [loading, setLoading] = useState(false);
  const [assetsList, setAssetsList] = useState({});
  const [totalBalance, setTotalBalance] = useState();
  const [qckBalance, setQckBalance] = useState();
  const [showIntent, setShowIntent] = useState(false);
  const toggleFilterDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClaimReward = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const queryXccLookup = async () => {
    console.log("Process", process.env.NEXT_PUBLIC_REACT_APP_ENV);
    try {
      const res = await fetch(
        `https://claim.${process.env.NEXT_PUBLIC_REACT_APP_ENV}.quicksilver.zone/${quicksilverAddress}/epoch`
      );
      const data = await res.json();
      console.log("assets data", data);
      setMessages(data.messages);
      // update assets
      if (data.messages.length === 0) {
        setNoAssets(true);
      } else {
        setNoAssets(false);
      }

      const res2 = await fetch(
        `https://claim.dev.quicksilver.zone/quick16k7sajqy59whw2mq8whwr9wvhwhn4n37halmhr/epoch`
      );
      const data2 = await res2.json();
      let assets = data2.assets;
      assets = Object.values(assets);
      assets = [].concat(...assets);
      console.log("assets", assets);
      assets = assets
        .filter((item, index) => item.Type == "liquid")
        .map((item) => [...item.Amount]);
      assets = [].concat(...assets);
      console.log("assets 2", assets);
      const assetsObj = {};
      assets.map((item) => {
        if (assetsObj[item.denom]) {
          assetsObj[item.denom] = assetsObj[item.denom] + Number(item.amount);
        } else {
          assetsObj[item.denom] = Number(item.amount);
        }
      });
      console.log("assets 3", assetsObj);
      const assetSum = assets.reduce(
        (acc, item) => acc + Number(item.amount),
        0
      );
      console.log("assets 4", assetSum);
      // assetsObj["uqstars"] = 3770537;
      setAssetsList(assetsObj);
      setTotalBalance(assetSum);
    } catch (err) {
      console.log(err);
    }
  };

  const onClaimsClick = async (e) => {
    const stargateClient = await getSigningQuicksilverClient({
      // rpcEndpoint: "https://rpc.dev.quicksilver.zone",
      rpcEndpoint: QuickSilverChainInfo?.rpc,
      signer: getOfflineSignerAmino(),
    });
    let msg = [];
    console.log("Message", messages);
    msg = messages.map((message) => {
      return {
        typeUrl: "/quicksilver.participationrewards.v1.MsgSubmitClaim",
        value: {
          userAddress: message.user_address,
          zone: message.zone,
          srcZone: message.src_zone,
          claimType: message.claim_type,
          proofs: message.proofs.map((proof) => {
            return {
              key: proof.key,
              data: proof.data,
              proofOps: proof.proof_ops,
              proofType: proof.proof_type,
              height: proof.height,
            };
          }),
        },
      };
    });
    console.log("Message 1", msg);
    try {
      setLoading(true);
      const broadcastResult = await stargateClient.signAndBroadcast(
        quicksilverAddress,
        msg,
        {
          gas: (50000 + messages.length * 50000).toString(),
          amount: [
            {
              denom: "uqck",
              amount: (0.25 * (50000 + messages.length * 50000)).toString(),
            },
          ],
        }
      );
      console.log(broadcastResult);
      if (broadcastResult.code === 0) {
      } else {
        setLoading(false);
        console.log(broadcastResult);
        // setError("The transaction failed! Please try again.");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      // setError("The transaction failed! Please try again.");
      console.log(err);
    }
  };

  useEffect(() => {
    // const swiper = new SwiperCore(".swiper", {
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },
    // });
  }, []);

  useEffect(() => {
    // if (isQSWalletConnected && networks) {
    //   let denomArray: Array<string> = [];
    //   networks.forEach((network: any) =>
    //     denomArray.push(network.value.local_denom)
    //   );
    //   denomArray.push("uqck");
    //   setDenomArray(denomArray);
    //   if (!sum) {
    //     fetchSum();
    //   }
    // }

    queryXccLookup();
    // setError("");
  }, [balances, quicksilverAddress]);

  return (
    <>
      {showIntent ? (
        <>
          <Validator setShowIntent={setShowIntent} />
        </>
      ) : (
        <div>
          <Reward
            handleClaimReward={onClaimsClick}
            claimReward={claimReward}
            isWalletConnected={isWalletConnected}
            rewardAmount={
              (0.25 * (50000 + messages.length * 50000)) / Math.pow(10, 6)
            }
          />

          {/* Assets Start Here */}
          <div class="assets">
            <div class="container">
              {/* Own Assets */}
              <div class="assets__own">
                {/* Assets Profile */}

                <div class="assets__profile">
                  <div class="assets__profile__inner">
                    {/* Network */}
                    <div class="assets__profile--network">
                      <div class="image-wrapper">
                        <Image src={quicksilverSvg} alt="" />
                      </div>
                      <div class="text-wrapper">
                        <h3 class="font-bold text-lightgray">QCK</h3>
                      </div>
                    </div>
                    {/* Network Stats */}
                    <div class="assets__profile--network-stats">
                      <h3 class="h3-sm font-bold text-lightgray">
                        12.34%
                        <span class="copy-sm font-normal text-gray-secondary text-uppercase">
                          STAKING APY
                        </span>
                      </h3>
                    </div>
                    {/* Network Balance */}
                    <div class="assets__profile--balances">
                      <ul class="list-reset">
                        <li>
                          <p class="copy-sm">Quicksilver Balance</p>
                          <span class="font-medium">
                            {isWalletConnected
                              ? totalBalance
                                ? (totalBalance / Math.pow(10, 6)).toFixed(6)
                                : (0.0).toFixed(6)
                              : "----"}
                          </span>
                        </li>
                        <li>
                          <p class="copy-sm">Other Chain Balance</p>
                          <span class="font-medium">
                            {isWalletConnected ? 10.123456 : "----"}
                          </span>
                        </li>
                      </ul>
                    </div>

                    {/* Network Actions */}

                    <div
                      class="btn-wrapper"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <a
                        href=""
                        class={`btn btn--sm btn-transparent ${
                          !isWalletConnected ? "w-100 disabled" : ""
                        }`}
                      >
                        Deposit
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 11.5L10 4.5"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M4.58398 4.58398H10.4173V10.4173"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </a>
                      <a
                        href=""
                        class={`btn btn--sm btn-transparent ${
                          !isWalletConnected ? "w-100 disabled" : ""
                        }`}
                      >
                        Withdraw
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 11.5L10 4.5"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M4.58398 4.58398H10.4173V10.4173"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                {/* Assets Portfolio */}
                <div class="assets__portfolio">
                  <div class="assets__portfolio__inner">
                    {/* Title */}
                    <div class="assets__portfolio--title text-gray-secondary">
                      <h6 class="copy-lg font-black text-uppercase">
                        My QUICKSILVER Portfolio
                      </h6>
                    </div>
                    {/* Stats */}
                    {isWalletConnected ? (
                      <>
                        <div class="assets__portfolio--stats">
                          <ul class="list-reset">
                            <li>
                              <p class="copy-v-sm font-medium text-lightgray">
                                TOTAL
                              </p>
                              <p class="copy-sm font-light text-lightgray">
                                AVG APY: <span class="font-bold">6.56%</span>
                              </p>
                            </li>
                            <li>
                              <h3 class="text-lightgray font-bold">
                                $ 1,222.28
                              </h3>
                              <p class="copy-sm font-light text-lightgray">
                                AVG APY: <span class="font-bold">$3,917</span>
                              </p>
                            </li>
                          </ul>
                        </div>

                        {/* Portfolio Items */}
                        <div class="assets__portfolio--items">
                          <ul class="list-reset">
                            {Object.keys(assetsList).length > 0 &&
                              Object.keys(assetsList).map((item, index) => (
                                <li key={index}>
                                  {/* Row # 1 */}
                                  <div class="assets__portfolio--items__each">
                                    {/* Network */}
                                    <div class="network">
                                      <div class="image-wrapper">
                                        <div class="image-ratio image-ratio--square">
                                          <Image
                                            src={
                                              images[
                                                item[1] +
                                                  item.slice(2).toLowerCase()
                                              ]
                                            }
                                            alt="demon"
                                          />
                                        </div>
                                      </div>
                                      <div class="text-wrapper text-almostwhite">
                                        <p class="copy-sm font-medium">
                                          {item}
                                        </p>
                                      </div>
                                    </div>
                                    {/* Network Percentage Occupied */}
                                    <div class="network__occupied">
                                      {/* Progress Bar */}
                                      <div class="network__occupied--progress-bar">
                                        {/* Set default width to 10%, if more set accordingly */}
                                        <div
                                          class="network__occupied--progress-bar__value"
                                          style={{
                                            width: `${
                                              assetsList[item] / totalBalance
                                                ? (assetsList[item] /
                                                    totalBalance) *
                                                    100 +
                                                  "%"
                                                : "0%"
                                            }`,
                                          }}
                                        ></div>
                                      </div>
                                      {/* Occupied Percentage */}
                                      <div class="network__occupied--percentage">
                                        <p class="copy-v-sm text-lightgray">
                                          {(
                                            (assetsList[item] / totalBalance) *
                                            100
                                          ).toFixed(2)}
                                          %
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <>
                        <div class="assets__portfolio--stats">
                          <ul class="list-reset">
                            <li>
                              <p class="copy-v-sm font-medium text-lightgray">
                                TOTAL
                              </p>
                              <p class="copy-sm font-light text-lightgray">
                                AVG APY: <span class="font-bold">--</span>
                              </p>
                            </li>
                            <li>
                              <h3 class="text-lightgray font-bold">--</h3>
                              <p class="copy-sm font-light text-lightgray">
                                AVG APY: <span class="font-bold">--</span>
                              </p>
                            </li>
                          </ul>
                        </div>
                        {/* Portfolio Items */}
                        <div class="assets__portfolio--items">
                          <ul class="list-reset">
                            {networks.length > 0 &&
                              networks.map((item, index) => (
                                <li key={index}>
                                  {/* Row # 1 */}
                                  <div class="assets__portfolio--items__each">
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
                                              ]
                                            }
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                      <div class="text-wrapper text-almostwhite">
                                        <p class="copy-sm font-medium">
                                          {item.value.local_denom[1] +
                                            item.value.local_denom
                                              .slice(2)
                                              .toUpperCase()}
                                        </p>
                                      </div>
                                    </div>
                                    {/* Network Percentage Occupied */}
                                    <div class="network__occupied">
                                      {/* Progress Bar */}
                                      <div class="network__occupied--progress-bar">
                                        {/* Set default width to 10%, if more set accordingly */}
                                        <div
                                          class="network__occupied--progress-bar__value"
                                          style={{
                                            width: "0%",
                                          }}
                                        ></div>
                                      </div>
                                      {/* Occupied Percentage */}
                                      <div class="network__occupied--percentage">
                                        <p class="copy-v-sm text-lightgray">
                                          0%
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {/* Assets Stake Intent */}
                <div class="assets__stake">
                  <div class="assets__stake__inner">
                    {/* Title */}
                    <div class="assets__stake--title">
                      <h6 class="copy-lg font-black text-gray-secondary text-uppercase">
                        stake INTENT
                      </h6>
                      <a
                        href="#"
                        class="copy-sm font-medium text-lightgray"
                        style={{ display: "flex" }}
                      >
                        Edit / Reset Intent
                        <svg
                          width="17"
                          height="20"
                          viewBox="0 0 17 20"
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
                    {/* Slider */}
                    <div class="assets__stake--swiper">
                      <div class="swiper">
                        {/* If we need navigation buttons */}
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-wrapper">
                          {isWalletConnected ? (
                            <div class="swiper-slide">
                              {/* Title */}
                              <div class="assets__stake--each">
                                <div class="assets__stake--each__head">
                                  {/* Network */}
                                  <div class="network">
                                    <div class="image-wrapper">
                                      <div class="image-ratio image-ratio--square">
                                        <Image src={atom} alt="" />
                                      </div>
                                    </div>
                                    <div class="text-wrapper text-lightgray">
                                      <p class="copy-lg font-bold">Cosmos</p>
                                    </div>
                                  </div>
                                </div>
                                <div class="assets__stake--each__body">
                                  <ul class="list-reset">
                                    {stakeIntentData.length > 0 &&
                                      stakeIntentData.map((item, index) => (
                                        <li key={index}>
                                          {/* Row # 1 */}
                                          <div class="network-each">
                                            {/* Network */}
                                            <div class="network">
                                              <div class="image-wrapper">
                                                <div class="image-ratio image-ratio--square">
                                                  <Image
                                                    src={item.image}
                                                    alt=""
                                                  />
                                                </div>
                                              </div>
                                              <div class="text-wrapper text-almostwhite">
                                                <p class="copy-sm font-medium">
                                                  {item.title}
                                                </p>
                                              </div>
                                            </div>
                                            {/* Network Percentage Occupied */}
                                            <div class="network__occupied">
                                              {/* Occupied Percentage */}
                                              <div class="network__occupied--percentage">
                                                <p class="copy-sm text-lightgray">
                                                  {item.OccupiedPercentag}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div class="swiper-slide">
                              {/* Title */}
                              <div class="assets__stake--each">
                                <div class="assets__stake--each__head">
                                  {/* Network */}
                                  <div class="network">
                                    <div class="image-wrapper">
                                      <div class="image-ratio image-ratio--square">
                                        <Image src={atom} alt="" />
                                      </div>
                                    </div>
                                    <div class="text-wrapper text-lightgray">
                                      <p class="copy-lg font-bold">Cosmos</p>
                                    </div>
                                  </div>
                                </div>
                                <div class="assets__stake--each__body">
                                  <div class="set-intent text-lightgray">
                                    <p>
                                      You have not set the intent yet. Please
                                      click on the button to ‘Set Intent’
                                    </p>
                                    <div class="btn-wrapper">
                                      <a
                                        // href="#"
                                        class="btn btn--sm btn-primary"
                                        onClick={() => {
                                          setShowIntent(true);
                                        }}
                                      >
                                        Set Intent
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* All Assets */}

              <Card
                CardData={CardData}
                isWalletConnected={isWalletConnected}
                networks={networks}
                balances={balances}
              />

              {/* Unbonding Assets */}

              {/* Title */}

              <Table
                isDropdownOpen={isDropdownOpen}
                toggleFilterDropdown={toggleFilterDropdown}
                isAssetsConnected={isWalletConnected}
              />
            </div>
          </div>

          {/* Assets Ends Here */}
          {/* {/* Claim Participation Rewards Start Here */}
          <RewardClaimModel
            showModal={showModal}
            handleCloseModal={handleCloseModal}
          />

          {/* {/* Claim Participation Rewards Start Here */}
          {/* {/* Notifications Starts Here */}
          {/* {/* Toggle class [ show ] to show and hide the Notification */}
          {/* {/* Notification -> Loading */}
          <div class="notification notification--loading">
            <div class="notification__inner">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div class="transection-details__confirmation">
                <div class="transection-details__confirmation--icon">
                  <div class="loading show"></div>
                </div>
                <div class="transection-details__confirmation--text-content">
                  <h6 class="copy-normal font-demi text-lightgray">
                    Transaction Broadcasting
                  </h6>
                  <p class="copy-v-sm text-almostwhite">
                    Please wait as the transaction is approved on <br />
                    the blockchain.
                  </p>
                  <span class="transaction-hash copy-v-sm text-almostwhite text-gray font-medium mt-2">
                    Transaction Hash: &nbsp;
                    <a href="#" class="text-blue">
                      <span>7C543C4...2F31</span>
                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.29562 9.91634L10.2518 4.08301"
                          stroke="#3E73F0"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M4.29562 4.08301H10.2518V9.91634"
                          stroke="#3E73F0"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* {/* Notification -> Success */}
          <NotificationSuccessModel />
          {/* {/* Notification -> Failed */}
          <NotificationFailedModel />
          {/* {/* Notifications Ends Here */}
        </div>
      )}
    </>
  );
};

export default Assets;
