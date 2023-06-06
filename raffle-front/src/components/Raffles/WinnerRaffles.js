import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaExternalLinkAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { UserSelector, userwinnerById, clearMessage, verifyMail } from '../../store/reducers/userSlice';

const WinnerRaffles = (props) => {
    const { raffle } = props
    const dispatch = useDispatch();

    return (
        <>
            <div className='connect_free_box'>
                <div className='freeentry_box'>
                    <h3>Competition Completed</h3>
                </div>
                <div className='register_box'>

                    {/*<NavLink to='' target={'_blank'}>
                        1 hour ago <span><FaExternalLinkAlt /></span>
                    </NavLink>*/}

                    <div className='won_profile d-flex justify-content-center align-items-center'>
                        Won by
                        <NavLink to={`/user-winner/${raffle.winnerId}`}>
                            <span className='winner_pic'>
                                <img width={'40'} src={require('../../assets/imgs/user-profile.webp')} alt="user" />
                            </span>
                            {raffle.winnerUser ? raffle.winnerUser.name : null}
                        </NavLink>
                    </div>
                    <div className='contract_bg'>
                        <NavLink to={`/winner`}>
                            Winners
                        </NavLink>
                    </div>
                </div>
            </div>
        </>

    )
}
export default WinnerRaffles;