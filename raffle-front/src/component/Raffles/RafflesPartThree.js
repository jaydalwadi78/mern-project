import { useState } from "react";
import { Col, Row } from "react-bootstrap";

import RaffleISingle from "./RaffleISingle";
import WinnerRaffles from "./WinnerRaffles";
import RafflesDescription from "./RafflesDescription";
import LatestSlider from "./LatestSlider";

const RafflesPartThree = (props) => {
    const { raffle } = props;
    return (
        <>
            <Row>
                <Col md="7" className="d-flex">
                    <RaffleISingle raffle={raffle} />
                </Col>
                <Col md="5" className="d-flex">
                    <WinnerRaffles />
                </Col>
            </Row>
            <RafflesDescription raffle={raffle} />
            <Row>
                <LatestSlider />
            </Row>
        </>
    );
};
export default RafflesPartThree;
