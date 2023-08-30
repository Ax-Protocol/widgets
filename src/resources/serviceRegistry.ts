import { WalletServiceRegistry } from "../interfaces/resources/serviceRegistry";
import { IWalletService } from "../interfaces/services/wallet";
import { Ecosystem } from "../interfaces/state/wallet";

export const walletServiceRegistry: WalletServiceRegistry = {};

export const registerWalletService = (
	currentEcosystem: Ecosystem,
	service: IWalletService
) => {
	walletServiceRegistry[currentEcosystem] = service;
};

export const getWalletService = (
	currentEcosystem: Ecosystem
): IWalletService => {
	const walletService = walletServiceRegistry[currentEcosystem];
	if (!walletService) {
		throw new Error("Unsupported ecosystem.");
	}
	return walletService;
};
