import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom';
import { Dropdown, Avatar } from 'antd';
import { TbUserCircle, TbUserPlus, TbSettings } from "react-icons/tb";
import { BiLogOutCircle } from "react-icons/bi";
import { logOut, UserSelector, clearMessage } from '../store/reducers/userSlice';

const items = [
    {
        label: (
            <NavLink  to='/profile'>
                <span><TbUserCircle></TbUserCircle> Profile</span> 
            </NavLink>
        ),
        key: '0',
        className: 'profile_menu',
    },
    {   
        label: (
                <span><BiLogOutCircle></BiLogOutCircle> Logout</span> 
        ),
        key: '1',
        className: 'profile_menu',
    },
];


const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { name, address } = useSelector(UserSelector);

    const [firstChar, setFirstChar] = useState("");

    useEffect(() => {
        setFirstChar(`${name.charAt(0)}`);
    }, [name])

    const handleMenuClick = (index) => {
        if(index.key === "1"){
            dispatch(logOut());
            navigate('/');
        }
    }

    return (
        <>
            <div className='profile_wrapp'>
                <Dropdown className='profile_main' menu={{ items, onClick: handleMenuClick, }} trigger={['click']} placement="bottomRight">
                    <a style={{ cursor: 'pointer' }} onClick={(e) => e.preventDefault()}>
                        <Avatar style={{ backgroundColor: "#003666", verticalAlign: 'middle' }} size="large" >
                            <span style={{fontSize:"26px", textTransform: "uppercase"}}>{firstChar}</span>
                        </Avatar>
                    </a>
                </Dropdown>
            </div>
        </>
        
    )
}

export default Profile;