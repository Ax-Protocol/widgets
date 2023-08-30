import {
	EIP1193Provider,
	Network,
	Wallet,
	WalletClient,
} from "../state/wallet";

export abstract class IWalletService {
	public provider: EIP1193Provider | null = null;

	public walletClient: WalletClient | null = null;

	abstract connectWallet(
		setIsLoading: (value: boolean) => void,
		wallet: Wallet
	): Promise<void>;

	abstract disconnectWallet(): Promise<void>;

	abstract switchNetwork(network: Network): Promise<void>;

	abstract getNativeBalance(address: string): Promise<void>;

	abstract addTokenToWallet(
		tokenAddress: string,
		tokenSymbol: string,
		tokenDecimals: number,
		tokenImageSource: string,
		setTokenAddedMessage: (value: string) => void
	): Promise<void>;
}
