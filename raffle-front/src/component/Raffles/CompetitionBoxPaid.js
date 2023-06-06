import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FaEthereum, FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { UserSelector, userwinnerById, clearMessage, verifyMail } from '../../store/reducers/userSlice';


const CompetitionBoxPaid = () => {

    const { user_id, userRaffles, isLogined, winnerParticipation } = useSelector(UserSelector);
    console.log("winnerParticipation>>>", winnerParticipation);

    return (
        <>
            <Row>
                <Col md="12" lg="6" className='d-flex align-items-end'>
                    <div className='competitionbox'>
                        <div className='entrys_bg'>
                            <h2>
                                <span class="entry_dis">0</span>
                                1
                            </h2>
                        </div>
                        <h3 className='entrys_content'>Entry</h3>
                        <div className='entry_fees'>
                            <button> <FaEthereum /> 0.10</button>
                        </div>
                        <ul className='free_entries'>
                            <li><FaCheckCircle /> Includes 1 Free Entries</li>
                            <li><FaCheckCircle /> Gas Saving = 0x</li>
                        </ul>
                    </div>
                </Col>
                <Col md="12" lg="6" className='d-flex align-items-end'>
                    <div className='competitionbox'>
                        <div className='entrys_bg'>
                            <h2>
                                <span class="entry_dis">0</span>
                                25
                            </h2>
                        </div>
                        <h3 className='entrys_content'>Entry</h3>
                        <div className='entry_fees'>
                            <button> <FaEthereum /> 0.25</button>
                        </div>
                        <ul className='free_entries'>
                            <li><FaCheckCircle /> Includes 10 Free Entries</li>
                            <li><FaCheckCircle /> Gas Saving = 10x</li>
                        </ul>
                    </div>
                </Col>
                <Col md="12" lg="6" className='d-flex align-items-end'>
                    <div className='competitionbox'>
                        <div className='entrys_bg'>
                            <h2>
                                <span class="entry_dis">0</span>
                                50
                            </h2>
                        </div>
                        <h3 className='entrys_content'>Entry</h3>
                        <div className='entry_fees'>
                            <button> <FaEthereum /> 0.5</button>
                        </div>
                        <ul className='free_entries'>
                            <li><FaCheckCircle /> Includes 35 Free Entries</li>
                            <li><FaCheckCircle /> Gas Saving = 35x</li>
                        </ul>
                    </div>
                </Col>
                <Col md="12" lg="6" className='d-flex align-items-end'>
                    <div className='competitionbox'>
                        <div className='entrys_bg'>
                            <h2>
                                <span class="entry_dis">0</span>
                                75
                            </h2>
                        </div>
                        <h3 className='entrys_content'>Entry</h3>
                        <div className='entry_fees'>
                            <button> <FaEthereum /> 0.75</button>
                        </div>
                        <ul className='free_entries'>
                            <li><FaCheckCircle /> Includes 45 Free Entries</li>
                            <li><FaCheckCircle /> Gas Saving = 85x</li>
                        </ul>
                    </div>
                </Col>
                <Col md="12" className='d-flex align-items-end'>
                    <div className='competitionbox'>
                        <div className='entrys_bg'>
                            <h2>
                                <span class="entry_dis">0</span>
                                100
                            </h2>
                        </div>
                        <h3 className='entrys_content'>Entry</h3>
                        <div className='entry_fees'>
                            <button> <FaEthereum /> 1</button>
                        </div>
                        <ul className='free_entries'>
                            <li><FaCheckCircle /> Includes 45 Free Entries</li>
                            <li><FaCheckCircle /> Gas Saving = 85x</li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default CompetitionBoxPaid;