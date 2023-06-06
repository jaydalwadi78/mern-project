import { useState } from 'react';
import { FaWallet } from "react-icons/fa";

const WalletConnectFrom = () => {

    return (


        <div className='connect_free_box'>
            <div className='freeentry_box'>
                <h3>Free Entry <span>(No Gas)</span></h3>
            </div>
            <div className='register_box'>
                <h5>Register to participate</h5>
                <button className='wallect_btn'>
                    <FaWallet /> Connect Wallet
                </button>
            </div>
        </div>


    )
}
export default WalletConnectFrom;