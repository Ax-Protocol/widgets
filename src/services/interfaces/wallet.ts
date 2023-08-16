import { Network, WalletType } from "../../redux/types";

export abstract class IWalletService {
	abstract connectWallet(
		setIsLoading: (value: boolean) => void,
		walletType: WalletType
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
