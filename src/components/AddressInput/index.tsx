import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";

import { IAddressInput } from "../../interfaces/components/addressInput";
import { RootState } from "../../interfaces/state/rootState";
import { ThemeContext } from "../../state/context/theme";
import { isAddressValid } from "../../utils/validateAddress";

function AddressInput({
	destinationChain,
	addressInput,
	setAddressInput,
	isLoading,
	setErrorMessage,
}: IAddressInput) {
	const { isWalletConnected, address } = useSelector(
		(state: RootState) => state.walletReducer
	);
	const theme = useContext(ThemeContext);
	const [inputFocus, setInputFocus] = useState<boolean>(false);
	const [buttonHover, setButtonHover] = useState<boolean>(false);

	const handleInputChange = (input: string) => {
		setAddressInput(input);

		if (isWalletConnected) {
			const isAddressValidResult = isAddressValid(
				input as `0x${string}`,
				destinationChain.ecosystem
			);

			if (input.length > 0 && !isAddressValidResult) {
				setErrorMessage("Invalid destination address.");
			} else {
				setErrorMessage("");
			}
		}
	};

	return (
		<div
			style={{
				boxShadow: inputFocus
					? `0 0 0 1px ${theme.inputOutlineColor} inset`
					: `0 0 0 1px ${theme.inputBackgroundColor} inset`,
				background: theme.inputBackgroundColor,
			}}
			className="flex h-12 w-11/12 items-center justify-center rounded-lg pl-2 pr-1"
			onFocus={() => setInputFocus(true)}
			onBlur={() => setInputFocus(false)}
		>
			<input
				style={{
					background: theme.inputBackgroundColor,
				}}
				className="h-11 w-full appearance-none p-1 outline-none"
				type="text"
				inputMode="text"
				autoComplete="off"
				value={addressInput}
				onChange={(event) => handleInputChange(event.target.value)}
				disabled={!!isLoading}
			/>
			<div className="flex items-center justify-center pl-1 pr-2">
				{isWalletConnected ? (
					<button
						style={{
							color: buttonHover
								? theme.primaryColor
								: theme.primaryTextColor,
							boxShadow: buttonHover
								? `0 0 0 1px ${theme.inputOutlineColor} inset`
								: `0 0 0 1px ${theme.inputBackgroundColor} inset`,
							background: theme.containerBackgroundColor,
						}}
						className="rounded-lg px-2 py-1 text-sm opacity-90 outline-none duration-300 ease-in-out hover:opacity-100"
						onClick={() => handleInputChange(address!)}
						onMouseEnter={() => setButtonHover(true)}
						onMouseLeave={() => setButtonHover(false)}
					>
						Me
					</button>
				) : null}
			</div>
		</div>
	);
}

export default AddressInput;
