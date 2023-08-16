export interface ITransferButton {
	action: () => Promise<void>;
	isLoading: boolean;
	transfer?: boolean;
	amount?: number | null;
	maxAmount?: number | null;
	nativeBalance?: number | null;
	// destinationChain?: Chain,
	destinationAddress?: string;
}
