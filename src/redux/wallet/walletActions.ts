import { Account, EIP1193Provider, WalletClient } from "viem";

import {
	Ecosystem,
	Ens,
	IUpdateAddress,
	IUpdateConnectionStatus,
	IUpdateCurrentEcosystem,
	IUpdateCurrentNetwork,
	IUpdateCurrentWallet,
	IUpdateEns,
	IUpdateEvmAccount,
	IUpdateEvmClient,
	IUpdateEvmProvider,
	IUpdateNativeBalance,
	Network,
	Wallet,
} from "../types";

export const UPDATE_CONNECTION_STATUS = "UPDATE_CONNECTION_STATUS";
export const UPDATE_EVM_PROVIDER = "UPDATE_EVM_PROVIDER";
export const UPDATE_EVM_ACCOUNT = "UPDATE_EVM_ACCOUNT";
export const UPDATE_EVM_CLIENT = "UPDATE_EVM_CLIENT";
export const UPDATE_ADDRESS = "UPDATE_ADDRESS";
export const UPDATE_NATIVE_BALANCE = "UPDATE_NATIVE_BALANCE";
export const UPDATE_CURRENT_WALLET = "UPDATE_CURRENT_WALLET";
export const UPDATE_CURRENT_ECOSYSTEM = "UPDATE_CURRENT_ECOSYSTEM";
export const UPDATE_CURRENT_NETWORK = "UPDATE_CURRENT_NETWORK";
export const UPDATE_ENS = "UPDATE_ENS";

export const updateConnectionStatus = (
	isWalletConnected: boolean
): IUpdateConnectionStatus => ({
	type: UPDATE_CONNECTION_STATUS,
	payload: isWalletConnected,
});

export const updateEvmProvider = (
	evmProvider: EIP1193Provider | null
): IUpdateEvmProvider => ({
	type: UPDATE_EVM_PROVIDER,
	payload: evmProvider,
});

export const updateEvmAccount = (
	evmAccount: Account | null
): IUpdateEvmAccount => ({
	type: UPDATE_EVM_ACCOUNT,
	payload: evmAccount,
});

export const updateEvmClient = (
	evmClient: WalletClient | null
): IUpdateEvmClient => ({
	type: UPDATE_EVM_CLIENT,
	payload: evmClient,
});

export const updateAddress = (address: string | null): IUpdateAddress => ({
	type: UPDATE_ADDRESS,
	payload: address,
});

export const updateNativeBalance = (
	nativeBalance: number | null
): IUpdateNativeBalance => ({
	type: UPDATE_NATIVE_BALANCE,
	payload: nativeBalance,
});

export const updateCurrentWallet = (
	currentWallet: Wallet | null
): IUpdateCurrentWallet => ({
	type: UPDATE_CURRENT_WALLET,
	payload: currentWallet,
});

export const updateCurrentEcosystem = (
	currentEcosystem: Ecosystem | null
): IUpdateCurrentEcosystem => ({
	type: UPDATE_CURRENT_ECOSYSTEM,
	payload: currentEcosystem,
});

export const updateCurrentNetwork = (
	currentNetwork: Network | null
): IUpdateCurrentNetwork => ({
	type: UPDATE_CURRENT_NETWORK,
	payload: currentNetwork,
});

export const updateEns = (ens: Ens | null): IUpdateEns => ({
	type: UPDATE_ENS,
	payload: ens,
});
