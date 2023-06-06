import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Select } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Input from "@mui/material/Input";
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Web3Selector, disconnect, web3instance, clearMessage } from '../../../store/reducers/web3Slice';
import { addRaffle, RaffleSelector } from '../../../store/reducers/raffleSlice';
import contractAbi from "../../../contract/abi.json";
import Notynew from '../../../service/Notynew';
const contractAddress = '0x4d53770dECd430F5FB6c04bcc9d56f050AcDac53';

export default function AddRaffleForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { web3, isLoading, isSuccess, address, isloginLoading, isLoginerror } = useSelector(Web3Selector);
  const [ContactInfo, setContactInfo] = useState({ name: '', description: '', starttime: '', endtime: '', winingamount: '', winnertype: '', raffleimage: '', raffletype: 1, amounttype: 0, participants_size: 0 });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    setContactInfo({ ...ContactInfo, data })
    Notynew("success", "topRight", "<b>Add Raffle Successfully!!</b>", 3000)
    dispatch(addRaffle(ContactInfo));

    // const myContract = await new web3.eth.Contract(contractAbi, contractAddress);
    // let priceList = web3.utils.toWei(String(100000000000000), "ether");
    // const address = "0xbB85c48384c2f1544B228512A29589B2c78586ba";
    // const _raffleid = 5;
    // const _priceList = [[1, 1, priceList], [2, 5, priceList], [3, 10, priceList]]
    // await myContract.methods.createRaffle(_raffleid, _priceList).send({
    //   from: address
    // });
    navigate('/dashboard/raffle');
  }

  const [startopen, setStartOpen] = useState(false);
  const [endopen, setEndOpen] = useState(false);

  const handleFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setContactInfo({ ...ContactInfo, raffleimage: reader.result })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField name="text" fullWidth sx={{ m: 1 }} variant="standard" label="Name *" value={ContactInfo.name} helperText={errors.name && <p style={{ color: "red" }}>Please Enter Raffle Name</p>}  {...register("name", { onChange: (e) => { setContactInfo({ ...ContactInfo, name: e.target.value }) }, required: true })}
        />

        <TextField
          id="outlined-multiline-static"
          fullWidth sx={{ m: 1 }} variant="standard"
          label="Description *"
          multiline
          rows={4}
          value={ContactInfo.description}
          helperText={errors.description && <p style={{ color: "red" }}>Please Enter Raffle Description</p>}  {...register("description", { onChange: (e) => { setContactInfo({ ...ContactInfo, description: e.target.value }) }, required: true })}
        />

        <FormControl sx={{ m: 1, width: "50ch" }}
          variant="filled">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} onClick={(e) => setStartOpen(true)} />}
              open={startopen}
              onOpen={() => setStartOpen(true)}
              onClose={() => setStartOpen(false)}
              label="Start Time"
              value={ContactInfo.starttime ? ContactInfo.starttime : null}
              onChange={(newValue) => { setContactInfo({ ...ContactInfo, starttime: dayjs(newValue).format("MM/DD/YYYY hh:mm A") }); }}
              disablePast
            />
          </LocalizationProvider>
        </FormControl>

        <FormControl sx={{ m: 1, width: "50ch" }}
          variant="filled">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} onClick={(e) => setEndOpen(true)} />}
              required
              open={endopen}
              onOpen={() => setEndOpen(true)}
              onClose={() => setEndOpen(false)}
              label="End Time"
              value={ContactInfo.endtime ? ContactInfo.endtime : null}
              onChange={(newValue) => { setContactInfo({ ...ContactInfo, endtime: dayjs(newValue).format("MM/DD/YYYY hh:mm A") }); }}
              disablePast
            />
          </LocalizationProvider>
        </FormControl>

        <InputLabel id="demo-simple-select-label1">Raffleimage</InputLabel>
        <TextField
          sx={{ m: 1, width: "50ch" }}
          accept="image/*"
          id="contained-button-file"
          type="file"
          onChange={(e) => handleFiles(e.target.files[0])}
        />

        <InputLabel id="demo-simple-select-label">Raffle Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          variant="standard"
          sx={{ m: 1, width: "50ch" }}
          label="raffletype"
          defaultValue={1}
          value={ContactInfo.raffletype}
          {...register("raffletype", { onChange: (e) => { setContactInfo({ ...ContactInfo, raffletype: e.target.value }) }, required: true })}
        >
          <MenuItem value="">--please select--</MenuItem>
          <MenuItem value={0}>Free</MenuItem>
          <MenuItem value={1}>Paid</MenuItem>
        </Select>
        {errors.raffletype && <p style={{ color: "red" }}>Please select Raffletype</p>}

        <InputLabel id="demo-simple-select-label">Amount Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Amount Type"
          variant="standard"
          sx={{ m: 1, width: "50ch" }}
          value={ContactInfo.amounttype}
          {...register("amounttype", { onChange: (e) => { setContactInfo({ ...ContactInfo, amounttype: e.target.value }) }, required: true })}
        >
          <MenuItem value="">--please select--</MenuItem>
          <MenuItem value={0}>Price</MenuItem>
          {ContactInfo.raffletype === 1 &&
            <MenuItem value={1}>NFT</MenuItem>}
        </Select>
        {errors.amounttype && <p style={{ color: "red" }}>Please select Amounttype</p>}


        {ContactInfo.amounttype === 0 && <>
          <FormControl variant="standard" sx={{ m: 1, width: "50ch" }}>
            <InputLabel id="demo-simple-select-label-amount-currency">Amount Currency</InputLabel>
            <Select
              labelId="demo-simple-select-label-amount-currency"
              id="demo-simple-select"
              label="amounttype"
              value={ContactInfo.currency}
              {...register("currency", { onChange: (e) => { setContactInfo({ ...ContactInfo, currency: e.target.value }) }, required: true })}
            >
              <MenuItem value="">--please select currency--</MenuItem>
              <MenuItem value={0}>ETH</MenuItem>
              <MenuItem value={1}>USDT</MenuItem>
            </Select>
          </FormControl>
        </>}

        {ContactInfo.amounttype === 1 && ContactInfo.raffletype !== 0 && <>
          <TextField name="text" sx={{ m: 1, width: "50ch" }} variant="standard" label="NFT Address" value={ContactInfo.contractaddress} helperText={errors.contractaddress && <p style={{ color: "red" }}>Please Enter Raffle Name</p>}  {...register("contractaddress", { onChange: (e) => { setContactInfo({ ...ContactInfo, contractaddress: e.target.value }) }, required: true })} />
          <TextField name="text" sx={{ m: 1, width: "50ch" }} variant="standard" label="NFT TokenId" value={ContactInfo.tokenId} helperText={errors.tokenId && <p style={{ color: "red" }}>Please Enter Raffle Name</p>}  {...register("tokenId", { onChange: (e) => { setContactInfo({ ...ContactInfo, tokenId: e.target.value }) }, required: true })} />
        </>}

        <InputLabel id="demo-simple-select-label">Winner *</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          variant="standard"
          label="winnertype"
          sx={{ m: 1, width: "50ch" }}
          value={ContactInfo.winnertype}
          {...register("winnertype", { onChange: (e) => { setContactInfo({ ...ContactInfo, winnertype: e.target.value }) }, required: true })}
        >
          <MenuItem value="">--please select--</MenuItem>
          <MenuItem value={0}>Single</MenuItem>
          <MenuItem value={1}>Multiple</MenuItem>
        </Select>

        {errors.winnertype && <p style={{ color: "red" }}>Please select Winnertype</p>}

        {ContactInfo.winnertype === 1 && <>
          <TextField name="text" sx={{ m: 1, width: "50ch" }} variant="standard" label="Winning Count" value={ContactInfo.winingcount} helperText={errors.winingcount && <p style={{ color: "red" }}>Please Enter winingcount</p>}  {...register("winingcount", { onChange: (e) => { setContactInfo({ ...ContactInfo, winingcount: e.target.value }) }, required: true })} />
        </>}


        <InputLabel id="demo-simple-select-label">Winning Amount *</InputLabel>
        <TextField name="text" sx={{ m: 1, width: "50ch" }} variant="standard" value={ContactInfo.winingamount} helperText={errors.winingamount && <p style={{ color: "red" }}>Please Enter Winning Amount</p>}  {...register("winingamount", { onChange: (e) => { setContactInfo({ ...ContactInfo, winingamount: e.target.value }) }, required: true })} />


        <InputLabel id="demo-simple-select-label">TweetId *</InputLabel>
        <TextField name="text" sx={{ m: 1, width: "50ch" }} variant="standard" value={ContactInfo.tweetId} helperText={errors.tweetId && <p style={{ color: "red" }}>Please Enter TweetId</p>}  {...register("tweetId", { onChange: (e) => { setContactInfo({ ...ContactInfo, tweetId: e.target.value }) }, required: true })}
        />

        <InputLabel id="demo-simple-select-label">Participants Size *</InputLabel>
        <TextField name="text" sx={{ m: 1, width: "50ch" }} variant="standard" value={ContactInfo.total} helperText={errors.total && <p style={{ color: "red" }}>Please Enter Participants Size</p>}  {...register("total", { onChange: (e) => { setContactInfo({ ...ContactInfo, total: e.target.value }) }, required: true })}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" >
          submit
        </LoadingButton>
      </form>
    </>
  );
}
