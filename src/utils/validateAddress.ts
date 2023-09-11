import { Ecosystem } from "../interfaces/state/wallet";
import { isEvmAddress } from "../resources";

export const isAddressValid = (
	address: `0x${string}`,
	currentEcosystem: Ecosystem
): boolean => {
	if (currentEcosystem === Ecosystem.EVM) {
		return isEvmAddress(address);
	}
	// else if (currentEcosystem === Ecosystem.APTOS") {
	// 	return isAddress(address);
	// } else if (currentEcosystem === Ecosystem.SOLANA) {
	// 	return isAddress(address);
	// }
	return false;
};
