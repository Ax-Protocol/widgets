export interface RpcState {
	rpcUrlMap: Record<number, string>;
}

export interface IUpdateRpcUrlMap {
	type: "UPDATE_RPC_URL_MAP";
	payload: Record<number, string>;
}

export type RpcActions = IUpdateRpcUrlMap;
