import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";
import axios from "axios";
import CONFIG from "../../config";

const initialState = {
    raffles: [],
    prices: [],
    newprices: [],
    participants: [],
    userRaffles: [],
    raffleParticipants: [],
    users: [],
    totalRaffles: "",
    totalUsers: "",
    totalParticipants: "",
    raffleName: "",
    isSuccess: null,
    isError: false,
    errorMessage: "",
    recordsFiltered: 0,
    recordsTotal: 0,
    closeRaffles: [],
    isCloseLoading: null,
    isCloseSuccess: null,
    postData: {
        // "order": 'asc',
        // "orderBy": 'LessonIssue',
        // "pageSize": 10,
        limit: 5,
        currentPage: 3,
        //"search": '',
    },
};

export const addRaffle = createAsyncThunk(
    "raffle/addRaffle",
    async (ContactInfo, thunkAPI) => {
        let raffledata = await axios.post(
            `${CONFIG.API_ENDPOINT}createRaffle`,
            ContactInfo
        );
        if (raffledata.data) {
            return raffledata.data;
        } else {
            return thunkAPI.rejectWithValue(raffledata);
        }
    }
);

export const addUser = createAsyncThunk(
    "user/addUser",
    async (UserInfo, thunkAPI) => {
        let userdata = await axios.post(
            `${CONFIG.API_ENDPOINT}checkExistEmail`,
            UserInfo
        );
        if (userdata.data.success) {
            return userdata.data.userUpdated;
        } else {
            return thunkAPI.rejectWithValue(userdata.data);
        }
    }
);

export const editRaffle = createAsyncThunk(
    "raffle/editRaffle",
    async (raffledata, thunkAPI) => {
        let id = raffledata._id;
        let editraffledata = await axios.post(
            `${CONFIG.API_ENDPOINT}updateRaffle/${id}`,
            raffledata
        );
        if (editraffledata.data) {
            return editraffledata.data;
        } else {
            return thunkAPI.rejectWithValue(editraffledata);
        }
    }
);

export const setWinner = createAsyncThunk(
    "raffle/setWinner",
    async (raffledata, thunkAPI) => {
        let id = raffledata._id;
        let editraffledata = await axios.post(
            `${CONFIG.API_ENDPOINT}setWinner`,
            raffledata
        );
        if (editraffledata.data) {
            return editraffledata.data;
        } else {
            return thunkAPI.rejectWithValue(editraffledata);
        }
    }
);

export const editUser = createAsyncThunk(
    "raffle/editUser",
    async (userdata, thunkAPI) => {
        let edituserdata = await axios.post(
            `${CONFIG.API_ENDPOINT}updateUser/`,
            userdata
        );
        if (edituserdata.data) {
            return edituserdata.data;
        } else {
            return thunkAPI.rejectWithValue(edituserdata);
        }
    }
);

export const getRaffle = createAsyncThunk(
    "raffle/getRaffle",
    async (thunkAPI) => {
        let res = await axios.get(`${CONFIG.API_ENDPOINT}getRaffle`);
        if (res.data.raffles) {
            return res.data.raffles;
        } else {
            return thunkAPI.rejectWithValue(res);
        }
    }
);

export const getRafflesAdmin = createAsyncThunk(
    'raffle/getRafflesAdmin',
    async (postdata, thunkAPI) => {
        //console.log("postdata>>>", postdata);
        //let result = await Service.callApi("http://localhost:8080/v1/getRaffle", "POST", postdata);
        // let result = await axios.post(`http://localhost:5012/v1/getRaffle`, postdata)

        // `${CONFIG.API_ENDPOINT}updateUser/`,

        let result = await axios.post(`${CONFIG.API_ENDPOINT}getRafflesAdmin`, postdata);

        //let result = await fetch("http://localhost:8080/v1/getRaffle", "POST", postdata);
        //console.log("result>>>>>", result.data);
        if (result.data.success) {
            return result.data;
        } else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);

export const getDashboardData = createAsyncThunk(
    "raffle/getDashboardData",
    async (thunkAPI) => {
        let res = await axios.get(`${CONFIG.API_ENDPOINT}getDashboardData`);
        if (res.data) {
            return res.data;
        } else {
            return thunkAPI.rejectWithValue(res);
        }
    }
);

export const addPriceList = createAsyncThunk(
    "raffle/addPriceList",
    async (priceInfo, thunkAPI) => {
        let pricedata = await axios.post(
            `${CONFIG.API_ENDPOINT}addPrice`,
            priceInfo
        );
        if (pricedata.data) {
            return pricedata.data;
        } else {
            return thunkAPI.rejectWithValue(pricedata);
        }
    }
);

export const editPriceList = createAsyncThunk(
    "raffle/editPriceList",
    async (priceInfo, thunkAPI) => {
        let id = priceInfo._id;
        let editpriceInfo = await axios.post(
            `${CONFIG.API_ENDPOINT}updatePrice/${id}`,
            priceInfo
        );
        if (editpriceInfo.data) {
            return editpriceInfo.data;
        } else {
            return thunkAPI.rejectWithValue(editpriceInfo);
        }
    }
);

export const getPriceList = createAsyncThunk(
    "raffle/getPriceList",
    async (thunkAPI) => {
        let res = await axios.get(`${CONFIG.API_ENDPOINT}getPrice`);
        if (res.data.prices) {
            return res.data.prices;
        } else {
            return thunkAPI.rejectWithValue(res);
        }
    }
);

export const getNewPriceList = createAsyncThunk(
    "raffle/getNewPriceList",
    async (_id, thunkAPI) => {
        let res = await axios.get(`${CONFIG.API_ENDPOINT}findNewPrice/${_id}`);
        if (res.data.priceresult) {
            return res.data.priceresult;
        } else {
            return thunkAPI.rejectWithValue(res);
        }
    }
);

export const findUserAllRaffleById = createAsyncThunk(
    "raffle/findUserAllRaffleById",
    async (_id, thunkAPI) => {
        let res = await axios.get(
            `${CONFIG.API_ENDPOINT}findUserAllRaffleById/${_id}`
        );
        if (res.data.success === true) {
            return res.data.raffresult;
        } else {
            return thunkAPI.rejectWithValue(res);
        }
    }
);

export const fetchparticipants = createAsyncThunk(
    "raffle/fetchparticipants",
    async (_id, thunkAPI) => {
        let res = await axios.get(
            `${CONFIG.API_ENDPOINT}fetchparticipants/${_id}`
        );

        console.log("res.data.>>", res.data.raffresult);
        if (res.data.success === true) {
            return res.data.raffresult;
        } else {
            return thunkAPI.rejectWithValue(res);
        }
    }
);

export const getCloseRaffles = createAsyncThunk(
    "raffle/getCloseRaffles",
    async (id, thunkAPI) => {
        let res = await axios.post(`${CONFIG.API_ENDPOINT}getWinners`);
        console.log("res>>", res.data.allRaffles);
        if (res.data.allRaffles) {
            return res.data.allRaffles;
        } else {
            return thunkAPI.rejectWithValue(res);
        }
    }
);

export const getParticipants = createAsyncThunk(
    "raffle/getParticipants",
    async (_id, thunkAPI) => {
        let res = await axios.get(`${CONFIG.API_ENDPOINT}getParticipants`);
        if (res.data.participants) {
            return res.data.participants;
        } else {
            return thunkAPI.rejectWithValue(res);
        }
    }
);

export const deleteRaffles = createAsyncThunk(
    "raffle/deleteRaffles",
    async (data, thunkAPI) => {
        let deleteraffle = await axios.post(
            `${CONFIG.API_ENDPOINT}deleteRaffles/`,
            data
        );
        if (deleteraffle.data) {
            return data;
        } else {
            return thunkAPI.rejectWithValue(deleteraffle);
        }
    }
);

export const deleteUsers = createAsyncThunk(
    "raffle/deleteUsers",
    async (data, thunkAPI) => {
        let deleteuser = await axios.post(
            `${CONFIG.API_ENDPOINT}deleteUsers/`,
            data
        );
        if (deleteuser.data) {
            return data;
        } else {
            return thunkAPI.rejectWithValue(deleteuser);
        }
    }
);

export const deletePrice = createAsyncThunk(
    "raffle/deletePrice",
    async (data, thunkAPI) => {
        let deleteprice = await axios.post(
            `${CONFIG.API_ENDPOINT}deletePrice/`,
            data
        );
        if (deleteprice.data) {
            return data;
        } else {
            return thunkAPI.rejectWithValue(deleteprice);
        }
    }
);

export const deleteParticipant = createAsyncThunk(
    "raffle/deleteParticipant",
    async (data, thunkAPI) => {
        let deleteParticipant = await axios.post(
            `${CONFIG.API_ENDPOINT}deleteParticipant/`,
            data
        );
        if (deleteParticipant.data) {
            return data;
        } else {
            return thunkAPI.rejectWithValue(deleteParticipant);
        }
    }
);

export const getUser = createAsyncThunk("raffle/getUser", async (thunkAPI) => {
    let res = await axios.get(`${CONFIG.API_ENDPOINT}getUser`);
    if (res.data.users) {
        return res.data.users;
    } else {
        return thunkAPI.rejectWithValue(res);
    }
});


export const setParams = createAsyncThunk(
    'raffle/setparams',
    async (data, thunkAPI) => {
        return data;
    }
);

export const raffleSlice = createSlice({
    name: "raffle",
    initialState,
    reducers: {},
    extraReducers: {
        [addRaffle.pending]: (state) => {
            state.loading = true;
        },
        [addRaffle.fulfilled]: (state, action) => {
            let exist = [...state.raffles];
            let reciveitems = _.unionBy(exist, action.payload, "autoraffleId");
            state.loading = false;
            state.raffles = reciveitems;
        },
        [addRaffle.rejected]: (state) => {
            state.loading = false;
        },

        [editRaffle.pending]: (state) => {
            state.loading = true;
        },
        [editRaffle.fulfilled]: (state, action) => {
            let exist = state.raffles;
            let reciveitems = _.unionBy(exist, action.payload, "autoraffleId");
            state.loading = false;
            state.raffles = reciveitems;
        },
        [editRaffle.rejected]: (state) => {
            state.loading = false;
        },

        [deleteRaffles.pending]: (state) => {
            state.loading = true;
            state.isSuccess = null;
        },
        [deleteRaffles.fulfilled]: (state, action) => {
            // let exist = state.raffles;
            // let reciveitems = _.unionBy(exist, action.payload, 'autoraffleId');
            // console.log("state raffles deleteRaffles>>>>>", state.raffles);
            // console.log("action.payload>>>>>", action.payload);
            if (action.payload.length > 1) {
                //var removeRaffle = state.raffles.filter((item) => item._id !== action.payload);
                var removeRaffle = _.map(action.payload, function (o) {
                    //if (o !== action.payload) return o;
                    //console.log("o>>>>>>>>>>>", o);
                    return state.raffles.filter((item) => item._id !== o);
                });

                // var removeRaffle = _.difference(state.raffles._id, action.payload);

                //var removeRaffle = state.raffles.filter(x => action.payload.indexOf(x) === -1);
            } else {
                var removeRaffle = state.raffles.filter(
                    (item) => item._id !== action.payload[0]
                );
            }

            //console.log("removeRaffle>>>>>", removeRaffle); 

            state.loading = false;
            state.isSuccess = true;
            state.raffles = removeRaffle;
        },
        [deleteRaffles.rejected]: (state) => {
            state.loading = false;
        },

        [getRaffle.pending]: (state) => {
            state.loading = true;
        },
        [getRaffle.fulfilled]: (state, action) => {
            let exist = action.payload.raffles;
            //console.log("payload>>>", action.payload);
            let reciveitems = _.unionBy(exist, action.payload, "_id");
            state.loading = false;
            state.raffles = reciveitems;
            state.recordsTotal = action.payload.recordsTotal;
        },
        [getRaffle.rejected]: (state) => {
            state.loading = false;
        },


        [getRafflesAdmin.pending]: (state) => {
            state.loading = true;
        },
        [getRafflesAdmin.fulfilled]: (state, action) => {
            let exist = action.payload.raffles;
            // console.log("payload>>>", action.payload);
            let reciveitems = _.unionBy(exist, action.payload, "_id");
            state.loading = false;
            state.raffles = reciveitems;
            state.recordsTotal = action.payload.recordsTotal;
        },
        [getRafflesAdmin.rejected]: (state) => {
            state.loading = false;
        },

        [addPriceList.pending]: (state) => {
            state.loading = true;
        },
        [addPriceList.fulfilled]: (state, action) => {
            let exist = state.prices;
            let reciveitems = _.unionBy(exist, action.payload, "autoraffleId");
            state.loading = false;
            state.prices = reciveitems;
        },
        [addPriceList.rejected]: (state) => {
            state.loading = false;
        },

        [editPriceList.pending]: (state) => {
            state.loading = true;
        },
        [editPriceList.fulfilled]: (state, action) => {
            let exist = state.prices;
            let reciveitems = _.unionBy(exist, action.payload, "autoraffleId");
            state.loading = false;
            state.prices = reciveitems;
        },
        [editPriceList.rejected]: (state) => {
            state.loading = false;
        },

        [deletePrice.pending]: (state) => {
            state.loading = true;
            state.isSuccess = null;
        },
        [deletePrice.fulfilled]: (state, action) => {
            // let exist = state.raffles;
            // let reciveitems = _.unionBy(exist, action.payload, 'autoraffleId');
            // console.log("state raffles deletePrice>>>>>", state.prices);
            // console.log("action.payload>>>>>", action.payload);
            if (action.payload.length > 1) {
                //var removeRaffle = state.raffles.filter((item) => item._id !== action.payload);
                var removeRafflePrice = _.map(action.payload, function (o) {
                    //if (o !== action.payload) return o;
                    return state.prices.filter((item) => item._id !== o);
                });
            } else {
                var removeRafflePrice = state.prices.filter(
                    (item) => item._id !== action.payload[0]
                );
            }

            state.loading = false;
            state.isSuccess = true;
            state.raffles = removeRafflePrice;
        },
        [deletePrice.rejected]: (state) => {
            state.loading = false;
        },

        [getPriceList.pending]: (state) => {
            state.loading = true;
        },
        [getPriceList.fulfilled]: (state, action) => {
            let exist = action.payload;
            let reciveitems = _.unionBy(exist, action.payload, "_id");
            state.loading = false;
            if (action.payload.length > 0) {
                state.raffleName = action.payload[0].raffleId.name;
            }
            state.prices = reciveitems;
        },
        [getPriceList.rejected]: (state) => {
            state.loading = false;
        },

        [getNewPriceList.pending]: (state) => {
            state.loading = true;
        },
        [getNewPriceList.fulfilled]: (state, action) => {
            let exists = action.payload;
            state.loading = false;
            state.newprices = [...exists, action.payload];
        },
        [getNewPriceList.rejected]: (state) => {
            state.loading = false;
        },

        [getParticipants.pending]: (state) => {
            state.loading = true;
        },
        [getParticipants.fulfilled]: (state, action) => {
            let exist = action.payload;
            let reciveitems = _.unionBy(exist, action.payload, "_id");
            state.loading = false;
            state.participants = reciveitems;
        },
        [getParticipants.rejected]: (state) => {
            state.loading = false;
        },

        [deleteParticipant.pending]: (state) => {
            state.loading = true;
            state.isSuccess = null;
        },
        [deleteParticipant.fulfilled]: (state, action) => {
            // let exist = state.raffles;
            // let reciveitems = _.unionBy(exist, action.payload, 'autoraffleId');
            // console.log("state raffles deletePrice>>>>>", state.participants);
            // console.log("action.payload>>>>>", action.payload);
            if (action.payload.length > 1) {
                //var removeRaffle = state.raffles.filter((item) => item._id !== action.payload);
                var removeDeleteParticipant = _.map(
                    action.payload,
                    function (o) {
                        //if (o !== action.payload) return o;
                        return state.participants.filter(
                            (item) => item._id !== o
                        );
                    }
                );
            } else {
                var removeDeleteParticipant = state.participants.filter(
                    (item) => item._id !== action.payload[0]
                );
            }
            state.loading = false;
            state.isSuccess = true;
            state.raffles = removeDeleteParticipant;
        },
        [deleteParticipant.rejected]: (state) => {
            state.loading = false;
        },

        [getDashboardData.pending]: (state) => {
            state.loading = true;
        },
        [getDashboardData.fulfilled]: (state, action) => {
            // console.log("actiontotalRaffle>>>", action.payload.totalRaffles);
            // console.log("action>totalUser>>", action.payload.totalUsers);
            let finalTotalRaffles = action.payload.totalRaffles;
            let finalTotalUsers = action.payload.totalUsers;
            let finalTotalParticipants = action.payload.totalParticipants;
            //let reciveitems = action.payload;
            state.loading = false;
            state.totalRaffles = finalTotalRaffles;
            state.totalUsers = finalTotalUsers;
            state.totalParticipants = finalTotalParticipants;
        },
        [getDashboardData.rejected]: (state) => {
            state.loading = false;
        },

        [getUser.pending]: (state) => {
            state.loading = true;
        },
        [getUser.fulfilled]: (state, action) => {
            let exist = action.payload.users;
            let reciveitems = _.unionBy(exist, action.payload, "_id");
            state.loading = false;
            state.users = reciveitems;
        },
        [getUser.rejected]: (state) => {
            state.loading = false;
        },

        [addUser.pending]: (state) => {
            state.loading = true;
        },
        [addUser.fulfilled]: (state, action) => {
            let exist = [...state.users];
            let reciveitems = _.unionBy(exist, action.payload, "_id");
            state.loading = false;
            state.users = reciveitems;
        },
        [addUser.rejected]: (state) => {
            state.loading = false;
        },

        [editUser.pending]: (state) => {
            state.loading = true;
        },
        [editUser.fulfilled]: (state, action) => {
            let exist = state.users;
            let reciveitems = _.unionBy(exist, action.payload, "_id");
            state.loading = false;
            state.users = reciveitems;
        },
        [editUser.rejected]: (state) => {
            state.loading = false;
        },

        [deleteUsers.pending]: (state) => {
            state.loading = true;
            state.isSuccess = null;
        },
        [deleteUsers.fulfilled]: (state, action) => {
            // let exist = state.raffles;
            // let reciveitems = _.unionBy(exist, action.payload, 'autoraffleId');
            // console.log("state users >>>>>", state.users);
            // console.log("action.payload>>>>>", action.payload);
            if (action.payload.length > 1) {
                var removeUser = _.map(action.payload, function (o) {
                    //if (o !== action.payload) return o;
                    return state.users.filter((item) => item._id !== o);
                });
            } else {
                var removeUser = state.users.filter(
                    (item) => item._id !== action.payload[0]
                );
            }
            state.loading = false;
            state.isSuccess = true;
            state.users = removeUser;
        },
        [deleteUsers.rejected]: (state) => {
            state.loading = false;
        },

        [findUserAllRaffleById.pending]: (state) => {
            state.loading = true;
        },
        [findUserAllRaffleById.fulfilled]: (state, action) => {
            state.loading = false;
            state.userRaffles = action.payload;
        },
        [findUserAllRaffleById.rejected]: (state) => {
            state.loading = false;
        },

        [fetchparticipants.pending]: (state) => {
            state.loading = true;
        },
        [fetchparticipants.fulfilled]: (state, action) => {
            state.loading = false;
            state.raffleParticipants = action.payload;
        },
        [fetchparticipants.rejected]: (state) => {
            state.loading = false;
        },

        [getCloseRaffles.pending]: (state) => {
            state.loading = true;
            state.isCloseLoading = true;
            state.isCloseSuccess = false;
        },
        [getCloseRaffles.fulfilled]: (state, action) => {
            let exist = state.closeRaffles;
            let reciveitems = _.unionBy(exist, action.payload, "_id");
            state.loading = false;
            state.closeRaffles = reciveitems;
            state.isCloseLoading = false;
            state.isCloseSuccess = true;
        },
        [getCloseRaffles.rejected]: (state) => {
            state.loading = false;
            state.isCloseLoading = false;
            state.isCloseSuccess = false;
        },

        [setParams.fulfilled]: (state, { payload }) => {
            // console.log("state>>>>", state);
            // console.log("payload>>>>><<<<", payload.currentPage);
            console.log("setParams>>payload>>>>>", payload);
            // state.currentPage = payload.currentPage;
            state.postData = { ...payload };
            //state.postData = payload
            return state;
        },


    },
});

export const raffleReducer = raffleSlice.reducer;
export const RaffleSelector = (state) => state.main.raffle;
