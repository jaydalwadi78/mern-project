import { useState } from "react";
import { Col, Row } from "react-bootstrap";

import RaffleISingle from "./RaffleISingle";
import WalletConnectFrom from "./WalletConnectFrom";
import RafflesDescription from "./RafflesDescription";
import LatestSlider from "./LatestSlider";
import WinnerRaffles from "./WinnerRaffles";

const RafflesPartOne = (props) => {
    const { raffle, isActive } = props;
    return (
        <>
            <Row>
                <Col md="7" className="d-flex">
                    <RaffleISingle raffle={raffle} />
                </Col>
                <Col md="5" className="d-flex">
                    {isActive === 1 ? <WalletConnectFrom /> : <WinnerRaffles raffle={raffle} />}
                </Col>
            </Row>
            <RafflesDescription raffle={raffle} />
            <Row>
                <LatestSlider />
            </Row>
        </>
    );
};
export default RafflesPartOne;
