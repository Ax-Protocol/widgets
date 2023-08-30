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
	switchNetwork,
} from "./evmWalletConfig";
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
	getWalletClient,
	getWalletService,
	isEvmAddress,
	registerWalletService,
	switchNetwork,
	walletServiceRegistry,
};
