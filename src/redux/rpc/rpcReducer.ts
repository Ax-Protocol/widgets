/* eslint-disable default-param-last */
import { RootAction, RpcState } from "../types";
import { UPDATE_RPC_URL_MAP } from "./rpcActions";

const initialState: RpcState = {
	rpcUrlMap: {},
};

function rpcReducer(
	state: RpcState = initialState,
	action: RootAction
): RpcState {
	switch (action.type) {
		case UPDATE_RPC_URL_MAP:
			return { ...state, rpcUrlMap: action.payload };
		default:
			return state;
	}
}

export default rpcReducer;
