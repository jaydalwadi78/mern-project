import { useState } from "react";
import { Col, Row } from "react-bootstrap";

//import RaffleISinglePaid from "./RaffleISinglePaid";
import CompetitionBoxPaid from "./CompetitionBoxPaid";
import RafflesDescription from "./RafflesDescription";
import LatestSlider from "./LatestSlider";

const RafflesPartPaid = (props) => {
    const { raffle } = props;
    return (
        <>
            <Row>
                <Col md="7" className="d-flex">
                    {/* <RaffleISinglePaid raffle={raffle} /> */}
                </Col>
                <Col md="5" className="d-flex">
                    <CompetitionBoxPaid />
                </Col>
            </Row>
            <br /> <br />   <br /> <br />
            <Row>
                <LatestSlider />
            </Row>
        </>
    );
};
export default RafflesPartPaid;
