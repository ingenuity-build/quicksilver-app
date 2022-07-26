
import React, {useEffect} from 'react';

import { parseCoins } from "@cosmjs/stargate";
import { SpinnerCircular } from 'spinners-react';


interface PropComponent {
    prev? : { () : void  };
    next?: { (): void}; 
    selectedNetwork? : any;
    selectedExistingDelegations: any;
    networkAddress?: string;
    client? : any;
    balances: Map<string, Map<string, number>>;
    isStaked: boolean;
    setIsStaked: Function;
    setShowSummaryExistingDelegations : Function; 

  }



export default function SummaryExistingDelegationsPane(props: PropComponent) {
    const [totalStake, setTotalStake] = React.useState(0);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);


    useEffect(() => {
        let sum = 0;
        props.selectedExistingDelegations.forEach((x: any) => {
            sum = sum + +(x.coins[0].amount);
        })
        sum = Math.abs(sum / props.selectedNetwork.redemption_rate)*props.selectedNetwork.redemption_rate
        setTotalStake(sum);
    }, [])


 





    const stakeExistingDelegations = async (e: any) => {
 
      console.log('Stake existing');
      let msg = [];
      msg = props.selectedExistingDelegations.map((x: any) => { return {
        typeUrl: "/cosmos.staking.v1beta1.MsgTokenizeShares",
        value: {
              
                  delegatorAddress: props.networkAddress,
                  validatorAddress: x.validator_address,
                  amount: {
                     "amount": x.coins[0].amount,
                     "denom": x.coins[0].denom
                  },
                  tokenizedShareOwner: props.networkAddress,
                }}
              });
              let coinstring = '';
              try {
                setLoading(true);
        const broadcastResult = await props.client.signAndBroadcast(
            props.networkAddress,
            [...msg],
           {
              "gas": "1000000",
              "amount": [
                {
                  "denom": "uatom",
                  "amount": "300"
                }
              ]
            },
            'Existing Delegations Transaction'
          );

          
          JSON.parse(unescape(broadcastResult.rawLog)).forEach((x: any) => x.events.forEach((y: any) => {if(y.type === "coinbase"){ 
            return y.attributes.forEach((attr: any, index: any) => {
                 if(attr.key === "amount") {
                     coinstring +=  `${attr.value},`;
                 }
             })
          }} ));
          if(broadcastResult.code === 0) {

          const msgSend = {
            fromAddress: props.networkAddress,
            toAddress: props.selectedNetwork.deposit_address.address,
            amount: parseCoins(coinstring.slice(0, -1)),
          };
          
          const msgAny = {
              typeUrl: "/cosmos.bank.v1beta1.MsgSend",
            value: msgSend,
          };
            try {
             setLoading(true);
             const broadcastResult2 = await props.client.signAndBroadcast(
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
               "Staking existing transaction - 2 ",
             );
   
             console.log(broadcastResult2);
             if(broadcastResult2.code === 0 ) {
               props.setShowSummaryExistingDelegations(false);
               props.setIsStaked(true);
           }
         } catch(err: any) {
           setLoading(false);
           console.log(err);
           setError('The transaction failed! Please try again.');
       }
     }
        }  catch(err: any) {
          setLoading(false);
          console.log(err);
          setError('The transaction failed! Please try again.');
      }
      


         
      }

    


    return (
        <>
        <div className="summary-existing-delegations-pane d-flex mt-4 justify-content-center align-items-center flex-column">
            <h2 className="mt-4"> Summary</h2>
            <h5 className="mt-4"> Total Stake: <span className="font-bold">{totalStake/1000000} {props.selectedNetwork.base_denom.charAt(1).toUpperCase() + props.selectedNetwork.base_denom.slice(2)} </span></h5>
            <h5>Redemption Rate:  <span className="font-bold">1 {props.selectedNetwork.local_denom[1] + props.selectedNetwork.local_denom.charAt(2).toUpperCase() + props.selectedNetwork.local_denom.slice(3)} =  {parseFloat(props.selectedNetwork?.redemption_rate).toFixed(4)} {props.selectedNetwork.base_denom.charAt(1).toUpperCase() + props.selectedNetwork.base_denom.slice(2)} </span></h5>
            <h5>qTokens Received:  <span className="font-bold">{(totalStake/1000000)/props.selectedNetwork?.redemption_rate}</span></h5>
            <h6 className="mt-4"> Existing Delegations: </h6>
            {props.selectedExistingDelegations.map((x: any) => <>
                 <h6> {x['name']} :  <span className="font-bold">{x.coins[0].amount/1000000} {x.coins[0].denom.charAt(1).toUpperCase() + x.coins[0].denom.slice(2)} </span></h6></> )}
                 <button  disabled={loading} className="stake-button mt-3 mb-2" onClick={stakeExistingDelegations} > STAKE EXISTING DELEGATIONS </button>
                 <div className="spinner">
        {loading && <SpinnerCircular />}
        </div>
        {loading && <p> Transaction in progress... </p>}
        {error !== '' && !loading && <p className="mt-3"> {error}</p>}
        </div>
 
        </>
    );
}

