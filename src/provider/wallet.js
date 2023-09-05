"use client";
import { useManager } from "@cosmos-kit/react";
import { Center } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { ConnectWalletButton } from "./wallet-connect";
import { WalletCardSection } from "./card";
import SwitchNetwork from "@/components/switchNetwork";
import { networksSelector } from "@/slices/networks";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedNetworkFunc } from "@/slices/selectedNetworks";

export const WalletSection = () => {
  const networks = useSelector(networksSelector);
  const dispatch = useDispatch();
  const [chainName, setChainName] = useState(
    process.env.NEXT_PUBLIC_REACT_APP_DEFAULT_CHAIN
  );
  const { chainRecords, getChainLogo } = useManager();
  const chainOptions = useMemo(
    () =>
      chainRecords.map((chainRecord) => {
        return {
          chainName: chainRecord?.name,
          label: chainRecord?.chain.pretty_name,
          value: chainRecord?.name,
          icon: getChainLogo(chainRecord.name),
          status: chainRecord.chain.status,
          id: chainRecord.chain.chain_id,
        };
      }),
    [chainRecords, getChainLogo]
  );

  useEffect(() => {
    setChainName(
      localStorage.getItem("selected-chain") ||
        process.env.NEXT_PUBLIC_REACT_APP_DEFAULT_CHAIN
    );
  }, [chainName]);

  const onChainChange = async (selectedValue, closeModal) => {
    setChainName(selectedValue?.chainName);
    if (selectedValue?.id) {
      window?.localStorage.setItem("selected-chain", selectedValue?.id);
    } else {
      window?.localStorage.removeItem("selected-chain");
    }
    const networkList = networks.networks || [];
    console.log("Check this", networks, selectedValue);
    const selectedNetwork = networkList.find(
      (item) => item.value.chain_id == selectedValue.id
    );
    dispatch(setSelectedNetworkFunc(selectedNetwork));
    closeModal();
  };

  const chooseCustomChain = (
    <SwitchNetwork
      chainName={chainName}
      chainInfos={chainOptions}
      onChange={onChainChange}
    />
  );
  return (
    <Center p={0}>
      <div class="wallet-and-network__network">
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
        <div>{chooseCustomChain}</div>
      </div>
      {chainName ? (
        <WalletCardSection chainName={chainName}></WalletCardSection>
      ) : (
        <ConnectWalletButton buttonText={"Connect Wallet"} isDisabled />
      )}
    </Center>
  );
};
