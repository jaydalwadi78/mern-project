import React, { useState, useEffect } from 'react'
import { Row, Col, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Card, notification } from 'antd';
import { SyncOutlined } from "@ant-design/icons";
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import { getRaffle, getRafflebyId, RaffleSelector } from "../../store/reducers/raffleSlice";
import { UserSelector, twittelLogin, getuserRaffles, clearMessage } from '../../store/reducers/userSlice';

const Raffle = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [api, contextHolder] = notification.useNotification();
    const { isRaffleSuccess, isRaffleLoading, raffles } = useSelector(RaffleSelector);
    const { user_id, userRaffles, isLogined } = useSelector(UserSelector);

    useEffect(() => {
        dispatch(getRaffle());
    }, [])
    
    useEffect(() => {
        if (user_id) {
            dispatch(getuserRaffles({
                user_id: user_id
            }));
            let twitterQry = searchParams.get('twitter');
            if (twitterQry == 'true') {
                dispatch(twittelLogin(user_id))
            }
        }
    }, [user_id])

    return (
        <Row>
            {
                isRaffleLoading && 
                <>
                        <Col
                            md="12"
                            lg="12"
                            xl="12"
                            className="d-flex"
                        >
                            <Card className="card_box">
                                <div className="card_heading d-flex align-items-center justify-content-center">
                                    <SyncOutlined
                                        style={{
                                            margin: "15px",
                                            fontSize: "40px",
                                            color: "#1DA1F2",
                                        }}
                                        spin
                                    />
                                </div>
                            </Card>
                        </Col>
                    </>
            }
            {
                isRaffleSuccess && raffles.length > 0 ?
                    raffles.map((raffle, index) => {
                        let entered = raffle.entered || 0;
                        let remain =
                        entered > raffle.total
                            ? 0
                            : raffle.total - entered || 0;

                        let btname = 0;
                        if(isLogined && userRaffles.length > 0){
                            let already = userRaffles.findIndex((e) => String(e.raffleId) === String(raffle._id));
                            if(already > -1){
                                btname = userRaffles[already].hasOwnProperty('isDone') ? 1 : 0;
                            }else{
                                btname = 0;
                            }
                        }
                        return (
                        <Col md="6" lg="4" xl="3" className='d-flex' key={index}>
                            <Card className='card_box'>
                                <div className='card_heading d-flex align-items-center justify-content-between'>
                                    <h6>
                                        {
                                        raffle.status === 0 ? (
                                            <NavLink to={{ pathname: `raffle/${raffle._id}`, state: { raffledata: raffle } }} >
                                            <span>
                                                {
                                                    raffle.currency == 1 ?
                                                    <img src={require('../../assets/imgs/usdt-coin.png')} alt="USDT" /> :
                                                    <img src={require('../../assets/imgs/eth-icon.png')} alt="ETH" />
                                                }
                                            </span>
                                            {raffle.winingamount} {raffle.name}
                                            </NavLink>
                                    ) :   
                                        <NavLink to={{ pathname: `raffle/${raffle._id}`, state: { raffledata: raffle } }} >
                                            <span>
                                                {
                                                    raffle.currency == 1 ?
                                                    <img src={require('../../assets/imgs/usdt-coin.png')} alt="USDT" /> :
                                                    <img src={require('../../assets/imgs/eth-icon.png')} alt="ETH" />
                                                }
                                            </span>
                                            {raffle.winingamount} {raffle.name}
                                        </NavLink>
                                    }
                                    </h6>
                                    <div className="free_entry">
                                        <span>{ raffle.raffletype === 0 ? "FREE" : "PAID"}</span>
                                    </div>
                                </div>

                                <div className='card_img'>
                                    <div className="raffleid">
                                        <span className="event-nft-id">#{raffle.autoraffleId}</span>
                                    </div>

                                    <div className="received_box">
                                        <span className="black_hours_left hours_left">{entered} Received</span>
                                    </div>

                                    {
                                        raffle.status === 0 ? (
                                            <NavLink to={{ pathname: `raffle/${raffle._id}`, state: { raffledata: raffle } }} >
                                                <img alt="raffle_img" src={`https://raffle.upcomingnft.net/uploads/${raffle.raffleimage}`} />
                                            </NavLink>
                                    ) :
                                        <NavLink to={{ pathname: `raffle/${raffle._id}`, state: { raffledata: raffle } }} >
                                            <img alt="raffle_img" src={`https://raffle.upcomingnft.net/uploads/${raffle.raffleimage}`} />
                                        </NavLink>
                                    }

                                    <div className="holders_event">
                                        <span>{raffle.total} Participants</span>
                                    </div>
                                </div>

                                <div className="card_description">
                                    {
                                        raffle.status === 0 ? (
                                        <NavLink to={{ pathname: `raffle/${raffle._id}`, state: { raffledata: raffle } }} className="evrnt_btn main_btn register_btn">Closed</NavLink>
                                    ) :
                                        isLogined ?
                                        <>
                                            { btname === 0 ?
                                                <NavLink to={{ pathname: `raffle/${raffle._id}`, state: { raffledata: raffle } }} className="evrnt_btn main_btn">Enter Now</NavLink> :
                                            <span className="evrnt_btn main_btn register_btn">Registered</span> }
                                        </> :
                                        <NavLink to={{ pathname: `raffle/${raffle._id}`, state: { raffledata: raffle } }} className="evrnt_btn main_btn">Enter Now</NavLink>
                                    }
                                    <p className="holders_text">{remain} entries remaining for winner announcement</p>
                                </div>
                            </Card>
                        </Col>
                    )})
                    :
                    isRaffleSuccess && raffles.length == 0 &&
                    <Col md="12" lg="12" xl="12" className='d-flex'>
                    <h6>Currently not active any raffle !</h6>
                    </Col>
            }
            
        </Row>

    )
}
export default Raffle;