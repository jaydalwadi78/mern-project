import React, { } from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Row, Spinner } from 'react-bootstrap';
import { Card } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { UserSelector, userwinnerById, clearMessage, verifyMail } from '../../store/reducers/userSlice';

import { FaEthereum } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";

const UsersWins = () => {

    const { winnerRaffle } = useSelector(UserSelector);

    return (

        <Row>
            {winnerRaffle.length > 0 ? (
                winnerRaffle.map((raffle, index) => {
                    return (
                        <Col className='d-flex' sm="6" md="4" lg="3">
                            <Card className='card_box'>
                                <div className='card_heading d-flex align-items-center justify-content-between'>
                                    <h6>
                                        <NavLink to={`/raffle/${raffle._id}`}>
                                            {raffle.winingamount} {raffle.name} <BsPatchCheckFill />
                                        </NavLink>
                                    </h6>
                                </div>
                                <div className='card_img'>
                                    <div className="raffleid">
                                        <span className="event-nft-id">#{raffle.autoraffleId}</span>
                                    </div>

                                    <NavLink to={`/raffle/${raffle._id}`}>
                                        <img src={`https://raffle.upcomingnft.net/uploads/${raffle.raffleimage}`} />
                                    </NavLink>

                                    <div className="holders_event">
                                        <span>{raffle.total} PARTICIPANTS</span>
                                    </div>
                                </div>
                                <div className='card_description'>
                                    <div className='event-value text-center'>
                                        <h5><span>Price:</span>
                                            {raffle.currency == 1 ? (
                                                <img
                                                    src={require("../../assets/imgs/usdt-coin.png")}
                                                    alt="USDT"
                                                />
                                            ) : (
                                                <img
                                                    src={require("../../assets/imgs/eth-icon.png")}
                                                    alt="ETH"
                                                />
                                            )}
                                            {raffle.winingamount}</h5>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    );
                })
            ) : winnerRaffle.length == 0 ? (
                <Col md="12" lg="12" xl="12" className="d-flex">
                    <h6>No Winning raffle !</h6>
                </Col>
            ) : (
                <Row className="justify-content-md-center">
                    <Col
                        md="12"
                        className="justify-content-md-center text-center"
                    >
                        <Spinner animation="border" variant="info" />
                    </Col>
                </Row>
            )}
        </Row>

    )
}

export default UsersWins;