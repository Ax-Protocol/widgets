import { Account, EIP1193Provider, WalletClient } from "viem";

import { UPDATE_RPC_URL_MAP } from "../rpc/rpcActions";
import rpcReducer from "../rpc/rpcReducer";
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
} from "../wallet/walletActions";
import walletReducer from "../wallet/walletReducer";

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
	name: string;
	avatar: string | null;
};

export interface RpcState {
	rpcUrlMap: Record<number, string>;
}

export interface WalletState {
	isWalletConnected: boolean;
	evmProvider: EIP1193Provider | null;
	evmAccount: Account | null;
	evmClient: WalletClient | null;
	address: string | null;
	nativeBalance: number | null;
	currentWallet: Wallet | null;
	currentEcosystem: Ecosystem | null;
	currentNetwork: Network | null;
	ens: Ens | null;
}

export interface IUpdateRpcUrlMap {
	type: typeof UPDATE_RPC_URL_MAP;
	payload: Record<number, string>;
}

export interface IUpdateConnectionStatus {
	type: typeof UPDATE_CONNECTION_STATUS;
	payload: boolean;
}

export interface IUpdateCurrentWallet {
	type: typeof UPDATE_CURRENT_WALLET;
	payload: Wallet | null;
}

export interface IUpdateCurrentEcosystem {
	type: typeof UPDATE_CURRENT_ECOSYSTEM;
	payload: Ecosystem | null;
}

export interface IUpdateEvmProvider {
	type: typeof UPDATE_EVM_PROVIDER;
	payload: EIP1193Provider | null;
}

export interface IUpdateEvmAccount {
	type: typeof UPDATE_EVM_ACCOUNT;
	payload: Account | null;
}

export interface IUpdateEvmClient {
	type: typeof UPDATE_EVM_CLIENT;
	payload: WalletClient | null;
}

export interface IUpdateAddress {
	type: typeof UPDATE_ADDRESS;
	payload: string | null;
}

export interface IUpdateNativeBalance {
	type: typeof UPDATE_NATIVE_BALANCE;
	payload: number | null;
}

export interface IUpdateCurrentNetwork {
	type: typeof UPDATE_CURRENT_NETWORK;
	payload: Network | null;
}

export interface IUpdateEns {
	type: typeof UPDATE_ENS;
	payload: Ens | null;
}

export type WalletActions =
	| IUpdateConnectionStatus
	| IUpdateCurrentWallet
	| IUpdateCurrentEcosystem
	| IUpdateEvmProvider
	| IUpdateEvmAccount
	| IUpdateEvmClient
	| IUpdateAddress
	| IUpdateNativeBalance
	| IUpdateCurrentNetwork
	| IUpdateEns;

export type RpcActions = IUpdateRpcUrlMap;

export type RootAction = WalletActions | RpcActions;

export type RootState = {
	walletReducer: ReturnType<typeof walletReducer>;
	rpcReducer: ReturnType<typeof rpcReducer>;
};
