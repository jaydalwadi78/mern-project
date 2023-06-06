import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import RaffleISingle from './RaffleISingle';
import FollowStepsFrom from './FollowStepsFrom';
import  RafflesDescription from './RafflesDescription';

const RafflesPartTwo = () => {

    return (
        
        <>
            <Row>
                <Col md="7" className='connect_raffle'>
                    <RaffleISingle />
                    <RafflesDescription />
                </Col>
                <Col md="5" >
                    <FollowStepsFrom />
                </Col>
            </Row>
        </>


    )
}
export default RafflesPartTwo;