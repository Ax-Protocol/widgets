import {
	configureChains,
	connect,
	createConfig,
	disconnect,
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

import store from "../redux/store";

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

		// Private RPC URLs
		jsonRpcProvider({
			rpc: (chain) => ({
				http: rpcUrlMap[chain.id],
			}),
		}),
	]
);

// Wallet Connectors
// TODO: Delete class exports if not used anywhere for types
// export {
// 	CoinbaseWalletConnector,
// 	InjectedConnector,
// 	LedgerConnector,
// 	MetaMaskConnector,
// 	SafeConnector,
// 	WalletConnectConnector,
// };
export const injectedConnector = new InjectedConnector({ chains });
export const metaMaskConnector = new MetaMaskConnector({ chains });
export const walletConnectConnector = new WalletConnectConnector({
	options: { projectId: "272999f25199bdefd280fedfc62e9b0" },
});
export const coinbaseWalletConnector = new CoinbaseWalletConnector({
	options: {
		appName: "Ax Widgets",
		appLogoUrl: "https://usx.cash/images/iconAx.svg",
	},
});
export const ledgerConnector = new LedgerConnector({
	options: { projectId: "272999f25199bdefd280fedfc62e9b0" },
});
export const safeConnector = new SafeConnector({
	chains,
	options: {
		allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
		debug: false,
	},
});
// export {
// 	CoinbaseWalletConnector,
// 	InjectedConnector,
// 	LedgerConnector,
// 	MetaMaskConnector,
// 	SafeConnector,
// 	WalletConnectConnector,
// };
// export const injectedConnector = new InjectedConnector({ chains });
// export const metaMaskConnector = new MetaMaskConnector({ chains });
// export const walletConnectConnector = new WalletConnectConnector({
// 	options: { projectId: "272999f25199bdefd280fedfc62e9b0" },
// });
// export const coinbaseWalletConnector = new CoinbaseWalletConnector({
// 	options: {
// 		appName: "Ax Widgets",
// 		appLogoUrl: "https://usx.cash/images/iconAx.svg",
// 	},
// });
// export const ledgerConnector = new LedgerConnector({
// 	options: { projectId: "272999f25199bdefd280fedfc62e9b0" },
// });
// export const safeConnector = new SafeConnector({
// 	chains,
// 	options: {
// 		allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
// 		debug: false,
// 	},
// });

// Wallet Methods
export { connect, disconnect, switchNetwork };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const wagmiConfig = createConfig({
	autoConnect: false,
	connectors: [
		injectedConnector,
		metaMaskConnector,
		walletConnectConnector,
		coinbaseWalletConnector,
		ledgerConnector,
		safeConnector,
	],
	publicClient,
});
