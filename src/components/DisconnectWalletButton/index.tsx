import React, { useContext, useState } from "react";
import { AiOutlineDisconnect } from "react-icons/ai";

import { IDisconnectWalletButton } from "../../interfaces/components/disconnectWalletButton";
import { getWalletService } from "../../resources";
import { ThemeContext } from "../../state/context/theme";

function DisconnectWalletButton({ currentEcosystem }: IDisconnectWalletButton) {
	const theme = useContext(ThemeContext);
	const [hover, setHover] = useState<boolean>(false);

	return (
		<button
			style={{
				color: hover ? theme.primaryColor : theme.primaryTextColor,
			}}
			className="flex w-28 items-center justify-start px-2 py-1 outline-none duration-300 ease-in-out"
			onClick={() =>
				getWalletService(currentEcosystem).disconnectWallet()
			}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<span className="mr-2">Disconnect</span>
			{hover ? <AiOutlineDisconnect size="12px" /> : null}
		</button>
	);
}

export default DisconnectWalletButton;
