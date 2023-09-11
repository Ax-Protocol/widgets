import iconArbitrumOne from "../assets/images/iconArbitrumOne.svg";
import iconAvalanche from "../assets/images/iconAvalanche.svg";
import iconBsc from "../assets/images/iconBsc.svg";
import iconCelo from "../assets/images/iconCelo.png";
import iconEthereum from "../assets/images/iconEthereum.svg";
import iconFantom from "../assets/images/iconFantom.svg";
import iconGnosis from "../assets/images/iconGnosis.svg";
import iconOptimism from "../assets/images/iconOptimism.svg";
import iconPolygon from "../assets/images/iconPolygon.svg";
import { Bridge } from "../interfaces/data/bridges";
import { AxChain } from "../interfaces/data/chains";
import { Ecosystem } from "../interfaces/state/wallet";
import { LAYERZERO_BRIDGE, USX, WORMHOLE_BRIDGE } from "./constants";

export const chainData: AxChain[] = [
	// ********** Ethereum ********** //
	{
		name: "Ethereum",
		ecosystem: Ecosystem.EVM,
		imageSource: iconEthereum,
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://etherscan.io",
		chainId: 1,
		axChainId: 1,
		lzChainId: 101,
		whChainId: 2,
		priorityBridge: Bridge.LZ,
		lzEndpoint: "0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675",
		whCoreBridge: "0x98f3c9e6E3fAce36bAAd05FE09d375Ef1464288B",
		layerZeroBridge: LAYERZERO_BRIDGE,
		wormholeBridge: WORMHOLE_BRIDGE,
		usxAddress: USX,
	},
	// ********** Optimism ********** //
	{
		name: "Optimism",
		ecosystem: Ecosystem.EVM,
		imageSource: iconOptimism,
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://optimistic.etherscan.io",
		chainId: 10,
		axChainId: 2,
		lzChainId: 111,
		whChainId: 24,
		priorityBridge: Bridge.LZ,
		lzEndpoint: "0x3c2269811836af69497E5F486A85D7316753cf62",
		whCoreBridge: "0xEe91C335eab126dF5fDB3797EA9d6aD93aeC9722",
		layerZeroBridge: LAYERZERO_BRIDGE,
		wormholeBridge: WORMHOLE_BRIDGE,
		usxAddress: USX,
	},
	// ********** Arbitrum One ********** //
	{
		name: "Arbitrum One",
		ecosystem: Ecosystem.EVM,
		imageSource: iconArbitrumOne,
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://arbiscan.io",
		chainId: 42161,
		axChainId: 3,
		lzChainId: 110,
		whChainId: 23,
		priorityBridge: Bridge.LZ,
		lzEndpoint: "0x3c2269811836af69497E5F486A85D7316753cf62",
		whCoreBridge: "0xa5f208e072434bC67592E4C49C1B991BA79BCA46",
		layerZeroBridge: LAYERZERO_BRIDGE,
		wormholeBridge: WORMHOLE_BRIDGE,
		usxAddress: USX,
	},
	// ********** Polygon ********** //
	{
		name: "Polygon",
		ecosystem: Ecosystem.EVM,
		imageSource: iconPolygon,
		nativeCurrency: {
			symbol: "MATIC",
			decimals: 18,
		},
		blockExplorer: "https://polygonscan.com",
		chainId: 137,
		axChainId: 4,
		lzChainId: 109,
		whChainId: 5,
		priorityBridge: Bridge.LZ,
		lzEndpoint: "0x3c2269811836af69497E5F486A85D7316753cf62",
		whCoreBridge: "0x7A4B5a56256163F07b2C80A7cA55aBE66c4ec4d7",
		layerZeroBridge: LAYERZERO_BRIDGE,
		wormholeBridge: WORMHOLE_BRIDGE,
		usxAddress: USX,
	},
	// ********** Gnosis ********** //
	{
		name: "Gnosis",
		ecosystem: Ecosystem.EVM,
		imageSource: iconGnosis,
		nativeCurrency: {
			symbol: "XDAI",
			decimals: 18,
		},
		blockExplorer: "https://gnosisscan.io",
		chainId: 100,
		axChainId: 5,
		lzChainId: 145,
		priorityBridge: Bridge.LZ,
		lzEndpoint: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
		layerZeroBridge: LAYERZERO_BRIDGE,
		usxAddress: USX,
	},
	// ********** Celo ********** //
	{
		name: "Celo",
		ecosystem: Ecosystem.EVM,
		imageSource: iconCelo,
		nativeCurrency: {
			symbol: "CELO",
			decimals: 18,
		},
		blockExplorer: "https://celoscan.io",
		chainId: 42220,
		axChainId: 6,
		lzChainId: 125,
		whChainId: 14,
		priorityBridge: Bridge.LZ,
		lzEndpoint: "0x3A73033C0b1407574C76BdBAc67f126f6b4a9AA9",
		whCoreBridge: "0xa321448d90d4e5b0A732867c18eA198e75CAC48E",
		layerZeroBridge: LAYERZERO_BRIDGE,
		wormholeBridge: WORMHOLE_BRIDGE,
		usxAddress: USX,
	},
	// ********** Fantom Opera ********** //
	{
		name: "Fantom",
		ecosystem: Ecosystem.EVM,
		imageSource: iconFantom,
		nativeCurrency: {
			symbol: "FTM",
			decimals: 18,
		},
		blockExplorer: "https://ftmscan.com",
		chainId: 250,
		axChainId: 7,
		lzChainId: 112,
		whChainId: 10,
		priorityBridge: Bridge.LZ,
		lzEndpoint: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
		whCoreBridge: "0x126783A6Cb203a3E35344528B26ca3a0489a1485",
		layerZeroBridge: LAYERZERO_BRIDGE,
		wormholeBridge: WORMHOLE_BRIDGE,
		usxAddress: USX,
	},
	// ********** Avalanche C-Chain ********** //
	{
		name: "Avalanche C-Chain",
		ecosystem: Ecosystem.EVM,
		imageSource: iconAvalanche,
		nativeCurrency: {
			symbol: "AVAX",
			decimals: 18,
		},
		blockExplorer: "https://snowtrace.io",
		chainId: 43114,
		axChainId: 8,
		lzChainId: 106,
		whChainId: 6,
		priorityBridge: Bridge.LZ,
		lzEndpoint: "0x3c2269811836af69497E5F486A85D7316753cf62",
		whCoreBridge: "0x54a8e5f9c4CbA08F9943965859F6c34eAF03E26c",
		layerZeroBridge: LAYERZERO_BRIDGE,
		wormholeBridge: WORMHOLE_BRIDGE,
		usxAddress: USX,
	},
	// ********** BNB Smart Chain ********** //
	{
		name: "BNB Smart Chain",
		ecosystem: Ecosystem.EVM,
		imageSource: iconBsc,
		nativeCurrency: {
			symbol: "BNB",
			decimals: 18,
		},
		blockExplorer: "https://bscscan.com",
		chainId: 56,
		axChainId: 9,
		lzChainId: 102,
		whChainId: 4,
		priorityBridge: Bridge.LZ,
		lzEndpoint: "0x3c2269811836af69497E5F486A85D7316753cf62",
		whCoreBridge: "0x98f3c9e6E3fAce36bAAd05FE09d375Ef1464288B",
		layerZeroBridge: LAYERZERO_BRIDGE,
		wormholeBridge: WORMHOLE_BRIDGE,
		usxAddress: USX,
	},
];
