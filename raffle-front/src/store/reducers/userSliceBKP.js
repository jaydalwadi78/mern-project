import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import axios from 'axios';
import { localStorageHelper } from "../../services/localStorageHelper";
import CONFIG from "../../config";

const initialState = {
    user_id: null,
    isLogined: null,
    email: null,
    address: null,
    twitter_id: null,
    twitter_screen_name: null,
    twitter_verified: null,
    email_verified: null,
    isAddSuccess: null,
    isLoginSuccess: null,
    isError: false,
    loading: null,
    errorMessage: '',
}

export const addUser = createAsyncThunk(
    'user/addUser',
    async (UserInfo, thunkAPI) => {
        let userdata = await axios.post(CONFIG.WEB_API + "checkExistEmail", UserInfo)
        if (userdata.data.success) {
            return userdata.data.userUpdated
        } else {
            return thunkAPI.rejectWithValue(userdata.data);
        }
    })

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (loginInfo, thunkAPI) => {
        let userid = await localStorageHelper.getStorage("userid");
        if (userid) {
            let userdata = await localStorageHelper.getStorage("userdata");
            return JSON.parse(userdata);
        } else {
            let userdata = await axios.post(CONFIG.WEB_API + "/loginUser", loginInfo)
            console.log(userdata.data);
            if (userdata.data.success === true) {
                return userdata.data.userUpdated
            } else {
                return thunkAPI.rejectWithValue(userdata.data);
            }
        }

    })

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
        },
    },
    extraReducers: {

        [addUser.pending]: (state) => {
            state.loading = true
        },
        [addUser.fulfilled]: (state, action) => {
            let userdetails = action.payload.userUpdated;

            state.loading = false
            state.user_id = userdetails._id;
            state.email = userdetails.email;
            state.address = userdetails.address;
            state.twitter_id = userdetails._itwitter_idd;
            state.twitter_screen_name = userdetails.twitter_screen_name;
            state.twitter_verified = userdetails.twitter_verified;
            state.email_verified = userdetails.email_verified;
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
            localStorageHelper.setStorage("userdata", userdetails);
            localStorageHelper.setStorage("userid", userdetails._id);
            localStorageHelper.setStorage("isLogin", "true");

            state.loading = false
            state.isLogined = true;
            state.user_id = userdetails._id;
            state.email = userdetails.email;
            state.address = userdetails.address;
            state.twitter_id = userdetails._itwitter_idd;
            state.twitter_screen_name = userdetails.twitter_screen_name;
            state.twitter_verified = userdetails.twitter_verified;
            state.email_verified = userdetails.email_verified;
            state.isLoginSuccess = true;
            state.loading = false;
            return state
        },
        [loginUser.rejected]: (state, action) => {
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
        [logOut.rejected]: (state, action) => {
            state.loading = false
            state.errorMessage = action.payload.error
        },
    },
})

export const userReducer = userSlice.reducer
export const UserSelector = (state) => state.main.user;
export const { clearMessage } = userSlice.actions