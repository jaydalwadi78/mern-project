import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { SyncOutlined } from "@ant-design/icons";

import { getWinners, RaffleSelector } from "../../store/reducers/raffleSlice";

const WinnerTable = () => {
    const dispatch = useDispatch();
    const { closeRaffles, isCloseLoading, isCloseSuccess } =
        useSelector(RaffleSelector);

    useEffect(() => {
        dispatch(getWinners());
    }, []);

    return (
        <Col md="12">
            <div className="table_wrapp">
                <table width={"100%"}>
                    <thead>
                        <tr>
                            <th>Raffle</th>
                            <th>Winner</th>
                            <th>Prize Value</th>
                            <th>Transaction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isCloseLoading && (
                            <>
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        <SyncOutlined
                                            style={{
                                                margin: "15px",
                                                fontSize: "40px",
                                                color: "#1DA1F2",
                                            }}
                                            spin
                                        />
                                    </td>
                                </tr>
                            </>
                        )}

                        {isCloseSuccess && closeRaffles.length === 0 && (
                            <>
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        No winner found
                                    </td>
                                </tr>
                            </>
                        )}

                        {isCloseSuccess &&
                            closeRaffles.length > 0 &&
                            closeRaffles.map((raffle, ind) => {
                                const tx = raffle.transaction
                                    ? raffle.transaction
                                    : null;
                                return (
                                    <tr>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="winner_img">
                                                <NavLink
                                                to={`/raffle/${raffle._id}`}
                                                >
                                                    <img
                                                        width={"70"}
                                                        src={`https://raffle.upcomingnft.net/uploads/${raffle.raffleimage}`}
                                                        alt={
                                                            raffle.winingamount
                                                        }
                                                    />
                                                </NavLink>
                                                </div>
                                                <div className="winner_title">
                                                <NavLink
                                                to={`/raffle/${raffle._id}`}
                                                >
                                                    <h6>
                                                        {raffle.winingamount}{" "}
                                                        {raffle.currency === 0
                                                            ? "ETH"
                                                            : "USD"}{" "}
                                                        Raffle
                                                    </h6>
                                                    </NavLink>
                                                    <p className="spots">
                                                        {raffle.total}{" "}
                                                        participants
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="winner_user">
                                                <NavLink to={`/user-winner/${raffle.winnerId}`}>
                                                    {raffle.winnerUser
                                                    ? raffle.winnerUser.name
                                                    : "Not exist"}
                                                </NavLink>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="winner_price">
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
                                                {raffle.winingamount}{" "}
                                                {raffle.currency === 0
                                                    ? "ETH"
                                                    : "USD"}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="winner_tran">
                                                {tx ? (
                                                    <a
                                                        target="_blank"
                                                        href={`${tx}`}
                                                    >
                                                        {tx < 8
                                                            ? tx
                                                            : tx.substring(
                                                                  0,
                                                                  9
                                                              ) + "..."}
                                                    </a>
                                                ) : null}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </Col>
    );
};

export default WinnerTable;
