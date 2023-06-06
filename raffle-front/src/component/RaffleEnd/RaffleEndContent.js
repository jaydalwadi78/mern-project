import { useState } from 'react';
import { Col } from 'react-bootstrap';

const RaffleEndContent = () => {
    return (
        <Col md="7" lg="8">
            <div className='description_box'>
                <h3>10 ETH Raffle</h3>
                <div className='raffle_price'>
                    <h2>
                        <img src={require('../../assets/imgs/eth-icon.png')} alt="ETH" /> 5
                    </h2>
                </div>
                <h5>Description</h5>
                <p>Participant can now get Free ETH and Free NFTs (Coming soon) Just by Participating in our Free Raffles.Please follow the Steps required to enter.</p>
                <p>Our first Raffle, where user can participate for free and get a chance to win ETH. Participant can now get Free ETH and Free NFTs (Coming soon) Just by Participating in our Free Raffles.Please follow the Steps required to enter.</p>
                <p>We are Web 3 Raffle Platform for Crypto/NFT Enthusiasts to win Free/Paid NFTs and Crypto Prizes. Our first Raffle, where user can participate for free and get a chance to win ETH. The winner will be announced once all the required formalities are done as per the requirements.</p>
                <h6>Steps to follow:</h6>
                <p>Follow Hotloot’s Twitter</p>
                <p>Like, and Retweet the raffle tweet <br /> and lastly,</p>
                <p>Verify your email (Hotloots has a Right to disqualify suspicious entries.)</p>
            </div>
        </Col>
    )
}
export default RaffleEndContent;