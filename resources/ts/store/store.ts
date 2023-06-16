import { configureStore } from '@reduxjs/toolkit'
import authSlice from './modules/authSlice';
import loadingSlice from './modules/loadingSlice';
import systemSlice from './modules/systemSlice';
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux";
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
// @ts-ignore
const env = appEnv

const reducers = combineReducers({
    system: systemSlice.reducer,
    authentication: authSlice.reducer,
    loading: loadingSlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: env !== 'production',
    middleware: [thunk]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const rootReducer = reducers;
