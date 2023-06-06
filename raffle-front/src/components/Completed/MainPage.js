import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import Raffle from './Raffle';
import Faq from '../Frequently/Faq';
import { notification } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { UserSelector, clearMessage, verifyMail } from '../../store/reducers/userSlice';

const MainPage = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [api, contextHolder] = notification.useNotification();
    const { isverifiedSuccess, errorMessage } = useSelector(UserSelector);

    useEffect(() => {
        let email = searchParams.get("email");
        if (email) {
            dispatch(verifyMail({ email }))
        }
    }, [])

    useEffect(() => {
        if (isverifiedSuccess === true) {
            openNotification("success", "Your email verified successfully");
            dispatch(clearMessage())
        }
    }, [isverifiedSuccess])

    const openNotification = (type, msg) => {
        api[type]({
            message: msg,
            duration: 1.5,
        });
    }

    return (
        <Row className='justify-content-center'>
            {contextHolder}
            <Col md="11" lg="10" xl="8">
                <div className='main_heading text-center'>
                    <h1>Completed Raffles </h1>
                    <p>Here you can learn about closed raffles and the winners of these raffles, and we would like to congratulate everyone who has won one of our raffles.</p>
                </div>
            </Col>
            <Col md="12">
                <Raffle />
            </Col>
            <Faq />
        </Row>
    )
}
export default MainPage;