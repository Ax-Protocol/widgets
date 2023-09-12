import { Bridge } from "../data/bridges";
import { AxChain } from "../data/chains";

export abstract class IUsxService {
	abstract transfer(
		setIsLoading: (value: boolean) => void,
		setSuccessMessage: (value: string) => void,
		setErrorMessage: (value: string) => void,
		destinationChain: AxChain,
		destinationAddress: `0x${string}`,
		amount: bigint,
		setLzScanUrl: (value: string) => void,
		setTxHash: (value: `0x${string}`) => void,
		bridge: Bridge
	): Promise<void>;
}
