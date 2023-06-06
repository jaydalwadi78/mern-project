import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FaRegUser } from "react-icons/fa";
//import { Progress } from 'antd';
import { Progress, Button, Checkbox, Form, Input, notification } from 'antd';
import { getNewPriceList, RaffleSelector } from '../../store/reducers/raffleSlice';
import { addUser } from '../../store/reducers/userSlice';
import { useDispatch, useSelector } from "react-redux";

const RaffleISingle = () => {
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();

    
    return (

        <div className='raffle_main'>
            <Row>
                <Col md="6" lg="5">
                    <div className='raffle_img'>
                        <img src={require('../../assets/imgs/10ETH.png')} alt="10ETH" />
                    </div>
                </Col>
                <Col md="6" lg="7">
                    <div className='raffle_conent'>
                        <h3>Captainz #6310 NFT Raffle</h3>
                        <div className='raffle_price'>
                            <h2><img src={require('../../assets/imgs/eth-icon.png')} alt="ETH" /> 5</h2>
                        </div>
                        <div className='participants_main d-flex justify-content-between align-items-center'>
                            <div className="participants_text">
                                <h6>Participants</h6>
                            </div>
                            <div className='participants_total'>
                                <h6>25000</h6>
                            </div>
                        </div>
                        <div className='progress_bar'>
                            <Progress percent={50} status="active" />
                        </div>
                        <div className='remaining '>
                            <span><FaRegUser /></span> 12500 entries remaining for winner announcement
                        </div>
                    </div>
                </Col>
            </Row>
        </div>

    )
}
export default RaffleISingle;