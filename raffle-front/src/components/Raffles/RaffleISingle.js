import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FaRegUser } from "react-icons/fa";
//import { Progress } from 'antd';
import { Progress, Button, Checkbox, Form, Input, notification } from 'antd';

const RaffleISingle = ({ raffle }) => {
    let entered = raffle.entered || 0;
    let remain = ( entered > raffle.total ) ? 0 : raffle.total - entered;
    let perct = ((100*entered/raffle.total) < 10) ? 1 : (100*entered/raffle.total);
    
    return (
        <div className='raffle_main'>
            <Row>
                <Col md="6" lg="5">
                    <div className='raffle_img'>
                        <img src={`https://raffle.upcomingnft.net/uploads/${raffle.raffleimage}`} alt={raffle.name} />
                    </div>
                </Col>
                <Col md="6" lg="7">
                    <div className='raffle_conent'>
                        <h3>{raffle.name}</h3>
                        <div className='raffle_price'>
                            <h2>
                            {
                                raffle.currency == 1 ?
                                <img src={require('../../assets/imgs/usdt-coin.png')} alt="USDT" /> :
                                <img src={require('../../assets/imgs/eth-icon.png')} alt="ETH" />
                            } {raffle.winingamount}</h2>
                        </div>
                        <div className='participants_main d-flex justify-content-between align-items-center'>
                            <div className="participants_text">
                                <h6>Participants</h6>
                            </div>
                            <div className='participants_total'>
                                <h6>{raffle.total}</h6>
                            </div>
                        </div>
                        <div className='progress_bar'>
                            <Progress percent={perct} status="active" />
                        </div>
                        <div className='remaining '>
                            <span><FaRegUser /></span> {remain} entries remaining for winner announcement
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default RaffleISingle;