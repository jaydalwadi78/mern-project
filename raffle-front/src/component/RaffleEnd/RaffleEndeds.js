import { useState } from 'react';
import { Row } from 'react-bootstrap';
import RaffleEnds from './RaffleEnds';
import Faq from '../Frequently/Faq';

const RaffleEndeds = () => {
    return (
        <Row>
            <RaffleEnds />
            <Faq />
        </Row>
    )
}
export default RaffleEndeds;