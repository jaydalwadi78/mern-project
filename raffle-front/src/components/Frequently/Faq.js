import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { GiArcheryTarget } from "react-icons/gi";
import { FaCheck } from "react-icons/fa";

const Faq = () => {
    return (
        <Col md="12">
            <div className='faq_wrapp'>
                <Row className='justify-content-center'>
                    <Col md="10" lg="9" xl="7">
                        <div className='main_heading text-center'>
                            <h2>Frequently Asked Questions</h2>
                            <p>We have answered some of the frequently asked questions below to better understand about raffles by Upcomingnft.</p>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col lg="6">
                        <div className='faq_box'>
                            <h6><GiArcheryTarget /> What is Raffles by Upcomingnft?</h6>
                            <p>We are a Web 3 Raffle Platform for Crypto/NFT Enthusiasts to win Free/Paid NFT and Crypto Prizes. User can participate for free and get a chance to win ETH and NFTs. We also have paid raffles as well to increase the chance of winning. The winner will be announced once all the requirements are fulfilled. Please check the steps to participate.</p>
                        </div>
                        <div className='faq_box'>
                            <h6><GiArcheryTarget /> How many Raffles are there? </h6>
                            <p>There are multiple raffles to apply, and we add new raffles every week.</p>
                        </div>
                        <div className='faq_box'>
                            <h6><GiArcheryTarget /> How can I Increase my Chances of Winning? </h6>
                            <p>Every user has an equal chance of winning at Upcomingnft raffles; however, in paid raffles, there is more chance for you to win, whereas in free raffle user has a limitation of 1 entry per wallet.</p>
                        </div>
                        <div className='faq_box'>
                            <h6><GiArcheryTarget /> How to Participate in these Raffles? </h6>
                            <p>You can participate in any raffle by following six easy steps where you need to validate your email, Connect your Twitter, like and retweet the tweet mentioned.</p>
                        </div>
                    </Col>

                    <Col lg="6">
                        <div className='faq_box'>
                            <h6><GiArcheryTarget /> How Does Competition Work? </h6>
                            <p>Basically, our steps are crystal clear and easy to follow.</p>
                            <ul>
                                <li><FaCheck />Once the competition draw criteria have been fulfilled, the competition will no longer accept new entries, and we will draw a winner using the Twitterpicker unbiased prize winner selection platform</li>
                            </ul>
                        </div>
                        <div className='faq_box'>
                            <h6><GiArcheryTarget /> When will the winner be announced?</h6>
                            <p>The winner will be announced once all the required entries have been registered. You can check the winner's list on the winner announcement page on raffle entries.</p>
                        </div>
                        <div className='faq_box'>
                            <h6><GiArcheryTarget /> How Often Does Upcomingnft Provides Free Raffles?</h6>
                            <p>We Provide Free raffles weekly and monthly to give an equal chance for users to participate and win amazing NFT/Crypto rewards. </p>
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>
    )
}
export default Faq;