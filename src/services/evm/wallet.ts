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
	getChain,
	getWalletClient,
	switchNetwork,
	watchAccount,
	watchNetwork,
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

	// ***************************************** Methods *****************************************
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

			// Subscribe to account and network changes
			this.handleAccountChanged();
			this.handleNetworkChanged();

			// Check if user's current network is supported and update global state variable
			if (getChain({ chainId })) {
				store.dispatch(
					updateCurrentNetwork({
						ecosystem: Ecosystem.EVM,
						chainId,
						isSupported: true,
					})
				);
			} else {
				store.dispatch(
					updateCurrentNetwork({
						ecosystem: Ecosystem.EVM,
						chainId,
						isSupported: false,
					})
				);
			}

			// Even though balanceObject.value is already of type bigint, the bigint type cannot be stored
			// in Redux. It must be stored as a string, and then casted back to bigint using BigInt() when
			// fetched from Redux in the app.
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
					chainId: 1,
				})) || null;

			if (name) {
				avatar =
					(await fetchEnsAvatar({
						name: String(name),
						chainId: 1,
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
		const result = await switchNetwork({
			chainId: network.chainId,
		});

		if (result.id === network.chainId) {
			store.dispatch(
				updateCurrentNetwork({
					ecosystem: network.ecosystem,
					chainId: network.chainId,
					isSupported: network.isSupported,
				})
			);

			this.getNativeBalance(store.getState().walletReducer.address!);
		}
	}

	async getNativeBalance(address: `0x${string}`): Promise<void> {
		// Even though balanceObject.value is already of type bigint, the bigint type cannot be stored
		// in Redux. It must be stored as a string, and then casted back to bigint using BigInt() when
		// fetched from Redux in the app.
		const balanceObject = await fetchBalance({
			address,
		});
		const nativeBalance = {
			...balanceObject,
			value: balanceObject.value.toString(),
		};

		store.dispatch(updateNativeBalance(nativeBalance));
	}

	async handleAccountChanged(): Promise<void> {
		watchAccount((account) => {
			if (account.address) {
				store.dispatch(updateAddress(account.address));
				this.getNativeBalance(account.address);
			}
		});
	}

	async handleNetworkChanged(): Promise<void> {
		watchNetwork((network) => {
			// Check if user's current network is supported and update global state
			if (network.chain?.id) {
				if (getChain({ chainId: network.chain.id })) {
					store.dispatch(
						updateCurrentNetwork({
							ecosystem: Ecosystem.EVM,
							chainId: network.chain.id,
							isSupported: true,
						})
					);

					if (store.getState().walletReducer.address) {
						this.getNativeBalance(
							store.getState().walletReducer.address!
						);
					}
				} else {
					store.dispatch(
						updateCurrentNetwork({
							ecosystem: Ecosystem.EVM,
							chainId: network.chain?.id,
							isSupported: false,
						})
					);
				}
			}
		});
	}

	// *******************************************************************************************
}

export default EvmWalletService;
