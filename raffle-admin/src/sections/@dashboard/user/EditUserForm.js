import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, InputLabel, MenuItem, Select } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { editUser, RaffleSelector } from '../../../store/reducers/raffleSlice';
import Notynew from '../../../service/Notynew';
import FormControl from '@mui/material/FormControl';
import CONFIG from "../../../config";

export default function EditUserForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [userdata, setUserdata] = useState({});
    useEffect(() => {
        try {
            axios.get(`${CONFIG.API_ENDPOINT}findUserRaffle/${id}`, {
                headers: {
                    "Content-Type": 'application/json',
                },
            })
                .then((res) => {
                    setUserdata(res.data.raffresult);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (e) {
            console.log(e)
            navigate('/dashboard/adduser', { replace: true });
        }
    }, [])

    const handleSubmit = async (data) => {
        setUserdata({ ...userdata, data })
        userdata.user_id = userdata._id;
        dispatch(editUser(userdata));
        Notynew("success", "topRight", "<b>Update User Successfully!!</b>", 3000)
        navigate('/dashboard/user');
    }

    return (
        <>
            <form>
                <InputLabel id="demo-simple-select-label" fullWidth sx={{ m: 1 }} variant="standard">Name</InputLabel>
                <TextField name="text" required fullWidth sx={{ m: 1 }} variant="standard" value={userdata.name} onChange={e => { setUserdata({ ...userdata, name: e.target.value }); }}
                />


                <InputLabel id="demo-simple-select-label" fullWidth sx={{ m: 1 }}>Email</InputLabel>
                <TextField name="text" fullWidth sx={{ m: 1 }} variant="standard" value={userdata.email} required={true} onChange={e => { setUserdata({ ...userdata, email: e.target.value }); }}
                />

                {/* <InputLabel id="demo-simple-select-label" fullWidth sx={{ m: 1 }}>Password</InputLabel>
                <TextField name="text" fullWidth sx={{ m: 1 }} variant="standard" value={userdata.password} onChange={e => { setUserdata({ ...userdata, password: e.target.value }); }}
                /> */}

                <InputLabel id="demo-simple-select-label" fullWidth sx={{ m: 1 }}>ETH Address</InputLabel>
                <TextField name="text" fullWidth sx={{ m: 1 }} variant="standard" value={userdata.address} onChange={e => { setUserdata({ ...userdata, address: e.target.value }); }}
                />

                <InputLabel id="demo-simple-select-label" fullWidth sx={{ m: 1 }}>BUSD Address</InputLabel>
                <TextField name="text" fullWidth sx={{ m: 1 }} variant="standard" value={userdata.busd_address} required onChange={e => { setUserdata({ ...userdata, busd_address: e.target.value }); }}
                />

                <InputLabel id="demo-simple-select-label" fullWidth sx={{ m: 1 }}>Twitter Verified - ({userdata.twitter_verified == 0 ? "No" : "Yes"})</InputLabel>



                <InputLabel id="demo-simple-select-label" fullWidth sx={{ m: 1 }}>Email Verified - ({userdata.email_verified == 0 ? "No" : "Yes"})</InputLabel>

                {/* <FormControl variant="standard" sx={{ m: 1, width: "50ch" }}>
                    <InputLabel id="demo-simple-select-label-amount-currency">Twitter Verified</InputLabel>
                    <Select
                        labelId="demo-simple-select-label-amount-currency"
                        id="demo-simple-select"
                        value={`${userdata.twitter_verified}`}
                        onChange={e => { setUserdata({ ...userdata, twitter_verified: e.target.value }); }}
                    >
                        <MenuItem value="">--please select status --</MenuItem>
                        <MenuItem value={0}>No</MenuItem>
                        <MenuItem value={1}>Yes</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, width: "50ch" }}>
                    <InputLabel id="demo-simple-select-label-amount-currency">Email Verified</InputLabel>
                    <Select
                        labelId="demo-simple-select-label-amount-currency"
                        id="demo-simple-select"
                        value={`${userdata.email_verified}`}
                        onChange={e => { setUserdata({ ...userdata, email_verified: e.target.value }); }}
                    >
                        <MenuItem value="">--please select status--</MenuItem>
                        <MenuItem value={0}>No</MenuItem>
                        <MenuItem value={1}>Yes</MenuItem>
                    </Select>
                </FormControl> */}

                <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={(e) => handleSubmit(e)}>
                    Update
                </LoadingButton>
            </form>
        </>
    );
}
