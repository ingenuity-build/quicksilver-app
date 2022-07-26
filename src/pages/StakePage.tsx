import  React, { useEffect } from 'react';
import './StakePage.css';
import ConnectWalletPane from '../panes/ConnectWalletPane';
import NetworkSelectionPane from '../panes/NetworkSelectionPane';
import ExistingDelegationsPage from '../panes/ExistingDelegationsPane';
import ValidatorSelectionPane from '../panes/ValidatorSelectionPane';
import LogoWhite from '../assets/icons/logo-whitestroke.svg';
import LogoGray from '../assets/icons/logo-graystroke.png';
import SummaryExistingDelegationsPane from '../panes/SummaryExistingDelegationsPane';
import AllocationPane from '../panes/AllocationPane';
import CongratulationsPane from '../panes/CongratulationsPane';
import SummaryValidatorsPane from '../panes/SummaryValidatorsPane';


interface PropComponent {
  handleBack? : { () : void  };
  handleNext?: { (): void};
  handleClickOpen? : { (): void};
  activeStep: number;
  setActiveStep: Function;
  isWalletConnected: boolean;
  modalIsOpen?: boolean;
  setModalIsOpen?: Function;
  openModalHandler? : Function;
  closeModalHandler?: Function;
  quicksilverBalances: Map<string, Map<string, number>>;
}


export interface Data {
  voting_power: string;
  rank: number;
  commission: string;
  name: string;
  address: string;
  logo: string;
}

const MyQuery =  `query MyQuery($address: String!) {
  action_delegation(address: $address) {
    delegations
  }
}`;

const valListQuery = `
query ValidatorList {
  validator_status(where: {jailed: {}}) {
    validator {
      validator_voting_powers {
        voting_power
      }
      validator_info {
        operator_address
        validator {
          validator_commissions {
            commission
          }
          validator_descriptions {
            avatar_url
            details
            identity
            moniker
            security_contact
            website
          }
        }
      }
    }
    jailed
  }
}
`;

export default function StakePage({modalIsOpen, setModalIsOpen, openModalHandler, closeModalHandler, isWalletConnected, handleNext, handleBack, handleClickOpen, setActiveStep, activeStep, quicksilverBalances}: PropComponent) {

    const [stakeExistingDelegations, setStakeExistingDelegations] = React.useState(false);
    const [stakeNewAllocations, setStakeNewAllocations] = React.useState(false);
    const [showAllocationsPane, setShowAllocationsPane] = React.useState(false);
    const [chainId, setChainId] = React.useState("");
    const [selectedValidators, setSelectedValidators] = React.useState([]);
    const [allocation, setAllocation] = React.useState(new Map<string, number>());
    const [stakeAmount, setStakeAmount] = React.useState<number>(0);
    const [selectedNetwork, setSelectedNetwork] = React.useState<any>("Select a network");
    const [balances, setBalances] = React.useState<Map<string, Map<string, number>>>(new Map<string, Map<string, number>>());
    const [networkAddress, setNetworkAddress] = React.useState('');
    const [rows, setRows] = React.useState<Array<Data>>([]);
    const [selectedExistingDelegations, setStateExistingDelegations]= React.useState<Array<any>>([]);
    const [stakingAmountValidators, setStakingAmountValidators] = React.useState<any>(0);
    const [allocationProp, setAllocationProp] = React.useState<any>({});
    const [client, setClient] = React.useState<any>();
    const [networks, setNetworks] = React.useState<Array<any>>();
    const [existingDelegations, setExistingDelegations] = React.useState([]);
    const [isStaked, setIsStaked] = React.useState(false);
    const [showSummaryExistingDelegations, setShowSummaryExistingDelegations] = React.useState(false);
    const [showSummaryValidators, setShowSummaryValidators] = React.useState(false);
    const [loading, setLoading ]= React.useState(false);

    React.useEffect(() => {
      if(isWalletConnected) {
        setActiveStep(2)
      } else 
      setActiveStep(1);
    }, [])
  
    useEffect(() => {
       loadData();
   }, []);



   const loadData = async () => {
    const response = await fetch(`${process.env.REACT_APP_ZONES_URL}/quicksilver/interchainstaking/v1/zones`);
    const data = await response.json();
    setNetworks(manipulateData(data.zones));

}

const manipulateData = (zones: any) => {
  // return zones.map((zone: any) => { return { label: zone.account_prefix, value: zone}})
   return zones.filter((zone: any) => zone.deposit_address !== null).map((zone: any) => { return { label: zone.account_prefix.charAt(0).toUpperCase() + zone.account_prefix.slice(1), value: zone}})
}
     useEffect(() => {
       if(selectedNetwork !== "Select a network") {
      _loadValsAsync();
        setSelectedValidators([]);
       }
     }, [selectedNetwork]);

     useEffect(() => {

      if(selectedNetwork !== "Select a network" && selectedNetwork.liquidity_module === true) {
       _loadExistingValsAsync(networkAddress);
      }
    }, [selectedNetwork]);

     const _loadExistingValsAsync = (networkAddress: string) => {
      loadExistingDelegations(networkAddress).then(
       (response) => { setExistingDelegations(response?.data?.action_delegation.delegations)},

      );

      
  }

  
     const loadExistingDelegations = async (networkAddress: string): Promise<any> => {
       console.log('Network Address', networkAddress)
      const result = await fetch(
          `https://data.${selectedNetwork.chain_id}.quicksilver.zone/v1/graphql`,
          {
            method: "POST",
            body: JSON.stringify({
              query: MyQuery,
              variables: { address: networkAddress },
            })
          }
        );

        return await result.json();

  
  }
     const delegateTokens = async (add: any, val: any)  => {
      //   const msgAny = {
      //     typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      //   value: msgSend,
      // };
      
   
      const broadcastResult = await val.delegateTokens(
        add,
        "cosmosvaloper1pfpq6mp28lfz3r9wkk30myn9emsfzjur5l346z",
          {
            "denom": "uatom",
            "amount": "5000"
          }
        ,
       {
          "gas": "200000",
          "amount": [
            {
              "denom": "uatom",
              "amount": "300"
            }
          ]
        },
        'Delegating tokens!',
      );
      console.log(broadcastResult);
      }


    const showAllocationPane = () : void => {
        setShowAllocationsPane(true);
        setStakeNewAllocations(false);
    }
 

    const handleExistingDelegations = () => {
        setStakeExistingDelegations(true);
        if(stakeNewAllocations) {
          setStakeNewAllocations(false);
        }
        
    }

    const handleNewAllocations = () => {
        setStakeNewAllocations(true);
        if(stakeExistingDelegations) {
          setStakeExistingDelegations(false);
        }
    }
   
    const hideAllocationPane = () => {
      setShowAllocationsPane(false);
      setStakeNewAllocations(true);

    }

    const handleSetChainId = async (newChainId: string): Promise<void> => {
      if (chainId !== newChainId ) {
          setSelectedValidators([])
          setAllocation(new Map<string, number>())
          setChainId(newChainId);
      }

  }

  const loadValData = async (): Promise<ValResponse> => {
    // fetch me from api
    //return [{rank: 1, name: 'Validator 1', voting_power: '15,394,433 OSMO', commission: '5%' },{rank: 2, name: 'Validator 2', voting_power: '15,394,433 OSMO', commission: '5%' }]

    // TODO - make chainId dynamic
    const result = await fetch(
        `https://data.${selectedNetwork.chain_id}.quicksilver.zone/v1/graphql`,
        {
          method: "POST",
          body: JSON.stringify({
            query: valListQuery,
            variables: {},
            operationName: "ValidatorList"
          })
        }
      );
      console.log(result.json);
      return await result.json();

}

type ValResponse = {
    data: {
        validator_status: Array<Validator>
    }
}

type VotingPowers = {
    voting_power: number
}

type Commissions = {
    commission: number
}

type Descriptions = {
    avatar_url: string | null,
    details: string | null,
    identity: string | null,
    moniker: string,
    security_contact: string | null,
    website: string | null
}

type Validator = {
    validator: {
        validator_voting_powers: Array<VotingPowers>
        validator_info: {
            operator_address: string,
            validator: {
                validator_commissions: Array<Commissions>
                validator_descriptions: Array<Descriptions>
            }
        }
    },
    jailed: Boolean

}

const _loadValsAsync = () => {
    setLoading(true);
        loadValData().then(
            externalData => {
               let vals: Array<Data> = externalData.data.validator_status
               .filter((line: Validator) => { return !line.jailed || (line.validator.validator_info.validator.validator_commissions.length > 0 && line.validator.validator_info.validator.validator_commissions[0].commission > 0.8)})    // remove jailed validators
               .map((line: Validator, index: number): Data => {          // map to Data objects
                let moniker = "Unknown"
                let commission = "Unknown"
                if (line.validator.validator_info.validator.validator_descriptions.length > 0) {
                    moniker = line.validator.validator_info.validator.validator_descriptions[0].moniker
                }
                if (line.validator.validator_info.validator.validator_commissions.length > 0) {
                    commission = (line.validator.validator_info.validator.validator_commissions[0].commission * 100) + "%"
                }

                return {
                    rank: 0, 
                    voting_power: "" + line.validator.validator_voting_powers[0].voting_power,
                    name: moniker,
                    commission: commission,
                    address : line.validator.validator_info.operator_address,
                    logo: "",
                  }});
                setRows(vals);
                setLoading(false);
            }
        ).catch(
          (err) => {setLoading(false); console.log(err)}
        );
    
}


    return (
        <div className="staking-interface row mx-0">
            <div className="stepper col-2 d-flex flex-column ">
            <div className="step d-flex mt-5 ml-4 mb-1">
      <div className="d-flex flex-column pr-4 align-items-center">
     <img className="logo" alt="Quicksilver logo" src={LogoWhite}/>
        <div className="line h-100"></div>
      </div>
      <div>
        <h6 className="step-text-bold">Connect Wallet</h6>
      </div>
    </div>
    <div className="step d-flex ml-4 mb-1">
      <div className="d-flex flex-column pr-4 align-items-center">
     <img alt="Quicksilver logo"  className="logo" src={activeStep >=2 ? LogoWhite : LogoGray}/>
        <div className="line h-100"></div>
      </div>
      <div>
        <h6 className={( activeStep >= 2 ? " step-text-bold" : "step-text-gray")}>Choose Network</h6>
      </div>
    </div>
    <div className="step d-flex ml-4 mb-1">
      <div className="d-flex flex-column pr-4 align-items-center">
      <img alt="Quicksilver logo"  className="logo" src={activeStep >=3 ? LogoWhite : LogoGray}/>
        <div className="line h-100"></div>
      </div>
      <div>
        <h6 className={( activeStep >= 3 ? " step-text-bold" : "step-text-gray")}>Choose</h6>
      </div>
    </div>
    <div className="step d-flex ml-4 mb-1">
      <div className="d-flex flex-column pr-4 align-items-center">
      <img  alt="Quicksilver logo" className="logo" src={activeStep >=4 ? LogoWhite : LogoGray}/>
      </div>
      <div>
        <h6 className={( activeStep >= 4 ? " step-text-bold" : "step-text-gray")}>Stake</h6>
      </div>
     
    </div>
    <div className="social-media-icons mt-5">
        <a href="https://t.me/quicksilverzone" target="_blank" rel="nofollow noopener" title="Telegram">
									<span className="icon-telegram mx-2"></span>
								</a>
								<a href="https://twitter.com/quicksilverzone" target="_blank" rel="nofollow noopener" title="Twitter">
									<span className="icon-twitter mx-2"></span>
								</a>
								<a href="https://discord.com/invite/xrSmYMDVrQ" target="_blank" rel="nofollow noopener" title="Discord">
									<span className="icon-discord mx-2"></span>
								</a>
								<a href="https://medium.com/quicksilverzone" target="_blank" rel="nofollow noopener" title="Medium">
									<span className="icon-medium mx-2"></span>
								</a>
        </div>
              
            </div>
            <div className="content col-10">
                {activeStep === 1 &&  <ConnectWalletPane handleClickOpen={handleClickOpen} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} openModalHandler={openModalHandler}  closeModalHandler={closeModalHandler}/> }
                {activeStep === 2 &&  <NetworkSelectionPane quicksilverBalances={quicksilverBalances}loading={loading} _loadExistingValsAsync={_loadExistingValsAsync} networks={networks} delegateToken={delegateTokens} client={client} setClient={setClient}selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork}  next={handleNext} prev={handleBack} 
                stakeExistingDelegations={handleExistingDelegations} balances={balances} networkAddress={networkAddress} setNetworkAddress={setNetworkAddress} setBalances={setBalances} stakeAllocations={handleNewAllocations}/>  }
                {activeStep === 3 &&  stakeExistingDelegations && <ExistingDelegationsPage setShowSummaryExistingDelegations={setShowSummaryExistingDelegations} selectedExistingDelegations={selectedExistingDelegations} setStateExistingDelegations={setStateExistingDelegations} selectedValidators={rows} existingDelegations={existingDelegations} networkAddress={networkAddress} selectedNetwork={selectedNetwork} next={handleNext} prev={handleBack}/>}
                {activeStep === 3 && selectedNetwork !== "Select a network" && stakeNewAllocations && <ValidatorSelectionPane rows={rows} selectedNetwork={selectedNetwork} prev={handleBack} selectedValidators={selectedValidators} setSelectedValidators={setSelectedValidators} showAllocationPane={showAllocationPane}/>} 
                {activeStep === 3 && !stakeNewAllocations && showAllocationsPane && <AllocationPane quicksilverBalances={quicksilverBalances}  setShowSummaryValidators={setShowSummaryValidators} networkAddress={networkAddress} setAllocationProp={setAllocationProp}  stakingAmountValidators={stakingAmountValidators} setStakingAmountValidators={setStakingAmountValidators} selectedNetwork={selectedNetwork} balances={balances} selectedValidators={selectedValidators} prev={hideAllocationPane} next={handleNext} />}
                {activeStep === 4 && showSummaryExistingDelegations &&  <SummaryExistingDelegationsPane setShowSummaryExistingDelegations={setShowSummaryExistingDelegations}  isStaked={isStaked} setIsStaked={setIsStaked} balances={balances} client={client} networkAddress={networkAddress} selectedNetwork={selectedNetwork} selectedExistingDelegations={selectedExistingDelegations} />}
                {activeStep === 4 && showSummaryValidators &&  <SummaryValidatorsPane stakingAmountValidators={stakingAmountValidators} setShowSummaryValidators={setShowSummaryValidators}  isStaked={isStaked} setIsStaked={setIsStaked} balances={balances} client={client} networkAddress={networkAddress} selectedNetwork={selectedNetwork} allocationProp={allocationProp} />}
                {isStaked && <CongratulationsPane setShowAllocationsPane={setShowAllocationsPane} setStateExistingDelegations={setStateExistingDelegations} setSelectedValidators={setSelectedValidators} setSelectedNetwork={setSelectedNetwork} setIsStaked={setIsStaked} setActiveStep={setActiveStep}/>}
                {/* {activeStep === 3 && stakeNewAllocations && <ValidatorSelectionPane allValidators={allValidators} setSelectedValidators={setSelectedValidator} next={handleNext} prev={handleBack}/>} */}
                </div>
              
        </div>
    )
}