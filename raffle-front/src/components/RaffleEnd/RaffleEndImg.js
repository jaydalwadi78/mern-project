import { useState } from 'react';
import { Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const RaffleEndImg = () => {
    return (
        <Col md="5" lg="4">
            <div className='raffle_img'>
                <img src={require('../../assets/imgs/10ETH.png')} alt="10ETH" />
            </div>

            <div className='competition_box'>
                <h5>Competition ended</h5>
                <div className='won_profile d-flex justify-content-center align-items-center'>
                    Won by
                    <NavLink to={'/user-winner'}>
                        <span className='winner_pic'>
                            <img width={'40'} src={require('../../assets/imgs/user-profile.webp')} alt="user" />
                        </span>
                        Bellbrand
                    </NavLink>
                </div>
                <div className='contract_bg'>
                    <NavLink to={'https://etherscan.io/error'} target={'_blank'}>
                        0x8ca5cf6523a1c82177fd440bf8632e8a7c8c4ea2
                    </NavLink>
                </div>
            </div>
        </Col>
    )
}
export default RaffleEndImg;