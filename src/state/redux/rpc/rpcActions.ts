import { IUpdateEvmRpcUrlMap, RpcUrlMap } from "../../../interfaces/state/rpc";

export const updateEvmRpcUrlMap = (
	evmRpcUrlMap: RpcUrlMap
): IUpdateEvmRpcUrlMap => ({
	type: "UPDATE_EVM_RPC_URL_MAP",
	payload: evmRpcUrlMap,
});
