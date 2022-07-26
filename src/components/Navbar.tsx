
import Logo from '../assets/quicksilver-logo.png';
import './Navbar.css';
import Wallet from '../assets/icons/wallet.svg';
import * as React from 'react';
import ConnectWalletModal from './ConnectWalletModal';
import Backdrop from './Backdrop';
import { Link } from "react-router-dom";
import { useLocation} from "react-router-dom";
import Pools from '../assets/icons/pools.svg';
import Parachute from '../assets/icons/parachute.svg';
import Stakes from '../assets/icons/stakes.svg';




interface PropComponent {
  handleClickOpen? : { (): void};
  balances?: any;
  modalIsOpen?: boolean;
  setModalIsOpen?: Function;
  openModalHandler? : Function;
  closeModalHandler?: Function;
  isWalletConnected?: boolean;
}


export default function Navbar(props: PropComponent) {

  const location = useLocation();
  const openModalHandler = (event: React.MouseEvent<HTMLElement>) => {
       // @ts-expect-error
   props.openModalHandler();
  }
  
        return (
        <nav className="navbar navbar-expand-lg d-flex py-0">
          <div className="col-2 navbar-logo">
               <Link to="/">    <img className="logo mt-2" alt="Quicksilver Logo" src={Logo}/></Link> 
  </div>


  <div className="collapse navbar-collapse justify-content-around col-10" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
    
      <li className="nav-item mx-4">
      <img className="nav-icon-stake" alt="Stakes" src={Stakes}/>
      <Link className={`${location.pathname === '/stake'  ? 'active-link' : ''}`} to="/stake">STAKE</Link> 
      </li>
   
      <li className="nav-item mx-4 d-flex align-items-center">
      <img className="nav-icon-pools" alt="Pools" src={Pools}/>
               <Link  className={`${location.pathname === '/pools'  ? 'active-link' : ''}`} to="/pools" onClick={ (event) => event.preventDefault() }>POOLS</Link> 
      </li>
  
      <li className="nav-item mx-4 d-flex align-items-center">
      <img className="nav-icon-airdrop" alt="Parachute" src={Parachute}/>
      <Link  className={`pl-2 ${location.pathname === '/claims'  ? 'active-link' : ''}`} to="/claims" onClick={ (event) => event.preventDefault() }>AIRDROP</Link> 
      
      </li>
      {/* <li className="nav-item mx-4">
      <Link  className={`${location.pathname === '/gov'  ? 'active-link' : ''}`} to="/gov" onClick={ (event) => event.preventDefault() }>GOVERNANCE</Link> 
      </li> */}

    </ul>
            {props.isWalletConnected && <p className="btn connect-wallet px-3 my-2 my-sm-0"> <img alt="Wallet icon" src={Wallet}/> {(props.balances.get(process.env.REACT_APP_QSCHAINID)?.get('uqck')) ? `${props.balances.get(process.env.REACT_APP_QSCHAINID)?.get('uqck')/1000000} QCK`  : '0'
      }</p>}
      {!props.isWalletConnected && <button onClick={openModalHandler} className="btn connect-wallet-button px-3 my-2 my-sm-0"> Connect Wallet
      </button>}
      {props.modalIsOpen && (
        <ConnectWalletModal handleClickOpen={props.handleClickOpen}/>
      )}
      {props.modalIsOpen && <Backdrop onCancel={props.closeModalHandler} />}
  </div>
</nav>
        )
}
