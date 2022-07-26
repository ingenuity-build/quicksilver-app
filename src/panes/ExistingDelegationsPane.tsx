import React, { useState } from 'react';
import Icon from '../assets/icons/icon.svg';
import './ExistingDelegationsPane.css';

interface PropComponent {
    prev? : { () : void  };
    next?: { (): void};
    selectedNetwork : any;
    networkAddress: string;
    selectedValidators?: any;
    selectedExistingDelegations?: any;
    setStateExistingDelegations? : Function;
    existingDelegations: any;
    setShowSummaryExistingDelegations: Function;
      
  }


export default function ExistingDelegationsPage(props: PropComponent) {

  const [selectedLocalExistingDelegations, setSelectedLocalExistingDelegations] = useState<Array<any>>(props.selectedExistingDelegations);
   

    
        const addDelegation = (e: React.MouseEvent<HTMLElement>, delegation: any) => {
          let position = selectedLocalExistingDelegations.findIndex((val: any) => delegation.validator_address === val.validator_address );
          if(position === -1) {
              delegation.active = true;
          setSelectedLocalExistingDelegations([...selectedLocalExistingDelegations, delegation]);
          } else {
              let validatorArray = JSON.parse(JSON.stringify(selectedLocalExistingDelegations));
              validatorArray.splice(position,1)
              setSelectedLocalExistingDelegations(validatorArray);
              delegation.active = false;
          }
      }
    

      const onNext = () => {
      //   existingDelegations.forEach((x: any) => {      
      //     let newProp : any = {...x};
      // newProp[x.name] = {props.selectedValidators.find((y: any) => y.address === x.validator_address )?.name
      // })
      // // setAllocationProp(newAllocationProp) }) 
       
          selectedLocalExistingDelegations.forEach((x) => {
            x.name = props.selectedValidators.find((y: any) => y.address === x.validator_address )?.name
          })
             //   @ts-expect-error
       props?.setStateExistingDelegations(selectedLocalExistingDelegations);
        // @ts-expect-error
         props.next();
         props.setShowSummaryExistingDelegations(true);
      
    }
  
    return (
        <div className="existing-delegations-pane d-flex flex-column align-items-center ">
        <h2 className="mt-3"> Choose existing delegations </h2>
               {props.existingDelegations?.length > 0 && <div className="mt-3 delegations row w-100 justify-content-center">
                {props.existingDelegations.map((row: any) =>
          <>   
          <div onClick={ (e) => addDelegation(e,row)} className={`validator-card col-3 m-3 ${row.active ? 'val-active' : ''}`}>
               <div className="d-flex align-items-start"> 
                     <img alt="Validator Icon" src={Icon}/>
                
               <div className="card-details">
                <h5> {props.selectedValidators.find((x: any) => x.address === row.validator_address )?.name }</h5>
                <h4 className="font-bold"> {row.coins[0].amount/1000000} {row.coins[0].denom.charAt(1).toUpperCase() + row.coins[0].denom.slice(2)} </h4>
                </div>
              </div>
                </div>

          </>
  
)}

                        
        </div>}
        {props.existingDelegations?.length === 0 && <p> There are no existing delegations yet! </p>}
        <div className="mt-5 button-container">
                <button onClick={props.prev} className="prev-button mx-3"> Previous</button>
                <button disabled={ selectedLocalExistingDelegations.length === 0 ?  true: false} onClick={onNext} className="next-button mx-3" >Next</button>
            </div>
        </div>
    );
}