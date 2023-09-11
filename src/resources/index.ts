import {
	EIP1193Provider,
	formatUnits,
	isEvmAddress,
	WalletClient,
} from "./evmInterface";
import {
	connect,
	disconnect,
	evmWalletConfig,
	fetchBalance,
	fetchEnsAvatar,
	fetchEnsName,
	getWalletClient,
	initializeEvmWalletConfig,
	switchNetwork,
	watchAccount,
	watchNetwork,
} from "./evmWalletConfig";
import { getChain } from "./getChain";
import {
	getWalletService,
	registerWalletService,
	walletServiceRegistry,
} from "./serviceRegistry";

export type { EIP1193Provider, WalletClient };
export {
	connect,
	disconnect,
	evmWalletConfig,
	fetchBalance,
	fetchEnsAvatar,
	fetchEnsName,
	formatUnits,
	getChain,
	getWalletClient,
	getWalletService,
	initializeEvmWalletConfig,
	isEvmAddress,
	registerWalletService,
	switchNetwork,
	walletServiceRegistry,
	watchAccount,
	watchNetwork,
};
