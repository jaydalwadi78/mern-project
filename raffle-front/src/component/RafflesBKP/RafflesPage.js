import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { UserSelector } from '../../store/reducers/userSlice';
import { getRafflebyId, RaffleSelector } from "../../store/reducers/raffleSlice";
import RafflesPartOne from './RafflesPartOne';
import RafflesPartTwo from './RafflesPartTwo';
import Faq from '../Frequently/Faq';

const RafflesPage = () => {
    const dispatch = useDispatch();
    let urlParams = useParams();
    const { isLogined } = useSelector(UserSelector);
    const { isCurrentSuccess, isCurrentLoading, currentRaffle } = useSelector(RaffleSelector);

    useEffect(() => {
        if (urlParams) {
            dispatch(getRafflebyId(urlParams.raffleid))
        }
    }, [urlParams])

    return (
        <>
            {
                isLogined ?
                    <RafflesPartTwo /> :
                    <RafflesPartOne />
            }
            <Row>
                <Faq />
            </Row>
        </>


    )
}
export default RafflesPage;