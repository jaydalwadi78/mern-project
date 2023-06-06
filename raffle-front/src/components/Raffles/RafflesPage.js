import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

import { UserSelector } from '../../store/reducers/userSlice';
import { getRafflebyId, RaffleSelector, getRafflebysession } from "../../store/reducers/raffleSlice";
import RafflesPartOne from './RafflesPartOne';
import RafflesPartTwo from './RafflesPartTwo';
import Faq from '../Frequently/Faq';

const RafflesPage = () => {
    const dispatch = useDispatch();
    let urlParams = useParams();
    const { isLogined, user_id } = useSelector(UserSelector);
    const { isCurrentSuccess, isCurrentLoading, currentRaffle } = useSelector(RaffleSelector);

    useEffect(() => {
        if (urlParams) {
            dispatch(getRafflebyId(urlParams.raffleid))

        }
    }, [urlParams])

    useEffect(() => {
        if (isLogined) {
            dispatch(getRafflebyId(urlParams.raffleid))
            dispatch(getRafflebysession({ id: urlParams.raffleid, uid: user_id }))
        }
    }, [isLogined])

    return (
        <>
            {
                isCurrentLoading ?
                    <Row className="justify-content-md-center">
                        <Col md="12" className="justify-content-md-center text-center">
                            <Spinner animation="border" variant="info" />
                        </Col>
                    </Row> :
                    <>
                        {
                            isLogined ?
                                <RafflesPartTwo
                                    isActive={currentRaffle.status}
                                    raffle={currentRaffle} /> :
                                <RafflesPartOne
                                    isActive={currentRaffle.status}
                                    raffle={currentRaffle} />
                        }
                    </>
            }
        </>
    )
}
export default RafflesPage;