"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { logo, keplr, atom } from "../assets/img/index";
import { WalletSection } from "@/provider/wallet";
import SwitchNetwork from "./switchNetwork";
import { useDispatch } from "react-redux";
import { fetchNetworks } from "@/slices/networks";

function Header() {
  const dispatch = useDispatch();
  const [showSwitchNetwork, setShowSwitchNetwork] = useState(false);

  useEffect(() => {
    dispatch(fetchNetworks());
  }, []);
  return (
    <header class="site-header">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          {/* Site Logo  */}
          <a class="site-logo" href="#">
            <Image src={logo} alt="Quicksilver" />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#HeaderContent"
            aria-controls="HeaderContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="HeaderContent">
            {/* Site Navigations  */}
            <div class="navbar-nav-wrapper">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link active" href="#">
                    Staking
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Assets
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    DeFi
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Airdrop
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Governance
                  </a>
                </li>
              </ul>
              <div class="wallet-and-network ms-lg-auto">
                {/* Active Network  */}
                {/* <div class="wallet-and-network__network">
                  <div class="wallet-and-network__network--notifications">
                    <a href="#">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.732 20.9995C13.5561 21.3026 13.3038 21.5542 13.0002 21.729C12.6966 21.9039 12.3523 21.996 12.002 21.996C11.6516 21.996 11.3073 21.9039 11.0037 21.729C10.7001 21.5542 10.4478 21.3026 10.272 20.9995M18.002 7.99951C18.002 6.40821 17.3698 4.88209 16.2446 3.75687C15.1194 2.63165 13.5933 1.99951 12.002 1.99951C10.4107 1.99951 8.88453 2.63165 7.75931 3.75687C6.63409 4.88209 6.00195 6.40821 6.00195 7.99951C6.00195 14.9995 3.00195 16.9995 3.00195 16.9995H21.002C21.002 16.9995 18.002 14.9995 18.002 7.99951Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                  <div
                    class="wallet-and-network__network--active"
                    onClick={() => {
                      console.log("1244441243");
                      setShowSwitchNetwork(true);
                    }}
                  >
                    <a
                      data-bs-toggle="modal"
                      data-bs-target="#modal_switch-network"
                      role="button"
                    >
                      Cosmos
                    </a>
                  </div>
                </div> */}
                {/* Wallet State  */}
                <div class="wallet-and-network__wallet">
                  {/* Wallet State -> Connect  */}
                  <div class="wallet-and-network__wallet--connect">
                    <WalletSection />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showSwitchNetwork && (
          <SwitchNetwork setShowSwitchNetwork={setShowSwitchNetwork} />
        )}
      </nav>
      {/* Active Network - Detaileds  */}
    </header>
  );
}

export default Header;
