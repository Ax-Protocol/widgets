import { formatUnits } from "../resources";

export const getMaxAmountDisplayUnits = (
	amount: bigint,
	tokenDecimals: number
): string =>
	// amount needs to be in base units
	// returns a string in display units
	formatUnits(amount, tokenDecimals);
