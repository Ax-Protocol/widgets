export interface ITransferButton {
	action: () => Promise<void>;
	isLoading: boolean;
	amount: bigint | null;
	maxAmount: number | null;
	// nativeBalance: bigint | null;
	// destinationChain: Chain,
	destinationAddress: string;
}
