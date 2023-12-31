import {
	EIP1193Provider,
	encodeAbiParameters,
	formatUnits,
	isEvmAddress,
	parseUnits,
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
	readContract,
	switchNetwork,
	waitForTransaction,
	watchAccount,
	watchNetwork,
	writeContract,
} from "./evmWalletConfig";
import { getChain } from "./getChain";
import {
	getTokenService,
	getUsxService,
	getWalletService,
	registerTokenService,
	registerUsxService,
	registerWalletService,
	tokenServiceRegistry,
	usxServiceRegistry,
	walletServiceRegistry,
} from "./serviceRegistry";

export type { EIP1193Provider, WalletClient };
export {
	connect,
	disconnect,
	encodeAbiParameters,
	evmWalletConfig,
	fetchBalance,
	fetchEnsAvatar,
	fetchEnsName,
	formatUnits,
	getChain,
	getTokenService,
	getUsxService,
	getWalletClient,
	getWalletService,
	initializeEvmWalletConfig,
	isEvmAddress,
	parseUnits,
	readContract,
	registerTokenService,
	registerUsxService,
	registerWalletService,
	switchNetwork,
	tokenServiceRegistry,
	usxServiceRegistry,
	waitForTransaction,
	walletServiceRegistry,
	watchAccount,
	watchNetwork,
	writeContract,
};
