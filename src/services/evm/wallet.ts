/* eslint-disable no-use-before-define */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { Network, WalletType } from "../../redux/types";
import {
	coinbaseWalletConnector,
	connect,
	// disconnect,
	injectedConnector,
	ledgerConnector,
	metaMaskConnector,
	safeConnector,
	// switchNetwork,
	walletConnectConnector,
} from "../../resources/evmWalletsConfig";
import { IWalletService } from "../interfaces/wallet";

/**
 * The singleton class pattern defines a `getInstance` method so that
 * the single class instance can be accessed elsewhere in the project.
 */
class EvmWalletService extends IWalletService {
	private static instance: EvmWalletService;

	private constructor() {
		super();
	}

	public static getInstance(): EvmWalletService {
		if (!EvmWalletService.instance) {
			EvmWalletService.instance = new EvmWalletService();
		}
		return EvmWalletService.instance;
	}

	// *************** Methods ***************
	async connectWallet(
		setIsLoading: (value: boolean) => void,
		walletType: WalletType
	): Promise<void> {
		setIsLoading(true);
		try {
			let connector;

			switch (walletType) {
				case WalletType.INJECTED:
					connector = injectedConnector;
					break;
				case WalletType.METAMASK:
					connector = metaMaskConnector;
					break;
				case WalletType.WALLETCONNECT:
					connector = walletConnectConnector;
					break;
				case WalletType.COINBASE:
					connector = coinbaseWalletConnector;
					break;
				case WalletType.LEDGER:
					connector = ledgerConnector;
					break;
				case WalletType.SAFE:
					connector = safeConnector;
					break;

				default:
					throw new Error("Unknown wallet type");
			}

			if (!connector) {
				throw new Error(
					"Failed to find a connector for the specified wallet type"
				);
			}

			const result = await connect({ connector });
			console.log("connect result: ", result);
		} catch (error) {
			// TODO: figure out out how to handle a connection error
			// eslint-disable-next-line no-console
			console.error("\nError connecting wallet:\n", error);
		}
		setIsLoading(false);
	}

	async disconnectWallet(): Promise<void> {
		// Placeholder comment
	}

	async switchNetwork(network: Network): Promise<void> {
		console.log(network);
	}

	async getNativeBalance(address: string): Promise<void> {
		console.log(address);
	}

	async addTokenToWallet(
		tokenAddress: string,
		tokenSymbol: string,
		tokenDecimals: number,
		tokenImageSource: string,
		setTokenAddedMessage: (value: string) => void
	): Promise<void> {
		console.log(tokenAddress, tokenSymbol, tokenDecimals, tokenImageSource);
		setTokenAddedMessage("test");
	}
	// ***************************************
}

export default EvmWalletService;
