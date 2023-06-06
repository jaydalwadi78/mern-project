import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import RaffleISingle from './RaffleISingle';
import WalletConnectFrom from './WalletConnectFrom';
import  RafflesDescription from './RafflesDescription';

const RafflesPartOne = () => {

    return (
        
        <>
            <Row>
                <Col md="7" className='d-flex'>
                    <RaffleISingle />
                </Col>
                <Col md="5" className='d-flex'>
                    <WalletConnectFrom />
                </Col>
            </Row>
            <RafflesDescription />
        </>


    )
}
export default RafflesPartOne;