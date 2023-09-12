import React, { useContext, useState } from "react";
import { FiCheckSquare, FiCopy, FiExternalLink } from "react-icons/fi";

import { AxChain } from "../../interfaces/data/chains";
import { ThemeContext } from "../../state/context/theme";
import { copyToClipboard } from "../../utils/copyToClipboard";

interface IWormholeTracker {
	txHash: `0x${string}`;
	sourceChain: AxChain;
	destAddress: `0x${string}`;
	destChain: AxChain;
}

function WormholeTracker({
	txHash,
	sourceChain,
	destAddress,
	destChain,
}: IWormholeTracker) {
	const theme = useContext(ThemeContext);
	const [copied, setCopied] = useState(false);
	const [hoverTxHashCopy, setHoverTxHashCopy] = useState<boolean>(false);
	const [hoverSourceChainExplorer, setHoverSourceChainExplorer] =
		useState<boolean>(false);
	const [hoverDestinationChainExplorer, setHoverDestinationChainExplorer] =
		useState<boolean>(false);

	return (
		<div className="w-full">
			<div className="flex items-center justify-between">
				<span>Source TX hash</span>
				<div className="flex items-center justify-center">
					<button
						style={{
							color: hoverTxHashCopy
								? theme.primaryColor
								: theme.primaryTextColor,
						}}
						className="mr-2 px-2 py-1 outline-none"
						onClick={() => copyToClipboard(txHash, setCopied)}
						onMouseEnter={() => setHoverTxHashCopy(true)}
						onMouseLeave={() => setHoverTxHashCopy(false)}
					>
						{!copied ? (
							<FiCopy size="16px" />
						) : (
							<FiCheckSquare
								className="text-green-accent"
								size="16px"
							/>
						)}
					</button>
					<a
						href={`${sourceChain.blockExplorer}/tx/${txHash}`}
						target="_blank"
						rel="noopener noreferrer"
						style={{
							color: hoverSourceChainExplorer
								? theme.primaryColor
								: theme.primaryTextColor,
						}}
						className="px-2 py-1 outline-none"
						onMouseEnter={() => setHoverSourceChainExplorer(true)}
						onMouseLeave={() => setHoverSourceChainExplorer(false)}
					>
						<FiExternalLink size="16px" />
					</a>
				</div>
			</div>
			<div className="mt-2 flex items-center justify-between">
				<span>Destination token transfers</span>
				<a
					href={`${destChain.blockExplorer}/address/${destAddress}#tokentxns`}
					target="_blank"
					rel="noopener noreferrer"
					style={{
						color: hoverDestinationChainExplorer
							? theme.primaryColor
							: theme.primaryTextColor,
					}}
					className="px-2 py-1 outline-none"
					onMouseEnter={() => setHoverDestinationChainExplorer(true)}
					onMouseLeave={() => setHoverDestinationChainExplorer(false)}
				>
					<FiExternalLink size="16px" />
				</a>
			</div>
		</div>
	);
}

export default WormholeTracker;
