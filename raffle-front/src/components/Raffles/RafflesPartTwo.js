import { useState } from "react";
import { Col, Row } from "react-bootstrap";

import RaffleISingle from "./RaffleISingle";
import FollowStepsFrom from "./FollowStepsFrom";
import RafflesDescription from "./RafflesDescription";
import LatestSlider from "./LatestSlider";
import WinnerRaffles from "./WinnerRaffles";

const RafflesPartTwo = (props) => {
    const { raffle, isActive } = props;
    return (
        <>
            <Row>
                <Col md="7" className="connect_raffle">
                    <RaffleISingle raffle={raffle} />
                    <RafflesDescription raffle={raffle} />
                </Col>
                <Col md="5">
                    {isActive === 1 ? <FollowStepsFrom /> : <WinnerRaffles raffle={raffle} />}
                </Col>
            </Row>
            <Row>
                <LatestSlider />
            </Row>
        </>
    );
};
export default RafflesPartTwo;
