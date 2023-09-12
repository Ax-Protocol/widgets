import {
	Chain,
	Config,
	configureChains,
	connect,
	createConfig,
	disconnect,
	fetchBalance,
	fetchEnsAvatar,
	fetchEnsName,
	getWalletClient,
	PublicClient,
	readContract,
	switchNetwork,
	waitForTransaction,
	watchAccount,
	watchNetwork,
	WebSocketPublicClient,
	writeContract,
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

import { RpcUrlMap } from "../interfaces/state/rpc";
import { FallbackTransport } from "./evmInterface";

// eslint-disable-next-line import/no-mutable-exports
let evmWalletConfig: Config<
	PublicClient<FallbackTransport>,
	WebSocketPublicClient
>;

export const initializeEvmWalletConfig = (evmRpcUrlMap: RpcUrlMap) => {
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
			jsonRpcProvider({
				rpc: (chain: Chain) => ({
					http: evmRpcUrlMap[chain.id],
				}),
			}),
			publicProvider(),
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

	evmWalletConfig = createConfig({
		autoConnect: false,
		connectors,
		publicClient,
	});
};

export {
	connect,
	disconnect,
	evmWalletConfig,
	fetchBalance,
	fetchEnsAvatar,
	fetchEnsName,
	getWalletClient,
	readContract,
	switchNetwork,
	waitForTransaction,
	watchAccount,
	watchNetwork,
	writeContract,
};
