import { combineReducers, configureStore } from "@reduxjs/toolkit";

import rpcReducer from "./rpc/rpcReducer";
import { RootAction, RootState } from "./types";
import walletReducer from "./wallet/walletReducer";

const combinedReducer = combineReducers<RootState, RootAction>({
	walletReducer,
	rpcReducer,
});

const store = configureStore({
	reducer: combinedReducer,
});

export default store;
