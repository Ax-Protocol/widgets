import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../interfaces/state/rootState";
import { getTokenDisplayUnits } from "../../utils/getTokenDisplayUnits";
import AddressButton from "../AddressButton";
import BlockExplorerButton from "../BlockExplorerButton";
import DisconnectWalletButton from "../DisconnectWalletButton";

function Header() {
	const {
		isWalletConnected,
		currentEcosystem,
		address,
		ens,
		nativeBalance,
		currentNetwork,
	} = useSelector((state: RootState) => state.walletReducer);

	return (
		<div className="mb-5 flex w-full items-center justify-between text-sm">
			{isWalletConnected ? (
				<div className="flex w-full items-center justify-between">
					<div className="flex w-36 flex-shrink-0 flex-col items-start justify-center">
						<AddressButton address={address!} ens={ens!} />
						{currentNetwork!.isSupported ? (
							<BlockExplorerButton
								address={address!}
								currentNetwork={currentNetwork!}
							/>
						) : (
							<span className="px-2 py-1 text-red-accent">
								CHAIN NOT SUPPORTED
							</span>
						)}
					</div>
					<div className="flex flex-col items-start justify-center">
						{currentNetwork!.isSupported ? (
							<span className="px-2 py-1">
								{getTokenDisplayUnits(
									BigInt(nativeBalance!.value),
									nativeBalance!.decimals
								)}{" "}
								{nativeBalance!.symbol}
							</span>
						) : null}
						<DisconnectWalletButton
							currentEcosystem={currentEcosystem!}
						/>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default Header;
