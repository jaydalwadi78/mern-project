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

    const { register, handleSubmit, formState: { errors } } = useForm();

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

    const onSubmit = async (data) => {
        setUserdata({ ...userdata, data })
        userdata.user_id = userdata._id;
        dispatch(editUser(userdata));
        Notynew("success", "topRight", "<b>Update User Successfully!!</b>", 3000)
        navigate('/dashboard/user');
    }

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField name="text" label="Name" sx={{ m: 1, width: "50ch" }} variant="standard" value={userdata.name} onChange={e => { setUserdata({ ...userdata, name: e.target.value }); }}
                />

                <TextField name="text" label="Email" sx={{ m: 1, width: "50ch" }} variant="standard" value={userdata.email} onChange={e => { setUserdata({ ...userdata, email: e.target.value }); }}
                />

                <TextField name="text" label="Password" sx={{ m: 1, width: "50ch" }} variant="standard" value={userdata.password} onChange={e => { setUserdata({ ...userdata, password: e.target.value }); }}
                />

                <TextField name="text" label="ETH Address" sx={{ m: 1, width: "50ch" }} variant="standard" value={userdata.address} onChange={e => { setUserdata({ ...userdata, address: e.target.value }); }}
                />

                <TextField name="text" label="BUSD Address" sx={{ m: 1, width: "50ch" }} variant="standard" value={userdata.busd_address} required onChange={e => { setUserdata({ ...userdata, busd_address: e.target.value }); }}
                />

                <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={(e) => handleSubmit(e)}>
                    Update
                </LoadingButton>
            </form>
        </>
    );
}
