import {
	configureChains,
	connect,
	createConfig,
	disconnect,
	fetchBalance,
	fetchEnsAvatar,
	fetchEnsName,
	getWalletClient,
	switchNetwork,
} from "@wagmi/core";
import {
	arbitrum,
	avalanche,
	bsc,
	celo,
	fantom,
	gnosis,
	mainnet,
	optimism,
	polygon,
} from "@wagmi/core/chains";
import { CoinbaseWalletConnector } from "@wagmi/core/connectors/coinbaseWallet";
import { InjectedConnector } from "@wagmi/core/connectors/injected";
import { LedgerConnector } from "@wagmi/core/connectors/ledger";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import { SafeConnector } from "@wagmi/core/connectors/safe";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import { publicProvider } from "@wagmi/core/providers/public";

import store from "../state/redux/store";

const { rpcUrlMap } = store.getState().rpcReducer;

const { chains, publicClient } = configureChains(
	[
		mainnet,
		optimism,
		arbitrum,
		polygon,
		gnosis,
		celo,
		avalanche,
		fantom,
		bsc,
	],
	[
		// Public, rate-limited RPC URLs
		publicProvider(),

		// Private RPC URLs =? TODO: Figure out if this works and how it works.
		jsonRpcProvider({
			rpc: (chain) => ({
				http: rpcUrlMap[chain.id],
			}),
		}),
	]
);

const connectors = [
	new InjectedConnector({ chains }),
	new MetaMaskConnector({ chains }),
	new WalletConnectConnector({
		options: { projectId: "272999f25199bdefd280fedfc62e9b08" },
	}),
	new CoinbaseWalletConnector({
		options: {
			appName: "Ax Widgets",
			appLogoUrl: "https://usx.cash/images/iconAx.svg",
		},
	}),
	new LedgerConnector({
		options: { projectId: "272999f25199bdefd280fedfc62e9b08" },
	}),
	new SafeConnector({
		chains,
		options: {
			allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
			debug: false,
		},
	}),
];

export {
	connect,
	disconnect,
	fetchBalance,
	fetchEnsAvatar,
	fetchEnsName,
	getWalletClient,
	switchNetwork,
};

export const evmWalletConfig = createConfig({
	autoConnect: false,
	connectors,
	publicClient,
});
