/* eslint-disable default-param-last */
import { RootAction } from "../../../interfaces/state/rootAction";
import { RpcState } from "../../../interfaces/state/rpc";

const initialState: RpcState = {
	evmRpcUrlMap: {},
};

function rpcReducer(
	state: RpcState = initialState,
	action: RootAction
): RpcState {
	switch (action.type) {
		case "UPDATE_EVM_RPC_URL_MAP":
			return { ...state, evmRpcUrlMap: action.payload };
		default:
			return state;
	}
}

export default rpcReducer;
