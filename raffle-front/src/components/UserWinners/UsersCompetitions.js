import React, { } from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Row, Spinner } from 'react-bootstrap';
import { Card } from 'antd';
import { BsPatchCheckFill } from "react-icons/bs";
import { SyncOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { UserSelector, userwinnerById, clearMessage, verifyMail } from '../../store/reducers/userSlice';

const UsersCompetitions = () => {
    const { user_id, userRaffles, isLogined, iswinnerSuccess, iswinnerLoading, winnerParticipation } = useSelector(UserSelector);
    return (
        <Row>
            {
                iswinnerLoading &&
                    <>
                        <Col
                            md="12"
                            lg="12"
                            xl="12"
                            className="d-flex"
                        >
                            <Card className="card_box">
                                <div className="card_heading d-flex align-items-center justify-content-center">
                                    <SyncOutlined
                                        style={{
                                            margin: "15px",
                                            fontSize: "40px",
                                            color: "#1DA1F2",
                                        }}
                                        spin
                                    />
                                </div>
                            </Card>
                        </Col>
                    </>
            }
            {
                iswinnerSuccess && winnerParticipation.length > 0 ? (
                winnerParticipation.map((raffle, index) => {
                    let entered = raffle.raffleId.entered || 0;
                    let remain =
                        entered > raffle.raffleId.total
                            ? 0
                            : raffle.raffleId.total - entered || 0;

                    let btname = 0;
                    if (isLogined && userRaffles.length > 0) {
                        let already = userRaffles.findIndex(
                            (e) => String(e.raffleId) === String(raffle._id)
                        );
                        if (already > -1) {
                            btname = userRaffles[already].hasOwnProperty(
                                "isDone"
                            )
                                ? 1
                                : 0;
                        } else {
                            btname = 0;
                        }
                    }
                    return (
                        <Col
                            md="6"
                            lg="4"
                            xl="3"
                            className="d-flex"
                            key={index}
                        >
                            <Card className="card_box">
                                <div className="card_heading d-flex align-items-center justify-content-between">
                                    <h6>
                                        <NavLink
                                            to={{
                                                pathname: `/raffle/${raffle.raffleId._id}`,
                                                state: { raffledata: raffle },
                                            }}
                                        >
                                            <span>
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
                                            </span>
                                            {raffle.raffleId.winingamount} {raffle.raffleId.name}
                                        </NavLink>
                                    </h6>
                                    <div className="free_entry">
                                        <span>
                                            {raffle.raffleId.raffletype === 0
                                                ? "FREE"
                                                : "PAID"}
                                        </span>
                                    </div>
                                </div>

                                <div className="card_img">
                                    <div className="raffleid">
                                        <span className="event-nft-id">
                                            #{raffle.raffleId.autoraffleId}
                                        </span>
                                    </div>

                                    <div className="received_box">
                                        <span className="black_hours_left hours_left">
                                            {entered} Received
                                        </span>
                                    </div>

                                    <NavLink
                                        to={{
                                            pathname: `/raffle/${raffle.raffleId._id}`,
                                            state: { raffledata: raffle },
                                        }}
                                    >
                                        <img
                                            alt="raffle_img"
                                            src={`https://raffle.upcomingnft.net/uploads/${raffle.raffleId.raffleimage}`}
                                        />
                                    </NavLink>

                                    <div className="holders_event">
                                        <span>{raffle.raffleId.total} Participants</span>
                                    </div>
                                </div>

                                <div className="card_description">
                                    {raffle.raffleId.status === 0 ? (
                                        <span className="evrnt_btn main_btn register_btn">
                                            Closed
                                        </span>
                                    ) : isLogined ? (
                                        <>
                                            {btname === 0 ? (
                                                <NavLink
                                                    to={{
                                                        pathname: `/raffle/${raffle.raffleId._id}`,
                                                        state: {
                                                            raffledata: raffle,
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
                                                pathname: `/raffle/${raffle.raffleId._id}`,
                                                state: { raffledata: raffle },
                                            }}
                                            className="evrnt_btn main_btn"
                                        >
                                            Enter Now
                                        </NavLink>
                                    )}
                                    <p className="holders_text">
                                        {remain} entries remaining for winner
                                        announcement
                                    </p>
                                </div>
                            </Card>
                        </Col>
                    );
                })
            ) : winnerParticipation.length == 0 && (
                <Col md="12" lg="12" xl="12" className="d-flex">
                    <h6>No Data Found!</h6>
                </Col>
            )
            }
        </Row>

    )
}

export default UsersCompetitions;