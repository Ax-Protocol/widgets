import { isAddress } from "viem";

import { Ecosystem } from "../redux/types";

export const isAddressValid = async (
	address: string,
	currentEcosystem: Ecosystem
): Promise<boolean> => {
	if (currentEcosystem === Ecosystem.EVM) {
		return isAddress(address);
	}
	// else if (currentEcosystem === Ecosystem.APTOS") {
	// 	return isAddress(address);
	// } else if (currentEcosystem === Ecosystem.SOLANA) {
	// 	return isAddress(address);
	// }
	return false;
};
