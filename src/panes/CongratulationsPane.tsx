import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import './CongratulationsPane.css';

interface PropComponent {
setActiveStep: Function;
setIsStaked: Function;
setSelectedNetwork: Function;
setShowAllocationsPane: Function;
setStateExistingDelegations: Function;
setSelectedValidators: Function;
  }

export default function CongratulationsPane(props: PropComponent) {
      const { width, height } = useWindowSize()

      const stakeAnotherNetwork = () => {
          props.setActiveStep(2);
         props.setIsStaked(false);
         props.setSelectedNetwork("Select a network");
         props.setShowAllocationsPane(false);
         props.setStateExistingDelegations([]);
         props.setSelectedValidators([]);

      }
    return (
        <>
        <div className="congratulations-pane d-flex mt-5 justify-content-center align-items-center flex-column">
    <h4 className="mt-5">Congratulations! You've successfully staked the tokens!</h4> 
    <div className="button-container mt-4">
        <button onClick={stakeAnotherNetwork} className="stake mx-2"> Stake on another network </button>
        {/* <button className="use-qassets mx-2"> Use qAssets in DeFi</button>  */}
        </div>
    </div>
    <Confetti recycle={false}
      width={width}
      height={height}
    />
    </>
    );
}