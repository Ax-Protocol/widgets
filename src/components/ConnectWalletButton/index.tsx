import React, { useContext, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { ThemeContext } from "../../context/theme";
import { IConnectWalletButton } from "./types";

function ConnectWalletButton({ isLoading }: IConnectWalletButton) {
	const theme = useContext(ThemeContext);
	const [hover, setHover] = useState(false);

	// TODO: Decide whether to cache last wallet connected, and find out if it's even possible in a bundled library.

	return (
		<button
			style={{
				boxShadow: hover
					? `0px 0px 10px 3px rgba(0, 0, 0, 0.3), 0px 0px 10px 3px ${theme.primaryColor}`
					: `0px 0px 10px 2px rgba(0, 0, 0, 0.3), 0px 0px 10px 2px ${theme.primaryColor}`,
				color: hover ? theme.primaryColor : theme.primaryTextColor,
			}}
			className="flex h-10 w-36 items-center justify-center rounded-xl bg-dark-400 outline-none duration-300 ease-in-out"
			onClick={() =>
				// TODO: Is it possible to do a geofence in a bundled library?
				console.log("Open EVM Wallet Connection Modal")
			}
			disabled={isLoading && true}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			{isLoading ? (
				<AiOutlineLoading3Quarters
					className="animate-spin"
					size="22px"
				/>
			) : (
				"Connect Wallet"
			)}
		</button>
	);
}

export default ConnectWalletButton;
