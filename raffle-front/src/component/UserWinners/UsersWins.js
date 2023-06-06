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

        // <Row>
        //     <Col className='d-flex' sm="6" md="4" lg="3">
        //         <Card className='card_box'>
        //             <div className='card_heading d-flex align-items-center justify-content-between'>
        //                 <h6>
        //                     <NavLink to={"/raffle"}>
        //                         5 ETH Raffle <BsPatchCheckFill />
        //                     </NavLink>
        //                 </h6>
        //             </div>
        //             <div className='card_img'>
        //                 <div className="raffleid">
        //                     <span className="event-nft-id">#10</span>
        //                 </div>

        //                 <NavLink to={"/raffle"}>
        //                     <img src={require('../../assets/imgs/10ETH.png')} alt="10ETH" />
        //                 </NavLink>

        //                 <div className="holders_event">
        //                     <span>100 PARTICIPANTS</span>
        //                 </div>
        //             </div>
        //             <div className='card_description'>
        //                 <div className='event-value text-center'>
        //                     <h5><span>Price:</span> <img src={require('../../assets/imgs/eth-icon.png')} alt="eth" /> 5</h5>
        //                 </div>
        //             </div>
        //         </Card>
        //     </Col>
        // </Row>

        <Row>
            {winnerRaffle.length > 0 ? (
                winnerRaffle.map((raffle, index) => {
                    return (
                        // <Col
                        //     md="6"
                        //     lg="4"
                        //     xl="3"
                        //     className="d-flex"
                        //     key={index}
                        // >
                        //     <Card className="card_box">
                        //         <div className="card_heading d-flex align-items-center justify-content-between">
                        //             <h6>
                        //                 <NavLink
                        //                     to={{
                        //                         pathname: `raffle/${raffle._id}`,
                        //                         state: { raffledata: raffle },
                        //                     }}
                        //                 >
                        //                     <span>
                        //                         {raffle.currency == 1 ? (
                        //                             <img
                        //                                 src={require("../../assets/imgs/usdt-coin.png")}
                        //                                 alt="USDT"
                        //                             />
                        //                         ) : (
                        //                             <img
                        //                                 src={require("../../assets/imgs/eth-icon.png")}
                        //                                 alt="ETH"
                        //                             />
                        //                         )}
                        //                     </span>
                        //                     {raffle.winingamount} {raffle.name}
                        //                 </NavLink>
                        //             </h6>
                        //             <div className="free_entry">
                        //                 <span>
                        //                     {raffle.raffletype === 0
                        //                         ? "FREE"
                        //                         : "PAID"}
                        //                 </span>
                        //             </div>
                        //         </div>

                        //         <div className="card_img">
                        //             <div className="raffleid">
                        //                 <span className="event-nft-id">
                        //                     #{raffle.autoraffleId}
                        //                 </span>
                        //             </div>

                        //             <div className="received_box">
                        //                 <span className="black_hours_left hours_left">
                        //                     {entered} Received
                        //                 </span>
                        //             </div>

                        //             <NavLink
                        //                 to={{
                        //                     pathname: `raffle/${raffle._id}`,
                        //                     state: { raffledata: raffle },
                        //                 }}
                        //             >
                        //                 <img
                        //                     alt="raffle_img"
                        //                     src={`https://raffle.upcomingnft.net/uploads/${raffle.raffleimage}`}
                        //                 />
                        //             </NavLink>

                        //             <div className="holders_event">
                        //                 <span>{raffle.total} Participants</span>
                        //             </div>
                        //         </div>

                        //         <div className="card_description">
                        //             {raffle.status === 0 ? (
                        //                 <span className="evrnt_btn main_btn register_btn">
                        //                     Closed
                        //                 </span>
                        //             ) : isLogined ? (
                        //                 <>
                        //                     {btname === 0 ? (
                        //                         <NavLink
                        //                             to={{
                        //                                 pathname: `raffle/${raffle._id}`,
                        //                                 state: {
                        //                                     raffledata: raffle,
                        //                                 },
                        //                             }}
                        //                             className="evrnt_btn main_btn"
                        //                         >
                        //                             Enter Now
                        //                         </NavLink>
                        //                     ) : (
                        //                         <span className="evrnt_btn main_btn register_btn">
                        //                             Registered
                        //                         </span>
                        //                     )}
                        //                 </>
                        //             ) : (
                        //                 <NavLink
                        //                     to={{
                        //                         pathname: `raffle/${raffle._id}`,
                        //                         state: { raffledata: raffle },
                        //                     }}
                        //                     className="evrnt_btn main_btn"
                        //                 >
                        //                     Enter Now
                        //                 </NavLink>
                        //             )}
                        //             <p className="holders_text">
                        //                 {remain} entries remaining for winner
                        //                 announcement
                        //             </p>
                        //         </div>
                        //     </Card>
                        // </Col>
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
                                        <img src={require('../../assets/imgs/10ETH.png')} alt="10ETH" />
                                    </NavLink>

                                    {/* <img
                                        alt="raffle_img"
                                        src={`https://raffle.upcomingnft.net/uploads/${raffle.raffleimage}`}
                                    /> */}

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