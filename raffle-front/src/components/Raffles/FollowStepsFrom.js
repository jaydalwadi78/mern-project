import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Alert, Space, Button, Spin } from "antd";
import {
    FaTwitter,
    FaHeart,
    FaRetweet,
    FaEnvelope,
    FaTimes,
    FaCheck,
    FaLongArrowAltRight,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    buyTicket,
    RaffleSelector,
    clearErrors,
} from "../../store/reducers/raffleSlice";
import { resendMail, UserSelector, clearMessage } from "../../store/reducers/userSlice";
import { SyncOutlined } from "@ant-design/icons";
import CONFIG from "../../config";

const FollowStepsFrom = () => {
    const dispatch = useDispatch();
    const {
        userEntry,
        currentRaffle,
        loading,
        tweetLikedmsg,
        tweetRetweetmsg,
        tweetFollowmsg,
    } = useSelector(RaffleSelector);
    const {
        user_id,
        name,
        email,
        email_verified,
        twitter_screen_name,
        twitter_verified,
        isLogined,
        isResendMailSusscees,
        isResendMailLoading
    } = useSelector(UserSelector);
    const [user, setUser] = useState("");
    const [isFollowing, setIsFollowing] = useState(false);
    const [hasRetweeted, setHasRetweeted] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);

    const handleTwitterLogin = async (event) => {
        event.preventDefault();
        window.open(`${CONFIG.AUTH_PATH}connect-twitter`, "_self");
    };
    const handleTwitterLogout = async (event) => {
        event.preventDefault();
        window.open(`${CONFIG.AUTH_PATH}logout`, "_self");
    };

    const clickregister = () => {
        dispatch(buyTicket({ userid: user_id, raffleId: currentRaffle._id }));
    };

    const resubscribe = () => {
        dispatch(
            resendMail({
                email: email,
                name: name,
            })
        );
    };

    const antIcon = (
        <SyncOutlined style={{ fontSize: 24, color: "#52c41a" }} spin />
    );

    const TweetError = () => {
        return (
            <>
                <p>
                    You need to retweet (not quote tweet) the required Tweet to
                    be able to register.
                </p>
                <div>
                    Must Retweet{" "}
                    <a
                        href={`https://twitter.com/intent/retweet?tweet_id=${currentRaffle.tweetId}`}
                        target={"_blank"}
                    >
                        this tweet
                    </a>
                </div>
            </>
        );
    };

    const LikeError = () => {
        return (
            <>
                <p>
                    You need to like the required Tweet to be able to register.
                </p>
                <div>
                    Must Like{" "}
                    <a
                        href={`https://twitter.com/intent/like?tweet_id=${currentRaffle.tweetId}`}
                        target={"_blank"}
                    >
                        this tweet
                    </a>
                </div>
            </>
        );
    };

    const FollowError = () => {
        return (
            <>
                <p>You need to follow @NftUpcoming on Twitter to register.</p>
                <div>
                    Follow{" "}
                    <a
                        href={`https://twitter.com/NftUpcoming`}
                        target={"_blank"}
                    >
                        @NftUpcoming
                    </a>{" "}
                    on twitter
                </div>
            </>
        );
    };

    const ResendMail = () => {
        return (
            <>
                <p>We have sent you an email for verification.</p>
                <p>Check your Inbox and verify your email address.</p>
            </>
        );
    };

    return (
        <div className="connect_free_box">
            <div className="freeentry_box">
                <h3>
                    Free Entry <span>(No Gas)</span>
                </h3>
            </div>
            <div className="follow_box">
                <h5>Follow the steps below to register.</h5>

                <Row>
                    <Col md="12">
                        <div className="steps_box">
                            <FaTwitter /> Follow{" "}
                            <a
                                href="https://twitter.com/upcomingraffle"
                                target={"_blank"}
                            >
                                @upcomingraffle
                            </a>{" "}
                            On Twitter
                            {twitter_verified === 1 ? (
                                <span className="verify-success">
                                    <FaCheck />
                                </span>
                            ) : (
                                <span className="verify-false">
                                    <FaTimes />
                                </span>
                            )}
                        </div>
                        {tweetFollowmsg === true && (
                            <>
                                <Alert
                                    className="mb-3"
                                    message=<FollowError />
                                    type="error"
                                    closable
                                    onClose={(e) => {
                                        dispatch(
                                            clearErrors({
                                                tweetFollowmsg: tweetFollowmsg,
                                            })
                                        );
                                    }}
                                />
                            </>
                        )}
                    </Col>
                    <Col md="12">
                        <div className="steps_box">
                            <FaHeart /> Must Like{" "}
                            <a
                                href={`https://twitter.com/intent/like?tweet_id=${currentRaffle.tweetId}`}
                                target={"_blank"}
                            >
                                this tweet
                            </a>
                            {userEntry && userEntry.twiter_like === 1 ? (
                                <span className="verify-success">
                                    <FaCheck />
                                </span>
                            ) : (
                                <span className="verify-false">
                                    <FaTimes />
                                </span>
                            )}
                        </div>
                        {tweetLikedmsg === true && (
                            <>
                                <Alert
                                    className="mb-3"
                                    message=<LikeError />
                                    type="error"
                                    closable
                                    onClose={(e) => {
                                        dispatch(
                                            clearErrors({
                                                tweetLikedmsg: tweetLikedmsg,
                                            })
                                        );
                                    }}
                                />
                            </>
                        )}
                    </Col>
                    <Col md="12">
                        <div className="steps_box retweet">
                            <FaRetweet /> Must Retweet{" "}
                            <a
                                href={`https://twitter.com/intent/retweet?tweet_id=${currentRaffle.tweetId}`}
                                target={"_blank"}
                            >
                                this tweet
                            </a>
                            {userEntry && userEntry.twiter_retweet === 1 ? (
                                <span className="verify-success">
                                    <FaCheck />
                                </span>
                            ) : (
                                <span className="verify-false">
                                    <FaTimes />
                                </span>
                            )}
                        </div>
                        {tweetRetweetmsg === true && (
                            <Alert
                                className="mb-3"
                                message=<TweetError />
                                type="error"
                                closable
                                onClose={(e) => {
                                    dispatch(
                                        clearErrors({
                                            tweetRetweetmsg: tweetRetweetmsg,
                                        })
                                    );
                                }}
                            />
                        )}
                    </Col>
                    <Col md="12">
                        <div className="steps_box margin-bottom">
                            <FaEnvelope /> Validate your email
                            {email_verified === 1 ? (
                                <span className="verify-success">
                                    <FaCheck />
                                </span>
                            ) : (
                                <span className="verify-false">
                                    <FaTimes />
                                </span>
                            )}
                        </div>

                        {isResendMailSusscees && (
                            <Alert
                                className="mb-3 mt-3"
                                message=<ResendMail />
                                type="success"
                                closable
                                onClose={(e) => {
                                    dispatch(
                                        clearMessage({
                                            isResendMailSusscees:
                                                isResendMailSusscees,
                                        })
                                    );
                                }}
                            />
                        )}

                        {!isResendMailSusscees && isResendMailLoading && (
                            <div className="email_noti mt-2">
                                <span className="resend_mail">
                                    <Spin size="large" indicator={antIcon} />
                                </span>
                            </div>
                        )}

                        {!isResendMailLoading && email_verified !== 1 && (
                            <div className="email_noti">
                                <span
                                    onClick={resubscribe}
                                    className="resend_mail"
                                >
                                    Resend Mail
                                </span>
                            </div>
                        )}
                    </Col>
                </Row>
                <div className="connect_twitter">
                    <h5>Connect Your Twitter</h5>
                    <div className="d-flex flex-sm-row flex-column justify-content-between align-items-center">
                        <div className="twit_cont">
                            <h6>
                                <FaTwitter /> Twitter
                            </h6>
                        </div>
                        <div className="twit_cont_btn">
                            {isLogined && twitter_screen_name ? (
                                <>
                                    <button>{twitter_screen_name}</button>
                                </>
                            ) : (
                                <button
                                    className="twitter_connect"
                                    onClick={handleTwitterLogin}
                                >
                                    Connect Twitter
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {userEntry && userEntry.isDone === 1 ? (
                    <span className="evrnt_btn main_btn register_btn">
                        Registered
                    </span>
                ) : (
                    <Button
                        className="evrnt_btn"
                        loading={loading}
                        onClick={clickregister}
                    >
                        APPLY FOR THIS RAFFLE <FaLongArrowAltRight />
                    </Button>
                )}
            </div>
        </div>
    );
};
export default FollowStepsFrom;
