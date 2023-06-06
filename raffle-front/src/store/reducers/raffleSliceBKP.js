import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import axios from 'axios';
import CONFIG from "../../config";

const initialState = {
    currentRaffle: {},
    isCurrentLoading: null,
    isCurrentSuccess: null,
    raffles: [],
    isRaffleSuccess: null,
    prices: [],
    newprices: [],
    participants: [],
    raffleName: '',
    isSuccess: null,
    isError: false,
    errorMessage: '',
}

export const addRaffle = createAsyncThunk(
    'raffle/addRaffle',
    async (ContactInfo, thunkAPI) => {
        let raffledata = await axios.post(CONFIG.WEB_API + "/createRaffle", ContactInfo)
        // console.log("raffledata>>>>", raffledata);
        if (raffledata.data) {
            return raffledata.data
        } else {
            return thunkAPI.rejectWithValue(raffledata);
        }
    })

export const editRaffle = createAsyncThunk(
    'raffle/editRaffle',
    async (raffledata, thunkAPI) => {
        //console.log(">>>>editRaffle", raffledata._id);
        let id = raffledata._id;
        let editraffledata = await axios.post(CONFIG.WEB_API + `/updateRaffle/${id}`, raffledata)
        // console.log("edit>>>>>>>>raffledata>>>>", editraffledata);
        if (editraffledata.data) {
            return editraffledata.data
        } else {
            return thunkAPI.rejectWithValue(editraffledata);
        }
    })

export const getRaffle = createAsyncThunk(
    'raffle/getRaffle',
    async (thunkAPI) => {
        let res = await axios.get(CONFIG.WEB_API + `/getRaffle`)
        if (res.data.raffles) {
            return res.data.raffles
        } else {
            return thunkAPI.rejectWithValue(res);
        }
    })

export const getRafflebyId = createAsyncThunk(
    'up-raffle/getRafflebyId',
    async (id, thunkAPI) => {
        let result = await axios.get(CONFIG.WEB_API + `/findRaffle/${id}`)
        if (result.data.success) {
            return result.data.raffresult;
        } else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);

export const addPriceList = createAsyncThunk(
    'raffle/addPriceList',
    async (priceInfo, thunkAPI) => {
        console.log("priceInfo>>>", priceInfo);
        let pricedata = await axios.post(CONFIG.WEB_API + "/addPrice", priceInfo)
        console.log("pricedata>>>>", pricedata);
        if (pricedata.data) {
            return pricedata.data
        } else {
            return thunkAPI.rejectWithValue(pricedata);
        }
    })

export const editPriceList = createAsyncThunk(
    'raffle/editPriceList',
    async (priceInfo, thunkAPI) => {
        //console.log(">>>>editRaffle", raffledata._id);
        let id = priceInfo._id;
        let editpriceInfo = await axios.post(CONFIG.WEB_API + `/updatePrice/${id}`, priceInfo)
        // console.log("edit>>>>>>>>raffledata>>>>", editraffledata);
        if (editpriceInfo.data) {
            return editpriceInfo.data
        } else {
            return thunkAPI.rejectWithValue(editpriceInfo);
        }
    })

export const getPriceList = createAsyncThunk(
    'raffle/getPriceList',
    async (thunkAPI) => {
        let res = await axios.get(CONFIG.WEB_API + `/getPrice`)
        if (res.data.prices) {
            return res.data.prices
        } else {
            return thunkAPI.rejectWithValue(res);
        }
    })

export const getNewPriceList = createAsyncThunk(
    'raffle/getNewPriceList',
    async (_id, thunkAPI) => {
        let res = await axios.get(CONFIG.WEB_API + `/findNewPrice/${_id}`)
        console.log("res>>>>", res.data.priceresult);
        if (res.data.priceresult) {
            return res.data.priceresult
        } else {
            return thunkAPI.rejectWithValue(res);
        }
    })

export const getParticipants = createAsyncThunk(
    'raffle/getParticipants',
    async (_id, thunkAPI) => {
        let res = await axios.get(CONFIG.WEB_API + `/getParticipants`)
        //  console.log("res>>participants>>", res.data.participants);
        if (res.data.participants) {
            return res.data.participants
        } else {
            return thunkAPI.rejectWithValue(res);
        }
    })

export const deleteRaffles = createAsyncThunk(
    'raffle/deleteRaffles',
    async (data, thunkAPI) => {
        console.log(">>>>deleteRaffle>>>>>data", data);
        let deleteraffle = await axios.post(CONFIG.WEB_API + `/deleteRaffles/`, data)
        console.log("deleteraffle>>>>>>>>", deleteraffle);
        if (deleteraffle.data) {
            return data
        } else {
            return thunkAPI.rejectWithValue(deleteraffle);
        }
    })


export const deletePrice = createAsyncThunk(
    'raffle/deletePrice',
    async (data, thunkAPI) => {
        console.log("data>>>>", data);
        let deleteprice = await axios.post(CONFIG.WEB_API + `/deletePrice/`, data)
        if (deleteprice.data) {
            return data
        } else {
            return thunkAPI.rejectWithValue(deleteprice);
        }
    })



export const deleteParticipant = createAsyncThunk(
    'raffle/deleteParticipant',
    async (data, thunkAPI) => {
        console.log("data>>>>", data);
        let deleteParticipant = await axios.post(CONFIG.WEB_API + `/deleteParticipant/`, data)
        if (deleteParticipant.data) {
            return data
        } else {
            return thunkAPI.rejectWithValue(deleteParticipant);
        }
    })

export const buyTicket = createAsyncThunk(
    'raffle/buyTicket',
    async (data, thunkAPI) => {
        console.log("data>>>", data);
        let buyTicketdata = await axios.post(CONFIG.WEB_API + "/buyTicket", data)
        console.log("buyTicketdata>>>>", buyTicketdata);
        if (buyTicketdata.data) {
            return buyTicketdata.data
        } else {
            return thunkAPI.rejectWithValue(buyTicketdata);
        }
    })


export const raffleSlice = createSlice({
    name: 'raffle',
    initialState,
    reducers: {},
    extraReducers: {
        [addRaffle.pending]: (state) => {
            state.loading = true
        },
        [addRaffle.fulfilled]: (state, action) => {
            let exist = [...state.raffles];
            let reciveitems = _.unionBy(exist, action.payload, 'autoraffleId');
            state.loading = false
            state.raffles = reciveitems
        },
        [addRaffle.rejected]: (state) => {
            state.loading = false
        },


        [editRaffle.pending]: (state) => {
            state.loading = true
        },
        [editRaffle.fulfilled]: (state, action) => {
            let exist = state.raffles;
            let reciveitems = _.unionBy(exist, action.payload, 'autoraffleId');
            state.loading = false
            state.raffles = reciveitems
        },
        [editRaffle.rejected]: (state) => {
            state.loading = false
        },

        [deleteRaffles.pending]: (state) => {
            state.loading = true
            state.isSuccess = null;
        },
        [deleteRaffles.fulfilled]: (state, action) => {
            // let exist = state.raffles;
            // let reciveitems = _.unionBy(exist, action.payload, 'autoraffleId');
            console.log("state raffles deleteRaffles>>>>>", state.raffles);
            console.log("action.payload>>>>>", action.payload);
            if (action.payload.length > 1) {
                //var removeRaffle = state.raffles.filter((item) => item._id !== action.payload);
                // var removeRaffle = _.map(action.payload, function (o) {
                //     //if (o !== action.payload) return o;

                //     console.log("o>>>>>>>>>>>", o);
                //     return state.raffles.filter((item) => item._id !== o)
                // });

                // var removeRaffle = _.difference(state.raffles._id, action.payload);

                //var removeRaffle = state.raffles.filter(x => action.payload.indexOf(x) === -1);
            } else {
                var removeRaffle = state.raffles.filter((item) => item._id !== action.payload[0]);
            }

            console.log("removeRaffle>>>>>", removeRaffle);

            state.loading = false
            state.isSuccess = true
            state.raffles = removeRaffle
        },
        [deleteRaffles.rejected]: (state) => {
            state.loading = false
        },


        [getRaffle.pending]: (state) => {
            state.loading = true
        },
        [getRaffle.fulfilled]: (state, action) => {
            let exist = action.payload;
            let reciveitems = _.unionBy(exist, action.payload, '_id');
            state.loading = false;
            state.isRaffleSuccess = true;
            state.raffles = reciveitems
        },
        [getRaffle.rejected]: (state) => {
            state.loading = false
        },


        [addPriceList.pending]: (state) => {
            state.loading = true
        },
        [addPriceList.fulfilled]: (state, action) => {
            let exist = state.prices;
            let reciveitems = _.unionBy(exist, action.payload, 'autoraffleId');
            state.loading = false
            state.prices = reciveitems
        },
        [addPriceList.rejected]: (state) => {
            state.loading = false
        },


        [editPriceList.pending]: (state) => {
            state.loading = true
        },
        [editPriceList.fulfilled]: (state, action) => {
            let exist = state.prices;
            let reciveitems = _.unionBy(exist, action.payload, 'autoraffleId');
            state.loading = false
            state.prices = reciveitems
        },
        [editPriceList.rejected]: (state) => {
            state.loading = false
        },


        [deletePrice.pending]: (state) => {
            state.loading = true
            state.isSuccess = null;
        },
        [deletePrice.fulfilled]: (state, action) => {
            // let exist = state.raffles;
            // let reciveitems = _.unionBy(exist, action.payload, 'autoraffleId');
            console.log("state raffles deletePrice>>>>>", state.prices);
            console.log("action.payload>>>>>", action.payload);
            if (action.payload.length > 1) {
                //var removeRaffle = state.raffles.filter((item) => item._id !== action.payload);
                var removeRafflePrice = _.map(action.payload, function (o) {
                    //if (o !== action.payload) return o;
                    return state.prices.filter((item) => item._id !== o)
                });
            } else {
                var removeRafflePrice = state.prices.filter((item) => item._id !== action.payload[0]);
            }

            state.loading = false
            state.isSuccess = true
            state.raffles = removeRafflePrice
        },
        [deletePrice.rejected]: (state) => {
            state.loading = false
        },


        [getPriceList.pending]: (state) => {
            state.loading = true
        },
        [getPriceList.fulfilled]: (state, action) => {
            let exist = action.payload;
            let reciveitems = _.unionBy(exist, action.payload, '_id');
            state.loading = false;
            if (action.payload.length > 0) {
                state.raffleName = action.payload[0].raffleId.name;
            }
            state.prices = reciveitems
        },
        [getPriceList.rejected]: (state) => {
            state.loading = false
        },


        [getNewPriceList.pending]: (state) => {
            state.loading = true
        },
        [getNewPriceList.fulfilled]: (state, action) => {
            let exists = action.payload;
            state.loading = false;
            state.newprices = [...exists, action.payload]
        },
        [getNewPriceList.rejected]: (state) => {
            state.loading = false
        },


        [getParticipants.pending]: (state) => {
            state.loading = true
        },
        [getParticipants.fulfilled]: (state, action) => {
            let exist = action.payload;
            let reciveitems = _.unionBy(exist, action.payload, '_id');
            state.loading = false;
            state.participants = reciveitems
        },
        [getParticipants.rejected]: (state) => {
            state.loading = false
        },


        [deleteParticipant.pending]: (state) => {
            state.loading = true
            state.isSuccess = null;
        },
        [deleteParticipant.fulfilled]: (state, action) => {
            // let exist = state.raffles;
            // let reciveitems = _.unionBy(exist, action.payload, 'autoraffleId');
            console.log("state raffles deletePrice>>>>>", state.participants);
            console.log("action.payload>>>>>", action.payload);
            if (action.payload.length > 1) {
                //var removeRaffle = state.raffles.filter((item) => item._id !== action.payload);
                var removeDeleteParticipant = _.map(action.payload, function (o) {
                    //if (o !== action.payload) return o;
                    return state.participants.filter((item) => item._id !== o)
                });
            } else {
                var removeDeleteParticipant = state.participants.filter((item) => item._id !== action.payload[0]);
            }
            state.loading = false
            state.isSuccess = true
            state.raffles = removeDeleteParticipant
        },
        [deleteParticipant.rejected]: (state) => {
            state.loading = false
        },


        [getRafflebyId.fulfilled]: (state, action) => {
            state.currentRaffle = action.payload;
            state.isCurrentLoading = false;
            state.isCurrentSuccess = true;
        },
        [getRafflebyId.pending]: (state, action) => {
            state.currentRaffle = {};
            state.isCurrentLoading = true;
            state.isCurrentSuccess = false;
        },
        [getRafflebyId.rejected]: (state, action) => {
            state.currentRaffle = {};
            state.isCurrentLoading = false;
            state.isCurrentSuccess = false;
        },

        [buyTicket.pending]: (state) => {
            state.loading = true
        },
        [buyTicket.fulfilled]: (state, action) => {
            state.loading = false;
            state.participants = action.payload
        },
        [buyTicket.rejected]: (state) => {
            state.loading = false
        },
    },
})

export const raffleReducer = raffleSlice.reducer
export const RaffleSelector = (state) => state.main.raffle;