import React, { useContext, useState } from "react";

import { IDisconnectWalletButton } from "../../interfaces/components/disconnectWalletButton";
import { getWalletService } from "../../resources";
import { ThemeContext } from "../../state/context/theme";

function DisconnectWalletButton({ currentEcosystem }: IDisconnectWalletButton) {
	const theme = useContext(ThemeContext);
	const [hover, setHover] = useState(false);

	return (
		<button
			style={{
				color: hover ? theme.primaryColor : theme.primaryTextColor,
			}}
			className="flex items-center justify-center px-2 py-1 outline-none duration-300 ease-in-out"
			onClick={() =>
				getWalletService(currentEcosystem).disconnectWallet()
			}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			Disconnect
		</button>
	);
}

export default DisconnectWalletButton;
