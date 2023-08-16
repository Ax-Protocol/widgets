import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { ThemeContext } from "../../context/theme";
import { RootState } from "../../redux/types";
// import { isAddressValid } from "../../utils/validateAddress";
import { ITransferButton } from "./types";

function TransferButton({
	// action,
	isLoading,
	amount,
	maxAmount,
	nativeBalance,
	// destinationChain,
	destinationAddress,
}: ITransferButton) {
	const { isWalletConnected, currentNetwork } = useSelector(
		(state: RootState) => state.walletReducer
	);
	const theme = useContext(ThemeContext);
	const [valid, setValid] = useState(false);

	// Check validity of inputs to properly handle style and disability of button
	const checkValidity = async () => {
		const addressIsValid = false;
		// if (destinationAddress && destinationChain) {
		// 	addressIsValid = await isAddressValid(
		// 		destinationAddress,
		// 		destinationChain.currentEcosystem
		// 	);
		// }

		const validAmount = amount || 0;
		const validMaxAmount = maxAmount || 0;
		const validNativeBalance = nativeBalance || 0;

		const basicConditions = [
			!isLoading,
			isWalletConnected,
			currentNetwork?.isSupported,
			validAmount > 0,
			validAmount <= validMaxAmount,
			validNativeBalance > 0,
		];

		setValid(addressIsValid && basicConditions.every(Boolean));
	};

	useEffect(() => {
		checkValidity();
	}, [
		isLoading,
		isWalletConnected,
		currentNetwork,
		destinationAddress,
		// destinationChain,
		amount,
		maxAmount,
		nativeBalance,
	]);

	return (
		<button
			style={{
				backgroundColor: theme.primaryColor,
				color: theme.buttonTextColor,
			}}
			className="min-h-12 flex w-9/12 items-center justify-center rounded-xl p-3 font-bold opacity-90 outline-none duration-300 ease-in-out hover:opacity-100"
			// onClick={() => action()}
			onClick={() => console.log("TransferButton Clicked.")}
			disabled={!valid}
		>
			Transfer
		</button>
	);
}

export default TransferButton;
