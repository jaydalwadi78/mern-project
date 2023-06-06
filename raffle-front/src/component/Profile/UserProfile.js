import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import ProfileFrom from './ProfileFrom';
import { useDispatch, useSelector } from "react-redux";
import { UserSelector, clearMessage, verifyMail } from '../../store/reducers/userSlice';
import { Avatar } from 'antd';

const UserProfile = () => {
    const { name, address } = useSelector(UserSelector);
    const [firstChar, setFirstChar] = useState("");

    useEffect(() => {
        setFirstChar(`${name.charAt(0)}`);
    }, [name])
    
    const hue = 'rgb(' + (Math.floor((256-199)*Math.random()) + 200) + ',' + (Math.floor((256-199)*Math.random()) + 200) + ',' + (Math.floor((256-199)*Math.random()) + 200) + ')';
    
    return (
        <Row className='justify-content-center'>
            <Col md="9" lg="8" xl="6">
                <div className='profile_box'>
                    <div className='text-center'>
                        <span>
                            <Avatar style={{ backgroundColor: "#003666", verticalAlign: 'middle' }} size={120}>
                                <span style={{fontSize:"60px", textTransform: "uppercase"}} >{firstChar}</span>
                            </Avatar>
                        </span>
                    </div>
                    <div className='profile_content'>
                        <h6>{name}</h6>
                        <p>{address}</p>
                    </div>

                    <ProfileFrom />
                </div>
            </Col>
        </Row>
    )
}
export default UserProfile;