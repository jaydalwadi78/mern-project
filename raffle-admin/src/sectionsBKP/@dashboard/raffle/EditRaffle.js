import * as React from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    Link,
    Stack,
    IconButton,
    InputAdornment,
    TextField,
    Checkbox,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
    editRaffle,
    RaffleSelector,
} from "../../../store/reducers/raffleSlice";
import Notynew from "../../../service/Notynew";
import FormControl from "@mui/material/FormControl";
import CONFIG from "../../../config";

export default function EditRaffleForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [raffledata, setRaffledata] = useState({});
    const [startopen, setStartOpen] = useState(false);
    const [endopen, setEndOpen] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        try {
            axios
                .get(`${CONFIG.API_ENDPOINT}findRaffle/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    setRaffledata(res.data.raffresult);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (e) {
            console.log(e);
            navigate("/dashboard/addraffle", { replace: true });
        }
    }, []);

    const handleFiles = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log("reader", reader);
        reader.onload = () => {
            setRaffledata({ ...raffledata, raffleimage: reader.result });
        };
    };

    const onhandledelete = (data) => {
        try {
            axios
                .post(`${CONFIG.API_ENDPOINT}deleteImage/${id}`, raffledata, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    setShow((prev) => !prev);
                    setRaffledata({
                        ...raffledata,
                        raffleimage: res.data.updatedresult.raffleimage,
                    });
                });
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmit = async (data) => {
        setRaffledata({ ...raffledata, data });
        dispatch(editRaffle(raffledata));
        Notynew(
            "success",
            "topRight",
            "<b>Update Raffle Successfully!!</b>",
            3000
        );
        navigate("/dashboard/raffle");
    };

    return (
        <>
            <form>
                <InputLabel
                    id="demo-simple-select-label"
                    fullWidth
                    sx={{ m: 1 }}
                    variant="standard"
                >
                    Name *
                </InputLabel>
                <TextField
                    name="text"
                    fullWidth
                    sx={{ m: 1 }}
                    variant="standard"
                    value={raffledata.name}
                    onChange={(e) => {
                        setRaffledata({ ...raffledata, name: e.target.value });
                    }}
                />

                <InputLabel
                    id="demo-simple-select-label"
                    fullWidth
                    sx={{ m: 1 }}
                    variant="standard"
                >
                    Description{" "}
                </InputLabel>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    fullWidth
                    sx={{ m: 1 }}
                    variant="standard"
                    rows={4}
                    value={raffledata.description}
                    onChange={(e) => {
                        setRaffledata({
                            ...raffledata,
                            description: e.target.value,
                        });
                    }}
                />

                <FormControl sx={{ m: 1, width: "50ch" }} variant="filled">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            disablePast
                            renderInput={(props) => (
                                <TextField
                                    {...props}
                                    onClick={(e) => setStartOpen(true)}
                                />
                            )}
                            open={startopen}
                            onOpen={() => setStartOpen(true)}
                            onClose={() => setStartOpen(false)}
                            label="Start Time"
                            value={
                                raffledata.starttime
                                    ? raffledata.starttime
                                    : null
                            }
                            onChange={(newValue) => {
                                setRaffledata({
                                    ...raffledata,
                                    starttime:
                                        dayjs(newValue).format(
                                            "MM/DD/YYYY hh:mm A"
                                        ),
                                });
                            }}
                        />
                    </LocalizationProvider>
                </FormControl>

                <FormControl sx={{ m: 1, width: "50ch" }} variant="filled">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            disablePast
                            renderInput={(props) => (
                                <TextField
                                    {...props}
                                    onClick={(e) => setEndOpen(true)}
                                />
                            )}
                            open={endopen}
                            onOpen={() => setEndOpen(true)}
                            onClose={() => setEndOpen(false)}
                            label="End Time"
                            value={
                                raffledata.endtime ? raffledata.endtime : null
                            }
                            onChange={(newValue) => {
                                setRaffledata({
                                    ...raffledata,
                                    endtime:
                                        dayjs(newValue).format(
                                            "MM/DD/YYYY hh:mm A"
                                        ),
                                });
                            }}
                        />
                    </LocalizationProvider>
                </FormControl>

                <InputLabel id="demo-simple-select-label1">
                    Raffleimage
                </InputLabel>
                {show && (
                    <TextField
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        sx={{ m: 1, width: "50ch" }}
                        onChange={(e) => handleFiles(e.target.files[0])}
                    />
                )}

                {raffledata.raffleimage !== "" &&
                    raffledata.raffleimage !== null && (
                        <>
                            <img
                                src={`http://localhost:5012/uploads/${raffledata.raffleimage}`}
                                alt="raffleImg"
                                width={150}
                                height={100}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    onhandledelete(raffledata.raffleimage)
                                }
                                style={{
                                    width: "fit-content",
                                    position: "inherit",
                                    marginleft: "180px",
                                    margintop: "-37px",
                                }}
                            >
                                delete
                            </button>
                        </>
                    )}

                <InputLabel id="demo-simple-select-label">
                    Raffle Type
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="raffletype"
                    defaultValue={1}
                    sx={{ m: 1, width: "50ch" }}
                    variant="standard"
                    value={`${raffledata.raffletype}`}
                    onChange={(e) => {
                        setRaffledata({
                            ...raffledata,
                            raffletype: e.target.value,
                        });
                    }}
                >
                    <MenuItem value={0}>Free</MenuItem>
                    <MenuItem value={1}>Paid</MenuItem>
                </Select>

                {raffledata.amounttype === 0 && (
                    <>
                        <FormControl
                            variant="standard"
                            sx={{ m: 1, width: "50ch" }}
                        >
                            <InputLabel id="demo-simple-select-label-amount-currency">
                                Amount Currency
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label-amount-currency"
                                id="demo-simple-select"
                                label="amounttype"
                                value={raffledata.currency}
                                onChange={(e) => {
                                    setRaffledata({
                                        ...raffledata,
                                        currency: e.target.value,
                                    });
                                }}
                            >
                                <MenuItem value="">
                                    --please select currency--
                                </MenuItem>
                                <MenuItem value={0}>ETH</MenuItem>
                                <MenuItem value={1}>USDT</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}

                {raffledata.raffletype === 1 && (
                    <>
                        <InputLabel id="demo-simple-select-label">
                            Amounttype
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Amount Type"
                            variant="standard"
                            sx={{ m: 1, width: "50ch" }}
                            value={`${raffledata.amounttype}`}
                            onChange={(e) => {
                                setRaffledata({
                                    ...raffledata,
                                    amounttype: e.target.value,
                                });
                            }}
                        >
                            <MenuItem value={0}>Price</MenuItem>
                            <MenuItem value={1}>NFT</MenuItem>
                        </Select>
                    </>
                )}

                {raffledata.amounttype === 1 && raffledata.raffletype !== 0 && (
                    <>
                        <TextField
                            name="text"
                            sx={{ m: 1, width: "50ch" }}
                            variant="standard"
                            label="NFT Address"
                            value={raffledata.contractaddress}
                            onChange={(e) => {
                                setRaffledata({
                                    ...raffledata,
                                    contractaddress: e.target.value,
                                });
                            }}
                        />
                        <TextField
                            name="text"
                            label="NFT TokenId"
                            value={raffledata.tokenId}
                            onChange={(e) => {
                                setRaffledata({
                                    ...raffledata,
                                    tokenId: e.target.value,
                                });
                            }}
                        />
                    </>
                )}

                <InputLabel id="demo-simple-select-label">Winner</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="winnertype"
                    sx={{ m: 1, width: "50ch" }}
                    variant="standard"
                    value={`${raffledata.winnertype}`}
                    onChange={(e) => {
                        setRaffledata({
                            ...raffledata,
                            winnertype: e.target.value,
                        });
                    }}
                >
                    <MenuItem value={0}>Single</MenuItem>
                    <MenuItem value={1}>Multiple</MenuItem>
                </Select>

                {raffledata.winnertype === 1 && (
                    <>
                        <TextField
                            name="text"
                            sx={{ m: 1, width: "50ch" }}
                            variant="standard"
                            label="Winning Count"
                            value={raffledata.winingcount}
                            onChange={(e) => {
                                setRaffledata({
                                    ...raffledata,
                                    winingcount: e.target.value,
                                });
                            }}
                        />
                    </>
                )}

                <InputLabel id="demo-simple-select-label">
                    Winning Amount
                </InputLabel>
                <TextField
                    name="text"
                    sx={{ m: 1, width: "50ch" }}
                    variant="standard"
                    value={raffledata.winingamount}
                    onChange={(e) => {
                        setRaffledata({
                            ...raffledata,
                            winingamount: e.target.value,
                        });
                    }}
                />

                <InputLabel id="demo-simple-select-label">TweetId</InputLabel>
                <TextField
                    name="text"
                    sx={{ m: 1, width: "50ch" }}
                    variant="standard"
                    value={raffledata.tweetId}
                    onChange={(e) => {
                        setRaffledata({
                            ...raffledata,
                            tweetId: e.target.value,
                        });
                    }}
                />

                <InputLabel id="demo-simple-select-label">
                    Participants Size
                </InputLabel>
                <TextField
                    name="text"
                    sx={{ m: 1, width: "50ch" }}
                    variant="standard"
                    value={raffledata.total}
                    onChange={(e) => {
                        setRaffledata({ ...raffledata, total: e.target.value });
                    }}
                />

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={(e) => handleSubmit(e)}
                >
                    Update
                </LoadingButton>
            </form>
        </>
    );
}
