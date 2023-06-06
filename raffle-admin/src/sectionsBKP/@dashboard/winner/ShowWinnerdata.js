import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import moment from "moment";
import {
    fetchparticipants,
    RaffleSelector,
    setWinner,
} from "../../../store/reducers/raffleSlice";

// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    Grid,
    TableContainer,
    TablePagination,
    Autocomplete,
    InputLabel,
    TextField,
    CircularProgress,
} from "@mui/material";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import CONFIG from "../../../config";
import Notynew from "../../../service/Notynew";

const ShowWinner = (detail) => {
    const dispatch = useDispatch();
    const { raffleParticipants } = useSelector(RaffleSelector);
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [open, setOpen] = useState(false);
    const [raffle, setraffle] = useState();
    const [priceInfo, setPriceInfo] = useState({});
    const loading = open && raffle.length === 0;

    function sleep(delay = 0) {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    }

    useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }
        (async () => {
            await sleep(2000); // For demo purposes.
            if (active) {
                fetch(`${CONFIG.API_ENDPOINT}fetchparticipants/${id}`)
                    .then((data) => data.json())
                    .then((data) => setraffle(data.raffresult));
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
        console.log("priceInfo>>>", priceInfo);
        dispatch(setWinner(priceInfo));
        Notynew(
            "success",
            "topRight",
            "<b>Winner set Successfully!!</b>",
            3000
        );
        // navigate('/dashboard/pricelist');
    };

    return (
        <>
            <Helmet>
                <title> Winner | Upcomingnft Raffle </title>
            </Helmet>

            <Container>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={5}
                >
                    <Typography variant="h4" gutterBottom>
                        Winner
                    </Typography>
                </Stack>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3}>
                        <Autocomplete
                            id="asynchronous-demo"
                            sx={{ width: 600 }}
                            open={open}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            value={priceInfo.winnerId}
                            onChange={(event, value) => {
                                setPriceInfo({
                                    ...priceInfo,
                                    winnerId: value.UserId
                                        ? value.UserId._id
                                        : null,
                                    raffleId: id,
                                });
                            }}
                            getOptionLabel={(option) =>
                                option.UserId
                                    ? option.UserId.twitter_screen_name
                                    : "User not exist"
                            }
                            options={raffle}
                            loading={loading}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Winner"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                {loading ? (
                                                    <CircularProgress
                                                        color="inherit"
                                                        size={20}
                                                    />
                                                ) : null}
                                                {params.InputProps.endAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                        />

                        <TextField
                            name="transaction"
                            fullWidth
                            sx={{ m: 1 }}
                            label="Transaction Hash"
                            value={priceInfo.transaction}
                            onChange={(e) => {
                                setPriceInfo({
                                    ...priceInfo,
                                    transaction: e.target.value,
                                });
                            }}
                        />

                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            onClick={(e) => handleSubmit(e)}
                        >
                            submit
                        </LoadingButton>
                    </Stack>
                </form>
            </Container>
        </>
    );
};

export default ShowWinner;
