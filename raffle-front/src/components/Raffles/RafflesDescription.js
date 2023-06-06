import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

const RafflesDescription = (props) => {
    const { raffle } = props;
    return (
        <Row>
            <Col md="12">
                <div className='description_box'>
                    <h5>Description</h5>
                    <p>You can now get Free ETH and Free NFTs (Coming soon) Just by Participating in our Free Raffles. Please follow the Steps required to enter.</p>
                    <p>We are a Web 3 Raffle Platform for Crypto/NFT Enthusiasts to win Free/Paid NFTs and Crypto Prizes. Join our exciting Raffles, where users can participate for free and get a chance to win NFTs/Crypto Rewards. The winner will be announced once all the required entries are registered.</p>
                    <h6>Enter this Raffle with 6 easy Steps: </h6>
                    <p>1. Follow Our Official Twitter Account </p>
                    <p>2. Like the Raffle Tweet Mentioned in the Steps </p>
                    <p>3. Retweet the Raffle Tweet Mentioned in the Steps </p>
                    <p>4. Validate your Email Address (If not done already) </p>
                    <p>5. Connect your Twitter Account </p>
                    <p>6. Click on "APPLY FOR THIS RAFFLE" button after getting the green check mark on all the steps. </p>
                    <br/>
                    <p>(Note: If you are not getting the green check mark on any step even after following all the steps, click on the "APPLY FOR THIS RAFFLE" button or refresh the page.) For any further issues, contact: <a href='mailto:support@upcomingnft.net'>support@upcomingnft.net</a></p>
                </div>
            </Col>
        </Row>


    )
}
export default RafflesDescription;