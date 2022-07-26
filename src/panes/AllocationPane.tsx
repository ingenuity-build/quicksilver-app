import React , {useEffect, useState, useRef} from 'react';
import './AllocationPane.css';

interface PropComponent {
    selectedValidators? : any;
    balances: Map<string, Map<string, number>>;
    selectedNetwork? : any;
    prev: Function;
    stakingAmountValidators? : any;
    setStakingAmountValidators?: Function;
    next?: { (): void};
    setAllocationProp?: Function;
    networkAddress: string;
    setShowSummaryValidators: Function;
    quicksilverBalances: Map<string, Map<string, number>>;
}

export default function AllocationPane(props: PropComponent) {
    const [allocationProp, setAllocationProp] = useState<any>({});
    const [sum, setSum] = useState(props.selectedValidators.length);
    const isMax = useRef(false);
    const [isMaxClicked, setisMaxClicked] = useState(false);
    const [networkBalance, setNetworkBalance] = React.useState(0);
    const [networkQBalance, setNetworkQBalance] = React.useState(0);
    const [showMaxMsg, setShowMaxMsg] = React.useState(false);


    useEffect(() => {
        // @ts-expect-error
        setNetworkQBalance(props.quicksilverBalances.get(process.env.REACT_APP_QSCHAINID)?.get(props.selectedNetwork.local_denom) ? +(props.quicksilverBalances.get(process.env.REACT_APP_QSCHAINID)?.get(props.selectedNetwork.local_denom)): 0)
}, [props.quicksilverBalances])

    useEffect(() => {
        if(props.selectedValidators.length > 0) {
          let temp =  props.selectedValidators.reduce((acc: any, curr: any) => {
                    acc[curr.name] = {...curr, value: 1}
                    return acc;
            }, allocationProp);
            setAllocationProp(temp);
        }
         // @ts-expect-error
        props.setStakingAmountValidators(0);
                                 // @ts-expect-error
                                 setNetworkBalance(props.balances.get(props.selectedNetwork.chain_id)?.get(props.selectedNetwork.base_denom) ? +(props.balances.get(props.selectedNetwork.chain_id)?.get(props.selectedNetwork.base_denom)): 0)
                                 // @ts-expect-error
                                 setNetworkQBalance(props.quicksilverBalances.get(process.env.REACT_APP_QSCHAINID)?.get(props.selectedNetwork.local_denom) ? +(props.quicksilverBalances.get(process.env.REACT_APP_QSCHAINID)?.get(props.selectedNetwork.local_denom)): 0)
    }, [])

    useEffect(() => {
        console.log('Checking use Effect');
    if(isMax.current) {

     calculateMax()
 
    } 
        
    }, [props.stakingAmountValidators])

    useEffect(() => {
        if(isMaxClicked) {

            calculateMax()
            setisMaxClicked(false);
        
           } 
    }, [isMaxClicked])

    const onPrev = (e: any) => {
        props.prev();
    }

    const onNext = (e?: any) => {
       
        let sum = 0;
        props.selectedValidators.forEach((x: any) => {      
          
        sum = sum + allocationProp[x.name]['value'] ;  console.log(allocationProp[x.name]['value'])})
        console.log(sum);
        if(sum < 100) {
            console.log("Please allocation more atoms");
        } else if(sum > 100) {
            console.log("Please allocation less atoms");
        } else {
            console.log("please proceed");
        }
        setSum(sum);

    }

    const calculateMax = () => {
        let value = +(props.stakingAmountValidators/props.selectedValidators.length);
        if(props.selectedValidators.length !== 6) {

       console.log('Amount' , props.stakingAmountValidators);
       console.log('Length' , props.selectedValidators.length);
       console.log('Value', value);
       props.selectedValidators.forEach((x: any) => {      
           let newAllocationProp : any = {...allocationProp};

       newAllocationProp[x.name]['value'] = +(value/props.stakingAmountValidators) * 100;
       setAllocationProp(newAllocationProp) }) ;
       onNext();
        } else {
            props.selectedValidators.forEach((x: any) => {      
                let newAllocationProp : any = {...allocationProp};
     
            newAllocationProp[x.name]['value'] = +(16.66);
            setAllocationProp(newAllocationProp) }) ;
            onNext();
        }
    }
    
    
    const onMaxClick =  (event: React.MouseEvent<HTMLElement>) => {

        let maxBal = +(networkBalance/1000000) - 0.3;
        let temp = '0'+maxBal.toFixed(6).toString();
        if(props.stakingAmountValidators != temp) {
      //    @ts-expect-error
      props.setStakingAmountValidators('0'+maxBal.toFixed(6));
      isMax.current = true;
      setShowMaxMsg(true);
        } else {
            setisMaxClicked(true);
        }
        
  
    
   
         console.log(isMax.current);
         console.log(maxBal);
     


    }

    const handleAllocationChange = (e: any) => {
      if(e.target.value !== "") {
           // setAllocationProp({...allocationProp, [e.target.name] :{ , value: e.target.value}})
           let newAllocationProp : any = {...allocationProp};

            newAllocationProp[e.target.name]['value'] = +(e.target.value);
            setAllocationProp(newAllocationProp);
            onNext();
      }
      else {
        let newAllocationProp : any = {...allocationProp};
        newAllocationProp[e.target.name]['value'] = 1;
        setAllocationProp(newAllocationProp);
        onNext();
      }
          }
          
        
    


    const changeAmount = (e: any) => {
        
        if ( e.target.value.match(/^\d{1,}(\.\d{0,6})?$/) ){
        console.log(e.target.value);
                    //    @ts-expect-error
         props.setStakingAmountValidators(e.target.value);
        // props.setStakingAmountValidators(e.target.value);
        isMax.current = false;
        setisMaxClicked(false);
        if(e.target.value !=  +((networkBalance/1000000) - 0.3).toFixed(6)) {
        setShowMaxMsg(false);
        }
    
    }
    }

    const onClickNext = (e: any) => {
                 //    @ts-expect-error
        props.setAllocationProp(allocationProp)
           //    @ts-expect-error
props.next();
props.setShowSummaryValidators(true);
    }

    const renderValidators = () => {
        return ( props.selectedValidators.map((val: any) => <>
        <div className="d-flex mt-3">
            <h5 className=" mx-2">{val.name}</h5>
            <input style={{accentColor: '#D35100'}} className="mx-2" onChange={handleAllocationChange} type="range" value={Object.keys(allocationProp).length ? allocationProp[val.name]['value'] : 1 } name={val.name} min="1" max="100"   />
            <input className="mx-2" onChange={handleAllocationChange} value={Object.keys(allocationProp).length ? allocationProp[val.name]['value']: '1' } name={val.name}  type="number" min="1" step=".5"></input>%
           </div>
            </>
                
            )
        )
    }

    return (
    <div className="allocation-pane d-flex flex-column align-items-center">
 {props.networkAddress && props.selectedNetwork !== "Select a network" && props.balances && <div className="wallet-details d-flex flex-column mt-3">
                <h4> My Wallet</h4>
                <h6>{props.networkAddress}</h6>
                <div className="row wallet-content mt-4">
                <div className="col-3 text-center">
                       <h5 className="font-bold">{networkBalance/1000000}</h5>
                       <p> {props.selectedNetwork.base_denom.charAt(1).toUpperCase() + props.selectedNetwork.base_denom.slice(2)}</p>
                    </div>
                    <div className="col-3 text-center">
                    <h5 className="font-bold">{networkQBalance/1000000}</h5>
                    <p> {props.selectedNetwork.local_denom[1] + props.selectedNetwork.local_denom.charAt(2).toUpperCase() + props.selectedNetwork.local_denom.slice(3)}</p>
                        </div>
                  
                </div>
            </div> }
           {(networkBalance/1000000) <= 0.5 &&  <div className="mt-3">
                You don't have enough   {props.selectedNetwork.base_denom.charAt(1).toUpperCase() + props.selectedNetwork.base_denom.slice(2)} to stake! 
            </div>}
           {(networkBalance/1000000) > 0.5 &&  <div className="staking-pane d-flex flex-column mt-4">
                <h4>Stake</h4> 

                <div className="d-flex mt-3 align-items-center">
                    <p className="m-0 mx-3"> Number of {props.selectedNetwork.base_denom.charAt(1).toUpperCase() + props.selectedNetwork.base_denom.slice(2)} you want to stake</p>
                    <input className="mx-3" type="text" value={props.stakingAmountValidators?.toString()} onChange={ changeAmount}/>
                    <button className="mx-3 p-1 max-button" onClick={onMaxClick}> MAX </button> 
                

                </div>

                {renderValidators()}
                {showMaxMsg && <p className="mb-0 mt-3">We held back 0.3 {props.selectedNetwork.base_denom.charAt(1).toUpperCase() + props.selectedNetwork.base_denom.slice(2)} to cover future transaction fees</p> }
            </div>}
            {(networkBalance/1000000) > 0.5 &&  <div className="mt-4 text-center">
            {props.stakingAmountValidators > ((networkBalance/1000000) - 0.3) ? `The max that you can allocate is ${ ((networkBalance/1000000) - 0.3).toFixed(6) } atom ` : ''}
            { props.stakingAmountValidators > 0 && sum > 100 && <p className="mt-2"> You have allocated {sum} % of the available atoms. Please move the sliders around until you hit 100% and then you can proceed ahead. </p>}
            { props.stakingAmountValidators > 0 && sum < 99.5 && <p className="mt-2"> Please allocate the remaining {100.00 - sum} % of atoms to continue </p>}
       </div>}
        <div className="button-containers mt-4 mb-4">
            <button className="prev-button mx-3" onClick={onPrev}> Previous </button>
        <button disabled={sum < 99.9  || sum  > 100 || props.stakingAmountValidators > ((networkBalance/1000000) - 0.3)?  true: false}  className="next-button mx-3" onClick={onClickNext}>Next</button> 
</div>
        </div> 
    );
}


