import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateRaffleInfo, setVerified } from "./userSlice";
import _ from "lodash";
import axios from "axios";
import CONFIG from "../../config";

const initialState = {
    currentRaffle: {},
    isCurrentLoading: null,
    isCurrentSuccess: null,
    raffles: [],
    isRaffleSuccess: null,
    isRaffleLoading: null,
    closeRaffles: [],
    isCloseLoading: null,
    isCloseSuccess: null,
    prices: [],
    users: [],
    newprices: [],
    participants: [],
    userEntry: {},
    raffleName: "",
    tweetFollowmsg: null,
    tweetLikedmsg: null,
    tweetRetweetmsg: null,
    isSuccess: null,
    isError: false,
    errorMessage: "",
    isBuySuccess: null,
};

export const addRaffle = createAsyncThunk(
    "raffle/addRaffle",
    async (ContactInfo, thunkAPI) => {
        let raffledata = await axios.post(
            `${CONFIG.WEB_API}createRaffle`,
            ContactInfo
        );
        if (raffledata.data) {
            return raffledata.data;
        } else {
            return thunkAPI.rejectWithValue(raffledata);
        }
    }
);

export const editRaffle = createAsyncThunk(
    "raffle/editRaffle",
    async (raffledata, thunkAPI) => {
        let id = raffledata._id;
        let editraffledata = await axios.post(
            `${CONFIG.WEB_API}updateRaffle/${id}`,
            raffledata
        );
        if (editraffledata.data) {
            return editraffledata.data;
        } else {
            return thunkAPI.rejectWithValue(editraffledata);
        }
    }
);

export const getRaffle = createAsyncThunk(
    "raffle/getRaffle",
    async (thunkAPI) => {
        let res = await axios.get(`${CONFIG.WEB_API}getRaffle`);
        if (res.data.raffles) {
            return res.data.raffles;
        } else {
            return thunkAPI.rejectWithValue(res);
        }
    }
);

export const getRafflebyId = createAsyncThunk(
    "up-raffle/getRafflebyId",
    async (id, thunkAPI) => {
        let result = await axios.get(`${CONFIG.WEB_API}findRaffle/${id}`);
        if (result.data.success) {
            return result.data.raffresult;
        } else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);

export const getRafflebysession = createAsyncThunk(
    "up-raffle/getRafflebysession",
    async (data, thunkAPI) => {
        let result = await axios.get(
            `${CONFIG.WEB_API}rafflebySession/${data.id}/${data.uid}`
        );
        if (result.data.success) {
            return result.data.participant;
        } else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);

export const getParticipants = createAsyncThunk(
    "raffle/getParticipants",
    async (_id, thunkAPI) => {
        let res = await axios.get(`${CONFIG.WEB_API}getParticipants`);
        if (res.data.participants) {
            return res.data.participants;
        } else {
            return thunkAPI.rejectWithValue(res);
        }
    }
);

export const getCloseRaffles = createAsyncThunk(
    "raffle/getCloseRaffles",
    async (id, thunkAPI) => {
        let res = await axios.post(`${CONFIG.WEB_API}getWinners`);
        if (res.data.closeRaffles) {
            return res.data.closeRaffles;
        } else {
            return thunkAPI.rejectWithValue(res);
        }
    }
);


export const buyTicket = createAsyncThunk(
    "raffle/buyTicket",
    async (data, thunkAPI) => {
        let buyTicketdata = await axios.post(
            `${CONFIG.WEB_API}buyTicket`,
            data
        );
        if (buyTicketdata.data) {
            await thunkAPI.dispatch(
                updateRaffleInfo({
                    userLikedetails: buyTicketdata.data.userLikedetails,
                    retweetDetails: buyTicketdata.data.retweetDetails,
                    userid: buyTicketdata.data.userid,
                    raffleId: buyTicketdata.data.raffleId,
                    email_verified: buyTicketdata.data.email_verified,
                    twitter_verified: buyTicketdata.data.twitter_verified,
                })
            );

            return buyTicketdata.data;
        } else {
            return thunkAPI.rejectWithValue(buyTicketdata);
        }
    }
);

export const getWinners = createAsyncThunk(
    "raffle/getWinners",
    async (id, thunkAPI) => {
        let res = await axios.post(`${CONFIG.WEB_API}getWinners`);
        if (res.data.closeRaffles) {
            return res.data.closeRaffles;
        } else {
            return thunkAPI.rejectWithValue(res);
        }
    }
);

export const getRaffleSlider = createAsyncThunk(
    "raffle/getRaffleSlider",
    async (id, thunkAPI) => {
        let res = await axios.post(`${CONFIG.WEB_API}getRaffleSlider`, {
            id: id,
        });
        if (res.data.raffles) {
            return res.data.raffles;
        } else {
            return thunkAPI.rejectWithValue(res);
        }
    }
);

export const raffleSlice = createSlice({
    name: "raffle",
    initialState,
    reducers: {
        clearErrors: (state, { action, payload }) => {
            if (payload.tweetRetweetmsg) {
                state.tweetRetweetmsg = null;
            }
            if (payload.tweetLikedmsg) {
                state.tweetLikedmsg = null;
            }
            if (payload.tweetFollowmsg) {
                state.tweetFollowmsg = null;
            }

            return state;
        },
    },
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

        [getRaffle.pending]: (state) => {
            state.loading = true;
            state.isRaffleSuccess = false;
            state.isRaffleLoading = true;
        },
        [getRaffle.fulfilled]: (state, action) => {
            let exist = action.payload;
            let reciveitems = _.unionBy(exist, action.payload, "_id");
            state.loading = false;
            state.isRaffleSuccess = true;
            state.isRaffleLoading = false;
            state.raffles = reciveitems;
            state.tweetRetweetmsg = null;
            state.tweetLikedmsg = null;
            state.tweetFollowmsg = null;
        },
        [getRaffle.rejected]: (state) => {
            state.loading = false;
            state.isRaffleSuccess = false;
            state.isRaffleLoading = false;
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

        [getRafflebysession.fulfilled]: (state, action) => {
            state.userEntry = action.payload;
        },
        [getRafflebysession.pending]: (state, action) => {
            state.userEntry = {};
            state.isCurrentLoading = true;
            state.isCurrentSuccess = false;
        },
        [getRafflebysession.rejected]: (state, action) => {
            state.userEntry = {};
        },

        [buyTicket.pending]: (state) => {
            state.loading = true;
            state.isBuySuccess = false;
        },
        [buyTicket.fulfilled]: (state, action) => {
            if (state.userEntry) {
                if (
                    state.userEntry.raffleId == action.payload.raffleId &&
                    state.userEntry.UserId == action.payload.userid
                ) {
                    state.userEntry = {
                        ...state.userEntry,
                        twiter_like: action.payload.userLikedetails,
                        twiter_retweet: action.payload.retweetDetails,
                        raffleId: action.payload.raffleId,
                        UserId: action.payload.userid,
                        isDone: action.payload.participants.isDone,
                    };
                }
            } else {
                state.userEntry = {
                    ...state.userEntry,
                    twiter_like: action.payload.userLikedetails,
                    twiter_retweet: action.payload.retweetDetails,
                    isDone: action.payload.participants.isDone,
                    raffleId: action.payload.raffleId,
                    UserId: action.payload.userid,
                };
            }

            if (action.payload.retweetDetails != 1) {
                state.tweetRetweetmsg = true;
            } else {
                state.tweetRetweetmsg = null;
            }

            if (action.payload.userLikedetails != 1) {
                state.tweetLikedmsg = true;
            } else {
                state.tweetLikedmsg = null;
            }

            if (action.payload.twitter_verified != 1) {
                state.tweetFollowmsg = true;
            } else {
                state.tweetFollowmsg = null;
            }

            state.loading = false;
            state.isBuySuccess = true;
            state.participants = action.payload;
        },
        [buyTicket.rejected]: (state) => {
            state.loading = false;
            state.isBuySuccess = false;
        },

        [getRaffleSlider.pending]: (state) => {
            state.loading = true;
        },
        [getRaffleSlider.fulfilled]: (state, action) => {
            let exist = action.payload;
            let reciveitems = _.unionBy(exist, action.payload, "_id");
            state.loading = false;
            state.isRaffleSuccess = true;
            state.raffles = reciveitems;
        },
        [getRaffleSlider.rejected]: (state) => {
            state.loading = false;
        },

        [getWinners.pending]: (state) => {
            state.loading = true;
            state.isCloseLoading = true;
            state.isCloseSuccess = false;
        },
        [getWinners.fulfilled]: (state, action) => {
            let exist = state.closeRaffles;
            let reciveitems = _.unionBy(exist, action.payload, "_id");
            state.loading = false;
            state.closeRaffles = reciveitems;
            state.isCloseLoading = false;
            state.isCloseSuccess = true;
        },
        [getWinners.rejected]: (state) => {
            state.loading = false;
            state.isCloseLoading = false;
            state.isCloseSuccess = false;
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
    },
});

export const raffleReducer = raffleSlice.reducer;
export const RaffleSelector = (state) => state.main.raffle;
export const { clearErrors } = raffleSlice.actions;
