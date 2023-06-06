import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Profile from './Profile';
import { useDispatch, useSelector } from "react-redux";
import { FaWallet, FaListUl, FaTrophy, FaTwitter } from "react-icons/fa";
import { addUser, loginUser, forgotUser ,UserSelector, clearMessage } from '../store/reducers/userSlice';
import { Modal, Button, Checkbox, Form, Input, notification } from 'antd';
import { localStorageHelper } from "../services/localStorageHelper";

// type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Header = () => {
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();

    const [loginmodal, login] = useState(false);
    const [header, setHeader] = useState("header");
    const [registermodal, register] = useState(false);
    const [forgotmodal, forgot] = useState(false);
    const { isLogined, isLoginSuccess, isAddSuccess, isForgotPassword, errorMessage, isTwittererror } = useSelector(UserSelector);

    const getLogin = async () => {
        if(await localStorageHelper.getLoginId()){
            dispatch(loginUser({}));
        }
    }
    
    useEffect(() => {
        goToTop();
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        getLogin();
    }, [header])

    useEffect(() => {
        
        if (isLoginSuccess === true) {
            openNotification("success", "You have login successfully !");
            login(false);
            dispatch(clearMessage())
        }
    }, [isLoginSuccess])

    useEffect(() => {
        
        if (isForgotPassword === true) {
            openNotification("success", "We have send mail for reset password!");
            forgot(false);
            dispatch(clearMessage())
        }

        if (isForgotPassword === false) {
            openNotification("error", "This email address is not registered; please sign up first.");
            forgot(false);
            dispatch(clearMessage())
        }
    }, [isForgotPassword])

    useEffect(() => {
        if (isTwittererror === true) {
            openNotification("error", "This twitter is already linked.");
            dispatch(clearMessage())
        }
    }, [isTwittererror])

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

    const openNotification = (type, msg) => {
        api[type]({
            message: msg,
            duration: 3,
        });
    }

    const onFinish = (values) => {
        dispatch(addUser(values));
    };

    const onFinishFailed = (errorInfo) => {
    };

    
    const onForgotFinish = (values) => {
        console.log("values >>>> ", values);
        dispatch(forgotUser(values));
    };

    
    const onFinishForgotFailed = (errorInfo) => {
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
            <Container>
                {contextHolder}
                <Row>
                    <Col md="12" className='d-flex justify-content-between align-items-center flex-sm-row flex-column'>
                        <div className='logo'>
                            <NavLink to={"/"}>
                                <img src={require('../assets/imgs/raffle_logo.png')} alt="Raffle" />
                            </NavLink>
                        </div>

                        <div className='header_btn'>
                            <ul>
                                <li>
                                    <NavLink to={"/"}>
                                        Live
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/completed"}>
                                        Completed
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/winner'}><FaTrophy /> Winners</NavLink>
                                </li>

                                { isLogined &&
                                <li>
                                    <NavLink to={'/activity'}><FaListUl /> Activity</NavLink>
                                </li>
                                }
                                
                                {
                                    isLogined ? 
                                    <>
                                    <li>
                                        <Profile />
                                    </li>
                                    </>
                                    :
                                    <>
                                        <li className='walletbtn'>
                                            <button className='wallect_btn' onClick={() => login(true)}>
                                                Login
                                            </button>
                                        </li>
                                        <li className='walletbtn'>
                                            <button className='wallect_btn' onClick={() => register(true)}>
                                                Register
                                            </button>
                                        </li>
                                    </>
                                }
                                <li className='tiwtter_btn'>
                                    <NavLink target={'_blank'} to={'https://twitter.com/upcomingraffle'}><FaTwitter /></NavLink>
                                </li>
                            </ul>
                        </div>

                    </Col>
                </Row>
            </Container>


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
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please enter your password!' }]}
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
                                    rules={[{ required: true, message: 'Please enter your name!' }]}
                                >
                                    <Input placeholder="Enter your name" />
                                </Form.Item>
                            </div>
                        </Col>

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
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please enter your password!' }]}
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
export default Header