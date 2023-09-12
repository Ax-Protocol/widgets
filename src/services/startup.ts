import { RpcUrlMap } from "../interfaces/state/rpc";
import { Ecosystem } from "../interfaces/state/wallet";
import {
	initializeEvmWalletConfig,
	registerTokenService,
	registerUsxService,
	registerWalletService,
} from "../resources";
import { updateEvmRpcUrlMap } from "../state/redux/rpc/rpcActions";
import store from "../state/redux/store";
import { checkJsonRpcUrlMapLength } from "../utils/checkRpcUrlMap";
import EvmTokenService from "./evm/token";
import EvmUsxService from "./evm/usx";
import EvmWalletService from "./evm/wallet";

export const validateJsonRpcUrlMap = (evmRpcUrlMap: RpcUrlMap) => {
	try {
		checkJsonRpcUrlMapLength(evmRpcUrlMap);

		// If no error is thrown, initialize wallet config and dispatch global state update action
		initializeEvmWalletConfig(evmRpcUrlMap);
		store.dispatch(updateEvmRpcUrlMap(evmRpcUrlMap)); // TODO: rpc Redux is may be unecessary
	} catch (error) {
		if (error instanceof Error) {
			// eslint-disable-next-line no-console
			console.error(error.message);
		} else {
			// eslint-disable-next-line no-console
			console.error("An unexpected error occurred: ", error);
		}
	}
};

export const registerServices = () => {
	// EVM
	registerWalletService(Ecosystem.EVM, EvmWalletService.getInstance());
	registerTokenService(Ecosystem.EVM, EvmTokenService.getInstance());
	registerUsxService(Ecosystem.EVM, EvmUsxService.getInstance());

	// SOLANA
	// registerWalletService(Ecosystem.SOLANA, SolanaWalletService.getInstance());
	// registerTokenService(Ecosystem.SOLANA, SolanaTokenService.getInstance());
	// registerUsxService(Ecosystem.SOLANA, SolanaUsxService.getInstance());

	// APTOS
	// registerWalletService(Ecosystem.APTOS, AptosWalletService.getInstance());
	// registerTokenService(Ecosystem.APTOS, AptoTokenService.getInstance());
	// registerUsxService(Ecosystem.APTOS, AptoUsxService.getInstance());
};
