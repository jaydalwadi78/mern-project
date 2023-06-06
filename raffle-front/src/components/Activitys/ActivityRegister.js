import React from "react";
import { Col } from "react-bootstrap";
import moment from "moment";

import {
    FaCheckCircle,
    FaTimesCircle,
    FaCalendarAlt,
    FaWallet,
    FaEthereum,
    FaUserAlt,
    FaTicketAlt,
    FaTrophy,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";

const ActivityRegister = ({
    activities,
    isactivityLoading,
    isactivitySuccess,
}) => {
    return (
        <Col md="12">
            {isactivitySuccess &&
                activities.length > 0 &&
                activities.map((activity, actIndex) => {
                    const {
                        autoparticipantId,
                        jointime,
                        isDone,
                        UserId: { name: username, address } = {},
                        raffleId: {
                            _id: raffleId,
                            name: raffleName,
                            total,
                            winingamount,
                            currency,
                            raffleimage,
                            status
                        } = {},
                    } = activity;

                    let joined = moment(jointime * 1000).format("LLL");
                    return (
                        <div className="register_bg d-flex align-items-center flex-md-row flex-column">
                            <div className="register_img">
                                <img
                                    src={`https://raffle.upcomingnft.net/uploads/${raffleimage}`}
                                    alt={winingamount}
                                />
                            </div>
                            <div className="register_content">
                                <p>
                                    <FaCalendarAlt /> {joined}
                                </p>
                                <h5>
                                    {isDone === 1 ? "Registered" : "Enter"} for{" "}
                                    {winingamount}{" "}
                                    {currency === 0 ? "ETH" : "USD"} Raffle{" "}
                                    {isDone === 1 ? (
                                        <FaCheckCircle />
                                    ) : (
                                        <FaTimesCircle color="red" />
                                    )}
                                </h5>
                                <ul>
                                    <li>
                                        <FaWallet /> Wallet :{" "}
                                        <span>
                                            {
                                                address ?
                                                    (address < 8 ? address : address.substring(0,9) + "...")
                                                    : null
                                            }
                                        </span>
                                    </li>
                                    <li>
                                        <FaEthereum /> Price :{" "}
                                        <span>
                                            {winingamount}{" "}
                                            {currency === 0 ? "ETH" : "USD"}
                                        </span>{" "}
                                    </li>
                                    <li>
                                        <FaUserAlt /> ID No. :{" "}
                                        <span>{autoparticipantId}</span>
                                    </li>
                                    <li>
                                        <FaTicketAlt /> Raffle :{" "}
                                        <span>{total}</span>{" "}
                                    </li>
                                    <li>
                                        <NavLink to={"/winner"}>
                                            <FaTrophy /> Winner
                                        </NavLink>
                                    </li>
                                    {
                                        status === 0 ? 
                                        <li>
                                            <NavLink
                                                to={{
                                                    pathname: `/raffle/${raffleId}`,
                                                }}
                                                className="evrnt_btn main_btn"
                                            >
                                                Closed
                                            </NavLink></li> :
                                        isDone === 1 ? (
                                        <li>
                                            <NavLink
                                                to={{
                                                    pathname: `/raffle/${raffleId}`,
                                                }}
                                                className="evrnt_btn main_btn"
                                            >
                                                Already Registered
                                            </NavLink>
                                        </li>
                                    ) : (
                                        <li>
                                            <NavLink
                                                to={{
                                                    pathname: `/raffle/${raffleId}`,
                                                }}
                                                className="evrnt_btn main_btn"
                                            >
                                                Enter Now
                                            </NavLink>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            {isactivityLoading && (
                <div className="d-flex justify-content-center align-items-center flex-md-row flex-column">
                    <SyncOutlined
                        style={{
                            fontSize: "60px",
                            marginBottom: "15px",
                            color: "#0389ff",
                        }}
                        spin
                    />
                </div>
            )}
        </Col>
    );
};

export default ActivityRegister;
