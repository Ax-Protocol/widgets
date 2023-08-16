import { IUpdateRpcUrlMap } from "../types";

export const UPDATE_RPC_URL_MAP = "UPDATE_RPC_URL_MAP";

export const updateRpcUrlMap = (
	rpcUrlMap: Record<number, string>
): IUpdateRpcUrlMap => ({
	type: UPDATE_RPC_URL_MAP,
	payload: rpcUrlMap,
});
