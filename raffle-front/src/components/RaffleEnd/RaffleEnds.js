import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import RaffleEndImg from './RaffleEndImg';
import RaffleEndContent from './RaffleEndContent';

const RaffleEnds = () => {

    return (


        <Col md="12">
            <div className="raffleend_wrapp">
                <Row>
                    <RaffleEndImg />
                    <RaffleEndContent />
                </Row>
            </div>
        </Col>


    )
}
export default RaffleEnds;