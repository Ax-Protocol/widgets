import type { EIP1193Provider, WalletClient } from "../../resources";

export type { EIP1193Provider, WalletClient };

export enum Ecosystem {
	EVM = "evm",
	SOLANA = "solana",
	APTOS = "aptos",
}

export enum WalletType {
	METAMASK = "metamask",
	INJECTED = "injected",
	WALLETCONNECT = "walletConnect",
	LEDGER = "ledger",
	COINBASE = "coinbase",
	SAFE = "safe",
}

export type Wallet = {
	type: WalletType;
	ecosystem: Ecosystem;
	label: string;
	imageSource: string;
};

export type Network = {
	ecosystem: Ecosystem;
	chainId: number;
	isSupported: boolean;
};

export type Ens = {
	name: string | null;
	avatar: string | null;
};

// Can't store bigint type in Redux, so it must be casted to bigint
// using BigInt() when first fetched from Redux in app
export type Balance = {
	decimals: number;
	formatted: string;
	symbol: string;
	value: string;
};

export interface WalletState {
	isWalletConnected: boolean;
	address: string | null;
	nativeBalance: Balance | null;
	currentWallet: Wallet | null;
	currentEcosystem: Ecosystem | null;
	currentNetwork: Network | null;
	ens: Ens | null;
}

export interface IUpdateConnectionStatus {
	type: "UPDATE_CONNECTION_STATUS";
	payload: boolean;
}

export interface IUpdateCurrentWallet {
	type: "UPDATE_CURRENT_WALLET";
	payload: Wallet | null;
}

export interface IUpdateCurrentEcosystem {
	type: "UPDATE_CURRENT_ECOSYSTEM";
	payload: Ecosystem | null;
}

export interface IUpdateAddress {
	type: "UPDATE_ADDRESS";
	payload: string | null;
}

export interface IUpdateNativeBalance {
	type: "UPDATE_NATIVE_BALANCE";
	payload: Balance | null;
}

export interface IUpdateCurrentNetwork {
	type: "UPDATE_CURRENT_NETWORK";
	payload: Network | null;
}

export interface IUpdateEns {
	type: "UPDATE_ENS";
	payload: Ens | null;
}

export type WalletActions =
	| IUpdateConnectionStatus
	| IUpdateCurrentWallet
	| IUpdateCurrentEcosystem
	| IUpdateAddress
	| IUpdateNativeBalance
	| IUpdateCurrentNetwork
	| IUpdateEns;
