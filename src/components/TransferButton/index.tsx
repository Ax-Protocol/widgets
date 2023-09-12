import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";

// import { isAddressValid } from "../../utils/validateAddress";
import { ITransferButton } from "../../interfaces/components/transferButton";
import { RootState } from "../../interfaces/state/rootState";
import { ThemeContext } from "../../state/context/theme";
import { isAddressValid } from "../../utils/validateAddress";

function TransferButton({
	action,
	isLoading,
	amount,
	maxAmount,
	nativeBalance,
	destinationChain,
	destinationAddress,
	errorMessage,
}: ITransferButton) {
	const { isWalletConnected, currentNetwork } = useSelector(
		(state: RootState) => state.walletReducer
	);
	const theme = useContext(ThemeContext);
	const [valid, setValid] = useState<boolean>(false);

	// Check validity of inputs to properly handle style and disability of button
	const checkValidity = async () => {
		let addressIsValid = false;
		if (destinationAddress && destinationChain) {
			addressIsValid = isAddressValid(
				destinationAddress,
				destinationChain.ecosystem
			);
		}

		const basicConditions = [
			!errorMessage,
			!isLoading,
			isWalletConnected,
			currentNetwork?.isSupported,
			amount > BigInt(0),
			amount <= maxAmount,
			nativeBalance > BigInt(0),
		];

		setValid(addressIsValid && basicConditions.every(Boolean));
	};

	useEffect(() => {
		checkValidity();
	}, [
		errorMessage,
		isLoading,
		isWalletConnected,
		currentNetwork,
		destinationAddress,
		destinationChain,
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
			className={`${
				valid
					? "opacity-90 duration-300 ease-in-out hover:opacity-100"
					: "cursor-not-allowed opacity-30"
			} min-h-12 flex w-9/12 items-center justify-center rounded-xl p-3 font-bold outline-none`}
			onClick={() => action()}
			disabled={!valid}
		>
			{isLoading ? (
				<AiOutlineLoading3Quarters
					className="animate-spin"
					size="22px"
				/>
			) : (
				"Transfer"
			)}
		</button>
	);
}

export default TransferButton;
