import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTimesCircle, FaCheckCircle, FaSignOutAlt, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { UserSelector, clearMessage, verifyMail, logOut, updateUser, resetPassword } from '../../store/reducers/userSlice';
import { Modal, Button, Checkbox, Form, Input, notification } from 'antd';

const ResetPassword = () => {
    const dispatch = useDispatch();
    let urlParams = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm()
    const [api, contextHolder] = notification.useNotification();
    const { isResetPassword } = useSelector(UserSelector);

    const resetHandler = (values) => {
        values = {...values, code: urlParams.code}
        dispatch(resetPassword(values))
    };

    useEffect(() => {
        if (isResetPassword === true) {
            openNotification("success", "You have reset your password successfully!");
            dispatch(clearMessage());
            form.resetFields();
            setTimeout(() => {
                navigate("/");
            },3000);
        }
    }, [isResetPassword])

    const onFinishFailedReset = (errorInfo) => {
    };

    const openNotification = (type, msg) => {
        api[type]({
            message: msg,
            duration: 1.5,
        });
    }

    return (
        <>
            {contextHolder}
            <Form name="basic"
                className="profile_form"
                onFinish={resetHandler}
                onFinishFailed={onFinishFailedReset}
                autoComplete="off"
                form={form}
            >
                <Row>
                    <Col md='12'>
                        <div className='from_group'>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password placeholder="Enter New Password" />
                            </Form.Item>
                        </div>
                    </Col>

                    <Col md='12'>
                        <div className='from_group'>
                            <Form.Item
                                name="repassword"
                                dependencies={['password']}
                                rules={[{ required: true, message: 'Please enter your Re password!', },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                                ]}
                            >
                                <Input.Password placeholder="Re-Enter New Password" />
                            </Form.Item>
                        </div>
                    </Col>

                </Row>


                <div className='btn_wrapp'>
                    <Row>
                        <Col md="12">
                            <button type='submit'>Reset Password</button>
                        </Col>
                    </Row>
                </div>

            </Form>

        </>
    )
}
export default ResetPassword;