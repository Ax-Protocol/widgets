import { AxChain } from "../data/chains";

export interface ITransferButton {
	action: () => Promise<void>;
	isLoading: boolean;
	amount: bigint;
	maxAmount: bigint;
	nativeBalance: bigint;
	destinationChain: AxChain;
	destinationAddress: `0x${string}`;
	errorMessage: string;
}
