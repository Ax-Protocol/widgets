import {
	TokenServiceRegistry,
	UsxServiceRegistry,
	WalletServiceRegistry,
} from "../interfaces/resources/serviceRegistry";
import { ITokenService } from "../interfaces/services/token";
import { IUsxService } from "../interfaces/services/usx";
import { IWalletService } from "../interfaces/services/wallet";
import { Ecosystem } from "../interfaces/state/wallet";

// **************** Default Registry Values **************** //
export const walletServiceRegistry: WalletServiceRegistry = {};
export const tokenServiceRegistry: TokenServiceRegistry = {};
export const usxServiceRegistry: UsxServiceRegistry = {};
// ********************************************************* //

// **************** Registration Functions **************** //
export const registerWalletService = (
	currentEcosystem: Ecosystem,
	service: IWalletService
) => {
	walletServiceRegistry[currentEcosystem] = service;
};
export const registerTokenService = (
	currentEcosystem: Ecosystem,
	service: ITokenService
) => {
	tokenServiceRegistry[currentEcosystem] = service;
};
export const registerUsxService = (
	currentEcosystem: Ecosystem,
	service: IUsxService
) => {
	usxServiceRegistry[currentEcosystem] = service;
};
// ******************************************************** //

// ****************** Retrieval Functions ****************** //
export const getWalletService = (
	currentEcosystem: Ecosystem
): IWalletService => {
	const walletService = walletServiceRegistry[currentEcosystem];
	if (!walletService) {
		throw new Error("Unsupported ecosystem.");
	}
	return walletService;
};
export const getTokenService = (currentEcosystem: Ecosystem): ITokenService => {
	const tokenService = tokenServiceRegistry[currentEcosystem];
	if (!tokenService) {
		throw new Error("Unsupported ecosystem.");
	}
	return tokenService;
};
export const getUsxService = (currentEcosystem: Ecosystem): IUsxService => {
	const usxService = usxServiceRegistry[currentEcosystem];
	if (!usxService) {
		throw new Error("Unsupported ecosystem.");
	}
	return usxService;
};
// ********************************************************* //
