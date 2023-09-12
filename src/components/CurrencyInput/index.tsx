import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";

import { ICurrencyInput } from "../../interfaces/components/currencyInput";
import { RootState } from "../../interfaces/state/rootState";
import { ThemeContext } from "../../state/context/theme";
import { getMaxAmountDisplayUnits } from "../../utils/getMaxAmountDisplayUnits";
import { getTokenBaseUnits } from "../../utils/getTokenBaseUnits";

function CurrencyInput({
	isLoading,
	amountInput,
	setAmountInput,
	setAmount,
	maxAmount,
	token,
	setErrorMessage,
	disabled,
}: ICurrencyInput) {
	const theme = useContext(ThemeContext);
	const { isWalletConnected, currentNetwork } = useSelector(
		(state: RootState) => state.walletReducer
	);
	const [inputFocus, setInputFocus] = useState<boolean>(false);
	const [buttonHover, setButtonHover] = useState<boolean>(false);

	// Handle validity of input based on pattern defined in <input> element
	const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		let amountString = target.validity.valid ? target.value : amountInput;

		if (amountString === "") {
			setAmount(BigInt(0));
		} else if (amountString !== ".") {
			if (amountString[0] === ".") {
				amountString = `0${amountString}`;
			}

			const components = amountString.split(".");
			const decimals = components[1];

			if (decimals && decimals.length > token.decimals) {
				setErrorMessage("Too many decimal places.");
			} else {
				setErrorMessage("");
				setAmount(getTokenBaseUnits(amountString, token.decimals));
			}
		}
		setAmountInput(amountString);
	};

	const handleMaxAmountClick = () => {
		if (maxAmount) {
			setAmountInput(getMaxAmountDisplayUnits(maxAmount, token.decimals));
			setAmount(maxAmount);
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
			<div className="flex items-center justify-center">
				<div className="mr-4 flex h-12 w-12 items-center justify-center">
					<img
						className="h-7"
						alt="assetImage"
						src={token.imageSource}
					/>
				</div>
			</div>
			<input
				style={{
					background: theme.inputBackgroundColor,
				}}
				className="h-11 w-full appearance-none p-1 outline-none"
				type="text"
				pattern="[0-9]*\.?[0-9]*"
				inputMode="decimal"
				placeholder="0.00"
				onWheel={(event) => (event.target as HTMLInputElement).blur()}
				autoComplete="off"
				value={amountInput}
				onInput={(event) => handleChange(event)}
				disabled={!!isLoading || disabled}
			/>
			<div className="flex items-center justify-center pl-1 pr-2">
				{isWalletConnected && currentNetwork?.isSupported ? (
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
						onClick={() => handleMaxAmountClick()}
						onMouseEnter={() => setButtonHover(true)}
						onMouseLeave={() => setButtonHover(false)}
					>
						Max
					</button>
				) : null}
			</div>
		</div>
	);
}

export default CurrencyInput;
