import rpcReducer from "../../state/redux/rpc/rpcReducer";
import walletReducer from "../../state/redux/wallet/walletReducer";

export type RootState = {
	walletReducer: ReturnType<typeof walletReducer>;
	rpcReducer: ReturnType<typeof rpcReducer>;
};
