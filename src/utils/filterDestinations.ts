import { AxChain } from "../interfaces/data/chains";

export const filterDestinations = (
	sourceChain: AxChain,
	chainData: AxChain[]
) => {
	const disabledChains: AxChain[] = [];

	disabledChains.push(sourceChain);

	chainData.forEach((chain) => {
		const sourceHasBothBridges =
			sourceChain.wormholeBridge && sourceChain.layerZeroBridge;
		const destinationHasNeither =
			!chain.wormholeBridge && !chain.layerZeroBridge;
		const hasMismatchedWormholeBridge =
			sourceChain.wormholeBridge && !chain.wormholeBridge;
		const hasMismatchedLayerZeroBridge =
			sourceChain.layerZeroBridge && !chain.layerZeroBridge;

		if (
			(sourceHasBothBridges && destinationHasNeither) ||
			(hasMismatchedWormholeBridge && !sourceHasBothBridges) ||
			(hasMismatchedLayerZeroBridge && !sourceHasBothBridges)
		) {
			disabledChains.push(chain);
		}
	});

	const filteredDestinations = chainData.filter(
		(chain) =>
			!disabledChains.some(
				(disabledChain) => disabledChain.chainId === chain.chainId
			)
	);

	return filteredDestinations;
};
