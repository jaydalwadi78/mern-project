import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from "web3";
import CONFIG from "../../config";


const getWeb3 = () => {
    return new Promise((resolve, reject) => {
        const web3 = new Web3(window.ethereum)
        try {
            window.ethereum.request({ method: 'eth_requestAccounts' })
            resolve(web3)
        } catch (error) {
            reject(error);
        }
    })
}

export const web3live = createAsyncThunk(
    'web3/liveinit',
    async (data, thunkAPI) => {
        const web3 = new Web3(CONFIG.WEB3_PROVIDER)
        return {
            web3
        }
    }
)

export const web3instance = createAsyncThunk(
    'web3/init', async (data, thunkAPI) => {
        const provider = await detectEthereumProvider();

        if (provider) {
            const web3 = await getWeb3();
            const addresses = await web3.eth.getAccounts()
            const bal = await web3.eth.getBalance(addresses[0])
            const metaBalance = await web3.utils.fromWei(String(bal), 'ether')

            thunkAPI.dispatch(setAccount({
                web3,
                address: addresses[0],
                accuntBalance: metaBalance,
            }));
        } else {
            return thunkAPI.rejectWithValue({
                metamaskError: 'Please install MetaMask.',
                isLoginerror: ''
            });
        }
    }
)

const accountsChanged = async (newAccount) => {
    // dispatch user address 
    console.log("newAccount >>>>>>>>>>> ", newAccount);
    try {
        const balance = await window.ethereum.request({
            method: "eth_getBalance",
            params: [newAccount.toString(), "latest"],
        });
        // console.log("balance >>>>>>>>>>> ", balance);
    } catch (err) {
        console.error(err);
    }
};

const chainChanged = async () => {
    if (window.ethereum) {
        try {
            const res = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            await accountsChanged(res[0]);
        } catch (err) {
            console.error(err);
            const res = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            await accountsChanged(res[0]);
        }
    }
};

export const disconnect = createAsyncThunk(
    'web3/disconnect',
    async (data, thunkAPI) => {
        window.ethereum.on('disconnect', () => {
            thunkAPI.dispatch(setdisconnected('0x0'));
        })
        return true;
    }
)

const buf2Hex = x => '0x' + x.toString('hex');

export const setdisconnected = createAsyncThunk(
    'web3user/setdisconnected',
    async (data, thunkAPI) => {
        return data;
    }
)

export const setTransaction = createAsyncThunk(
    'web3user/transaction',
    async (data, thunkAPI) => {
        return data;
    }
)

export const setAccount = createAsyncThunk(
    "web3user/setaccount",
    async (data, thunkAPI) => {
        return {
            web3: data.web3,
            address: data.address,
            accuntBalance: data.accuntBalance,
        }
    }
)


const initialState = {
    web3: null,
    provider: null,
    metamaskError: null,
    contract: null,
    address: null,
    iswalletConnected: null,
    isloginLoading: null,
    isLoginerror: null,
    userBalance: 0,
    accuntBalance: 0,
    releaseErrorMessage: null,
    isSuccess: null,
    isLoading: null,
    currentStage: 0,
    isTimer: null,
    isNoty: null,
}

export const web3Slice = createSlice({
    name: 'web3',
    initialState: initialState,
    reducers: {
        adopt: () => { },
        clearMessage: (state) => {
            state.releaseErrorMessage = '';
            state.isLoginerror = null;
            state.isNoty = null;
        },
    },
    extraReducers: {
        [setAccount.fulfilled]: (state, action) => {
            state.web3 = action.payload.web3;
            state.address = action.payload.address;
            state.accuntBalance = action.payload.accuntBalance;
            state.isloginLoading = null;
            state.iswalletConnected = true;
            state.isSuccess = true;
            state.isNoty = true;
            state.isLoading = false;
        },
        [setAccount.pending]: (state, action) => {
            state.web3 = null;
            state.address = null;
            state.iswalletConnected = false;
            state.isloginLoading = true;
            state.isSuccess = null;
            state.isNoty = null;
            state.isLoading = true;
        },
        [setAccount.rejected]: (state, action) => {
            state.web3 = null;
            state.address = null;
            state.iswalletConnected = false;
            state.isSuccess = false;
            state.isNoty = false;
            state.isLoading = false;
            state.isloginLoading = null;
        },

        [web3instance.fulfilled]: (state, action) => {
            state.userBalance = Number(action.payload.userBalance);
            state.currentStage = Number(action.payload.currentStage);
            state.isLoginerror = null;
        },
        [web3instance.pending]: (state, action) => {
            state.web3 = null
            state.address = null
            state.currentStage = 0;
            state.isLoginerror = null;
        },
        [web3instance.rejected]: (state, action) => {
            state.web3 = null
            state.address = null
            state.currentStage = 0;
            state.isLoginerror = action.payload.isLoginerror;
            state.metamaskError = action.payload.metamaskError
        },

        [web3live.fulfilled]: (state, action) => {
            state.web3 = action.payload.web3;
            state.currentStage = Number(action.payload.currentStage);
            state.isWeb3Success = true;
            state.isWebLoading = false;
        },
        [web3live.pending]: (state, action) => {
            state.web3 = null
            state.address = null
            state.currentStage = 0;
            state.iswalletConnected = false;
            state.isWeb3Success = null;
            state.isWebLoading = true;
        },
        [web3live.rejected]: (state, action) => {
            state.web3 = null
            state.address = null
            state.iswalletConnected = false;
            state.currentStage = 0;
            state.isWeb3Success = false;
            state.isWebLoading = false;
        },


        [setdisconnected.fulfilled]: (state, action) => {
            state.address = action.payload;
        },
        [setdisconnected.pending]: (state, action) => {
            state.address = null;
        },
        [setdisconnected.rejected]: (state, action) => {
            state.address = null;
        },

        [disconnect.fulfilled]: (state, action) => {
            state.provider = null;
            state.contract = null;
            state.address = null;
            state.transaction = null;
            state.userBalance = 0;
            state.accuntBalance = 0;
            state.releaseErrorMessage = null;
            state.isSuccess = null;
            state.isLoading = null;
        },
    }
})

export const Web3Selector = (state) => state.main.web3;
export const { adopt, clearMessage } = web3Slice.actions