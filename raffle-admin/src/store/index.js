import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { web3Slice } from './reducers/web3Slice';
import { raffleSlice } from './reducers/raffleSlice';

const main = combineReducers({
    web3: web3Slice.reducer,
    raffle: raffleSlice.reducer
})


const store = configureStore({
    reducer: {
        main: main,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export default store;