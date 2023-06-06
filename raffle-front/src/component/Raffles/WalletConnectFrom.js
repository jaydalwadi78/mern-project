import React, { useState, useEffect } from 'react';
import { FaWallet } from "react-icons/fa";
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Checkbox, Form, Input, notification } from 'antd';
import { addUser, loginUser, UserSelector, forgotUser, clearMessage } from '../../store/reducers/userSlice';

const WalletConnectFrom = () => {
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();
    const [loginmodal, login] = useState(false);
    const [registermodal, register] = useState(false);
    const [forgotmodal, forgot] = useState(false);
    const { isLogined, isLoginSuccess, isAddSuccess, isForgotPassword, errorMessage } = useSelector(UserSelector);
    
    useEffect(() => {
        
        if (isLoginSuccess === true) {
            openNotification("success", "You have login successfully !");
            login(false);
            dispatch(clearMessage())
        }
    }, [isLoginSuccess])

    useEffect(() => {
        if (isAddSuccess === true) {
            register(false);
            openNotification("success", "You have registered successfully. Please verify your email!");
            dispatch(clearMessage())
        }
        return () => {
            return true;
        };
    }, [isAddSuccess])

    useEffect(() => {
        
        if (isForgotPassword === true) {
            openNotification("success", "We have send mail for reset password!");
            forgot(false);
            dispatch(clearMessage())
        }
    }, [isForgotPassword])

    useEffect(() => {
        if (errorMessage) {
            login(false);
            register(false);
            openNotification("error", errorMessage);
            dispatch(clearMessage())
        }
        return () => {
            return true;
        };
    }, [errorMessage])

    const onForgotFinish = (values) => {
        console.log("values >>>> ", values);
        dispatch(forgotUser(values));
    };

    
    const onFinishForgotFailed = (errorInfo) => {
    };

    const openNotification = (type, msg) => {
        api[type]({
            message: msg,
            duration: 1.5,
        });
    }

    const onFinish = (values) => {
        dispatch(addUser(values));
    };

    const onFinishFailed = (errorInfo) => {
    };

    const onFinishLogin = (values) => {
        dispatch(loginUser(values));
    };

    const onFinishFailedLogin = (errorInfo) => {
    };

    const callLogin = () => {
        register(false)
        login(true);
    }

    const callRegister = () => {
        login(false);
        register(true)
    }

    const callForgot = () => {
        login(false);
        forgot(true)
    }


    return (
        <>
            <div className='connect_free_box'>
                <div className='freeentry_box'>
                    <h3>Free Entry <span>(No Gas)</span></h3>
                </div>
                <div className='register_box'>
                    <h5>Register to create an account. If you have already registered, log in to apply for new raffles.</h5>
                    {/* <button className='wallect_btn'>
                    <FaWallet /> Connect Wallet
                </button> */}
                    <button className='wallect_btn' onClick={() => login(true)}>
                        Login
                    </button>
                </div>
            </div>
            <Modal className='wallect_modal' centered open={loginmodal} onOk={() => login(false)} onCancel={() => login(false)}>
                <h2>Login</h2>
                <p>Sign in to Upcomingnft Raffle.</p>
                <Form
                    name="basic"
                    onFinish={onFinishLogin}
                    onFinishFailed={onFinishFailedLogin}
                    autoComplete="off"
                >
                    <Row>
                        <Col md='12'>
                            <div className='from_group'>
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your name!' }]}
                                >
                                    <Input placeholder='email@example.com' />
                                </Form.Item>
                            </div>
                        </Col>

                        <Col md='12'>
                            <div className='from_group'>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password placeholder="Password" />
                                </Form.Item>
                            </div>
                        </Col>


                        <Col md='12'>
                            <div className='from_group'>
                                <Form.Item >
                                    <button type='submit'>Login</button>
                                </Form.Item>
                            </div>
                        </Col>

                        <Col md="6">
                            <div className='from_btn'>
                                <button type='button' onClick={() => callForgot()}>Forgot Password ?</button>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className='from_btn'>
                                <button type='button' onClick={() => callRegister()}>Register</button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            <Modal className='wallect_modal' centered open={registermodal} onOk={() => register(false)} onCancel={() => register(false)}>
                <h2>Register</h2>
                <p>Fill out all the details to register and create a raffle account here.</p>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Row>
                        <Col md='12'>
                            <div className='from_group'>
                                <Form.Item
                                    name="name"
                                    rules={[{ required: true, message: 'Please input your name!' }]}
                                >
                                    <Input placeholder="Enter your name" />
                                </Form.Item>
                            </div>
                        </Col>

                        <Col md='12'>
                            <div className='from_group'>
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your name!' }]}
                                >
                                    <Input placeholder='email@example.com' />
                                </Form.Item>
                            </div>
                        </Col>

                        <Col md='12'>
                            <div className='from_group'>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password placeholder="Password" />
                                </Form.Item>
                            </div>
                        </Col>

                        <Col md='12'>
                            <div className='from_group'>
                            <Form.Item
                                    name="repassword"
                                    dependencies={['password']}
                                    rules={[{ required: true, message: 'Please re-enter your password!',  },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Please enter the same password as above.'));
                                        },
                                    }),
                                    ]}
                                >
                                    <Input.Password placeholder="Re password" />
                                </Form.Item>
                            </div>
                        </Col>

                        <Col md='12'>
                            <div className='from_group'>
                                <Form.Item name="ethAddress">
                                    <Input placeholder="Enter your ETH Address" />
                                </Form.Item>
                            </div>
                        </Col>


                        <Col md='12'>
                            <div className='from_group'>
                                <Form.Item name="busdAddress" >
                                    <Input placeholder="Enter your BUSD Address" />
                                </Form.Item>
                            </div>
                        </Col>


                        <Col md='12'>
                            <div className='from_group'>
                                <Form.Item >
                                    {/* <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button> */}
                                    <button type='submit'>Register</button>
                                </Form.Item>
                            </div>
                        </Col>

                        <Col md="12">
                            <div className='from_btn'>
                                <button type='button' onClick={() => callLogin()}>Login</button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            <Modal className='wallect_modal' centered open={forgotmodal} onOk={() => forgot(false)} onCancel={() => forgot(false)}>
                <h2>Forgot Password?</h2>
                <p>Enter your email address to change your password.</p>
                <Form
                    name="basic"
                    onFinish={onForgotFinish}
                    onFinishFailed={onFinishForgotFailed}
                    autoComplete="off"
                >
                    <Row>
                        <Col md='12'>
                            <div className='from_group'>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Please enter your email!' },
                                        { type: 'email', message: 'Please enter a valid E-mail!', },
                                    ]}
                                >
                                    <Input placeholder='email@example.com' />
                                </Form.Item>
                            </div>
                        </Col>
                        <Col md='12'>
                            <div className='from_group'>
                                <button type='submit'>Reset Password</button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>

    )
}
export default WalletConnectFrom;