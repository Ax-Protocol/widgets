/* eslint-disable no-use-before-define */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { IWalletService } from "../../interfaces/services/wallet";
import {
	Ecosystem,
	EIP1193Provider,
	Ens,
	Network,
	Wallet,
	WalletClient,
	WalletType,
} from "../../interfaces/state/wallet";
import {
	connect,
	disconnect,
	evmWalletConfig,
	fetchBalance,
	fetchEnsAvatar,
	fetchEnsName,
	getWalletClient,
	// switchNetwork,
} from "../../resources";
import store from "../../state/redux/store";
import {
	updateAddress,
	updateConnectionStatus,
	updateCurrentEcosystem,
	updateCurrentNetwork,
	updateCurrentWallet,
	updateEns,
	updateNativeBalance,
} from "../../state/redux/wallet/walletActions";

/**
 * The singleton class pattern defines a `getInstance` method so that
 * the single class instance can be accessed elsewhere in the project.
 */
class EvmWalletService extends IWalletService {
	private static instance: EvmWalletService;

	public provider: EIP1193Provider | null = null;

	public walletClient: WalletClient | null = null;

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
		wallet: Wallet
	): Promise<void> {
		setIsLoading(true);

		try {
			const [
				injectedConnector,
				metaMaskConnector,
				walletConnectConnector,
				coinbaseWalletConnector,
				ledgerConnector,
				safeConnector,
			] = evmWalletConfig.connectors;

			let connector;

			switch (wallet.type) {
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

			const connection = await connect({ connector });
			const evmProvider: EIP1193Provider | null =
				await connection.connector?.getProvider();
			const evmWalletClient: WalletClient | null =
				await getWalletClient();
			const address = connection.account;
			const chainId = connection.chain.id;

			this.provider = evmProvider;
			this.walletClient = evmWalletClient;

			// Check if user's current network is supported and update global state variable
			if (connection.chain.unsupported) {
				store.dispatch(
					updateCurrentNetwork({
						ecosystem: Ecosystem.EVM,
						chainId,
						isSupported: false,
					})
				);
			} else {
				store.dispatch(
					updateCurrentNetwork({
						ecosystem: Ecosystem.EVM,
						chainId,
						isSupported: true,
					})
				);
			}

			// Even though balanceObject.value is already type bigint, we can't store bigint in Redux.
			// We need to store it as a string, and then cast it back to bigint using BigInt() when
			// first fetched from Redux in app.
			const balanceObject = await fetchBalance({
				address,
			});
			const nativeBalance = {
				...balanceObject,
				value: balanceObject.value.toString(),
			};

			// Fetch ENS info and store it in global state
			const ens: Ens = { name: null, avatar: null };
			let avatar: string | null = null;
			const name: string | null =
				(await fetchEnsName({
					address,
				})) || null;

			if (name) {
				avatar =
					(await fetchEnsAvatar({
						name: String(name),
					})) || null;
			}
			ens.name = name;
			ens.avatar = avatar;

			// Update the rest of wallet-related global state variables
			store.dispatch(updateConnectionStatus(true));
			store.dispatch(updateAddress(connection.account));
			store.dispatch(updateNativeBalance(nativeBalance));
			store.dispatch(updateCurrentWallet(wallet));
			store.dispatch(updateCurrentEcosystem(Ecosystem.EVM));
			store.dispatch(updateEns(ens));

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const acceptableErrorMessages = [
				"rejected",
				"request reset",
				"denied",
			];

			if (
				!acceptableErrorMessages.some((msg) =>
					error.message.includes(msg)
				)
			) {
				// eslint-disable-next-line no-console
				console.error("\nError connecting wallet:\n", error);
			}
		}
		setIsLoading(false);
	}

	async disconnectWallet(): Promise<void> {
		// Disconnect wallet
		await disconnect();

		// Update global state variables
		store.dispatch(updateConnectionStatus(false));
		store.dispatch(updateAddress(null));
		store.dispatch(updateNativeBalance(null));
		store.dispatch(updateCurrentWallet(null));
		store.dispatch(updateCurrentEcosystem(null));
		store.dispatch(updateCurrentNetwork(null));
		store.dispatch(updateEns(null));
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
