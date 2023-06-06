import { useState } from 'react';
import { FaWallet } from "react-icons/fa";
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Web3Selector, disconnect, web3instance, clearMessage } from '../../store/reducers/web3Slice';
import Notynew from '../../services/Notynew';
import { localStorageHelper } from "../../services/helper";
import { Modal } from 'antd';

const WalletConnect = () => {

    const dispatch = useDispatch();
    const { web3, isLoading, isSuccess, address, isloginLoading, isLoginerror, isNoty } = useSelector(Web3Selector);
    const [userAccount, setuserAccount] = useState(null);
    const [walletmodal, connectwallet] = useState(false);

    const connectHandler = () => {
        dispatch(web3instance());
    }

    const disconnectHandler = () => {
        dispatch(disconnect());
        Notynew("success", "topRight", "<b>Wallet Disconnected Successfully!!</b> <br/> You have disconnected your wallet with Raffle", 3000)
        localStorageHelper.remove('Loginid');
        localStorageHelper.remove('Address');
        dispatch(clearMessage())
    }
    return (
        <>
            <div className='connect_free_box'>
                <div className='freeentry_box'>
                    <h3>Free Entry <span>(No Gas)</span></h3>
                </div>
                <div className='register_box'>
                    <h5>Register to participate</h5>
                    {
                        isloginLoading ?
                            <><Spinner animation="border" />Loading... </> :
                            <>
                                <button className='wallect_btn' onClick={() => { !isSuccess ? connectwallet(true) : disconnectHandler() }}>
                                    {(userAccount && userAccount !== null) ? userAccount.substring(0, 12) + "..." : <><FaWallet />Connect Wallet</>}
                                </button>
                            </>
                    }
                </div>
            </div>

            <Modal className='wallect_modal' centered open={walletmodal} onOk={() => connectwallet(false)} onCancel={() => connectwallet(false)}>
                <h2>Connect</h2>
                <p>Choose a wallet connection method.</p>
                <button onClick={() => { !isSuccess ? connectHandler() : disconnectHandler() }}>
                    <span>
                        <img src={require('../../assets/imgs/metamask.png')} alt="metamask" width="35" height="35" />
                    </span>
                    MetaMask
                </button>
            </Modal>
        </>

    )
}
export default WalletConnect;