import React, { useState, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Card } from "antd";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getRaffleSlider,
    RaffleSelector,
} from "../../store/reducers/raffleSlice";
import { UserSelector } from "../../store/reducers/userSlice";

const LatestSlider = () => {
    const dispatch = useDispatch();
    let urlParams = useParams();
    const { isRaffleSuccess, raffles } = useSelector(RaffleSelector);
    const { userRaffles, isLogined } = useSelector(UserSelector);

    useEffect(() => {
        dispatch(getRaffleSlider(urlParams.raffleid));
    }, []);

    return (
        <Col md="12">
            <div className="latest_slide">
                <Row className="justify-content-center">
                    <Col md="10" lg="9" xl="7">
                        <div className="main_heading text-center">
                            <h1>Latest Raffles</h1>
                            <p>
                                Check out the recently updated raffles and enter
                                to win spectacular crypto/NFT prizes. Enjoy the
                                fair competition and play by the rules.
                            </p>
                        </div>
                    </Col>
                </Row>

                <Row>
                    {isRaffleSuccess && raffles.length > 0 ? (
                        raffles.map((raffle, index) => {
                            let entered = raffle.entered || 0;
                            let remain = raffle.total - entered || 0;

                            let btname = 0;
                            if (isLogined && userRaffles.length > 0) {
                                let already = userRaffles.findIndex(
                                    (e) =>
                                        String(e.raffleId) ===
                                        String(raffle._id)
                                );
                                if (already > -1) {
                                    btname = userRaffles[
                                        already
                                    ].hasOwnProperty("isDone")
                                        ? 1
                                        : 0;
                                } else {
                                    btname = 0;
                                }
                            }
                            return (
                                <Col className="d-flex" lg="3" md="6" sm="12">
                                    <Card className="card_box">
                                        <div className="card_heading d-flex align-items-center justify-content-between">
                                            <h6>
                                                <NavLink
                                                    to={{
                                                        pathname: `/raffle/${raffle._id}`,
                                                        state: {
                                                            raffledata: raffle,
                                                        },
                                                    }}
                                                >
                                                    <span>
                                                        {raffle.currency ==
                                                        1 ? (
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
                                                    </span>
                                                    {raffle.winingamount}{" "}
                                                    {raffle.name}
                                                </NavLink>
                                            </h6>
                                            <div className="free_entry">
                                                <span>
                                                    {raffle.raffletype === 0
                                                        ? "FREE"
                                                        : "PAID"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="card_img">
                                            <div className="raffleid">
                                                <span className="event-nft-id">
                                                    #{raffle.autoraffleId}
                                                </span>
                                            </div>

                                            <div className="received_box">
                                                <span className="black_hours_left hours_left">
                                                    {entered} Received
                                                </span>
                                            </div>

                                            <NavLink
                                                to={{
                                                    pathname: `/raffle/${raffle._id}`,
                                                    state: {
                                                        raffledata: raffle,
                                                    },
                                                }}
                                            >
                                                <img
                                                    alt="raffle_img"
                                                    src={`https://raffle.upcomingnft.net/uploads/${raffle.raffleimage}`}
                                                />
                                            </NavLink>

                                            <div className="holders_event">
                                                <span>
                                                    {raffle.total} Participants
                                                </span>
                                            </div>
                                        </div>

                                        <div className="card_description">
                                            {isLogined ? (
                                                <>
                                                    {btname === 0 ? (
                                                        <NavLink
                                                            to={{
                                                                pathname: `/raffle/${raffle._id}`,
                                                                state: {
                                                                    raffledata:
                                                                        raffle,
                                                                },
                                                            }}
                                                            className="evrnt_btn main_btn"
                                                        >
                                                            Enter Now
                                                        </NavLink>
                                                    ) : (
                                                        <span className="evrnt_btn main_btn register_btn">
                                                            Registered
                                                        </span>
                                                    )}
                                                </>
                                            ) : (
                                                <NavLink
                                                    to={{
                                                        pathname: `/raffle/${raffle._id}`,
                                                        state: {
                                                            raffledata: raffle,
                                                        },
                                                    }}
                                                    className="evrnt_btn main_btn"
                                                >
                                                    Enter Now
                                                </NavLink>
                                            )}
                                            <p className="holders_text">
                                                {remain} entries remaining for
                                                winner announcement
                                            </p>
                                        </div>
                                    </Card>
                                </Col>
                            );
                        })
                    ) : raffles.length == 0 ? (
                        <Col md="12" lg="12" xl="12" className="d-flex">
                            <h6>Currently not active any raffle !</h6>
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
            </div>
        </Col>
    );
};

export default LatestSlider;
