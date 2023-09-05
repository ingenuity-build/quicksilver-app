import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  setSelectedValidatorList,
  getValidatorListSuccess,
} from "@/slices/validatorList";
import { useDispatch, useSelector } from "react-redux";
import Favorite from "./favorite";

function Validator({ setStep, stakingAmount, coin }) {
  const dispatch = useDispatch();
  const validatorList = useSelector(
    (state) => state.validatorList.validatorList
  );
  const selectedValidatorList = useSelector(
    (state) => state.validatorList.selectedValidatorList
  );
  const votingPowerSum = useSelector(
    (state) => state.validatorList.votingPowerSum
  );
  const [validators, setValidators] = useState(validatorList);
  const [selectedValidator, setSelectedValidors] = useState(
    selectedValidatorList
  );
  const [activeSection, setActiveSection] = useState("validators");
  const [searchData, setSearchData] = useState("");

  const [sortingField, setSortingField] = useState("");
  const [sortType, setSortType] = useState("");

  const [showInactive, setShowInactive] = useState(true);

  const [favoriteValidator, setFavoriteValidator] = useState(
    JSON.parse(localStorage.getItem("favorite")) || []
  );

  function handleSorting(item, key) {
    if (sortingField == item) {
      if (sortType == "asc") {
        setSortType("dec");
        const tempValidator = JSON.parse(JSON.stringify(validators));
        tempValidator.sort((a, b) =>
          Number(a[key]) > Number(b[key])
            ? -1
            : Number(b[key]) > Number(a[key])
            ? 1
            : 0
        );
        setValidators(tempValidator);
      } else if (sortType == "dec") {
        setSortType("");
        setSortingField("");
        if (showInactive) {
          setValidators(validatorList);
        } else {
          const tempValidator = JSON.parse(JSON.stringify(validatorList));
          let newData = tempValidator.filter(
            (val) => val.status === "BOND_STATUS_BONDED"
          );
          setValidators(newData);
        }
      } else {
        setSortType("asc");
        setSortingField(item);
        const tempValidator = JSON.parse(JSON.stringify(validators));
        tempValidator.sort((a, b) =>
          Number(a[key]) > Number(b[key])
            ? 1
            : Number(b[key]) > Number(a[key])
            ? -1
            : 0
        );
        setValidators(tempValidator);
      }
    } else {
      setSortingField(item);
      setSortType("asc");
      const tempValidator = JSON.parse(JSON.stringify(validators));
      tempValidator.sort((a, b) =>
        Number(a[key]) > Number(b[key])
          ? 1
          : Number(b[key]) > Number(a[key])
          ? -1
          : 0
      );
      setValidators(tempValidator);
    }
  }
  function handleValidatorChange(item, index) {
    const validator = selectedValidatorList.find(
      (element) => element.name == item.name
    );
    if (validator) {
      const tempSelectedValidors = JSON.parse(
        JSON.stringify(selectedValidatorList)
      ).filter((element) => element.name != item.name);
      setSelectedValidors(tempSelectedValidors);
      dispatch(setSelectedValidatorList(tempSelectedValidors));
    } else {
      setSelectedValidors([...selectedValidatorList, item]);
      dispatch(setSelectedValidatorList([...selectedValidatorList, item]));
    }
  }
  function handleFavoriteClick(item, index) {
    let newData = favoriteValidator.find((x) => x.address === item.address);
    if (!newData) {
      setFavoriteValidator([...favoriteValidator, item]);
      localStorage.setItem(
        "favorite",
        JSON.stringify([...favoriteValidator, item])
      );
    } else {
      setFavoriteValidator((current) =>
        current.filter((element) => element.address != item.address)
      );
      const tempFav = favoriteValidator;
      localStorage.setItem(
        "favorite",
        JSON.stringify(
          tempFav.filter((element) => element.address != item.address)
        )
      );
    }
  }
  function handleRandomizeButtonClick() {
    // let newData = validators
    //   .filter((val) => val.status === "BOND_STATUS_BONDED")
    //   .map((val) => Object.assign({}, val, { active: false }));
    // setValidators([...newData].sort(() => Math.random() - 0.5));
    setValidators([...validators].sort(() => Math.random() - 0.5));
    setSortingField("");
    setSortType("");
  }
  function handleToggle() {
    const value = !showInactive;
    const tempValidator = JSON.parse(JSON.stringify(validatorList));
    if (value === true) {
      let newData = tempValidator;
      setValidators(newData);
    } else if (value === false) {
      let newData = tempValidator.filter(
        (val) => val.status === "BOND_STATUS_BONDED"
      );
      setValidators(newData);
    }
    setShowInactive(!showInactive);
  }
  function isFavorite(item) {
    const favorite = JSON.parse(localStorage.getItem("favorite")) || [];
    const validator = favorite.find((element) => element.name == item.name);
    if (validator) {
      return true;
    } else {
      return false;
    }
  }
  function isValidatorSelected(item) {
    const validator = selectedValidatorList.find(
      (element) => element.name == item.name
    );
    if (validator) {
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    if (searchData) {
      let tempValidator = [];
      if (!showInactive) {
        tempValidator = JSON.parse(JSON.stringify(validatorList));
        tempValidator = tempValidator.filter(
          (val) => val.status === "BOND_STATUS_BONDED"
        );
      } else {
        tempValidator = JSON.parse(JSON.stringify(validatorList));
      }
      const tempValidator2 = tempValidator.filter((item, index) => {
        return item.name.toLowerCase().includes(searchData.toLowerCase());
      });
      setValidators(tempValidator2);
    } else {
      if (showInactive) {
        setValidators(validatorList);
      } else {
        let tempValidator = JSON.parse(JSON.stringify(validatorList));
        tempValidator = tempValidator.filter(
          (val) => val.status === "BOND_STATUS_BONDED"
        );
        setValidators(tempValidator);
      }
    }
  }, [searchData]);

  useEffect(() => {
    handleToggle();
  }, []);

  return (
    <>
      {/* Staking Start here */}
      <div class="staking-flow">
        <div class="container">
          <div class="staking-flow__header">
            <div
              class="go-back"
              onClick={() => {
                setStep(1);
              }}
            >
              <a>Back</a>
            </div>
            <div class="staking-flow__header--title text-lightgray">
              <h5
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                data-bs-html="true"
                title="Quicksilver is the only liquid staking protocol <br> where you can choose your preferred validators."
              >
                Validator Selection
              </h5>
            </div>
          </div>
          <div class="staking-flow__body">
            <div class="staking-flow__body--filters">
              <div class="row align-items-center gx-0">
                <div class="col-lg-6">
                  <div class="staking-flow__body--filters__tabs">
                    {/* Tabs Filters [ Show Validators / Favourites ] [ If you are using Loop, replace (_1) (_2) with index respectively ] */}
                    <ul class="nav nav-tabs">
                      <li class="nav-item">
                        <button
                          class={`nav-link ${
                            activeSection == "validators" && "active"
                          }`}
                          id="staking-flow_1-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#staking-flow_1"
                          type="button"
                          role="tab"
                          aria-controls="staking-flow_1"
                          aria-selected="true"
                          onClick={() => {
                            setActiveSection("validators");
                          }}
                        >
                          All Validators
                        </button>
                      </li>
                      <li class="nav-item">
                        <button
                          class={`nav-link ${
                            activeSection == "favorites" && "active"
                          }`}
                          id="staking-flow_2-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#staking-flow_2"
                          type="button"
                          role="tab"
                          aria-controls="staking-flow_2"
                          aria-selected="false"
                          onClick={() => {
                            setActiveSection("favorites");
                          }}
                        >
                          Favourites
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class={`staking-flow__body--filters__additional`}>
                    {/* Checkbox to toggle Inactive/Active Validators */}
                    <div class="show-inactive-validators text-almostwhite">
                      <div class="form-check">
                        <input
                          id="toggleValidators"
                          type="checkbox"
                          class="form-check-toggle"
                          checked={showInactive}
                          onClick={handleToggle}
                          // onClick={(e) => {
                          //   handleToggle(e.tget.valuear);
                          // }}
                        />
                        <label for="toggleValidators">
                          Show inactive validators
                        </label>
                      </div>
                    </div>
                    {/* Randomizer */}
                    <div
                      class={`randomizer ${
                        activeSection != "validators" ? "hide-randomizer" : ""
                      }`}
                      onClick={handleRandomizeButtonClick}
                    >
                      <a href="#">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_90_1746)">
                            <path
                              d="M16.707 9.80175L7.95698 19.1768C7.86426 19.2757 7.74186 19.3418 7.60827 19.3651C7.47467 19.3884 7.33712 19.3676 7.21638 19.3059C7.09564 19.2441 6.99825 19.1448 6.93892 19.0229C6.87958 18.9009 6.86152 18.763 6.88745 18.6299L8.03276 12.901L3.53042 11.2103C3.43373 11.1742 3.3475 11.1146 3.27944 11.037C3.21138 10.9594 3.16361 10.8661 3.1404 10.7655C3.11718 10.6649 3.11925 10.5601 3.14641 10.4605C3.17357 10.3609 3.22498 10.2696 3.29605 10.1947L12.046 0.819721C12.1388 0.720764 12.2612 0.654652 12.3948 0.631359C12.5284 0.608067 12.6659 0.628858 12.7867 0.690597C12.9074 0.752335 13.0048 0.851671 13.0641 0.973613C13.1234 1.09555 13.1415 1.23349 13.1156 1.3666L11.9671 7.10175L16.4695 8.79003C16.5655 8.82645 16.651 8.88594 16.7185 8.96326C16.7861 9.04057 16.8335 9.13334 16.8567 9.23334C16.8798 9.33335 16.878 9.43753 16.8514 9.53666C16.8247 9.6358 16.7741 9.72684 16.7039 9.80175H16.707Z"
                              fill="#CDCDCD"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_90_1746">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Randomizer
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Tabs Content [ Show Validators / Favourites ] [ If you are using Loop, replace (_1) (_2) with index respectively ] */}
            <div class="tab-content__staking-flow tab-content">
              {activeSection == "validators" ? (
                <div
                  class="staking_tab tab-pane fade show active"
                  id="staking-flow_1"
                  role="tabpanel"
                  aria-labelledby="staking-flow_1-tab"
                >
                  <div class="staking-flow__body--all">
                    <div class="staking-flow__body--all__search-and-stats">
                      <div class="row gx-0 align-items-center">
                        <div class="col-lg-6">
                          {/* Search Input */}
                          <div class="search-wrapper">
                            <input
                              type="text"
                              class="form-input-search"
                              placeholder="Search Validator"
                              value={searchData}
                              onChange={(e) => {
                                setSearchData(e.target.value);
                              }}
                            />
                            <div class="search-icon">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z"
                                  stroke="#FBFBFB"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M15.7508 15.7508L12.4883 12.4883"
                                  stroke="#FBFBFB"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                            <div
                              class={`reset-icon ${searchData && "show"}`}
                              onClick={() => {
                                setSearchData("");
                              }}
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.5 4.5L4.5 13.5"
                                  stroke="#FF8500"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M4.5 4.5L13.5 13.5"
                                  stroke="#FF8500"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          {/* Number of Validators */}
                          <div class="stats text-end">
                            <p>
                              Showing: <span>{validators.length}</span>{" "}
                              validators
                            </p>
                            {/* <p>
                              Showing: <span>23,453</span> validators
                            </p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="staking-flow__body--all__validators">
                      <div class="table text-lightgray">
                        <div class="table__head">
                          {/* Row # 1 */}
                          <div class="table__head--row">
                            <div class="table__head--col">
                              <p>Validator</p>
                            </div>
                            {/* Add class [ sort-it ] sort it on the first click and */}
                            {/* Add class [ sort-it--down ] or [ sort-it--up ] along with it  */}
                            <div
                              class={`table__head--col table__head--col-has-tooltip ${
                                sortingField == "Voting Power"
                                  ? sortType == "asc"
                                    ? "sort-it sort-it--down"
                                    : "sort-it sort-it--up"
                                  : ""
                              }`}
                            >
                              <p
                                style={{ cursor: "pointer" }}
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                data-bs-html="true"
                                title="TVL is equal to the USD value of <br> all assets held by the protocol."
                                onClick={() => {
                                  handleSorting("Voting Power", "votingPower");
                                }}
                              >
                                Voting Power
                              </p>
                            </div>
                            <div
                              class={`table__head--col table__head--col-has-tooltip ${
                                sortingField == "Commission"
                                  ? sortType == "asc"
                                    ? "sort-it sort-it--down"
                                    : "sort-it sort-it--up"
                                  : ""
                              }`}
                            >
                              <p
                                style={{ cursor: "pointer" }}
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                data-bs-html="true"
                                title="Bonus QCK rewards boost for your <br> validator choice, based on decentralisation, <br> performance and governance participation."
                                onClick={() => {
                                  handleSorting("Commission", "commission");
                                }}
                              >
                                Commission
                              </p>
                            </div>
                            <div
                              class={`table__head--col table__head--col-has-tooltip ${
                                sortingField == "Voting Record"
                                  ? sortType == "asc"
                                    ? "sort-it sort-it--down"
                                    : "sort-it sort-it--up"
                                  : ""
                              }`}
                            >
                              <p
                                style={{ cursor: "pointer" }}
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                data-bs-html="true"
                                title="Number of proposals where <br> the validator has voted."
                                onClick={() => {
                                  handleSorting("Voting Record");
                                }}
                              >
                                VOTING RECORD
                              </p>
                            </div>
                            <div
                              class={`table__head--col table__head--col-has-tooltip ${
                                sortingField == "PR Score"
                                  ? sortType == "asc"
                                    ? "sort-it sort-it--down"
                                    : "sort-it sort-it--up"
                                  : ""
                              }`}
                            >
                              <p
                                style={{ cursor: "pointer" }}
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                data-bs-html="true"
                                title="Sum of self-bonded and <br> delegated tokens."
                                onClick={() => {
                                  handleSorting("PR Score");
                                }}
                              >
                                PR SCORE
                              </p>
                            </div>
                          </div>
                        </div>
                        {validators && validators.length ? (
                          <div class="table__body">
                            {validators.map((item, index) => {
                              return (
                                <div
                                  class="table__body--row"
                                  key={item.name + index}
                                >
                                  {/* Validator */}
                                  <div class="table__body--col">
                                    <div class="validators__intro">
                                      {/* Check this Validator */}
                                      <div class="validator-check">
                                        <input
                                          type="checkbox"
                                          class="form-check-input outline-orange"
                                          checked={isValidatorSelected(item)}
                                          onClick={() => {
                                            handleValidatorChange(item, index);
                                          }}
                                          //   checked
                                        />
                                      </div>
                                      {/* Make this Validator Favourite */}
                                      <div class="make-it-favourite">
                                        <input
                                          id={`favourite-${index + 1}`}
                                          type="checkbox"
                                          checked={isFavorite(item)}
                                          onClick={() => {
                                            handleFavoriteClick(item, index);
                                          }}
                                        />
                                        <label for={`favourite-${index + 1}`}>
                                          <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M11.889 7.80286L11.9979 8.15517H12.3667H18.5101L13.4984 11.9461L13.2188 12.1576L13.3223 12.4925L15.2257 18.6493L10.3041 14.8789L10 14.646L9.69593 14.8789L4.76844 18.6538L6.64476 12.5257L6.74644 12.1936L6.47074 11.9824L1.47486 8.15517H7.63333H8.0021L8.11103 7.80286L10 1.69282L11.889 7.80286Z"
                                              fill="currentColor"
                                              stroke="#FFCE31"
                                            />
                                          </svg>
                                        </label>
                                      </div>
                                      {/* Validator count number */}
                                      <div class="count px-2">
                                        <p class="copy-sm">{index + 1}</p>
                                      </div>
                                      {/* Validator Image */}
                                      <div class="image-wrapper">
                                        <div class="image-ratio image-ratio--square">
                                          <Image
                                            src={item.img}
                                            alt={item.name}
                                          />
                                        </div>
                                      </div>
                                      {/* Validator Name */}
                                      <div class="text-wrapper">
                                        <p class="copy-normal">{item.name}</p>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Voting Power */}
                                  <div class="table__body--col">
                                    <div class="voting-power">
                                      <p class="copy-normal">
                                        {Number(
                                          item.votingPower
                                        ).toLocaleString("en-US")}
                                      </p>
                                      <span>
                                        {(
                                          (Number(item.votingPower) /
                                            Number(votingPowerSum)) *
                                          100
                                        ).toFixed(2)}{" "}
                                        %
                                      </span>
                                      {/* <span>{item.votingPowerDiff}</span> */}
                                    </div>
                                  </div>
                                  {/* Commisstion */}
                                  <div class="table__body--col">
                                    <p class="copy-sm">
                                      {Number(item.commission).toFixed(2)} %
                                    </p>
                                  </div>
                                  {/* Voting Record */}
                                  <div class="table__body--col">
                                    <div class="tag tag-gray">
                                      {item.votingRecord}
                                    </div>
                                  </div>
                                  {/* PR Score */}
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
                          </div>
                        ) : (
                          <div class="table__body">
                            <div class="no-result-found show">
                              <div class="no-result-found__text-wrapper">
                                <h6 class="font-demi text-lightgray">
                                  No Results Found
                                </h6>
                                <p class="copy-sm">
                                  Try changing your search term.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Favorite
                  showInactive={showInactive}
                  handleValidatorChange={handleValidatorChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Staking Ends here */}

      {/* Stake Allocation [ Fixed ] Start here */}
      <div class="stake-allocation">
        <div class="container">
          <div class="stake-allocation__inner">
            <div class="row align-items-center">
              <div class="col-lg-9">
                <div class="stake-allocation__details">
                  <div class="stake-allocation__text-content">
                    {/* Network */}
                    <div class="network">
                      <div class="network__inner text-lightgray">
                        <h5 class="font-demi">
                          <span>{stakingAmount}</span>&nbsp; {coin.denom}
                          <a href="#">
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
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </a>
                        </h5>
                      </div>
                    </div>
                    {/* Network Validator Count */}
                    <div class="network__validators text-almostwhite">
                      {/* Selected Validator Count */}
                      <h6 class="font-demi text-lightgray">
                        <span class="selected-validators__count">
                          {selectedValidatorList.length}
                        </span>
                        /8 Validators Selected
                      </h6>
                      {/* Selected Validator Instrunction */}
                      <span class="selected-validators__instructions copy-v-sm">
                        Select between <span>1</span> to <span>8</span>{" "}
                        validators.
                      </span>
                      {/* [ Error ] [ Exceeds 8 ] */}
                      {/* Done */}
                      <span
                        class={`error-message error-message__exceeds-no-of-validators ${
                          selectedValidatorList.length > 8 && "show"
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6 5V7"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6 9H6.005"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        Exceeds Max Number of Validators
                      </span>
                      {/* [ Error ] [ Exceeds 100% stake allocation ] */}
                      <span class="error-message error-message__exceeds-allocation">
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6 5V7"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6 9H6.005"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        Exceeds Stake Allocation %
                      </span>
                    </div>
                  </div>
                  <div class="stake-allocation__images-validators">
                    {/* Selected Validators Images and Tooltip on Hovers */}
                    <div class="selected-validators__info">
                      {selectedValidatorList.map((item, index) => {
                        return (
                          <div
                            class="selected-validators__info--each selected-validators__info--each-1"
                            key={item.name + index}
                          >
                            {/* Image for each Validator */}
                            <div class="image-ratio image-ratio--square">
                              <Image src={item.img} alt="lavender2" />
                            </div>
                            {/* Tooltip for each Validator */}
                            <div class="selected-validators__info--each__tooltip">
                              <div class="selected-validators__info--each__tooltip-head">
                                <div class="network">
                                  <div class="image-wrapper">
                                    <div class="image-ratio image-ratio--square">
                                      <Image src={item.img} alt="lavender2" />
                                    </div>
                                  </div>
                                  <div class="text-wrapper text-lightgray">
                                    <p class="copy-normal font-demi">
                                      {item.name}
                                    </p>
                                  </div>
                                </div>
                                <div class="network-badge">
                                  <div class="badge badge-sm badge-level-1">
                                    {item.PRScore}
                                  </div>
                                </div>
                              </div>
                              <div class="selected-validators__info--each__tooltip-body">
                                <ul class="list-reset">
                                  <li>
                                    <p class="th">Commission</p>
                                    <p class="td">
                                      {Number(item.commission).toFixed(2)}
                                    </p>
                                  </li>
                                  <li>
                                    <p class="th">Voting Power</p>
                                    <p class="td">
                                      {Number(item.votingPower).toLocaleString(
                                        "en-US"
                                      )}
                                    </p>
                                  </li>
                                  <li>
                                    <p class="th">Voting Record</p>
                                    <p class="td">{item.votingRecord}</p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3">
                {/* Btn to go next */}
                <div class="btn-wrapper text-end">
                  {/* <a href="#" class="btn btn-primary disabled">Next</a> */}
                  <button
                    type="submit"
                    class={`btn btn-primary ${
                      !selectedValidator.length ? "disabled" : ""
                    } ${selectedValidator.length > 8 ? "disabled" : ""}`}
                    onClick={() => {
                      setStep(3);
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
            {/* Additional Text added at the bottom of Stake Allocation */}
            <div class="stake-allocation__text-wrapper text-almostwhite mt-3 d-none">
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
      {/* Stake Allocation [ Fixed ] Ends here */}
    </>
  );
}

export default Validator;
