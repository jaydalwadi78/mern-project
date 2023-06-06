import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { raffleSlice } from './reducers/raffleSlice';
import { userSlice } from './reducers/userSlice';
import { web3Slice } from './reducers/web3Slice';

const main = combineReducers({
    raffle: raffleSlice.reducer,
    user: userSlice.reducer,
    web3: web3Slice.reducer
})

const store = configureStore({
    reducer: {
        main: main,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export default store;