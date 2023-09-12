import { Ecosystem } from "../state/wallet";
import { Bridge } from "./bridges";

export type AxChain = {
	name: string;
	ecosystem: Ecosystem;
	imageSource: string;
	nativeCurrency: {
		symbol: string;
		decimals: number;
	};
	blockExplorer: string;
	chainId: number;
	axChainId: number;
	lzChainId?: number;
	whChainId?: number;
	priorityBridge: Bridge;
	lzEndpoint?: `0x${string}`;
	whCoreBridge?: `0x${string}`;
	layerZeroBridge?: `0x${string}`;
	wormholeBridge?: `0x${string}`;
	usxAddress: `0x${string}`;
};
