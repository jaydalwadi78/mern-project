import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Autocomplete, CircularProgress, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { addPriceList, RaffleSelector } from '../../../store/reducers/raffleSlice';
import Notynew from '../../../service/Notynew';
import CONFIG from "../../../config";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function AddPriceListForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [priceInfo, setPriceInfo] = useState({});
  const [raffle, setraffle] = useState();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [open, setOpen] = useState(false);
  const loading = open && raffle.length === 0;

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(2000); // For demo purposes.
      if (active) {
        fetch(`${CONFIG.API_ENDPOINT}getRaffle`)
          .then((data) => data.json())
          .then((data) => setraffle(data.raffles))
        setraffle([...raffle]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setraffle([]);
    }
  }, [open]);

  const onSubmit = async (data) => {
    setPriceInfo({ ...priceInfo, data })
    dispatch(addPriceList(priceInfo));
    Notynew("success", "topRight", "<b>Add PriceList Successfully!!</b>", 3000)
    navigate('/dashboard/pricelist');
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <InputLabel id="demo-simple-select-label">RaffleId</InputLabel>
          <Autocomplete
            id="asynchronous-demo"
            sx={{ width: 1280 }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            value={priceInfo.raffleId}
            onChange={(event, value) => { setPriceInfo({ ...priceInfo, raffleId: value._id }); }}
            getOptionLabel={(option) => option.name}
            options={raffle}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Raffle"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
          <h4>Pricelist:</h4>
          <h4>Price 1</h4>
          <TextField name="text" label="ticketno 1" value={priceInfo.ticketno} helperText={errors.ticketno && <p style={{ color: "red" }}>Please Enter Ticket 1</p>}  {...register("ticketno", { onChange: (e) => { setPriceInfo({ ...priceInfo, ticketno: e.target.value }) }, required: true })} />
          <TextField name="text" label="price 1" value={priceInfo.price}
            helperText={errors.price && <p style={{ color: "red" }}>Please Enter Price 1</p>}  {...register("price", { onChange: (e) => { setPriceInfo({ ...priceInfo, price: e.target.value }) }, required: true })}
          />


          <h4>Price 2</h4>
          <TextField name="text" label="ticketno 2" value={priceInfo.ticketno2} helperText={errors.ticketno2 && <p style={{ color: "red" }}>Please Enter Ticket 2</p>}  {...register("ticketno2", { onChange: (e) => { setPriceInfo({ ...priceInfo, ticketno2: e.target.value }) }, required: true })} />

          <TextField name="text" label="price 2" value={priceInfo.price2}
            helperText={errors.price2 && <p style={{ color: "red" }}>Please Enter Price 2</p>}  {...register("price2", { onChange: (e) => { setPriceInfo({ ...priceInfo, price2: e.target.value }) }, required: true })}
          />

          <h4>Price 3</h4>
          <TextField name="text" label="ticketno 3" value={priceInfo.ticketno3} helperText={errors.ticketno3 && <p style={{ color: "red" }}>Please Enter Ticket 3</p>}  {...register("ticketno3", { onChange: (e) => { setPriceInfo({ ...priceInfo, ticketno3: e.target.value }) }, required: true })} />

          <TextField name="text" label="price 3" value={priceInfo.price3}
            helperText={errors.price3 && <p style={{ color: "red" }}>Please Enter Price 3</p>}  {...register("price3", { onChange: (e) => { setPriceInfo({ ...priceInfo, price3: e.target.value }) }, required: true })}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={(e) => handleSubmit(e)}>
            submit
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
}
