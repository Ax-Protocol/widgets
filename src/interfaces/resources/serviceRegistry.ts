import { IWalletService } from "../services/wallet";
import { Ecosystem } from "../state/wallet";

export type WalletServiceRegistry = {
	// TODO: This probably shouldn't be optional
	[key in Ecosystem]?: IWalletService;
};
