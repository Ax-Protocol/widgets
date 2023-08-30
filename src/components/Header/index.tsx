import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../interfaces/state/rootState";
import { getTokenDisplayUnits } from "../../utils/getTokenDisplayUnits";
import { truncateAddress } from "../../utils/truncateAddress";
import DisconnectWalletButton from "../DisconnectWalletButton";

function Header() {
	const { isWalletConnected, currentEcosystem, address, ens, nativeBalance } =
		useSelector((state: RootState) => state.walletReducer);

	return (
		<div className="mb-5 flex h-12 w-full items-center justify-between">
			{isWalletConnected ? (
				<div className="flex w-full items-center justify-between">
					<div className="flex flex-col items-start justify-center">
						{/* TODO: add ability to copy address */}
						<span>
							{ens?.name ? ens.name : truncateAddress(address!)}
						</span>
						<span>
							{getTokenDisplayUnits(
								BigInt(nativeBalance!.value),
								nativeBalance!.decimals
							)}{" "}
							{nativeBalance!.symbol}
						</span>
					</div>
					<DisconnectWalletButton
						currentEcosystem={currentEcosystem!}
					/>
				</div>
			) : null}
		</div>
	);
}

export default Header;
