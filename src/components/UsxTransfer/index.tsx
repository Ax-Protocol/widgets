/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IUsxTrasfer } from "../../interfaces/components/usxTransfer";
import { RootState } from "../../interfaces/state/rootState";
import { ThemeContext } from "../../state/context/theme";
import { updateRpcUrlMap } from "../../state/redux/rpc/rpcActions";
import { checkJsonRpcUrlMapLength } from "../../utils/checkRpcUrlMap";
import ConnectWalletDropdown from "../ConnectWalletDropdown";
import Footer from "../Footer";
import Header from "../Header";
import TransferButton from "../TransferButton";

function UsxTransfer({ maxWidth, jsonRpcUrlMap }: IUsxTrasfer) {
	const {
		isWalletConnected,
		// currentNetwork,
		// address,
		// currentEcosystem,
		// nativeBalance,
	} = useSelector((state: RootState) => state.walletReducer);
	const dispatch = useDispatch();
	const theme = useContext(ThemeContext);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	// const [successMessage, setSuccessMessage] = useState<string>("");
	// const [errorMessage, setErrorMessage] = useState<string>("");
	// const [amountInput, setAmountInput] = useState<string>("");

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [amount, setAmount] = useState<bigint>(BigInt(0));

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [destinationAddress, setDestinationAddress] = useState<string>("");
	// const [usxBalance, setUsxBalance] = useState<number>(0);

	const maxW = maxWidth ?? 430;

	useEffect(() => {
		try {
			checkJsonRpcUrlMapLength(jsonRpcUrlMap);

			// If no error is thrown, dispatch the update action
			dispatch(updateRpcUrlMap(jsonRpcUrlMap));
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error("An unexpected error occurred: ", error);
			}
		}
	}, [jsonRpcUrlMap, dispatch]);

	const initiateTransfer: () => Promise<void> = async () => {
		// getUsxService(currentEcosystem).transfer(setIsLoading, ...)
	};

	return (
		<div className="flex h-full w-full items-center justify-center">
			<div
				style={{
					maxWidth: `${maxW}px`,
					minWidth: "300px",
					backgroundColor: theme.containerBackgroundColor,
					boxShadow: `0 0 0 1px ${theme.containerOutlineColor}`,
					color: theme.primaryTextColor,
					fontFamily: theme.fontFamily,
				}}
				className="flex w-full flex-shrink flex-col items-center justify-center rounded-xl p-5 ring-1"
			>
				<Header />
				{isWalletConnected ? (
					<TransferButton
						action={initiateTransfer}
						isLoading={isLoading}
						amount={amount}
						maxAmount={3} // usxBalance
						// nativeBalance={BigInt(nativeBalance!.value)}
						// destinationChain={}
						destinationAddress={destinationAddress}
					/>
				) : (
					<ConnectWalletDropdown
						isLoading={isLoading}
						setIsLoading={setIsLoading}
					/>
				)}
				<Footer />
			</div>
		</div>
	);
}

export default UsxTransfer;
