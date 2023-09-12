import { Bridge } from "../data/bridges";
import { AxChain } from "../data/chains";

export interface ITransferStatus {
	bridge: Bridge;
	lzScanUrl: string;
	txHash: `0x${string}`;
	sourceChain: AxChain;
	destAddress: `0x${string}`;
	destChain: AxChain;
}
