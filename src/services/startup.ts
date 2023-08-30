import { Ecosystem } from "../interfaces/state/wallet";
import { registerWalletService } from "../resources";
import EvmWalletService from "./evm/wallet";

export const registerServices = () => {
	// EVM
	registerWalletService(Ecosystem.EVM, EvmWalletService.getInstance());

	// SOLANA
	// registerWalletService(Ecosystem.SOLANA, SolanaWalletService.getInstance());

	// APTOS
	// registerWalletService(Ecosystem.APTOS, AptosWalletService.getInstance());
};
