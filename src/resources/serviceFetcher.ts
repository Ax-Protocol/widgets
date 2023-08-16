import { Ecosystem } from "../redux/types";
import EvmWalletService from "../services/evm/wallet";
import { IWalletService } from "../services/interfaces/wallet";

export const getWalletService = (
	currentEcosystem: Ecosystem
): IWalletService => {
	if (currentEcosystem === Ecosystem.EVM) {
		return EvmWalletService.getInstance();
	}
	// else if (currentEcosystem === Ecosystem.APTOS") {
	// 	return AptosWalletService.getInstance()
	// } else if (currentEcosystem === Ecosystem.SOLANA) {
	// 	return SolanaWalletService.getInstance()
	// }
	throw new Error("Unsupported ecosystem.");
};
