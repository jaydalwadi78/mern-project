import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios'
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, InputLabel, MenuItem, Select } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { addUser, RaffleSelector } from '../../../store/reducers/raffleSlice';
import Notynew from '../../../service/Notynew';
import FormControl from '@mui/material/FormControl';

export default function AddUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [UserInfo, setUserInfo] = useState({ name: '', email: '', password: '' });
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setUserInfo({ ...UserInfo, data })
        Notynew("success", "topRight", "<b>Add User Successfully!!</b>", 3000)
        dispatch(addUser(UserInfo));

        // const myContract = await new web3.eth.Contract(contractAbi, contractAddress);
        // let priceList = web3.utils.toWei(String(100000000000000), "ether");
        // const address = "0xbB85c48384c2f1544B228512A29589B2c78586ba";
        // const _raffleid = 5;
        // const _priceList = [[1, 1, priceList], [2, 5, priceList], [3, 10, priceList]]
        // await myContract.methods.createRaffle(_raffleid, _priceList).send({
        //   from: address
        // });
        navigate('/dashboard/user');
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField name="text" fullWidth sx={{ m: 1 }} variant="standard" label="Name *" value={UserInfo.name} helperText={errors.name && <p style={{ color: "red" }}>Please Enter User Name</p>}  {...register("name", { onChange: (e) => { setUserInfo({ ...UserInfo, name: e.target.value }) }, required: true })}
                />

                <TextField name="text" fullWidth sx={{ m: 1 }} variant="standard" label="Email *" value={UserInfo.email} helperText={errors.email && <p style={{ color: "red" }}>Please Enter Email</p>}  {...register("email", { onChange: (e) => { setUserInfo({ ...UserInfo, email: e.target.value }) }, required: true })}
                />

                <TextField name="text" fullWidth sx={{ m: 1 }} variant="standard" label="Password *" value={UserInfo.password} helperText={errors.password && <p style={{ color: "red" }}>Please Enter Password</p>}  {...register("password", { onChange: (e) => { setUserInfo({ ...UserInfo, password: e.target.value }) }, required: true })}
                />

                <TextField name="text" fullWidth sx={{ m: 1 }} variant="standard" label="ETH Address" value={UserInfo.ethAddress} {...register("ethAddress", { onChange: (e) => { setUserInfo({ ...UserInfo, ethAddress: e.target.value }) }, required: true })}
                />

                <TextField name="text" fullWidth sx={{ m: 1 }} variant="standard" label="Busd Address" value={UserInfo.busdAddress} {...register("busdAddress", { onChange: (e) => { setUserInfo({ ...UserInfo, busdAddress: e.target.value }) }, required: true })}
                />

                {/* <FormControl variant="standard" sx={{ m: 1, width: "50ch" }}>
                        <InputLabel id="demo-simple-select-label-amount-currency">Twitter Verified</InputLabel>
                        <Select
                            labelId="demo-simple-select-label-amount-currency"
                            id="demo-simple-select"
                            defaultValue={0}
                            value={UserInfo.twitter_verified}
                            onChange={e => { setUserInfo({ ...UserInfo, twitter_verified: e.target.value }); }}

                        >
                            <MenuItem value="">--please select --</MenuItem>
                            <MenuItem value={0}>No</MenuItem>
                            <MenuItem value={1}>Yes</MenuItem>
                        </Select>
                    </FormControl>


                    <FormControl variant="standard" sx={{ m: 1, width: "50ch" }}>
                        <InputLabel id="demo-simple-select-label-amount-currency">Email Verified</InputLabel>
                        <Select
                            labelId="demo-simple-select-label-amount-currency"
                            id="demo-simple-select"
                            defaultValue={0}
                            value={UserInfo.email_verified}
                            onChange={e => { setUserInfo({ ...UserInfo, email_verified: e.target.value }); }}
                        >
                            <MenuItem value="">--please select --</MenuItem>
                            <MenuItem value={0}>No</MenuItem>
                            <MenuItem value={1}>Yes</MenuItem>
                        </Select>
                    </FormControl> */}

                <LoadingButton fullWidth size="large" type="submit" variant="contained" >
                    submit
                </LoadingButton>
            </form>
        </>
    );
}
