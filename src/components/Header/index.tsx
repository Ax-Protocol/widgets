import React, { useState } from "react";

import iconAxMonochrome from "../../assets/images/iconAxMonochrome.svg";
import ConnectWalletButton from "../ConnectWalletButton";

function Header() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	return (
		<div className="mb-5 flex h-12 w-full items-center justify-between">
			<img src={iconAxMonochrome} alt="ax-icon" width={36} />
			<ConnectWalletButton isLoading={isLoading} />
		</div>
	);
}

export default Header;
