import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { raffleSlice } from './reducers/raffleSlice';
import { userSlice } from './reducers/userSlice';

const main = combineReducers({
    raffle: raffleSlice.reducer,
    user: userSlice.reducer,
})

const store = configureStore({
    reducer: {
        main: main,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export default store;