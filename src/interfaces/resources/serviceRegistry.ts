import { ITokenService } from "../services/token";
import { IUsxService } from "../services/usx";
import { IWalletService } from "../services/wallet";
import { Ecosystem } from "../state/wallet";

export type WalletServiceRegistry = {
	// TODO: This probably shouldn't be optional
	[key in Ecosystem]?: IWalletService;
};

export type TokenServiceRegistry = {
	// TODO: This probably shouldn't be optional
	[key in Ecosystem]?: ITokenService;
};

export type UsxServiceRegistry = {
	// TODO: This probably shouldn't be optional
	[key in Ecosystem]?: IUsxService;
};
