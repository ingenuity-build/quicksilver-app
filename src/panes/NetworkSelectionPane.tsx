import './NetworkSelectionPane.css';
import React, {useEffect}from 'react';
import Select from "react-select";
import { initKeplrWithNetwork } from "../types/chains";
import { SigningStargateClient} from "@cosmjs/stargate"
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import { SpinnerCircular } from 'spinners-react';

interface PropComponent {
    prev? : { () : void  };
    next?: { (): void};
    stakeAllocations? : { (): void};
    stakeExistingDelegations? : {(): void};      
    handleSetChainId? : {(newChainId: string): Promise<void>};  
    selectedNetwork? : any;
    setSelectedNetwork? : Function;
    setBalances?: Function;
    balances: Map<string, Map<string, number>>;
    quicksilverBalances: Map<string, Map<string, number>>;
    networkAddress: string;
    setNetworkAddress: Function;
    setClient? : Function;
    client: any;
    delegateToken: Function;
    networks: any;
    _loadExistingValsAsync: Function;
    loading: boolean;
    
  }


export default function NetworkSelectionPane(props: PropComponent) {
    


    const [wallets, setWallets] = React.useState<Map<string, SigningStargateClient>>(new Map<string, SigningStargateClient>());

    const [isWalletConnected, setWalletConnected] = React.useState(false);
   const [networkBalance, setNetworkBalance] = React.useState(0);
   const [networkQBalance, setNetworkQBalance] = React.useState(0);
   const [balanceFetched, setBalanceFetched] = React.useState(false);
   

    useEffect(() => {
                 // @ts-expect-error
                 setNetworkQBalance(props.quicksilverBalances.get(process.env.REACT_APP_QSCHAINID)?.get(props.selectedNetwork.local_denom) ? +(props.quicksilverBalances.get(process.env.REACT_APP_QSCHAINID)?.get(props.selectedNetwork.local_denom)): 0)
    }, [props.quicksilverBalances])
    
     useEffect(() => {
        if(props.selectedNetwork !== "Select a network") {
            connectNetwork(props.selectedNetwork.chain_id);
        }
     }, [props.selectedNetwork])

    //  const manipulateData = (zones: []) => {
    //         return zones.map((zone: any) => { return { label: zone.identifier, value: zone}})
    //  }



    const connectNetwork = async (network: string) => {
      props.balances.clear();
        initKeplrWithNetwork(async(key: string, val: SigningStargateClient) => {
          setWallets(new Map<string, SigningStargateClient>(wallets.set(key, val)));
          setWalletConnected(true);
          // @ts-expect-error
          props.setClient(val);
     
          let keplr = await getKeplrFromWindow();
          let chainId = await val.getChainId();
          let pubkey = await keplr?.getKey(chainId);
          let bech32 = pubkey?.bech32Address;
         props.setNetworkAddress(bech32);
         props._loadExistingValsAsync(bech32);        
            //props.delegateToken(bech32, val);
          if (bech32) {
            let roBalance = await val.getAllBalances(bech32)
            roBalance.forEach((bal: any) => {
              // there must be an easier way to remove readonly property from the returned Coin type?
              let networkBalances = props.balances.get(chainId);
              if (!networkBalances) {
                networkBalances = new Map<string, number>()
              }
                        // @ts-expect-error
              props.setBalances(new Map<string, Map<string, number>>(props.balances.set(chainId, new Map<string, number>(networkBalances.set(bal.denom, parseInt(bal.amount))))));
              
            })
                         // @ts-expect-error
            setNetworkBalance(props.balances.get(props.selectedNetwork.chain_id)?.get(props.selectedNetwork.base_denom) ? +(props.balances.get(props.selectedNetwork.chain_id)?.get(props.selectedNetwork.base_denom)): 0)
         // @ts-expect-error
           setNetworkQBalance(props.quicksilverBalances.get(process.env.REACT_APP_QSCHAINID)?.get(props.selectedNetwork.local_denom) ? +(props.quicksilverBalances.get(process.env.REACT_APP_QSCHAINID)?.get(props.selectedNetwork.local_denom)): 0)
            setBalanceFetched(true);
            console.log("balances", props.balances, chainId);
         
          }
        }, network);
      }

 
    let handleNetworkChange = (selected: any) => {
      console.log(selected);
          // @ts-expect-error
          
        props.setSelectedNetwork(selected?.value);
      }

    const stakeLiquidAtoms = () => {
        props.next?.();
        props.stakeExistingDelegations?.();
    }

    const stakeNewAllocations = () => {
        props.next?.();
        props.stakeAllocations?.();
    }


    return (
        <div className="network-selection-pane d-flex flex-column align-items-center ">

            {props.networkAddress && props.selectedNetwork !== "Select a network" && props.balances && balanceFetched && <div className="wallet-details d-flex flex-column mt-5">
                <h4> My Wallet</h4>
                <h6>{props.networkAddress}</h6>
                <div className="row wallet-content mt-4">
                    <div className="col-3 text-center">
                       <h5 className="font-bold">{networkBalance/1000000}</h5>
                       {/* <p> {props.selectedNetwork.base_denom.substring(1)} </p> */}
                       <p> {props.selectedNetwork.base_denom.charAt(1).toUpperCase() + props.selectedNetwork.base_denom.slice(2)}</p>
                    </div>
                    <div className="col-3 text-center">
                     <h5 className="font-bold">{networkQBalance/1000000}</h5>  
                    <p> {props.selectedNetwork.local_denom[1] + props.selectedNetwork.local_denom.charAt(2).toUpperCase() + props.selectedNetwork.local_denom.slice(3)}</p>
                       {/* <p> {props.selectedNetwork.local_denom.substring(1)} </p>  */}
                        </div>
                  
                </div>
            </div> }
        <div className="text-center">
        <h2 className="mt-4">Choose your network </h2>

        

<Select className="custom-class mb-3"
            defaultValue={{label: props.selectedNetwork.account_prefix ? props.selectedNetwork.account_prefix?.charAt(0).toUpperCase() + props.selectedNetwork.account_prefix?.slice(1) : ''}}
            options={props.networks}
            onChange={handleNetworkChange}
            
        />
    </div>
      
<div className="mt-5 button-container">
               
                               {balanceFetched && <button className={`stake-liquid-atoms-button mx-3 ${props?.selectedNetwork === "Select a network"   ? 'd-none' : ''}`} onClick={stakeNewAllocations}> Stake {props?.selectedNetwork?.base_denom?.substring(1).charAt(0).toUpperCase() + props?.selectedNetwork?.base_denom?.slice(2)} </button>}
                               {props.selectedNetwork.liquidity_module  && balanceFetched && <button className={`stake-existing-delegations-button mx-3 ${props?.selectedNetwork === "Select a network"  ? 'd-none' : ''}`} onClick={stakeLiquidAtoms}> Stake Existing Delegations </button>}
                         
            </div>
            {!props.selectedNetwork.liquidity_module && <p className={`mt-4 ${props?.selectedNetwork === "Select a network"  ? 'd-none' : ''}`}> Transfer of delegation isn't enabled on this network </p>}
            <div className="spinner">
        {props.loading && <SpinnerCircular />}
        </div>
            </div>

    );
}