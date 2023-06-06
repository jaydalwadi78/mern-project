import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

export default function Protected(props) {
    const {Component} =props;
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (!loggedInUser || loggedInUser === 'undefined') {
            setIsLoggedIn(false);
            navigate('/', { replace: true });
       
        }
        setIsLoggedIn(true);
        }, [isLoggedIn]);
    return(
        <div>
           {isLoggedIn ?<Component/>:null} 
        </div>
    )

}