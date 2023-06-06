import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
    FaTimesCircle,
    FaCheckCircle,
    FaSignOutAlt,
    FaEdit,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    UserSelector,
    clearMessage,
    logOut,
    updateUser,
    resendMail,
} from "../../store/reducers/userSlice";
import { Modal, Button, Checkbox, Form, Input, notification, Alert, Spin } from "antd";
import { SyncOutlined } from "@ant-design/icons";

const ProfileFrom = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const { user_id, name, address, busd_address, email, email_verified, isResendMailSusscees, isResendMailLoading } =
        useSelector(UserSelector);

    const updateProfile = (values) => {
        values.user_id = user_id;
        dispatch(updateUser(values));
        openNotification("success", "Profile Update successfully !");
    };

    const resubscribe = () => {
        dispatch(
            resendMail({
                email: email,
                name: name,
            })
        );
    };

    const onFinishFailedLogin = (errorInfo) => {};

    const openNotification = (type, msg) => {
        api[type]({
            message: msg,
            duration: 1.5,
        });
    };

    const logoutClick = () => {
        dispatch(logOut());
        navigate("/");
    };

    const ResendMail = () => {
        return (
            <>
                <p>We have sent you an email for verification.</p>
                <p>Check your Inbox and verify your email address.</p>
            </>
        );
    };

    const antIcon = (
        <SyncOutlined style={{ fontSize: 24, color: "#52c41a" }} spin />
    );

    return (
        <>
            {contextHolder}
            <Form
                name="basic"
                onFinish={updateProfile}
                onFinishFailed={onFinishFailedLogin}
                initialValues={{
                    name: name,
                    busd_address: busd_address,
                    email: email,
                }}
                autoComplete="off"
            >
                <Row>
                    <Col md="12">
                        <div className="profile_bg">
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter your name!",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Enter your name"
                                    defaultValue={name}
                                />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col md="12">
                        <div className="profile_bg">
                            <Form.Item
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please Enter your ETH address!",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Enter your ETH address"
                                    defaultValue={address}
                                />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col md="12">
                        <div className="profile_bg">
                            {/* <input type="text" name="username" defaultValue="0x52199744e7aa58009ae7b347ACC7EdEfe545c15a" /
                             */}
                            <Form.Item name="busd_address">
                                <Input
                                    placeholder="Enter your BUSD Address"
                                    defaultValue={busd_address}
                                />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col md="12">
                        <div className="profile_bg">
                            {/* <input className='margin-bottom' type="email" name="username" defaultValue="push@gmail.com" /> */}

                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter your email!",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="email@example.com"
                                    defaultValue={email}
                                />
                            </Form.Item>
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

                        {!isResendMailLoading && email_verified != 1 && (
                            <div className="email_noti">
                                <a
                                    onClick={resubscribe}
                                    className="resend_mail active"
                                    href="javascript:void(0)"
                                >
                                    Resend Verification Mail
                                </a>
                            </div>
                        )}
                    </Col>
                </Row>

                <div className="btn_wrapp">
                    <Row>
                        <Col md="6">
                            {/* <button onClick={updateProfile} ><FaEdit /> Update Profile</button> */}

                            <button type="submit">
                                <FaEdit />
                                Update Profile
                            </button>
                        </Col>
                        <Col md="6">
                            <button onClick={logoutClick}>
                                <FaSignOutAlt /> Log Out
                            </button>
                        </Col>
                    </Row>
                </div>
            </Form>
        </>
    );
};
export default ProfileFrom;
