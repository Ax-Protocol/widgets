import type { Token } from "../data/tokens";

export interface ICurrencyInput {
	isLoading: boolean;
	amountInput: string;
	setAmountInput: (value: string) => void;
	setAmount: (value: bigint) => void;
	maxAmount: bigint;
	token: Token;
	setErrorMessage: (value: string) => void;
	disabled?: boolean;
}
