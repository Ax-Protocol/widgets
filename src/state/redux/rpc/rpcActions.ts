import { IUpdateRpcUrlMap } from "../../../interfaces/state/rpc";

export const updateRpcUrlMap = (
	rpcUrlMap: Record<number, string>
): IUpdateRpcUrlMap => ({
	type: "UPDATE_RPC_URL_MAP",
	payload: rpcUrlMap,
});
