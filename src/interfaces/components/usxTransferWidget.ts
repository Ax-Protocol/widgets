import { RpcUrlMap } from "../state/rpc";
import { Theme } from "../state/theme";

export type IUsxTransferWidget = {
	evmRpcUrlMap: RpcUrlMap; // required
	theme?: Theme;
	maxWidth?: number;
};
