import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Web3 from "web3";
import CONFIG from "../../config";
import detectEthereumProvider from '@metamask/detect-provider';

const getWeb3 = () => {
    return new Promise(async (resolve, reject) => {
        const web3 = new Web3(window.ethereum)
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' })
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
            web3: web3,
        }
    }
)

export const web3instance = createAsyncThunk(
    'web3/init',
    async (data, thunkAPI) => {
        const provider = await detectEthereumProvider();

        if (provider) {
            const web3 = await getWeb3();
            if (window.ethereum.chainId !== "0x1") {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x1' }],
                    });
                } catch (error) {
                    return thunkAPI.rejectWithValue({
                        isLoginerror: error.message
                    });
                }
            }

            const addresses = await web3.eth.getAccounts()
            let bal = await web3.eth.getBalance(addresses[0])
            let metaBalance = await web3.utils.fromWei(String(bal), 'ether')

            thunkAPI.dispatch(setAccount({
                web3: web3,
                address: addresses[0],
                accuntBalance: metaBalance,
            }));


            return {
            }
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
    } else {
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



export const whitelisted = createAsyncThunk(
    'web3user/whitelisted',
    async (data, thunkAPI) => {
        return data;
    }
)

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

export const enableMintloader = createAsyncThunk(
    "web3user/setloader",
    async (data, thunkAPI) => {
        return {
            ismintLoading: true
        }
    }
)

export const disableMintloader = createAsyncThunk(
    "web3user/unsetloader",
    async (data, thunkAPI) => {
        return {
            ismintLoading: false,
            iswlError: true
        }
    }
)


const initialState = {
    web3: null,
    provider: null,
    metamaskError: null,
    contract: null,
    address: null,
    mintTransaction: null,
    iswalletConnected: null,
    whitelist: null,
    isloginLoading: null,
    isLoginerror: null,
    iswlError: null,
    ismintLoading: null,
    ismintError: null,
    userBalance: 0,
    accuntBalance: 0,
    freeSupply: 0,
    totalSupply: 0,
    maxSupply: 0,
    releaseErrorMessage: null,
    mintPrice: 0,
    wlPrice: 0,
    isSuccess: null,
    isLoading: null,
    currentStage: 0,
    isTimer: null
}

export const web3Slice = createSlice({
    name: 'web3',
    initialState: initialState,
    reducers: {
        adopt: () => { },
        clearMessage: (state) => {
            state.releaseErrorMessage = '';
            state.whitelist = null;
            state.ismintError = null;
            state.isLoginerror = null;
            state.iswlError = null;
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
            state.isLoading = false;
            state.mintTransaction = null;
        },
        [setAccount.pending]: (state, action) => {
            state.web3 = null;
            state.address = null;
            state.iswalletConnected = false;
            state.isloginLoading = true;
            state.isSuccess = null;
            state.isLoading = true;
            state.mintTransaction = null;
        },
        [setAccount.rejected]: (state, action) => {
            state.web3 = null;
            state.address = null;
            state.iswalletConnected = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.isloginLoading = null;
            state.mintTransaction = null;
        },

        [web3instance.fulfilled]: (state, action) => {
            state.contract = action.payload.contract;
            state.freeSupply = Number(action.payload.freeSupply);
            state.maxSupply = Number(action.payload.maxSupply);
            state.totalSupply = Number(action.payload.totalSupply);
            state.userBalance = Number(action.payload.userBalance);
            state.mintPrice = Number(action.payload.mintPrice);
            state.wlPrice = Number(action.payload.wlPrice);
            state.currentStage = Number(action.payload.currentStage);
            state.mintTransaction = null;
            state.isLoginerror = null;
        },
        [web3instance.pending]: (state, action) => {
            state.web3 = null
            state.address = null
            state.currentStage = 0;
            state.mintTransaction = null;
            state.isLoginerror = null;
        },
        [web3instance.rejected]: (state, action) => {
            state.web3 = null
            state.address = null
            state.currentStage = 0;
            state.isLoginerror = action.payload.isLoginerror;
            state.mintTransaction = null;
            state.metamaskError = action.payload.metamaskError
        },

        [web3live.fulfilled]: (state, action) => {
            state.web3 = action.payload.web3;
            state.contract = action.payload.contract;
            state.freeSupply = Number(action.payload.freeSupply);
            state.maxSupply = Number(action.payload.maxSupply);
            state.totalSupply = Number(action.payload.totalSupply);
            state.mintPrice = Number(action.payload.mintPrice);
            state.wlPrice = Number(action.payload.wlPrice);
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

        [whitelisted.fulfilled]: (state, action) => {
            state.whitelist = action.payload;
        },
        [whitelisted.pending]: (state, action) => {
            state.whitelist = null;
        },
        [whitelisted.rejected]: (state, action) => {
            state.whitelist = null;
        },

        [enableMintloader.fulfilled]: (state, action) => {
            state.ismintLoading = action.payload.ismintLoading;
        },

        [disableMintloader.fulfilled]: (state, action) => {
            console.log("action >>>>> ", action);
            state.ismintLoading = action.payload.ismintLoading;
            state.iswlError = action.payload.iswlError;
        },

        [setdisconnected.fulfilled]: (state, action) => {
            state.address = action.payload;
            state.ismintLoading = false;
        },
        [setdisconnected.pending]: (state, action) => {
            state.address = null;
            state.ismintLoading = true;
        },
        [setdisconnected.rejected]: (state, action) => {
            state.address = null;
            state.ismintLoading = true;
        },


        [setTransaction.fulfilled]: (state, action) => {
            state.mintTransaction = action.payload;
        },
        [setTransaction.pending]: (state, action) => {
            state.mintTransaction = null;
        },
        [setTransaction.rejected]: (state, action) => {
            state.mintTransaction = null;
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