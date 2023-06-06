import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { FaTwitter, FaHeart, FaRetweet, FaEnvelope, FaTimes, FaCheck, FaLongArrowAltRight } from "react-icons/fa";
import { buyTicket, RaffleSelector } from '../../store/reducers/raffleSlice';
import { UserSelector } from '../../store/reducers/userSlice';
import moment from 'moment';


const FollowStepsFrom = () => {
    const dispatch = useDispatch();
    const { user_id } = useSelector(UserSelector);
    const { currentRaffle } = useSelector(RaffleSelector);
    const [user, setUser] = useState("");
    const [isFollowing, setIsFollowing] = useState(false);
    const [hasRetweeted, setHasRetweeted] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const handleTwitterLogin = async (event) => {
        event.preventDefault();
        window.open("http://localhost:8080/auth/connect-twitter", "_self");
    };
    const handleTwitterLogout = async (event) => {
        event.preventDefault();
        window.open("http://localhost:8080/auth/logout", "_self");
    };

    // console.log("user_id", user_id);
    // console.log("currentRaffle", currentRaffle._id);

    const clickregister = () => {
        dispatch(buyTicket({ userid: user_id, raffleId: currentRaffle._id }))
    };

    return (
        <div className='connect_free_box'>
            <div className='freeentry_box'>
                <h3>Free Entry <span>(No Gas)</span></h3>
            </div>
            {/* <div className='follow_box'>
                <h5>Follow the steps below to register.</h5>
                <p>Follow Twitter Like, and Retweet the raffle tweet and lastly.</p>
                <Row>
                    <Col md="12">
                        <div className='steps_box'>
                            <FaTwitter /> Follow <a href='#' target={"_blank"}>hotlootscom</a> On Twitter
                            <span className='verify-success'>
                                <FaCheck />
                            </span>
                            <span className='verify-false'>
                                <FaTimes />
                            </span>
                        </div>
                    </Col>
                    <Col md="12">
                        <div className='steps_box'>
                            <FaHeart /> Must Like <a href='#' target={"_blank"}>this tweet</a>
                            <span className='verify-success'>
                                <FaCheck />
                            </span>
                            <span className='verify-false'>
                                <FaTimes />
                            </span>
                        </div>
                    </Col>
                    <Col md="12">
                        <div className='steps_box retweet'>
                            <FaRetweet /> Must Retweet <a href='#' target={"_blank"}>this tweet</a>
                            <span className='verify-success'>
                                <FaCheck />
                            </span>
                            <span className='verify-false'>
                                <FaTimes />
                            </span>
                        </div>
                    </Col>
                    <Col md="12">
                        <div className='steps_box margin-bottom'>
                            <FaEnvelope /> Validate your email
                            <span className='verify-success'>
                                <FaCheck />
                            </span>
                            <span className='verify-false'>
                                <FaTimes />
                            </span>
                        </div>
                        <div className='email_noti'>
                            <NavLink to="" className='resend_mail'>Resend Mail</NavLink>
                        </div>
                    </Col>
                </Row>
                <div className='connect_twitter'>
                    <h5>Connect Your Twitter</h5>
                    <div className='d-flex flex-sm-row flex-column justify-content-between align-items-center'>
                        <div className='twit_cont'>
                            <h6><FaTwitter /> Twitter</h6>
                        </div>
                        <div className='twit_cont_btn'>
                            <NavLink to="#" className='twitter_connect'>Connect Twitter</NavLink>
                        </div>
                    </div>
                </div>
                <div className="register_btn">
                    <button>Click to Register <FaLongArrowAltRight /></button>
                </div>
            </div> */}
            <div className='follow_box'>
                <h5>Follow the steps below to register.</h5>
                <p>Follow Twitter Like, and Retweet the raffle tweet and lastly.</p>
                <Row>
                    <Col md="12">
                        <div className='steps_box'>
                            <FaTwitter /> Follow <a href='https://twitter.com/NftUpcoming' target={"_blank"}>@NftUpcoming</a> On Twitter
                            {isFollowing ? (
                                <span className='verify-success'>
                                    <FaCheck />
                                </span>
                            ) : (
                                <span className='verify-false'>
                                    <FaTimes />
                                </span>
                            )}{" "}
                        </div>
                    </Col>
                    <Col md="12">
                        <div className='steps_box'>
                            <FaHeart /> Must Like <a href='https://twitter.com/NftUpcoming/status/1630108013804634114' target={"_blank"}>this tweet</a>
                            {hasLiked ? (
                                <span className='verify-success'>
                                    <FaCheck />
                                </span>
                            ) : (
                                <span className='verify-false'>
                                    <FaTimes />
                                </span>
                            )}{" "}
                        </div>
                    </Col>
                    <Col md="12">
                        <div className='steps_box retweet'>
                            <FaRetweet /> Must Retweet <a href='https://twitter.com/NftUpcoming/status/1630108013804634114' target={"_blank"}>this tweet</a>
                            {hasRetweeted ? (
                                <span className='verify-success'>
                                    <FaCheck />
                                </span>
                            ) : (
                                <span className='verify-false'>
                                    <FaTimes />
                                </span>
                            )}{" "}
                        </div>
                    </Col>
                    <Col md="12">
                        <div className='steps_box margin-bottom'>
                            <FaEnvelope /> Validate your email
                            <span className='verify-success'>
                                <FaCheck />
                            </span>
                            <span className='verify-false'>
                                <FaTimes />
                            </span>
                        </div>
                        <div className='email_noti'>
                            <NavLink to="" className='resend_mail'>Resend Mail</NavLink>
                        </div>
                    </Col>
                </Row>
                <div className='connect_twitter'>
                    <h5>Connect Your Twitter</h5>
                    <div className='d-flex flex-sm-row flex-column justify-content-between align-items-center'>
                        <div className='twit_cont'>
                            <h6><FaTwitter /> Twitter</h6>
                        </div>
                        <div className='twit_cont_btn'>
                            {authenticated ? (
                                <>
                                    <p>{user}</p>
                                    <button onClick={handleTwitterLogout}>
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <button className='twitter_connect' onClick={handleTwitterLogin}>
                                    Connect Twitter
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="register_btn">
                    <button onClick={clickregister}>Click to Register <FaLongArrowAltRight /></button>
                </div>
            </div>
        </div>


    )
}
export default FollowStepsFrom;