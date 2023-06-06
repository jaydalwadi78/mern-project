import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { UserSelector, userwinnerById, clearMessage, verifyMail } from '../../store/reducers/userSlice';

const UserProfile = () => {
    const dispatch = useDispatch();
    const { winnerName, winnerAddress } = useSelector(UserSelector);
    let urlParams = useParams();
    console.log("urlParams>>", urlParams);
    //const { isCurrentSuccess, isCurrentLoading, currentRaffle } = useSelector(RaffleSelector);

    useEffect(() => {
        if (urlParams) {
            dispatch(userwinnerById(urlParams.winnerid))
        }
    }, [urlParams])

    return (

        <Col md="10" lg="8" xl="6">
            <div className='user_profile text-center'>
                <img width={'100'} src={require('../../assets/imgs/user-profile.webp')} alt='user img' />
                <h4 className='username'>{winnerName}</h4>
                <h6 className='useraddress'>
                    <NavLink to={'https://etherscan.io/error'} target={'_blank'}>
                        <span>{winnerAddress}</span> <FaEdit />
                    </NavLink>
                </h6>
            </div>
        </Col>

    )
}

export default UserProfile;