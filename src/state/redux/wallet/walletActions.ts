import {
	Balance,
	Ecosystem,
	Ens,
	IUpdateAddress,
	IUpdateConnectionStatus,
	IUpdateCurrentEcosystem,
	IUpdateCurrentNetwork,
	IUpdateCurrentWallet,
	IUpdateEns,
	IUpdateNativeBalance,
	Network,
	Wallet,
} from "../../../interfaces/state/wallet";

export const updateConnectionStatus = (
	isWalletConnected: boolean
): IUpdateConnectionStatus => ({
	type: "UPDATE_CONNECTION_STATUS",
	payload: isWalletConnected,
});

export const updateAddress = (address: string | null): IUpdateAddress => ({
	type: "UPDATE_ADDRESS",
	payload: address,
});

export const updateNativeBalance = (
	nativeBalance: Balance | null
): IUpdateNativeBalance => ({
	type: "UPDATE_NATIVE_BALANCE",
	payload: nativeBalance,
});

export const updateCurrentWallet = (
	currentWallet: Wallet | null
): IUpdateCurrentWallet => ({
	type: "UPDATE_CURRENT_WALLET",
	payload: currentWallet,
});

export const updateCurrentEcosystem = (
	currentEcosystem: Ecosystem | null
): IUpdateCurrentEcosystem => ({
	type: "UPDATE_CURRENT_ECOSYSTEM",
	payload: currentEcosystem,
});

export const updateCurrentNetwork = (
	currentNetwork: Network | null
): IUpdateCurrentNetwork => ({
	type: "UPDATE_CURRENT_NETWORK",
	payload: currentNetwork,
});

export const updateEns = (ens: Ens | null): IUpdateEns => ({
	type: "UPDATE_ENS",
	payload: ens,
});
