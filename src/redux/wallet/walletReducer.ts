/* eslint-disable default-param-last */
import { RootAction, WalletState } from "../types";
import {
	UPDATE_ADDRESS,
	UPDATE_CONNECTION_STATUS,
	UPDATE_CURRENT_ECOSYSTEM,
	UPDATE_CURRENT_NETWORK,
	UPDATE_CURRENT_WALLET,
	UPDATE_ENS,
	UPDATE_EVM_ACCOUNT,
	UPDATE_EVM_CLIENT,
	UPDATE_EVM_PROVIDER,
	UPDATE_NATIVE_BALANCE,
} from "./walletActions";

const initialState: WalletState = {
	isWalletConnected: false,
	evmProvider: null,
	evmAccount: null,
	evmClient: null,
	address: null,
	nativeBalance: null,
	currentWallet: null,
	currentEcosystem: null,
	currentNetwork: null,
	ens: null,
};

function walletReducer(state: WalletState = initialState, action: RootAction) {
	switch (action.type) {
		case UPDATE_CONNECTION_STATUS:
			return { ...state, isWalletConnected: action.payload };
		case UPDATE_EVM_PROVIDER:
			return { ...state, evmProvider: action.payload };
		case UPDATE_EVM_ACCOUNT:
			return { ...state, evmAccount: action.payload };
		case UPDATE_EVM_CLIENT:
			return { ...state, evmClient: action.payload };
		case UPDATE_ADDRESS:
			return { ...state, address: action.payload };
		case UPDATE_NATIVE_BALANCE:
			return { ...state, nativeBalance: action.payload };
		case UPDATE_CURRENT_WALLET:
			return { ...state, currentWallet: action.payload };
		case UPDATE_CURRENT_ECOSYSTEM:
			return { ...state, currentEcosystem: action.payload };
		case UPDATE_CURRENT_NETWORK:
			return { ...state, currentNetwork: action.payload };
		case UPDATE_ENS:
			return { ...state, ens: action.payload };
		default:
			return state;
	}
}

export default walletReducer;
