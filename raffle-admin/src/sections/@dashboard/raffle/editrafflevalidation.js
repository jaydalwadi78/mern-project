import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios'

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
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


export default function EditRaffleForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [raffledata, setRaffledata] = useState({});
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [startopen, setStartOpen] = useState(false);
  const [endopen, setEndOpen] = useState(false);

  useEffect(() => {
    try {
      axios.get(`${CONFIG.API_ENDPOINT}getidraff/${id}`, {
        headers: {
          "Content-Type": 'application/json',
        },
      })
        .then((res) => {
          setRaffledata(res.data.raffresult);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log(e)
      navigate('/dashboard/addraffle', { replace: true });
    }
  }, [])

  const handleFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log("reader", reader);
    reader.onload = () => {
      setRaffledata({ ...raffledata, raffleimage: reader.result })

    }
  }

  const onhandledelete = (data) => {
    try {
      axios.post(`${CONFIG.API_ENDPOINT}deleteraffleimg/${id}`, raffledata, {
        headers: {
          "Content-Type": 'application/json',
        },
      })
        .then((res) => {
          setRaffledata({ ...raffledata, raffleimage: res.data.updatedresult.raffleimage })
        })

    } catch (e) {
      console.log(e)

    }

  }
  const onSubmit = (data) => {
    setRaffledata({ ...raffledata, data })
    console.log("raffledata", data);
    if (raffledata.winnertype === 0) {
      raffledata.winingcount = null
    }
    try {
      axios.post(`${CONFIG.API_ENDPOINT}updateraff/${id}`, raffledata, {
        headers: {
          "Content-Type": 'application/json',
        },
      })
        .then((res) => {
          if (res.data != null) {
            console.log("res", res);
            navigate('/dashboard/raffle', { replace: true });

          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log(e)
      navigate(`/dashboard/editraffle/${id}`, { replace: true });
    }

  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("raffledata", raffledata);
  //   try {
  //     axios.post(`${CONFIG.API_ENDPOINT}updateraff/${id}`, raffledata, {
  //       headers: {
  //         "Content-Type": 'application/json',
  //       },
  //     })
  //       .then((res) => {
  //         if (res.data != null) {
  //           console.log("res", res);
  //           navigate('/dashboard/raffle', { replace: true });

  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } catch (e) {
  //     console.log(e)
  //     navigate(`/dashboard/editraffle/${id}`, { replace: true });
  //   }
  // }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField name="text" label="Name" value={raffledata.name} helperText={errors.name && <p style={{ color: "red" }}>Please Enter Raffle Name</p>}  {...register("name", { onChange: (e) => { setRaffledata({ ...raffledata, name: e.target.value }) }, required: true })}
          />

          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            value={raffledata.description}
            helperText={errors.description && <p style={{ color: "red" }}>Please Enter Raffle Description</p>}  {...register("description", { onChange: (e) => { setRaffledata({ ...raffledata, description: e.target.value }) }, required: true })}

          />


          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} onClick={(e) => setStartOpen(true)} />}
              required
              open={startopen}
              onOpen={() => setStartOpen(true)}
              onClose={() => setStartOpen(false)}
              value={raffledata.starttime ? raffledata.starttime : null}
              onChange={(newValue) => { setRaffledata({ ...raffledata, starttime: dayjs(newValue).format("MM/DD/YYYY hh:mm A") }); }}
            />
          </LocalizationProvider>



          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} onClick={(e) => setEndOpen(true)} />}
              required
              open={endopen}
              onOpen={() => setEndOpen(true)}
              onClose={() => setEndOpen(false)}
              label="End Time"
              value={raffledata.endtime ? raffledata.endtime : null}
              onChange={(newValue) => { setRaffledata({ ...raffledata, endtime: dayjs(newValue).format("MM/DD/YYYY hh:mm A") }); }}


            />

          </LocalizationProvider>

          <InputLabel id="demo-simple-select-label1">Raffleimage</InputLabel>
          <TextField
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={(e) => handleFiles(e.target.files[0])}
          />

          {(raffledata.raffleimage !== '' && raffledata.raffleimage !== null) && <><img src={`http://localhost:3000/uploads/${raffledata.raffleimage}`} alt="description of img" width={150} height={100} />
            <button type="button" onClick={() => onhandledelete(raffledata.raffleimage)} style={{ width: "fit-content", position: "inherit", marginleft: "180px", margintop: "-37px" }}>
              delete
            </button>
          </>
          }





          <InputLabel id="demo-simple-select-label">Raffletype</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="raffletype"
            defaultValue={1}
            value={`${raffledata.raffletype}`}
            {...register("raffletype", { onChange: (e) => { setRaffledata({ ...raffledata, raffletype: e.target.value }) }, required: true })}

          >
            <MenuItem value="">--please select--</MenuItem>
            <MenuItem value={0}>Free</MenuItem>
            <MenuItem value={1}>Paid</MenuItem>

          </Select>
          {errors.raffletype && <p style={{ color: "red" }}>Please select Raffletype</p>}



          <InputLabel id="demo-simple-select-label">Amounttype</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="amounttype"
            value={`${raffledata.amounttype}`}
            {...register("amounttype", { onChange: (e) => { setRaffledata({ ...raffledata, amounttype: e.target.value }) }, required: true })}
          >
            <MenuItem value="">--please select--</MenuItem>
            <MenuItem value={0}>Price</MenuItem>
            {raffledata.raffletype === 1 &&
              <MenuItem value={1}>NFT</MenuItem>}
          </Select>
          {errors.amounttype && <p style={{ color: "red" }}>Please select Amounttype</p>}




          {raffledata.amounttype === 1 && raffledata.raffletype !== 0 && <>
            <TextField name="text" label="NFT Address" value={raffledata.contractaddress} helperText={errors.contractaddress && <p style={{ color: "red" }}>Please Enter contractaddress </p>}  {...register("contractaddress", { onChange: (e) => { setRaffledata({ ...raffledata, contractaddress: e.target.value }) }, required: true })} />
            <TextField name="text" label="NFT TokenId" value={raffledata.tokenId} helperText={errors.tokenId && <p style={{ color: "red" }}>Please Enter tokenId </p>}  {...register("tokenId", { onChange: (e) => { setRaffledata({ ...raffledata, tokenId: e.target.value }) }, required: true })} />
          </>}

          {raffledata.amounttype === 0 && <>
            <TextField name="text" label="Winning Amount" value={raffledata.winingamount} helperText={errors.winingamount && <p style={{ color: "red" }}>Please Enter winingamount </p>}  {...register("winingamount", { onChange: (e) => { setRaffledata({ ...raffledata, winingamount: e.target.value }) }, required: true })} />
          </>}

          <InputLabel id="demo-simple-select-label">Winner</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="winnertype"
            value={`${raffledata.winnertype}`}
            {...register("winnertype", { onChange: (e) => { setRaffledata({ ...raffledata, winnertype: e.target.value }) }, required: true })}

          >
            <MenuItem value="">--please select--</MenuItem>
            <MenuItem value={0}>Single</MenuItem>
            <MenuItem value={1}>Multiple</MenuItem>

          </Select>
          {errors.winnertype && <p style={{ color: "red" }}>Please select Winnertype</p>}

          {raffledata.winnertype === 1 && <>
            <TextField name="text" label="Winning Count" value={raffledata.winingcount} helperText={errors.winingcount && <p style={{ color: "red" }}>Please Enter winingcount </p>}  {...register("winingcount", { onChange: (e) => { setRaffledata({ ...raffledata, winingcount: e.target.value }) }, required: true })} />

          </>}
          <LoadingButton fullWidth size="large" type="submit" variant="contained" >
            Update
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
}
