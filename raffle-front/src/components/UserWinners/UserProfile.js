import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Avatar } from 'antd';
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { UserSelector, userwinnerById, clearMessage, verifyMail } from '../../store/reducers/userSlice';

const UserProfile = () => {
    const dispatch = useDispatch();
    const { winnerName, winnerAddress } = useSelector(UserSelector);
    const [firstChar, setFirstChar] = useState("");
    let urlParams = useParams();
    
    useEffect(() => {
        if (urlParams) {
            dispatch(userwinnerById(urlParams.winnerid))
        }
    }, [urlParams])

    useEffect(() => {
        if(winnerName){
            setFirstChar(`${winnerName.charAt(0)}`);    
        }
    }, [winnerName])

    return (

        <Col md="10" lg="8" xl="6">
            <div className='user_profile text-center'>
                {/*<img width={'100'} src={require('../../assets/imgs/user-profile.webp')} alt='user img' />*/}
                <div className='text-center'>
                    <span>
                        <Avatar style={{ backgroundColor: "#003666", verticalAlign: 'middle' }} size={120}>
                            <span style={{fontSize:"54px", textTransform: "uppercase"}} >{firstChar}</span>
                        </Avatar>
                    </span>
                </div>
                <h4 className='username'>{winnerName}</h4>
                {/*<h6 className='useraddress'>
                    <span>{winnerAddress}</span>
                </h6>*/}
            </div>
        </Col>

    )
}

export default UserProfile;