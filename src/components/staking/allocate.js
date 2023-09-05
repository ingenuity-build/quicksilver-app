import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StakingSummary from "./stakingSummaryModal";
import TransactionStatusModal from "./transactionStatusModal";
import { SigningStargateClient } from "@cosmjs/stargate";
import { useChain, useWalletClient } from "@cosmos-kit/react";
import { cosmos } from "juno-network";
import { selectedNetworkSelector } from "@/slices/selectedNetworks";
let { bech32 } = require("bech32");

function Allocate({ setStep, stakingAmount, coin }) {
  const selectedValidatorList = useSelector(
    (state) => state.validatorList.selectedValidatorList
  );

  const votingPowerSum = useSelector(
    (state) => state.validatorList.votingPowerSum
  );

  let selectedNetwork = useSelector(selectedNetworkSelector);
  selectedNetwork = selectedNetwork?.selectedNetwork?.value || {};

  const chainName =
    localStorage.getItem("selected-chain") || "theta-testnet-001";

  const { getSigningStargateClient, address, status, getRpcEndpoint } =
    useChain(chainName);

  const sendTokens = (getSigningStargateClient, address) => {
    return async () => {
      const stargateClient = await getSigningStargateClient();
      if (!stargateClient || !address) {
        console.error("stargateClient undefined or address undefined.");
        return;
      }

      const { send } = cosmos.bank.v1beta1.MessageComposer.withTypeUrl;

      const msg = send({
        amount: [
          {
            denom: coin?.minimal_denom,
            amount: String(stakingAmount * Math.pow(10, 6)),
          },
        ],
        fromAddress: address,
        toAddress: selectedNetwork
          ? selectedNetwork.deposit_address.address
          : address,
      });

      const fee = {
        amount: [
          {
            denom: coin?.minimal_denom,
            amount: String(stakingAmount * Math.pow(10, 6)),
          },
        ],
        gas: "86364",
      };
      let memo = [];
      selectedValidator.map((item) => {
        memo = memo.concat(
          addValidator(item.address, item.stakingAllocation / 100)
        );
      });
      memo = Buffer.from([0x02, memo.length, ...Buffer.from(memo)]).toString(
        "base64"
      );
      try {
        const response = await stargateClient.signAndBroadcast(
          address,
          [msg],
          fee,
          memo
        );
        console.log("response", response);
        return response;
        // setResp(JSON.stringify(response, null, 2));
      } catch (error) {
        console.log("error", error);
      }
    };
  };

  const [selectedValidator, setSelectedValidors] = useState(
    selectedValidatorList
  );

  const [totalStake, setTotalStake] = useState(100);
  const [autoRegulate, setAutoRegulate] = useState(true);

  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const [transactionHash, setTransactionHash] = useState("");

  function calculateSum() {
    const sum = selectedValidator.reduce((total, item) => {
      return total + Number(item.stakingAllocation);
    }, 0);
    setTotalStake(sum);
  }

  function handleChange(val, name, index) {
    if (val < 0) {
      val = 0;
    }
    if (val > 100) {
      val = 100;
    }
    const newObj = selectedValidator[index];
    newObj.stakingAllocation = val;
    setSelectedValidors([
      ...selectedValidator.slice(0, index),
      newObj,
      ...selectedValidator.slice(index + 1),
    ]);
    calculateSum();
  }

  function handleBlur(val, name, index) {
    console.log("val", typeof val);
    const newObj = selectedValidator[index];
    newObj.stakingAllocation = Number(val).toFixed(2);
    setSelectedValidors([
      ...selectedValidator.slice(0, index),
      newObj,
      ...selectedValidator.slice(index + 1),
    ]);
  }

  function toggleLock(index) {
    const newObj = selectedValidator[index];
    newObj.isLock = !newObj.isLock;
    setSelectedValidors([
      ...selectedValidator.slice(0, index),
      newObj,
      ...selectedValidator.slice(index + 1),
    ]);
    var lockedSum = 0;
    var unlockedSum = 0;
    var unlockCount = 0;
    var lockCount = 0;
    var indices = [];
    if (newObj.isLock && autoRegulate) {
      selectedValidator.map((item, index) => {
        if (item.isLock) {
          lockCount++;
          lockedSum = lockedSum + Number(item.stakingAllocation);
        } else {
          indices.push(index);
          unlockCount++;
          unlockedSum = unlockedSum + Number(item.stakingAllocation);
        }
      });
      if (unlockCount) {
        const val = ((100 - lockedSum) / unlockCount).toFixed(2);
        let indicesIndex = 0;
        setSelectedValidors(
          selectedValidator.map((item, index) => {
            if (index == indices[indicesIndex]) {
              indicesIndex++;
              return { ...item, stakingAllocation: val };
            } else {
              return { ...item };
            }
          })
        );
        const sum = lockedSum + val * unlockCount;
        setTotalStake(sum);
      }
    }
  }

  async function confirmStaking() {
    const val = sendTokens(getSigningStargateClient, address);
    console.log("val", val);
    try {
      setIsLoading(true);
      setShowSummaryModal(false);
      setShowStatusModal(true);
      const broadCastResult = await val();
      console.log("val 2", broadCastResult);
      if (broadCastResult.code === 0) {
        setIsLoading(false);
        setIsSuccess(true);
        setTransactionHash(broadCastResult.transactionHash);
      } else {
        console.log(broadCastResult);
        setIsLoading(false);
        setIsSuccess(false);
        setError("The transaction failed! Please try again.");
      }
    } catch (err) {
      setIsLoading(false);
      setIsSuccess(false);
      setShowSummaryModal(false);
      setShowStatusModal(true);
      console.log(err);
      setError("The transaction failed! Please try again.");
    }
  }

  function addValidator(valAddr, weight) {
    let addr = bech32?.decode(valAddr);
    let converted = bech32?.fromWords(addr.words);
    converted?.unshift(valToByte(weight));
    return converted;
  }

  function valToByte(val) {
    if (val > 1) {
      val = 1;
    }
    if (val < 0) {
      val = 0;
    }
    return Math.abs(val * 200);
  }

  useEffect(() => {
    const val = (100 / selectedValidator.length).toFixed(2);
    setSelectedValidors(
      selectedValidator.map((item) => {
        return { ...item, stakingAllocation: val };
      })
    );
    // const sum = selectedValidator.reduce((total, item) => {
    //   return total + item.stakingAllocation;
    // }, 0);
    // console.log("SUMMM", sum);
    setTotalStake(val * selectedValidator.length);
  }, []);

  return (
    <div>
      {/*Staking Start Here */}
      <div class="staking-flow staking-flow--allocate-stake">
        <div class="container">
          <div class="staking-flow__header">
            <div
              class="go-back"
              onClick={() => {
                setStep(2);
              }}
            >
              <a>Back</a>
            </div>
            <div class="staking-flow__header--title text-almostwhite">
              <h5
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                data-bs-html="true"
                title="Stake is allocated through a process called Signaling Intent. <br> Each epoch, the aggregate intent of all qAsset holders for a <br> given chain are calculated and used to determine how the <br> Quicksilver protocol should rebalance their delegated tokens."
              >
                Allocate Stake
              </h5>
            </div>
          </div>
          <div class="staking-flow__body">
            {/*Allocate Stake -> Filters */}
            <div class="staking-flow__body--filters">
              <div class="row align-items-center gx-0">
                <div class="col-lg-6">
                  <div class="staking-flow__body--text text-lightgray">
                    <p class="copy-normal font-medium">
                      Selected Validators ( {selectedValidator.length} selected
                      )
                    </p>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="staking-flow__body--filters__additional">
                    {/*Checkbox to toggle Inactive/Active Validators */}
                    <div class="show-inactive-validators text-almostwhite">
                      <div class="form-check">
                        <input
                          id="toggleValidators"
                          type="checkbox"
                          class="form-check-toggle"
                          checked={autoRegulate}
                          onChange={() => {
                            setAutoRegulate(!autoRegulate);
                          }}
                        />
                        <label
                          for="toggleValidators"
                          class="text-lightgray has-text-decoration"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-html="true"
                          title="Set to OFF to manually determine <br> each input field for stake allocation."
                        >
                          Auto-regulate Stake Allocation Fields
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*Allocate Stake -> Table */}
            <div class="staking-flow__body--all">
              <div class="staking-flow__body--all__validators">
                <div class="table text-lightgray">
                  <div class="table__head">
                    {/*Row # 1 */}
                    <div class="table__head--row">
                      {/*Leave it blank for no value */}
                      <div class="table__head--col">
                        <p></p>
                      </div>
                      <div class="table__head--col table__head--col-has-tooltip">
                        <p
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-html="true"
                          title="Use the input fields to signal your intent to the protocol <br> for how you would like your stake to be allocated at the <br> next epoch. All users staking intent is aggregated and <br> the stakes redelegated to match the aggregate intent."
                        >
                          STAKE ALLOCATION %
                        </p>
                      </div>
                      {/*Add class [ sort-it ] sort it on the first click and */}
                      {/*Add class [ sort-it--down ] or [ sort-it--up ] along with it  */}
                      <div class="table__head--col table__head--col-has-tooltip">
                        <p
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-html="true"
                          title="TVL is equal to the USD value of <br> all assets held by the protocol."
                        >
                          Voting Power
                        </p>
                      </div>
                      <div class="table__head--col table__head--col-has-tooltip">
                        <p
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-html="true"
                          title="Bonus QCK rewards boost for your <br> validator choice, based on decentralisation, <br> performance and governance participation."
                        >
                          Commission
                        </p>
                      </div>
                      <div class="table__head--col table__head--col-has-tooltip">
                        <p
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-html="true"
                          title="Number of proposals where <br> the validator has voted."
                        >
                          VOTING RECORD
                        </p>
                      </div>
                      <div class="table__head--col table__head--col-has-tooltip">
                        <p
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-html="true"
                          title="Sum of self-bonded and <br> delegated tokens."
                        >
                          PR SCORE
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="table__body">
                    {/*Row # 1 */}
                    {selectedValidator.map((item, index) => {
                      return (
                        <div class="table__body--row" key={item.name + index}>
                          {/*Validator */}
                          <div class="table__body--col">
                            <div class="validators__intro">
                              {/*Validator count number */}
                              <div class="count px-2">
                                <p class="copy-sm">{index + 1}</p>
                              </div>
                              {/*Validator Image */}
                              <div class="image-wrapper">
                                <div class="image-ratio image-ratio--square">
                                  <Image src={item.img} alt={item.name} />
                                </div>
                              </div>
                              {/*Validator Name */}
                              <div class="text-wrapper">
                                <p class="copy-normal">{item.name}</p>
                              </div>
                            </div>
                          </div>
                          {/*Stake Allocation */}
                          {/*
                    ------ Add class [ unlocked ] if it is unlock 
                    ------ Add class [ locked ] if it is unlock 

                    Note: Adding d-none class to anything will hide it...
                    */}
                          <div class="table__body--col unlocked">
                            <div class="stake-allocation-percentage">
                              {/*Input */}
                              <input
                                type="number"
                                class="form-control set-stake-allocation"
                                placeholder={item.stakingAllocation || 0.0}
                                value={item?.stakingAllocation}
                                disabled={item.isLock && autoRegulate}
                                onChange={(e) => {
                                  console.log(e);
                                  var t = e.target.value;
                                  e.target.value =
                                    t.indexOf(".") >= 0
                                      ? t.slice(0, t.indexOf(".") + 3)
                                      : t;
                                  handleChange(
                                    e.target.value,
                                    item.name,
                                    index
                                  );
                                }}
                                onBlur={(e) => {
                                  handleBlur(e.target.value, item.name, index);
                                }}
                              />
                              {autoRegulate && (
                                <>
                                  {/*Unlock Icon */}
                                  <div
                                    class={`${
                                      item.isLock
                                        ? "stake-allocation-percentage__lock"
                                        : "stake-allocation-percentage__unlock"
                                    } `}
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="bottom"
                                    data-bs-html="true"
                                    title="Lock to set stake allocation."
                                    onClick={() => {
                                      toggleLock(index);
                                    }}
                                  >
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_260_465)">
                                        <path
                                          d="M19.5 8.25H4.5C4.08579 8.25 3.75 8.58579 3.75 9V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V9C20.25 8.58579 19.9142 8.25 19.5 8.25Z"
                                          fill="#171717"
                                          stroke="#FF8500"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M11.89 15.7801C12.9338 15.7801 13.78 14.9339 13.78 13.89C13.78 12.8462 12.9338 12 11.89 12C10.8462 12 10 12.8462 10 13.89C10 14.9339 10.8462 15.7801 11.89 15.7801Z"
                                          fill="#FF8500"
                                        />
                                        <path
                                          d="M8.25 8.25V5.25C8.25 4.25544 8.64509 3.30161 9.34835 2.59835C10.0516 1.89509 11.0054 1.5 12 1.5C13.8141 1.5 15.4022 2.78813 15.75 4.5"
                                          stroke="#FF8500"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_260_465">
                                          <rect
                                            width="24"
                                            height="24"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                  {/*Lock Icon */}
                                  <div
                                    class={`${
                                      item.isLock
                                        ? "stake-allocation-percentage__unlock"
                                        : "stake-allocation-percentage__lock"
                                    } `}
                                    onClick={() => {
                                      toggleLock(index);
                                    }}
                                  >
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clipPath="url(#clip0_90_3157)">
                                        <path
                                          d="M19.5 8.25H4.5C4.08579 8.25 3.75 8.58579 3.75 9V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V9C20.25 8.58579 19.9142 8.25 19.5 8.25Z"
                                          fill="#FF8500"
                                          stroke="#FF8500"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M11.89 15.7801C12.9338 15.7801 13.78 14.9339 13.78 13.89C13.78 12.8462 12.9338 12 11.89 12C10.8462 12 10 12.8462 10 13.89C10 14.9339 10.8462 15.7801 11.89 15.7801Z"
                                          fill="#171717"
                                        />
                                        <path
                                          d="M8.25 8.25V5.25C8.25 4.25544 8.64509 3.30161 9.34835 2.59835C10.0516 1.89509 11.0054 1.5 12 1.5C12.9946 1.5 13.9484 1.89509 14.6517 2.59835C15.3549 3.30161 15.75 4.25544 15.75 5.25V8.25"
                                          stroke="#FF8500"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_90_3157">
                                          <rect
                                            width="24"
                                            height="24"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          {/*Voting Power */}
                          <div class="table__body--col">
                            <div class="voting-power">
                              <p class="copy-normal">{item.votingPower}</p>
                              {/* <span>{item.votingPowerDiff}</span> */}
                              <span>
                                {(
                                  (Number(item.votingPower) /
                                    Number(votingPowerSum)) *
                                  100
                                ).toFixed(2)}{" "}
                                %
                              </span>
                            </div>
                          </div>
                          {/*Commisstion */}
                          <div class="table__body--col">
                            <p class="copy-sm">
                              {Number(item.commission).toFixed(2)} %
                            </p>
                          </div>
                          {/*Voting Record */}
                          <div class="table__body--col">
                            <div class="tag tag-gray">{item.votingRecord}</div>
                          </div>
                          {/*PR Score */}
                          <div class="table__body--col">
                            <div
                              class="badge badge-level-1"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              data-bs-html="true"
                              title='<p class="text-uppercase mb-1">PR SCORE: <span>0</span> – <span>10</span></p><p><i>Stake with validator with higher PR <br> Score to earn more rewards.</i></p>'
                            >
                              {item.PRScore}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/*if No Result Found, add class [ show ] to this */}
                    <div class="no-result-found">
                      <div class="no-result-found__text-wrapper">
                        <h6 class="font-demi text-lightgray">
                          No Results Found
                        </h6>
                        <p class="copy-sm">Try changing your search term.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Staking Ends Here */}

      {/*Stake Allocation [ Fixed ] Start Here */}
      <div class="stake-allocation">
        <div class="container">
          <div class="stake-allocation__inner">
            <div class="row align-items-center">
              <div class="col-lg-9">
                <div class="stake-allocation__details">
                  <div class="stake-allocation__text-content">
                    {/*Network */}
                    <div class="network">
                      <div class="network__inner text-lightgray">
                        <h5 class="font-demi">
                          <span>{stakingAmount}</span>&nbsp; {coin.denom}
                          <a
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#modal_edit-stake-summary"
                            role="button"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.1665 2.49895C14.3854 2.28008 14.6452 2.10646 14.9312 1.98801C15.2171 1.86956 15.5236 1.80859 15.8332 1.80859C16.1427 1.80859 16.4492 1.86956 16.7352 1.98801C17.0211 2.10646 17.281 2.28008 17.4998 2.49895C17.7187 2.71782 17.8923 2.97766 18.0108 3.26362C18.1292 3.54959 18.1902 3.85609 18.1902 4.16562C18.1902 4.47515 18.1292 4.78164 18.0108 5.06761C17.8923 5.35358 17.7187 5.61341 17.4998 5.83228L6.24984 17.0823L1.6665 18.3323L2.9165 13.749L14.1665 2.49895Z"
                                stroke="#FF8500"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        </h5>
                      </div>
                    </div>
                    {/*Network Validator Count */}
                    <div class="network__validators text-almostwhite">
                      {/*Selected Validator Count */}
                      <h6 class="font-demi text-lightgray">
                        <span class="selected-allocated-percentage">
                          {totalStake}%
                        </span>{" "}
                        stake allocated
                      </h6>
                      {/*Selected Validator Instrunction */}
                      <span class="selected-validators__instructions copy-v-sm d-none">
                        Select between <span>1</span> to <span>8</span>{" "}
                        validators.
                      </span>
                      {/*[ Error ] [ Exceeds 8 ] */}
                      <span class="error-message error-message__exceeds-no-of-validators">
                        <svg
                          width="12"
                          height="13"
                          viewBox="0 0 12 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.14489 2.42961L0.909888 9.49961C0.822572 9.65083 0.776372 9.82226 0.775883 9.99687C0.775394 10.1715 0.820634 10.3432 0.907102 10.4949C0.993569 10.6466 1.11825 10.773 1.26874 10.8615C1.41923 10.9501 1.59029 10.9977 1.76489 10.9996H10.2349C10.4095 10.9977 10.5805 10.9501 10.731 10.8615C10.8815 10.773 11.0062 10.6466 11.0927 10.4949C11.1791 10.3432 11.2244 10.1715 11.2239 9.99687C11.2234 9.82226 11.1772 9.65083 11.0899 9.49961L6.85489 2.42961C6.76575 2.28267 6.64025 2.16117 6.49049 2.07686C6.34072 1.99254 6.17176 1.94824 5.99989 1.94824C5.82802 1.94824 5.65905 1.99254 5.50929 2.07686C5.35953 2.16117 5.23402 2.28267 5.14489 2.42961Z"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 5V7"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 9H6.005"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Exceeds Max Number of Validators
                      </span>
                      {/*[ Error ] [ Exceeds 100% stake allocation ] */}
                      <span
                        class={`error-message error-message__exceeds-allocation ${
                          totalStake > 100 && "show"
                        }`}
                      >
                        <svg
                          width="12"
                          height="13"
                          viewBox="0 0 12 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.14489 2.42961L0.909888 9.49961C0.822572 9.65083 0.776372 9.82226 0.775883 9.99687C0.775394 10.1715 0.820634 10.3432 0.907102 10.4949C0.993569 10.6466 1.11825 10.773 1.26874 10.8615C1.41923 10.9501 1.59029 10.9977 1.76489 10.9996H10.2349C10.4095 10.9977 10.5805 10.9501 10.731 10.8615C10.8815 10.773 11.0062 10.6466 11.0927 10.4949C11.1791 10.3432 11.2244 10.1715 11.2239 9.99687C11.2234 9.82226 11.1772 9.65083 11.0899 9.49961L6.85489 2.42961C6.76575 2.28267 6.64025 2.16117 6.49049 2.07686C6.34072 1.99254 6.17176 1.94824 5.99989 1.94824C5.82802 1.94824 5.65905 1.99254 5.50929 2.07686C5.35953 2.16117 5.23402 2.28267 5.14489 2.42961Z"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 5V7"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 9H6.005"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Exceeds Stake Allocation %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3">
                {/*Btn to go next */}
                <div class="btn-wrapper text-end">
                  {/*<a href="#" class="btn btn-primary disabled">Next</a> */}
                  <button
                    type="submit"
                    class={`btn btn-primary ${
                      (totalStake > 100 && "disabled") ||
                      (totalStake < 99 && "disabled")
                    }`}
                    data-bs-toggle="modal"
                    data-bs-target="#modal_stake-summary"
                    role="button"
                    onClick={() => {
                      setShowSummaryModal(!showSummaryModal);
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
            {/*Additional Text added at the bottom of Stake Allocation */}
            <div class="stake-allocation__text-wrapper text-almostwhite mt-3">
              <p class="copy-sm">
                Stake is allocated through a process called Signaling Intent.
                Each epoch, the aggregate intent of all qAsset holders for a
                given chain are calculated and used to determine how the
                Quicksilver protocol should rebalance their delegated tokens.
                Tokens staked through the Quicksilver protocol are subject to
                the same unstaking period as the native chain.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*Stake Allocation [ Fixed ] Ends Here */}

      {showSummaryModal && (
        <StakingSummary
          setShowSummaryModal={setShowSummaryModal}
          selectedValidator={selectedValidator}
          confirmStaking={confirmStaking}
          coin={coin}
          stakingAmount={stakingAmount}
        />
      )}
      {showStatusModal && (
        <TransactionStatusModal
          setShowStatusModal={setShowStatusModal}
          stakingAmount={stakingAmount}
          isLoading={isLoading}
          error={error}
          isSuccess={isSuccess}
          transactionHash={transactionHash}
        />
      )}
    </div>
  );
}

export default Allocate;
