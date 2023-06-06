import React from 'react';
import { Row, Col } from 'react-bootstrap';
import WinnerTable from './WinnerTable';

const WinnerMain = () => {
    return (
        <Row className='justify-content-center'>
            <Col md="10" lg="9" xl="8">
                <div className='main_heading text-center'>
                    <h1>Winners</h1>
                    <p>This is the winner announcement page where you can check out all the winners of our Upcomingnft raffles.</p>
                    <p>Congratulation to all the winners; keep winning exciting NFT/crypto rewards with Upcomingnft raffles. </p>
                </div>
            </Col>

            <WinnerTable />
        </Row>
    )
}

export default WinnerMain;