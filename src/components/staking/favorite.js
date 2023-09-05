import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  setSelectedValidatorList,
  getValidatorListSuccess,
} from "@/slices/validatorList";
import { useDispatch, useSelector } from "react-redux";

function Favorite({ showInactive, handleValidatorChange }) {
  const dispatch = useDispatch();
  const selectedValidatorList = useSelector(
    (state) => state.validatorList.selectedValidatorList
  );
  const votingPowerSum = useSelector(
    (state) => state.validatorList.votingPowerSum
  );
  const localFavorites = JSON.parse(localStorage.getItem("favorite"));

  const [searchData, setSearchData] = useState("");

  const [sortingField, setSortingField] = useState("");
  const [sortType, setSortType] = useState("");

  const [favoriteValidator, setFavoriteValidator] = useState([]);

  function handleSorting(item, key) {
    if (sortingField == item) {
      if (sortType == "asc") {
        setSortType("dec");
        const tempValidator = favoriteValidator;
        tempValidator.sort((a, b) =>
          Number(a[key]) > Number(b[key])
            ? -1
            : Number(b[key]) > Number(a[key])
            ? 1
            : 0
        );
        setFavoriteValidator(tempValidator);
      } else if (sortType == "dec") {
        setSortType("");
        setSortingField("");
        setFavoriteValidator(favoriteValidator);
      } else {
        setSortType("asc");
        setSortingField(item);
        const tempValidator = favoriteValidator;
        tempValidator.sort((a, b) =>
          Number(a[key]) > Number(b[key])
            ? 1
            : Number(b[key]) > Number(a[key])
            ? -1
            : 0
        );
        setFavoriteValidator(tempValidator);
      }
    } else {
      setSortingField(item);
      setSortType("asc");
      const tempValidator = favoriteValidator;
      tempValidator.sort((a, b) =>
        Number(a[key]) > Number(b[key])
          ? 1
          : Number(b[key]) > Number(a[key])
          ? -1
          : 0
      );
      setFavoriteValidator(tempValidator);
    }
  }
  function handleFavoriteClick(item, index) {
    setFavoriteValidator((current) =>
      current.filter((element) => element.address != item.address)
    );
    const updateFavoriteValidator = localFavorites.filter(
      (element) => element.address != item.address
    );
    localStorage.setItem("favorite", JSON.stringify(updateFavoriteValidator));
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
      const tempValidator2 = favoriteValidator.filter((item, index) => {
        return item.name.toLowerCase().includes(searchData.toLowerCase());
      });
      setFavoriteValidator(tempValidator2);
    } else {
      if (!showInactive) {
        const tempValidator =
          JSON.parse(localStorage.getItem("favorite")) || [];
        setFavoriteValidator(
          tempValidator.filter((val) => val.status === "BOND_STATUS_BONDED")
        );
      } else {
        setFavoriteValidator(
          JSON.parse(localStorage.getItem("favorite")) || []
        );
      }
    }
  }, [searchData]);

  useEffect(() => {
    if (!showInactive) {
      const tempValidator = JSON.parse(localStorage.getItem("favorite")) || [];
      setFavoriteValidator(
        tempValidator.filter((val) => val.status === "BOND_STATUS_BONDED")
      );
    } else {
      setFavoriteValidator(JSON.parse(localStorage.getItem("favorite")) || []);
    }
  }, [showInactive]);
  return (
    <>
      <div
        class="staking_tab tab-pane fade show active"
        id="staking-flow_2"
        role="tabpanel"
        aria-labelledby="staking-flow_2-tab"
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
                    Showing: <span>{favoriteValidator.length}</span> validators
                  </p>
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
              <div class="table__body">
                {localFavorites && localFavorites.length ? (
                  favoriteValidator && favoriteValidator.length ? (
                    <>
                      {favoriteValidator.map((item, index) => {
                        return (
                          <div class="table__body--row" key={item.name + index}>
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
                                    onClick={() => {
                                      handleFavoriteClick(item, index);
                                    }}
                                    checked={true}
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
                                    <Image src={item.img} alt={item.name} />
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
                                  {Number(item.votingPower).toLocaleString(
                                    "en-US"
                                  )}
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
                    </>
                  ) : (
                    <div class="no-result-found show">
                      <div class="no-result-found__text-wrapper">
                        <h6 class="font-demi text-lightgray">
                          No Results Found
                        </h6>
                        <p class="copy-sm">Try changing your search term.</p>
                      </div>
                    </div>
                  )
                ) : (
                  <div class="no-favourites no-favourites__validators show text-center">
                    <div class="no-favourites__icon-wrapper p-2">
                      <svg
                        width="44"
                        height="37"
                        viewBox="0 0 44 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22 7.37157L18.2137 3.71532C16.3088 1.81041 13.7252 0.740234 11.0312 0.740234C8.33729 0.740234 5.75366 1.81041 3.84875 3.71532C1.94383 5.62024 0.873657 8.20386 0.873657 10.8978C0.873657 13.5918 1.94383 16.1754 3.84875 18.0803L22 36.4997L40.1512 18.0884C42.0562 16.1835 43.1263 13.5999 43.1263 10.9059C43.1263 8.21199 42.0562 5.62837 40.1512 3.72345C38.2463 1.81853 35.6627 0.74836 32.9687 0.74836C30.2748 0.74836 27.6912 1.81853 25.7862 3.72345L18.75 10.4997L25.25 16.9997L22 20.2497"
                          fill="#EE1313"
                          fill-opacity="0.2"
                        />
                        <path
                          d="M22 7.37157L18.2137 3.71532C16.3088 1.81041 13.7252 0.740234 11.0312 0.740234C8.33729 0.740234 5.75366 1.81041 3.84875 3.71532C1.94383 5.62024 0.873657 8.20386 0.873657 10.8978C0.873657 13.5918 1.94383 16.1754 3.84875 18.0803L22 36.4997L40.1512 18.0884C42.0562 16.1835 43.1263 13.5999 43.1263 10.9059C43.1263 8.21199 42.0562 5.62837 40.1512 3.72345C38.2463 1.81853 35.6627 0.74836 32.9687 0.74836C30.2748 0.74836 27.6912 1.81853 25.7862 3.72345L18.75 10.4997L25.25 16.9997L22 20.2497"
                          stroke="#EE1313"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <div class="no-favourites__text-wrapper">
                      <h4 class="h4-sm text-lightgray font-bold">
                        No Favourites Yet
                      </h4>
                      <p class="copy-lg">
                        Add validators to your favourites to easily set your
                        stake allocation intent.
                      </p>
                      <div class="btn-wrapper">
                        <a href="#" class="btn btn-primary">
                          Add to Favourites
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Favorite;
