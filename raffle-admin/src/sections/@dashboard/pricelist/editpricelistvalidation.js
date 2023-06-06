
import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios'
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Autocomplete, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CONFIG from "../../../config";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}


export default function EditPriceListForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [priceInfo, setPriceInfo] = useState({});
  const [raffle, setraffle] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();


  console.log("priceInfo", priceInfo);
  console.log("raffle", raffle);



  useEffect(() => {
    let active = true;
    (async () => {
      await sleep(2000); // For demo purposes.

      if (active) {
        fetch(`${CONFIG.API_ENDPOINT}getraff`)
          .then((data) => data.json())
          .then((data) => setraffle(data.raffles))

      }
    })();
    return () => {
      active = false;
    };

    // fetch("http://localhost:3000/v1/getraff")
    //   .then((data) => data.json())
    //   .then((data) => setraffle(data.raffles))
    //   setraffle([...raffle]);


  }, [])

  useEffect(() => {
    try {
      axios.get(`${CONFIG.API_ENDPOINT}fetchprice/${id}`, {
        headers: {
          "Content-Type": 'application/json',
        },
      })
        .then((res) => {
          setPriceInfo(res.data.priceresult);

          console.log("res", res);

        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log(e)
      navigate('/dashboard/addraffle', { replace: true });
    }
  }, [])

  const onSubmit = (data) => {
    setPriceInfo({ ...priceInfo, data })
    console.log("priceInfo", priceInfo);
    try {
      axios.post(`${CONFIG.API_ENDPOINT}updateprice/${id}`, priceInfo, {
        headers: {
          "Content-Type": 'application/json',
        },
      })
        .then((res) => {
          console.log("res", res);
          navigate('/dashboard/pricelist', { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log(e)
      navigate(`/dashboard/editpricelist/${id}`, { replace: true });
    }
  }
  // const handleSubmit = async(e) => {
  //     e.preventDefault();
  //     try {
  //       axios.post(`http://localhost:3000/v1/updateprice/${id}`,priceInfo,{
  //       headers: {
  //             "Content-Type": 'application/json',
  //           },
  //         })
  //         .then((res) => {
  //           console.log("res",res);
  //           navigate('/dashboard/pricelist', { replace: true });
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     } catch (e) {
  //       console.log(e)
  //       navigate(`/dashboard/editpricelist/${id}`, { replace: true });
  //     }
  // };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <InputLabel id="demo-simple-select-label">RaffleId</InputLabel>
          <Autocomplete
            id="asynchronous-demo"
            options={raffle}
            sx={{ width: 1280 }}
            value={`${priceInfo.raffleId ? priceInfo.raffleId.name : null}`}
            onChange={(event, value) => { setPriceInfo({ ...priceInfo, raffleId: value._id }); }}
            isOptionEqualToValue={(option, value) => option.name === value}
            getOptionLabel={(option) => option.length > 0 && option !== 'undefined' ? option : option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Raffle"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {params.InputProps.endAdornment}

                    </>
                  ),
                }}
              />

            )}

          />

          {/* <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="raffletype"
    value={`${priceInfo.raffleId}`}
    onChange={e => {setPriceInfo({ ...priceInfo, raffleId: e.target.value });}}
  >
      {raffle && raffle.length > 0  && raffle.map((rdata,index) => (
            <MenuItem key={index} value={rdata._id}>
            {rdata.name}
            </MenuItem>
          ))}
  </Select>     */}
          <InputLabel id="demo-simple-label">Pricelist</InputLabel>

          <TextField name="text" label="ticketno" value={priceInfo.ticketno} helperText={errors.ticketno && priceInfo.ticketno === '' && <p style={{ color: "red" }}>Please Enter Ticket number</p>}  {...register("ticketno", { onChange: (e) => { setPriceInfo({ ...priceInfo, ticketno: e.target.value }) }, required: true })} />

          <TextField name="text" label="price" value={priceInfo.price} helperText={errors.price && priceInfo.price === '' && <p style={{ color: "red" }}>Please Enter Raffle Price</p>}  {...register("price", { onChange: (e) => { setPriceInfo({ ...priceInfo, price: e.target.value }) }, required: true })}

          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained">
            Update
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
}
