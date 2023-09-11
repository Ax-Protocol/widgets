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
	lzEndpoint?: string;
	whCoreBridge?: string;
	layerZeroBridge?: string;
	wormholeBridge?: string;
	usxAddress: string;
};
