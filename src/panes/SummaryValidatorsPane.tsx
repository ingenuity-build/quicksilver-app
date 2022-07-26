
import React from 'react';
import { coins } from "@cosmjs/launchpad"
import './SummaryPane.css';

import { SpinnerCircular } from 'spinners-react';



let { bech32 } = require('bech32')
interface PropComponent {
    prev? : { () : void  };
    next?: { (): void}; 
    selectedNetwork? : any;
    allocationProp?: any;
    networkAddress?: string;
    client? : any;
    balances: Map<string, Map<string, number>>;
    isStaked: boolean;
    setIsStaked: Function;
    setShowSummaryValidators: Function;
    stakingAmountValidators: number;

  }



export default function SummaryValidatorsPane(props: PropComponent) {

    let out : string | Array<any> = [];
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);



    function valToByte(val: any) {
        if (val > 1) { val = 1 }
        if (val < 0) { val = 0 }
        return Math.abs(val*200)
      }
      
      function addValidator(valAddr: any, weight: any) {
        let addr = bech32.decode(valAddr)
         let  converted = bech32.fromWords(addr.words);
        converted.unshift(valToByte(weight));
        return converted;
      }


    const renderValidators = () => {
        const validators = Object.values(props.allocationProp).map((obj : any) => {
          out = out.concat(addValidator(obj.address, obj.value/100));
     
            return (
                <>
                  <h6>{obj.name} : <span className="font-bold"> {obj.value.toFixed(2)} % </span></h6> 
                </> 
            )
        }
        )
        out = Buffer.from(out).toString('base64');
        return validators;
    }

    const onStakeClick = async (e: any) => {


        const msgSend = {
          fromAddress: props.networkAddress,
          toAddress: props.selectedNetwork.deposit_address.address,
          amount: coins((props.stakingAmountValidators * 1000000), props.selectedNetwork.base_denom),
        };
        
        const msgAny = {
            typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: msgSend,
        };
        
        try {
            setLoading(true);
       const broadcastResult = await props.client.signAndBroadcast(
          props.networkAddress,
          [msgAny],
         {
            "gas": "200000",
            "amount": [
              {
                "denom": "uatom",
                "amount": "300"
              }
            ]
          },
          out,
        );
        console.log(broadcastResult);
        if(broadcastResult.code === 0 ) {
            props.setShowSummaryValidators(false);
            props.setIsStaked(true);
            setLoading(false);
        }
    } catch(err: any) {
        setLoading(false);
        console.log(err);
        setError('The transaction failed! Please try again.');
    }
    }

    
  
    return (
        <>
        <div className="summary-validator-pane d-flex mt-4 justify-content-center align-items-center flex-column">
            <h2 className="mt-4"> Summary </h2> 
            <h5 className="mt-4"> Total Stake: <span className="font-bold">{props.stakingAmountValidators} {props.selectedNetwork.base_denom.charAt(1).toUpperCase() + props.selectedNetwork.base_denom.slice(2)}</span></h5>
            <h5>Redemption Rate:  <span className="font-bold">1 {props.selectedNetwork.local_denom[1] + props.selectedNetwork.local_denom.charAt(2).toUpperCase() + props.selectedNetwork.local_denom.slice(3)} =  {parseFloat(props.selectedNetwork?.redemption_rate).toFixed(4)} {props.selectedNetwork.base_denom.charAt(1).toUpperCase() + props.selectedNetwork.base_denom.slice(2)} </span></h5>
            <h5>qTokens Received:  <span className="font-bold">{props.stakingAmountValidators/props.selectedNetwork?.redemption_rate}</span></h5>
            <h6 className="mt-4"> Validator List: </h6>
        {renderValidators()}
        
        <button  disabled={loading} className="stake-button mt-3 mb-2" onClick={onStakeClick}> STAKE  </button>
        {/* {loading && <ClipLoader color={color} loading={loading} css={override} size={150} />} */}
        <div className="spinner">
        {loading && <SpinnerCircular />}
        </div>
        {loading && <p> Transaction in progress... </p>}
        {error !== '' && !loading && <p className="mt-3"> {error}</p>}
        </div>
        </>
    );
}

