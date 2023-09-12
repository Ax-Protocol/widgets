import React from "react";

import { ITransferStatus } from "../../interfaces/components/transferStatus";
import { Bridge } from "../../interfaces/data/bridges";
import LayerZeroTracker from "./LayerZeroTracker";
import WormholeTracker from "./WormholeTracker";

function TransferStatus({
	bridge,
	lzScanUrl,
	txHash,
	sourceChain,
	destAddress,
	destChain,
}: ITransferStatus) {
	return (
		<div className="mb-1 w-full flex-col items-center justify-center">
			{bridge === Bridge.LZ ? (
				<LayerZeroTracker
					sourceChain={sourceChain}
					lzScanUrl={lzScanUrl}
					txHash={txHash}
					destAddress={destAddress}
					destChain={destChain}
				/>
			) : bridge === Bridge.WH ? (
				<WormholeTracker
					sourceChain={sourceChain}
					txHash={txHash}
					destAddress={destAddress}
					destChain={destChain}
				/>
			) : null}
		</div>
	);
}

export default TransferStatus;
