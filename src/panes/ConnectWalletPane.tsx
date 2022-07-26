import './ConnectWalletPane.css';
import ConnectWalletModal from '../components/ConnectWalletModal';
import Backdrop from '../components/Backdrop';



interface PropComponent {
    modalIsOpen?: boolean;
    setModalIsOpen?: Function;
    openModalHandler? : Function;
    closeModalHandler?: Function;
    handleClickOpen? : { (): void};
  }

  
export default function ConnectWalletPane(props: PropComponent) {


    const openModalHandler = (event: React.MouseEvent<HTMLElement>) => {
        // @ts-expect-error
    props.openModalHandler();
   }

    return (
        <div className="connect-wallet-pane d-flex flex-column align-items-center ">
                <h4 className="sub-heading"> Hey there! </h4>
                <h1 className="mt-3"> Connect your wallet to get started! </h1>
                <button onClick={openModalHandler} className="connect-wallet-button mt-5"> 
                Connect Wallet </button> 

                {props.modalIsOpen && (
        <ConnectWalletModal handleClickOpen={props.handleClickOpen}/>
      )}
      {props.modalIsOpen && <Backdrop onCancel={props.closeModalHandler} />}
 
        </div>
    );
} 