import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import axios from 'axios';
import { localStorageHelper } from "../../services/localStorageHelper";
import CONFIG from "../../config";

const initialState = {
    user_id: null,
    userRaffles: [],
    activities: [],
    isLogined: null,
    name: null,
    email: null,
    address: null,
    busd_address: null,
    twitter_id: null,
    twitter_screen_name: null,
    twitter_verified: null,
    email_verified: null,
    isverifiedSuccess: null,
    isAddSuccess: null,
    isLoginSuccess: null,
    isError: false,
    loading: null,
    isResetPassword: null,
    isTwittererror: null,
    isForgotPassword: null,
    isResendMailSusscees: null,
    isResendMailLoading: null,
    isactivitySuccess: null,
    isactivityLoading: null,
    errorMessage: '',
     winnerName: null,
    winnerAddress: null,
    winnerRaffle: [],
    winnerParticipation: [],
    iswinnerSuccess: null,
    iswinnerLoading: null,
}

export const addUser = createAsyncThunk(
    'user/addUser',
    async (UserInfo, thunkAPI) => {
        let userdata = await axios.post(`${CONFIG.WEB_API}checkExistEmail`, UserInfo)
        if (userdata.data.success) {
            return userdata.data.userUpdated
        } else {
            return thunkAPI.rejectWithValue(userdata.data);
        }
    })

export const getActivities = createAsyncThunk(
    "user/activitiies",
    async (UserInfo, thunkAPI) => {
        let userdata = await axios.post(
            `${CONFIG.WEB_API}activities`,
            UserInfo
        );
        if (userdata.data.success) {
            return userdata.data.activities;
        } else {
            return thunkAPI.rejectWithValue(userdata.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (loginInfo, thunkAPI) => {
        let userid = await localStorageHelper.getStorage("userid");
        if(userid){
            let user_id = await localStorageHelper.getStorage("userid");
            let user = await axios.post(`${CONFIG.WEB_API}userbyId`, { user_id : user_id})
            return user.data.user;
        }else{
            let userdata = await axios.post(`${CONFIG.WEB_API}loginUser`, loginInfo)
            if (userdata.data.success === true) {
                return userdata.data.userUpdated
            } else {
                return thunkAPI.rejectWithValue(userdata.data);
            }
        }
    })

export const forgotUser = createAsyncThunk(
    'user/forgotuser',
    async (loginInfo, thunkAPI) => {
        let userdata = await axios.post(`${CONFIG.WEB_API}forgotUser`, loginInfo)
        if (userdata.data.success === true) {
            return userdata.data.userUpdated
        } else {
            return thunkAPI.rejectWithValue(userdata.data);
        }
    })

export const resetPassword = createAsyncThunk(
    'user/reset',
    async (loginInfo, thunkAPI) => {
        let userdata = await axios.post(`${CONFIG.WEB_API}resetPassword`, loginInfo)
        if (userdata.data.success === true) {
            return userdata.data.userUpdated
        } else {
            return thunkAPI.rejectWithValue(userdata.data);
        }
    })
    
    
export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (UserInfo, thunkAPI) => {
        let userdata = await axios.post(`${CONFIG.WEB_API}updateUser`, UserInfo)
        if (userdata.data.success) {
            return userdata.data.userUpdated
        } else {
            return thunkAPI.rejectWithValue(userdata.data);
        }
    })

export const getuserRaffles = createAsyncThunk(
    'user/userraffles',
    async (UserInfo, thunkAPI) => {
        let userdata = await axios.post(`${CONFIG.WEB_API}userraffles`, UserInfo)
        if (userdata.data.success) {
            return userdata.data.raffles
        } else {
            return thunkAPI.rejectWithValue(userdata.data);
        }
    })
    

export const verifyMail = createAsyncThunk(
    'user/verifyMail',
    async (email, thunkAPI) => {
        let userdata = await axios.post(`${CONFIG.WEB_API}verifyMail`, email);
        if (userdata.data.success === true) {
            return userdata.data.emailexistuser
        } else {
            return thunkAPI.rejectWithValue(userdata.data);
        }
    }
)

export const resendMail  = createAsyncThunk(
    'user/resend-mail',
    async (email, thunkAPI) => {
        let userdata = await axios.post(`${CONFIG.WEB_API}resubscribe`, email);
        console.log("userdata >>>>> ", userdata.data);
        if (userdata.data.success === true) {
            return userdata.data.emailexistuser
        } else {
            return thunkAPI.rejectWithValue(userdata.data);
        }
    }
)

export const updateRaffleInfo = createAsyncThunk(
    "user/updateRaffleInfo",
    async (raffleInfo, thunkAPI) => {
        return raffleInfo;
    }
)

export const twittelLogin =  createAsyncThunk(
    'user/twittelLogin',
    async (user_id, thunkAPI) => {

        let userdetails = await axios.get(`${CONFIG.AUTH_PATH}login/success?userid=${user_id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            withCredentials: true
        })
        console.log("userdetails.data >>>>>> ", userdetails)
        if(userdetails.data.success === true){
            return userdetails.data;
        }else{
            return thunkAPI.rejectWithValue(userdetails.data);
        }
    }
)

export const setVerified = createAsyncThunk(
    'user/setverified',
    async (verified, thunkAPI) => {
        return verified;
})

export const userwinnerById = createAsyncThunk(
    "user/userwinnerById",
    async (_id, thunkAPI) => {
        console.log("_id>>>", _id);
        let res = await axios.get(`${CONFIG.WEB_API}userwinnerById/${_id}`);
        console.log("res.data", res.data);
        if (res.data.success === true) {
            return res.data;
        } else {
            return thunkAPI.rejectWithValue(res);
        }
    }
);



export const logOut = createAsyncThunk(
    'user/logout',
    async (UserInfo, thunkAPI) => {
        return true;
    })

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearMessage: (state) => {
			state.loading = null;
			state.errorMessage = null;
			state.isAddSuccess = null;
			state.isLoginSuccess = null;
			state.isverifiedSuccess = null;
			state.isForgotPassword = null;
			state.isResetPassword = null;
			state.isTwittererror = null;
            state.isResendMailSusscees = null;
            state.isResendMailLoading = null;
            state.iswinnerSuccess = null;
            state.iswinnerLoading = null;
		},
    },
    extraReducers: {
        [addUser.pending]: (state) => {
            state.loading = true
        },
        [addUser.fulfilled]: (state, action) => {
            state.loading = false
            state.isAddSuccess = true;
            state.loading = false;
            return state
        },
        [addUser.rejected]: (state, action) => {
            state.loading = false
            state.errorMessage = action.payload.error
        },

        [loginUser.pending]: (state) => {
            state.loading = true
        },
        [loginUser.fulfilled]: (state, action) => {
            let userdetails = action.payload;
            state.loading = false
            state.isLogined = true;
            state.user_id = userdetails._id;
            state.email = userdetails.email;
            state.name = userdetails.name;
            state.busd_address = userdetails.busd_address;
            state.address = userdetails.address;
            state.twitter_id = userdetails.twitter_id;
            state.twitter_screen_name = userdetails.twitter_screen_name;
            state.twitter_verified = userdetails.twitter_verified;
            state.email_verified = userdetails.email_verified;
            state.isLoginSuccess = true;
            state.loading = false;

            localStorageHelper.setStorage("userdata", userdetails);
            localStorageHelper.setStorage("userid", userdetails._id);
            localStorageHelper.setStorage("isLogin", "true");
            return state
        },
        [loginUser.rejected]: (state,action) => {
            state.loading = false
            state.errorMessage = action.payload.error
        },


        [verifyMail.pending]: (state) => {
            state.loading = true
        },
        [verifyMail.fulfilled]: (state, action) => {
            let userdetails = action.payload;

            state.loading = false
            state.email_verified = userdetails.email_verified;
            state.isverifiedSuccess = true;

            return state
        },
        [verifyMail.rejected]: (state,action) => {
            state.loading = false
            state.errorMessage = action.payload.error
        },


        [getActivities.pending]: (state) => {
            state.isactivitySuccess = false;
            state.isactivityLoading = true;
        },
        [getActivities.fulfilled]: (state, action) => {
            let userdetails = action.payload;
            state.activities = userdetails;
            state.isactivitySuccess = true;
            state.isactivityLoading = false;
            return state;
        },
        [getActivities.rejected]: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload.error;
            state.isactivitySuccess = false;
            state.isactivityLoading = false;
        },

        [setVerified.pending]: (state) => {
            state.loading = true
        },
        [setVerified.fulfilled]: (state, action) => {
            let userdetails = action.payload;
            state.email_verified = userdetails.email_verified;
            state.twitter_verified = userdetails.twitter_verified;

            return state
        },
        [setVerified.rejected]: (state,action) => {
            state.loading = false
            state.errorMessage = action.payload.error
        },
        
        
        [twittelLogin.pending]: (state) => {
            state.loading = true
        },
        [twittelLogin.fulfilled]: (state, action) => {
            let userdetails = action.payload;
            state.twitter_verified = userdetails.followings;
            state.twitter_id = userdetails.user.twitterId;
            state.twitter_screen_name = userdetails.user.screenName;
        },
        [twittelLogin.rejected]: (state,action) => {
            state.loading = false
            state.isTwittererror = true
        },


        [resendMail.pending]: (state) => {
            state.loading = true
            state.isResendMailSusscees = false;
            state.isResendMailLoading = true;
        },
        [resendMail.fulfilled]: (state, action) => {
            state.isResendMailSusscees = true;
            state.isResendMailLoading = false;
        },
        [resendMail.rejected]: (state,action) => {
            state.loading = false;
            state.isResendMailSusscees = false;
            state.isResendMailLoading = false;
            state.errorMessage = action.payload.error;
        },

        [getuserRaffles.pending]: (state) => {
            state.loading = true
        },
        [getuserRaffles.fulfilled]: (state, action) => {
            let userdetails = action.payload;
            state.userRaffles = action.payload;
        },
        [getuserRaffles.rejected]: (state,action) => {
            state.loading = false
            state.errorMessage = action.payload.error
        },

        [resetPassword.pending]: (state) => {
            state.loading = true
        },
        [resetPassword.fulfilled]: (state, action) => {
            state.isResetPassword = true;
        },
        [resetPassword.rejected]: (state,action) => {
            state.loading = false
        },
        
        [forgotUser.pending]: (state) => {
            state.loading = true
        },
        [forgotUser.fulfilled]: (state, action) => {
            state.isForgotPassword = true;
        },
        [forgotUser.rejected]: (state,action) => {
            state.loading = false
            state.isForgotPassword = false;
        },
        

        [updateRaffleInfo.pending]: (state) => {
            state.loading = true
        },
        [updateRaffleInfo.fulfilled]: (state, action) => {
            let exist = [...state.userRaffles];
            let exIndex = exist.findIndex((e) => e.raffleId == action.payload.raffleId);
            if(exIndex < 0){
                exist.push(action.payload);
            }else{
                exist[exIndex] = action.payload;
            }
            state.userRaffles = exist;
            state.email_verified = action.payload.email_verified;
            state.twitter_verified = action.payload.twitter_verified;
        },
        [updateRaffleInfo.rejected]: (state,action) => {
            state.loading = false
            state.errorMessage = action.payload.error
        },

        [updateUser.pending]: (state) => {
            state.loading = true
        },
        [updateUser.fulfilled]: (state, action) => {
            let userdetails = action.payload;
            state.user_id = userdetails._id;
            state.name = userdetails.name;
            state.email = userdetails.email;
            state.busd_address = userdetails.busd_address;
            state.loading = false;
            return state
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false
            state.errorMessage = action.payload.error
        },
        
        [logOut.pending]: (state) => {
            state.loading = true
        },
        [logOut.fulfilled]: (state, action) => {
            localStorageHelper.logout();
            
            state.isLogined = null;
            state.user_id = null;
            state.name = null;
            state.busd_address = null;
            state.email = null;
            state.address = null;
            state.twitter_id = null;
            state.twitter_screen_name = null;
            state.twitter_verified = null;
            state.email_verified = null;
            state.isLoginSuccess = null;
            state.loading = null;
            return state
        },
        [logOut.rejected]: (state,action) => {
            state.loading = false
            state.errorMessage = action.payload.error
        },

        [userwinnerById.pending]: (state) => {
            state.loading = true;
            state.iswinnerSuccess = false;
            state.iswinnerLoading = true;
        },
        [userwinnerById.fulfilled]: (state, action) => {
            console.log("action.payload>>>", action.payload);
            let userdetails = action.payload;
            state.winnerName = userdetails.user.name;
            state.winnerAddress = userdetails.user.address;
            state.winnerRaffle = action.payload.winnerRaffle;
            state.winnerParticipation = action.payload.winnerParticipation;
            state.iswinnerSuccess = true;
            state.iswinnerLoading = false;
            return state;
        },
        [userwinnerById.rejected]: (state) => {
            state.loading = false;
            state.iswinnerSuccess = null;
            state.iswinnerLoading = null;
        },
    },
})

export const userReducer = userSlice.reducer
export const UserSelector = (state) => state.main.user;
export const { clearMessage } = userSlice.actions