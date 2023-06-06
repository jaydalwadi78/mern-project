import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Autocomplete, CircularProgress, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { editPriceList, RaffleSelector } from '../../../store/reducers/raffleSlice';
import Notynew from '../../../service/Notynew';
import CONFIG from "../../../config";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function EditPriceListForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [priceInfo, setPriceInfo] = useState({});
  const [raffle, setraffle] = useState([]);

  useEffect(() => {
    let active = true;
    (async () => {
      await sleep(2000); // For demo purposes.

      if (active) {
        fetch(`${CONFIG.API_ENDPOINT}getRaffle`)
          .then((data) => data.json())
          .then((data) => setraffle(data.raffles))
      }
    })();
    return () => {
      active = false;
    };
  }, [])

  useEffect(() => {
    try {
      axios.get(`${CONFIG.API_ENDPOINT}findPrice/${id}`, {
        headers: {
          "Content-Type": 'application/json',
        },
      })
        .then((res) => {
          setPriceInfo(res.data.priceresult);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log(e)
      navigate('/dashboard/addraffle', { replace: true });
    }
  }, [])

  const handleSubmit = async (data) => {
    setPriceInfo({ ...priceInfo, data })
    dispatch(editPriceList(priceInfo));
    Notynew("success", "topRight", "<b>Update PriceList Successfully!!</b>", 3000)
    navigate('/dashboard/pricelist');
  };
  // console.log("raffle", raffle);
  // console.log("priceInfo", priceInfo);
  return (
    <>
      <form>
        <Stack spacing={3}>
          <InputLabel id="demo-simple-select-label">RaffleId</InputLabel>
          <Autocomplete
            id="asynchronous-demo"
            sx={{ width: 1280 }}
            value={priceInfo.raffleId ? priceInfo.raffleId : null}
            onChange={(event, value) => { setPriceInfo({ ...priceInfo, raffleId: value._id }); }}
            isOptionEqualToValue={(option, value) => option._id === `${value._id}`}
            getOptionLabel={(option) => option.name}
            options={raffle}
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
          <InputLabel id="demo-simple-label">Pricelist</InputLabel>
          <TextField name="text" label="ticketno" value={priceInfo.ticketno} onChange={e => { setPriceInfo({ ...priceInfo, ticketno: e.target.value }); }} />
          <TextField name="text" label="price" onChange={e => { setPriceInfo({ ...priceInfo, price: e.target.value }); }}
            value={priceInfo.price}
          />

          <TextField name="text" label="ticketno2" value={priceInfo.ticketno2} onChange={e => { setPriceInfo({ ...priceInfo, ticketno2: e.target.value }); }} />
          <TextField name="text" label="price2" onChange={e => { setPriceInfo({ ...priceInfo, price2: e.target.value }); }}
            value={priceInfo.price2}
          />

          <TextField name="text" label="ticketno3" value={priceInfo.ticketno3} onChange={e => { setPriceInfo({ ...priceInfo, ticketno3: e.target.value }); }} />
          <TextField name="text" label="price3" onChange={e => { setPriceInfo({ ...priceInfo, price3: e.target.value }); }}
            value={priceInfo.price3}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={(e) => handleSubmit(e)}>
            Update
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
}
