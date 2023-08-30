import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { RootAction } from "../../interfaces/state/rootAction";
import { RootState } from "../../interfaces/state/rootState";
import rpcReducer from "./rpc/rpcReducer";
import walletReducer from "./wallet/walletReducer";

const combinedReducer = combineReducers<RootState, RootAction>({
	walletReducer,
	rpcReducer,
});

const store = configureStore({
	reducer: combinedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
