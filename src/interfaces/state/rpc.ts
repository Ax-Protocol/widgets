export type RpcUrlMap = Record<number, string>;

export interface RpcState {
	evmRpcUrlMap: RpcUrlMap;
}

export interface IUpdateEvmRpcUrlMap {
	type: "UPDATE_EVM_RPC_URL_MAP";
	payload: RpcUrlMap;
}

export type RpcActions = IUpdateEvmRpcUrlMap;
