import { AxChain } from "../interfaces/data/chains";

export const validateBridgeCompatibility = (
	sourceChain: AxChain,
	destinationChain: AxChain
) => {
	const hasWormholeBridge = (chain: AxChain) => chain.wormholeBridge;
	const hasLayerZeroBridge = (chain: AxChain) => chain.layerZeroBridge;

	if (
		hasWormholeBridge(sourceChain) &&
		hasWormholeBridge(destinationChain) &&
		hasLayerZeroBridge(sourceChain) &&
		hasLayerZeroBridge(destinationChain)
	) {
		return sourceChain.priorityBridge;
	}

	const sourceHasWormhole = hasWormholeBridge(sourceChain);
	const sourceHasLayerZero = hasLayerZeroBridge(sourceChain);
	const destinationHasWormhole = hasWormholeBridge(destinationChain);
	const destinationHasLayerZero = hasLayerZeroBridge(destinationChain);

	if (sourceHasWormhole && destinationHasWormhole) {
		if (!sourceHasLayerZero || !destinationHasLayerZero) {
			return "wh";
		}
	}

	if (sourceHasLayerZero && destinationHasLayerZero) {
		if (!sourceHasWormhole || !destinationHasWormhole) {
			return "lz";
		}
	}

	return "incompatible";
};
