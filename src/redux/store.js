// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from '../lib/storage'; // <-- 1. Import your new safe storage
import socketSlice from "./socketSlice.js";
import rtnSlice from "./rtnSlice.js";
import applicationSlice from "./applicationSlice.js";
import authSlice from "./authSlice.js";
import jobSlice from "./jobSlice.js";
import chatSlice from "./chatSlice.js";
import paymentSlice from "./paymentSlice.js";

const persistConfig = {
    key: 'my_current_project',
    version: 1,
    storage, // <-- 2. Use the safe storage
    blacklist: ["socketio"], // This is correct, you don't want to persist a socket connection
};

const rootReducer = combineReducers({
    socketio: socketSlice,
    auth: authSlice,
    job: jobSlice,
    application: applicationSlice,
    realTimeNotification: rtnSlice,
    chat: chatSlice,
    payment: paymentSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: { // 3. It's better to ignore specific actions than to disable the check entirely
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store); // <-- 4. Export the persistor