import { RpcUrlMap } from "../interfaces/state/rpc";

export const checkJsonRpcUrlMapLength = (jsonRpcUrlMap: RpcUrlMap) => {
	if (Object.keys(jsonRpcUrlMap).length < 1) {
		throw new Error("jsonRpcUrlMap should have at least one entry");
	}
};
